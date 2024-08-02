'use client';

import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import QuillEditor from '../../components/QuillEditor';
import { setLocalStorageData, getLocalStorageData } from '../../utils/dbStorage';

const Writer = () => {
    const { userRole } = useContext(UserContext);
    const [editorContent, setEditorContent] = useState('');
    const [uploadedContent, setUploadedContent] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        // Load existing content from localStorage on component mount
        if (typeof window !== 'undefined') {
            const storedContent = getLocalStorageData('content') || [];
            setUploadedContent(storedContent);
        }
    }, []);

    const handleUpload = () => {
        setUploading(true);
        const newContent = {
            id: Date.now(),
            content: editorContent,
        };

        const updatedContent = [...uploadedContent, newContent];
        setTimeout(() => {
            setUploadedContent(updatedContent);
            setLocalStorageData('content', updatedContent);
            setEditorContent('');
            setUploading(false);
        }, 1500);
    };

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const handleRemoveItem = (id) => {
        const updatedContent = uploadedContent.filter(item => item.id !== id);
        setUploadedContent(updatedContent);
        setLocalStorageData('content', updatedContent);
    };

    if (userRole !== 'Writer') {
        return <div>Unauthorized access</div>;
    }

    return (
        <div className='mt-4'>
            <h1>Write Content</h1>
            <QuillEditor onChange={handleEditorChange} value={editorContent} />

            <button
                disabled={uploading}
                type='button'
                className="w-40 flex justify-center items-center my-4 rounded-md bg-indigo-600 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleUpload}>
                {
                    uploading &&
                    <span class="loader me-1"></span>
                }
                Upload
            </button>

            <h2 className="mt-4">Uploaded Content</h2>
            <ul>
                {uploadedContent.slice().reverse().map(item => (
                    <li key={item.id} className="my-2 p-2 border rounded-md">
                        <div className='flex justify-between'>

                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className='h-8 bg-red-500 px-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded-md'>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Writer;