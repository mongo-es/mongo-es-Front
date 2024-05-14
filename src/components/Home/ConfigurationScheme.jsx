import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import useCollectionStore from "../../store/collectionStore";

const ConfigurationSchemeForm = () => {

    const [output, setOutput] = useState(null);

    const { databaseName, collectionName } = useCollectionStore();

    const runCode = async (e) => {
        e.preventDefault();
        console.log(databaseName, collectionName);
        try {
            // const response = await fetch(`${value}`, {
            const response = await fetch('http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/aggregate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: 'mongodb+srv://kkwjdfo:9k2wNUnStGjzpYIH@cluster0.wqyssre.mongodb.net/',
                    databaseName: databaseName,
                    collectionName: collectionName,
                    pipeline: [],
                })
            }).then(response => response.json())
                .then(response => console.log(response));
            // const data = await response.json();
            // console.log(data);

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
                {output
                    ? output.map((line, i) => <Text key={i}>{line}</Text>)
                    : '구성 스키마가 들어갈 자리입니다'}
            </Box>
        </div>
    );
};
export default ConfigurationSchemeForm;