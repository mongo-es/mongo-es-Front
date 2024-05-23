import React from 'react'
import '../../components_css/Home.css'
import CodeEditorForm from '../Home/CodeEditor.jsx';
import ExplainModal from '../ExplainComponent/ExplainModal.jsx';
import SaveButton from '../Buttons/SaveButton.jsx';
import HistoryButton from '../Buttons/HistoryButton.jsx';
import OutputForm from '../Home/Output.jsx'
import SchemaTypeForm from './SchemaType.jsx';

const Home = () => {

    return (
        < main className='Home-main-container pt-6 pl-9' >
            <div className="grid grid-cols-[9.5fr,0.5fr,5fr] p-2 mb-10 mt-5">
                <ExplainModal />
                <div className='pr-4'>
                    <SaveButton />
                </div>
                <HistoryButton />
            </div>
            <SchemaTypeForm />
            <CodeEditorForm />
            <OutputForm />
        </main >
    )
}

export default Home