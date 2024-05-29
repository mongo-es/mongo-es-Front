import { useState } from "react";
import { Box } from "@chakra-ui/react";
import useCollectionStore from "../../store/collectionStore.jsx";
import useConnectedUrlStore from "../../store/connectUrlStore.jsx";
import usePipelineStore from "../../store/pipelineResultStore.jsx";
import { generateConfigSchema, generateConfigSchemaByStep } from "@coffee-tree/config-schema-generator";
import useNaturalExplainStore from "../../store/naturalExplainStore.jsx";
import { JSONTree } from "react-json-tree";
import theme from "../../JSONtheme.js";

const Step = ({ step, operator, data }) => {
    return (
        <div className="mb-4 p-4 mr-2 mt-2 border border-gray-300 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Step {step}: {operator}</h3>
            <JSONTree
                data={data}
                hideRoot={true}
                invertTheme={true}
                theme={{
                    extend: theme
                }}
            />
        </div>
    );
};

const ConfigSchemaSteps = ({ configSchemaStep }) => {
    if (!configSchemaStep) {
        return null;
    }

    return (
        <div className="pl-2">
            {Object.entries(configSchemaStep).map(([key, value], index) => {
                const [operator, data] = Object.entries(value)[0];
                return (
                    <Step key={index} step={key} operator={operator} data={data} />
                );
            })}
        </div>
    );
};

const ConfigurationSchemeForm = (PipeLine) => {
    const { databaseName, collectionName } = useCollectionStore();
    const { connectedUrl } = useConnectedUrlStore();
    const { setPipelineResult } = usePipelineStore();
    const { setNaturalExplain } = useNaturalExplainStore();

    const [configSchema, setConfigSchema] = useState();
    const [configSchemaStep, setConfigSchemaStep] = useState();

    const PipeLineValue = PipeLine.value;

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

    const ConfigSchema = async (PipeLineValue) => {
        PipeLineValue = await eval(PipeLineValue);
        const v = await generateConfigSchema(PipeLineValue);
        setConfigSchema(v);
    };

    const ConfigSchemaStep = async (PipeLineValue) => {
        PipeLineValue = await eval(PipeLineValue);
        const v = await generateConfigSchemaByStep(PipeLineValue);
        setConfigSchemaStep(v);
        console.log(v);
    }

    return (
        <div>
            <div className="pb-5">
                <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[130px]"
                    onClick={(e) => { runPipeline(e); runExplain(e); ConfigSchema(PipeLineValue); ConfigSchemaStep(PipeLineValue); }}>
                    <div className="text-emerald-600">
                        Run PipeLine
                    </div>
                </button>
            </div>

            <Box
                className="border border-1 border-gray-400 shadow-lg"
                width="35vw"
                height="60vh"
                p={2}
                borderRadius={4}
            >
                <div>
                    {configSchemaStep !== undefined ?
                        (
                            <ConfigSchemaSteps configSchemaStep={configSchemaStep} />
                        ) :
                        (null)
                    }
                </div>
            </Box>
        </div>
    );
};

export default ConfigurationSchemeForm;