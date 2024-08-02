'use client';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';

const Publisher = () => {
    const { userRole } = useContext(UserContext);
    const [uploadedContent, setUploadedContent] = useState([]);

    useEffect(() => {
        const storedContent = window.localStorage.getItem('content');
        if (storedContent) {
            setUploadedContent(JSON.parse(storedContent));
        }

        const handleStorageChange = () => {
            const updatedContent = window.localStorage.getItem('content');
            if (updatedContent) {
                setUploadedContent(JSON.parse(updatedContent));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (userRole !== 'Publisher') {
        return <div>Unauthorized access</div>;
    }

    return (
        <div className='mt-4'>
            <h1>Published Content</h1>
            <ul>
                {uploadedContent.map((item, index) => (
                    <li key={item.id} className="my-2 p-2 border rounded-md">

                        <b>content {index+1}</b>
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Publisher;
