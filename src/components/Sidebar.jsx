import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import useDatabaseStore from '../store/databaseStore.jsx';
import useCollectionStore from '../store/collectionStore.jsx';
import useConnectedUrlStore from '../store/connectUrlStore.jsx';
import usePipelineStore from "../store/pipelineResultStore.jsx";
import useSchemaTypeStore from '../store/schemaTypeStore.jsx';

const Sidebar = () => {
    const { database } = useDatabaseStore();
    const { setCollection } = useCollectionStore();
    const { setPipelineResult } = usePipelineStore();
    const { setSchemaType } = useSchemaTypeStore();
    const { databaseName, collectionName } = useCollectionStore();
    const { connectedUrl } = useConnectedUrlStore();

    const [collectionSet, setCollectionSet] = useState(false);
    const [event, setEvent] = useState(null);
    const [expandedItems, setExpandedItems] = useState([]);

    useEffect(() => {
        // Log to see if the state is initialized correctly
        console.log("Loaded database from store:", database);
    }, [database]);

    const handleItemExpand = (itemId) => {
        const isExpanded = expandedItems.includes(itemId);
        const newExpandedItems = isExpanded
            ? expandedItems.filter(id => id !== itemId)
            : [...expandedItems, itemId];
        setExpandedItems(newExpandedItems);
    };

    const runExamplePipeline = async (e) => {
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
                    pipeline: [
                        {
                            $limit: 10
                        }
                    ],
                })

            }).then(response => response.json())
                .then(response => setPipelineResult(response));

            if (response === 404) {
                alert("에러");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const runSchemaType = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/schema`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: connectedUrl,
                    databaseName: databaseName,
                    collectionName: collectionName,
                })

            }).then(response => response.json())
                .then(response => setSchemaType(response));

            if (response === 404) {
                alert("에러");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const waitSetCollection = async (dName, cName) => {
        await setCollection(dName, cName);
        setCollectionSet(true);
    };

    const defaultClick = async (e, dName, cName) => {
        setEvent(e);
        await waitSetCollection(dName, cName);
    };

    useEffect(() => {
        if (collectionSet && event) {
            runExamplePipeline(event);
            runSchemaType(event);
            setCollectionSet(false);  // Reset the state
        }
    }, [collectionSet, event]);

    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-2 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200">
                    <ul className="space-y-2 font-medium">
                        <li className='pt-2'>
                            <Link to='/'>
                                <span className="pl-8 text-3xl">Mongo-es</span>
                            </Link>
                        </li>
                        <br />
                        <SimpleTreeView>
                            {database && database.length > 0 ? (
                                database.map(item => (
                                    <div key={item.itemId} className="flex items-center p-2 text-gray-900 rounded-lg">
                                        <TreeItem
                                            itemId={item.itemId}
                                            label={item.itemId}
                                            onClick={() => { handleItemExpand(item.itemId) }}
                                        >
                                            {item.children && item.children.map(child => (
                                                <TreeItem
                                                    key={child.itemId}
                                                    itemId={child.itemId}
                                                    label={child.itemId}
                                                    onClick={(e) => { defaultClick(e, item.itemId, child.itemId); console.log("클릭") }}
                                                />
                                            ))}
                                        </TreeItem>
                                    </div>
                                ))
                            ) : null}
                        </SimpleTreeView>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;