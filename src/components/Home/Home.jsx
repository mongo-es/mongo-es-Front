import React from 'react'
import '../../components_css/Home.css'
import CodeEditorForm from '../Home/CodeEditor.jsx';
import ExplainModal from '../ExplainComponent/ExplainModal.jsx';
// import SaveButton from '../Buttons/SaveButton.jsx';
// import HistoryButton from '../Buttons/HistoryButton.jsx';
import OutputForm from '../Home/Output.jsx'
import SchemaTypeForm from './SchemaType.jsx';
import SelectedDCNameForm from './SelectedDCName.jsx';

const Home = () => {

    return (
        < main className='Home-main-container pt-6 pl-9' >
            <div className="mb-10 mt-5">
                <div className='flex'>
                    <SelectedDCNameForm />
                    <div className='position: absolute left-[1295px]'>
                        <ExplainModal />
                    </div>
                </div>
                {/* <div className='pr-4'>
                    <SaveButton />
                </div>
                <HistoryButton /> */}
            </div>
            <SchemaTypeForm />
            <OutputForm />
            <CodeEditorForm />
        </main >
    )
}

export default Home