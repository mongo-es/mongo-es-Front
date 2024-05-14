import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import useCollectionStore from '../store/collectionStore.jsx'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const Sidebar = () => {
    const { collection } = useCollectionStore();

    const [expandedItems, setExpandedItems] = useState([]);

    const handleItemExpand = (itemId) => {
        const isExpanded = expandedItems.includes(itemId);
        const newExpandedItems = isExpanded
            ? expandedItems.filter(id => id !== itemId)
            : [...expandedItems, itemId];
        setExpandedItems(newExpandedItems);
    };

    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-2 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className='pt-2'>
                            <Link to='/'>
                                <span className="pl-8 text-3xl">Mongo-es</span>
                            </Link>
                        </li>
                        <br />
                        <SimpleTreeView>
                            {/* collection 데이터를 반복하여 각 항목의 TreeItem을 생성 */}
                            {collection.map(item => (
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
                                                onClick={() => console.log(child.itemId)}
                                            />
                                        ))}
                                    </TreeItem>
                                </div>
                            ))}
                        </SimpleTreeView>
                    </ul>
                </div>
            </aside >
        </div >
    )
}

export default Sidebar