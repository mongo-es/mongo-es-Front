import { useState } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";

const ConfigurationSchemeForm = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // const runCode = async () => {
    //     const sourceCode = editorRef.current.getValue();
    //     if (!sourceCode) return;
    //     try {
    //         setIsLoading(true);
    //         const { run: result } = await executeCode(language, sourceCode);
    //         setOutput(result.output.split("\n"));
    //         result.stderr ? setIsError(true) : setIsError(false);
    //         console.log("test")
    //     } catch (error) {
    //         console.log(error);
    //         toast({
    //             title: "An error occurred.",
    //             description: error.message || "Unable to run code",
    //             status: "error",
    //             duration: 6000,
    //         });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };



    return (
        <div>
            <div className="pb-5">
                <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[110px]" >
                    <div className="text-emerald-600">
                        Run Code
                    </div>
                </button>
            </div>

            <Box
                width="35vw"
                height="60vh"
                p={2}
                color={isError ? "red.400" : ""}
                border="1px solid"
                borderRadius={4}
                borderColor={isError ? "red.500" : "#333"}
            >
                {output
                    ? output.map((line, i) => <Text key={i}>{line}</Text>)
                    : '구성 스키마가 들어갈 자리입니다'}
            </Box>
        </div>
    );
};
export default ConfigurationSchemeForm;