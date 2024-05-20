import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import useCollectionStore from "../../store/collectionStore";
import useConnectedUrlStore from "../../store/connectUrlStore";
import { JSONTree } from 'react-json-tree';
import { Map } from 'immutable';
import usePipelineStore from "../../store/pipelineResultStore";

const ConfigurationSchemeForm = (PipeLine) => {

    const [output, setOutput] = useState(null);
    const { databaseName, collectionName } = useCollectionStore();
    const { connectedUrl } = useConnectedUrlStore();
    const { setPipelineResult } = usePipelineStore();

    const PipeLineValue = PipeLine.value;

    const runCode = async (e) => {

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

            if (response === 404) {
                alert("에러")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="pb-5">
                <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[110px]"
                    onClick={(e) => { runCode(e) }}>
                    <div className="text-emerald-600">
                        Run Code
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
                    구성 스키마 들어갈 자리
                </div>
            </Box>
        </div>
    );
};
export default ConfigurationSchemeForm;