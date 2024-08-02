'use client';

import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import QuillEditor from '../../components/QuillEditor';

const Writer = () => {
    const { userRole } = useContext(UserContext);
    const [editorContent, setEditorContent] = useState('');
    const [uploadedContent, setUploadedContent] = useState([]);

    const handleUpload = () => {
        const newContent = {
            id: Date.now(),
            content: editorContent,
        };
        const updatedContent = [...uploadedContent, newContent]; 
        setUploadedContent(updatedContent); 
        localStorage.setItem('content', JSON.stringify(updatedContent));
    };

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    if (userRole !== 'Writer') {
        return <div>Unauthorized access</div>;
    }

    return (
        <div className='mt-4'>
            <h1>Write Content</h1>
            <QuillEditor onChange={handleEditorChange} value={editorContent} />

            <button
                className="my-4 rounded-md bg-indigo-600 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
};

export default Writer;
