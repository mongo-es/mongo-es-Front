import { useState } from "react";
import { Box } from "@chakra-ui/react";
import useCollectionStore from "../../store/collectionStore.jsx";
import useConnectedUrlStore from "../../store/connectUrlStore.jsx";
import usePipelineStore from "../../store/pipelineResultStore.jsx";
import { generateConfigSchema } from "@coffee-tree/config-schema-generator";
import useNaturalExplainStore from "../../store/naturalExplainStore.jsx";
import { JSONTree } from "react-json-tree";
import theme from "../../JSONtheme.js";

const ConfigurationSchemeForm = (PipeLine) => {



    const { databaseName, collectionName } = useCollectionStore();
    const { connectedUrl } = useConnectedUrlStore();
    const { setPipelineResult } = usePipelineStore();
    const { setNaturalExplain } = useNaturalExplainStore();

    const [configSchema, setConfigSchema] = useState();

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
        console.log("asdf")
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
        PipeLineValue = await eval(PipeLineValue)
        const v = await generateConfigSchema(PipeLineValue);
        setConfigSchema(v);
    };

    return (
        <div>
            <div className="pb-5">
                <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[130px]"
                    onClick={(e) => { runPipeline(e); runExplain(e); ConfigSchema(PipeLineValue); }}>
                    <div className="text-emerald-600">
                        Run PipeLine
                    </div>
                </button>
            </div>

            <Box
                width="35vw"
                height="60vh"
                p={2}
                border="1px solid"
                borderRadius={4}
            >
                <div>
                    {configSchema !== undefined ?
                        (<JSONTree
                            data={configSchema}
                            hideRoot={true}
                            invertTheme={true}
                            theme={theme}
                        />)
                        :
                        (null)
                    }
                </div>
            </Box>
        </div>
    );
};
export default ConfigurationSchemeForm;