import { React, useState } from "react";
import useSchemaTypeStore from "../../store/schemaTypeStore.jsx";
import { Table } from "@radix-ui/themes";
import { GoPlusCircle } from "react-icons/go";
import { IndexCheckbox } from "../indexControl/indexCheckBox.jsx";

const SchemaTypeForm = () => {
    const { schemaType } = useSchemaTypeStore();
    const [showIndexCheckbox, setShowIndexCheckbox] = useState(false);

    const handlePlusClick = () => {
        // index checkbox 화면에 표시
        setShowIndexCheckbox(!showIndexCheckbox);
    };

    return (
        <div className="pb-5">
            <button className="border border-gray-200 rounded-md bg-gray-100 h-10 w-[240px] mb-4">
                <div className="text-md">Collection Schema Info</div>
            </button>

            {/* IndexCheckbox 컴포넌트를 조건부 렌더링하여 테이블 헤더 아래에 위치 */}
            {showIndexCheckbox && <IndexCheckbox />}

            <div className="border border-gray-200 rounded-md w-[72.1vw] h-[206.5px] overflow-auto shadow-md">
                <Table.Root variant="surface" className="min-w-full">
                    <Table.Header className="bg-gray-100">
                        <Table.Row className="w-full">
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">
                                Key
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">
                                Type
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center flex justify-center items-center">
                                Index
                                <button
                                    onClick={handlePlusClick}
                                    className="ml-2"
                                >
                                    <GoPlusCircle />
                                </button>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">
                                Cardinality
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.entries(schemaType).map(([key, value]) => (
                            <Table.Row
                                key={key}
                                className="odd:bg-white even:bg-gray-50 w-full"
                            >
                                <Table.RowHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">
                                    {key}
                                </Table.RowHeaderCell>
                                <Table.Cell className="p-2 border border-gray-300 w-[18vw] text-center">
                                    {value.BsonType}
                                </Table.Cell>
                                <Table.Cell className="p-2 border border-gray-300 w-[18vw] text-center">
                                    {value.Index[0]?.hasIndex
                                        ? `${value.Index[0].indexName}`
                                        : "null"}
                                </Table.Cell>
                                <Table.Cell className="p-2 border border-gray-300 w-[18vw] text-center">
                                    {value.Cardinality}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    );
};

export default SchemaTypeForm;
