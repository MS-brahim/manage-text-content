'use client';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { getLocalStorageData } from '../../utils/dbStorage';

const Publisher = () => {
    const { userRole } = useContext(UserContext);
    const [uploadedContent, setUploadedContent] = useState([]);

    useEffect(() => {
        const loadContent = () => {
            const storedContent = getLocalStorageData('content');
            if (storedContent) {
                setUploadedContent(storedContent);
            }
        };

        loadContent();

        const handleStorageChange = () => {
            loadContent();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (userRole !== 'Publisher') {
        return <div>Unauthorized access</div>;
    }

    return (
        <div className='mt-4'>
            <h1>Published Content</h1>
            {uploadedContent.length === 0 ? (
                <p>No content available.</p>
            ) : (
                <ul>
                    {uploadedContent.slice().reverse().map((item, index) => (
                        <li key={item.id} className="my-2 p-2 border rounded-md">
                            <b>Content {index + 1}</b>
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Publisher;