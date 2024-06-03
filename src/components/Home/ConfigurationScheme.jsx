import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import useCollectionStore from "../../store/collectionStore.jsx";
import useConnectedUrlStore from "../../store/connectUrlStore.jsx";
import usePipelineStore from "../../store/pipelineResultStore.jsx";
import useNaturalExplainStore from "../../store/naturalExplainStore.jsx";
import useOptimizeStore from "../../store/optimizeStore.jsx";
import { generateConfigSchema, generateConfigSchemaByStep } from "@coffee-tree/config-schema-generator";
import { JSONTree } from "react-json-tree";
import theme from "../../JSONtheme.js";

const ConfigurationSchemeForm = (PipeLine) => {
    const { databaseName, collectionName } = useCollectionStore();
    const { connectedUrl } = useConnectedUrlStore();
    const { setPipelineResult } = usePipelineStore();
    const { setNaturalExplain } = useNaturalExplainStore();
    const { setOptimizeResult } = useOptimizeStore();

    const [configSchema, setConfigSchema] = useState();
    const [configSchemaStep, setConfigSchemaStep] = useState();
    const [pipelineStep, setPipeLineStep] = useState(null);
    const [optimize, setOptimize] = useState(null);

    const PipeLineValue = PipeLine.value;

    const waitSetStep = async (step) => {
        setPipeLineStep(step);
    };

    const Step = ({ step, operator, data }) => {
        const [expanded, setExpanded] = useState(false);
        const [stepData, setStepData] = useState(null);

        const runAggregationPart = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch(`http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/aggregate/part`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mongoUri: connectedUrl,
                        databaseName: databaseName,
                        collectionName: collectionName,
                        pipeline: PipeLineValue,
                        step: pipelineStep,
                    })
                }).then(response => response.json());

                if (response === 404) {
                    alert("에러");
                }

                // 응답값을 로컬 스토리지에 저장
                localStorage.setItem(`step-${step}`, JSON.stringify(response));
                setStepData(response);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const toggleExpansion = (e) => {
            setExpanded(!expanded);
            if (!expanded) {
                const storedData = localStorage.getItem(`step-${step}`);
                if (storedData) {
                    setStepData(JSON.parse(storedData));
                } else {
                    waitSetStep(step);
                    runAggregationPart(e);
                }
            }
        };

        return (
            <div className="mb-4 p-4 mr-2 mt-2 border border-gray-300 rounded-md shadow-md">
                <h3
                    onClick={toggleExpansion}
                    className="text-lg font-semibold mb-2 cursor-pointer">Step {step}: {operator}</h3>
                <div className="cursor-pointer">
                    <JSONTree
                        data={data}
                        hideRoot={true}
                        invertTheme={true}
                        theme={{ extend: theme }}
                    />
                </div>
                {expanded && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md shadow-inner">
                        {stepData ? (
                            <div>
                                <h4 className="text-md font-semibold mb-2">Result for Step {step}</h4>
                                <JSONTree
                                    data={stepData}
                                    hideRoot={true}
                                    invertTheme={true}
                                    theme={{ extend: theme }}
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading...</p>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const ConfigSchemaSteps = ({ configSchemaStep }) => {
        if (!configSchemaStep) {
            return null;
        }

        return (
            <div className="pl-2">
                {configSchemaStep !== null ?
                    (Object.entries(configSchemaStep).map(([key, value], index) => {
                        const [operator, data] = Object.entries(value)[0];
                        return (
                            <Step key={index} step={key} operator={operator} data={data} />
                        );
                    }))
                    : null
                }
            </div>
        );
    };

    const runPipeline = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/aggregate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: connectedUrl,
                    databaseName: databaseName,
                    collectionName: collectionName,
                    pipeline: PipeLineValue,
                })

            }).then(response => response.json())
                .then(response => setPipelineResult(response))
            //.then(response => console.log(response))

            if (response === 404 || response === 500) {
                alert("에러입니다")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const runExplain = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/explain`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: connectedUrl,
                    databaseName: databaseName,
                    collectionName: collectionName,
                    pipeline: PipeLineValue,
                })

            }).then(response => response.json())
                .then(response => setNaturalExplain(response))

            if (response === 404) {
                alert("에러")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const runOptimize = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/optimize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: connectedUrl,
                    databaseName: databaseName,
                    collectionName: collectionName,
                    pipeline: PipeLineValue,
                })

            });
            const data = await response.json();

            if (response.status === 404) {
                alert("에러");
            } else {
                useOptimizeStore.getState().setOptimizeResult(data.indexOptimize, data.pipeOptimize);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const ConfigSchema = async (PipeLineValue) => {
        PipeLineValue = await eval(PipeLineValue);
        const v = await generateConfigSchema(PipeLineValue);
        setConfigSchema(v);
    };

    const ConfigSchemaStep = async (PipeLineValue) => {
        PipeLineValue = await eval(PipeLineValue);
        const v = await generateConfigSchemaByStep(PipeLineValue);
        setConfigSchemaStep(v);
    }

    return (
        <div>
            <div className="pb-5">
                <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[60px]"
                    onClick={(e) => { runPipeline(e); runExplain(e); runOptimize(e); ConfigSchema(PipeLineValue); ConfigSchemaStep(PipeLineValue); }}>
                    <div className="text-emerald-600">
                        실행
                    </div>
                </button>
            </div>

            <Box
                className="border border-1 border-gray-400 shadow-lg overflow-auto"
                width="35vw"
                height="60vh"
                p={2}
                borderRadius={4}
            >
                <div className="cursor-pointer">
                    {configSchemaStep !== null ?
                        (
                            <div>
                                <ConfigSchemaSteps configSchemaStep={configSchemaStep} />
                            </div>
                        ) :
                        null
                    }
                </div>
            </Box>
        </div>
    );
};

export default ConfigurationSchemeForm;