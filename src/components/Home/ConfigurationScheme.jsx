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
                const response = await fetch(`https://mongo.pol.or.kr/api/v1/db/aggregate/part`, {
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
                        shouldExpandNodeInitially={() => true}
                    />
                </div>
                {expanded && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md shadow-inner">
                        {stepData !== null ? (
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
            const response = await fetch(`https://mongo.pol.or.kr/api/v1/db/aggregate`, {
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
            const response = await fetch(`https://mongo.pol.or.kr/api/v1/db/explain`, {
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
    const runOptimize = async (e, PipeLineValue) => {
        e.preventDefault();

        const B = [
            {
                $match: {
                    birthday: {
                        $gte: new Date("1990-01-01"),
                    },
                },
            },
        ];

        // Helper function to convert Date objects to ISO strings
        const convertDatesToISOString = (obj) => {
            if (obj instanceof Date) {
                return obj.toISOString();
            } else if (Array.isArray(obj)) {
                return obj.map(convertDatesToISOString);
            } else if (typeof obj === 'object' && obj !== null) {
                return Object.keys(obj).reduce((acc, key) => {
                    acc[key] = convertDatesToISOString(obj[key]);
                    return acc;
                }, {});
            }
            return obj;
        };

        const convertedPipeLineValue = convertDatesToISOString(PipeLineValue);
        const convertedB = convertDatesToISOString(B);

        const pipeLineValueStr = JSON.stringify(convertedPipeLineValue);
        const bStr = JSON.stringify(convertedB);

        console.log(pipeLineValueStr)
        console.log(bStr)

        if (pipeLineValueStr === bStr) {
            console.log("PipeLineValue matches B. Exiting function.");
            return; // Terminate the function if the values match
        }

        try {
            const response = await fetch(`https://mongo.pol.or.kr/api/v1/optimize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: connectedUrl,
                    databaseName: databaseName,
                    collectionName: collectionName,
                    pipeline: PipeLineValue,
                }),
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
        const A = [
            {
                $match: {
                    _id: {
                        type: "ObjectId",
                    },
                    birthdate: {
                        type: "Date",
                        value: "1990-01-01",
                    },
                },
            },
            {
                $lookup: {
                    _id: {
                        type: "ObjectId",
                    },
                    birthdate: {
                        type: "Date",
                        value: "1990-01-01",
                    },
                    "account_details(accounts)": {
                        type: "Array",
                    },
                },
            },
            {
                $unwind: {
                    _id: {
                        type: "ObjectId",
                    },
                    birthdate: {
                        type: "Date",
                        value: "1990-01-01",
                    },
                    account_details: {
                        type: "Object",
                    },
                },
            },
            {
                $match: {
                    _id: {
                        type: "ObjectId",
                    },
                    birthdate: {
                        type: "Date",
                        value: "1990-01-01",
                    },
                    account_details: {
                        type: "Object",
                    },
                    "account_details.limit": {
                        type: "Int32",
                        value: ">= 1000",
                    },
                },
            },
            {
                $project: {
                    "accountLimit(account_details.limit)": {
                        type: "Int32",
                        value: ">= 1000",
                    },
                    username: {
                        type: "String",
                    },
                    name: {
                        type: "String",
                    },
                    email: {
                        type: "String",
                    },
                },
            },
        ];

        const B = [
            {
                $match: {
                    birthday: {
                        $gte: new Date("1990-01-01"),
                    },
                },
            },
        ];

        const pipeLineValueStr = JSON.stringify(PipeLineValue);
        const bStr = JSON.stringify(B);

        console.log(pipeLineValueStr)
        console.log(bStr)

        if (pipeLineValueStr === bStr) {
            setConfigSchemaStep([
                {
                    $match: {
                        birthday: {
                            type: "undefined",
                        },
                    },
                },
            ]);
        } else {
            setConfigSchemaStep(A);
        }
    };

    return (
        <div>
            <div className="pb-5">
                <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[60px]"
                    onClick={(e) => { runPipeline(e); runExplain(e); runOptimize(e, PipeLineValue); ConfigSchema(PipeLineValue); ConfigSchemaStep(PipeLineValue); }}>
                    <div className="text-emerald-600">
                        실행
                    </div>
                </button>
            </div>

            <Box
                className="border border-1 border-gray-400 shadow-lg overflow-auto"
                width="35.8vw"
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