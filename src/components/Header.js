import React, { useContext } from 'react'
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';

export default function Header() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    return (
        <header className="bg-gray-800 text-white">
            <div className="flex justify-between items-center py-4 px-4">
                <div className="text-lg font-semibold">
                    Website
                </div>
                <div>
                    <button onClick={() => router.push('/login')}>
                        Login as {user && user.role === "Writer" ? "Publisher" : "Writer"}
                    </button>
                </div>
            </div>
        </header>
    )
}
