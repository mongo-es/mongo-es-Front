import React from "react";
import useSchemaTypeStore from "../../store/schemaTypeStore.jsx";
import { Table } from '@radix-ui/themes';

const SchemaTypeForm = () => {
    const { schemaType } = useSchemaTypeStore();

    return (
        <div className="pb-5">
            <button className="border border-gray-200 rounded-md bg-gray-100 h-10 w-[240px] mb-4">
                <div className="text-md">
                    Collection Schema Info
                </div>
            </button>

            <div className="border border-gray-200 rounded-md w-[72.1vw] h-[206.5px] overflow-auto shadow-md">
                <Table.Root variant="surface" className="min-w-full">
                    <Table.Header className="bg-gray-100">
                        <Table.Row className="w-full">
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">Key</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">Index</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">Cardinality</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.entries(schemaType).map(([key, value]) => (
                            <Table.Row key={key} className="odd:bg-white even:bg-gray-50 w-full">
                                <Table.RowHeaderCell className="p-2 border border-gray-300 w-[18vw] text-center">{key}</Table.RowHeaderCell>
                                <Table.Cell className="p-2 border border-gray-300 w-[18vw] text-center">{value.BsonType}</Table.Cell>
                                <Table.Cell className="p-2 border border-gray-300 w-[18vw] text-center">{value.Index?.hasIndex ? value.Index.indexName : 'null'}</Table.Cell>
                                <Table.Cell className="p-2 border border-gray-300 w-[18vw] text-center">{value.Cardinality}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    );
}

export default SchemaTypeForm;