'use client';
import Image from 'next/image'
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useRouter } from 'next/navigation';
import users from '../../fakedb/users.json';

const Login = () => {
    const { login } = useContext(UserContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setTimeout(() => {
                setLoading(false);
                login(user);
                router.push(`/${user.role.toLowerCase()}`);
            }, 1500);
        } else {
            setLoading(false);
            alert('Invalid credentials');
        }
    };

    const handleUserTypeDemo = (role) => {
        const user = users.find(u => u.role === role);
        setEmail(user.email);
        setPassword(user.password);
    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        src="/stryvelogo.jpeg"
                        width={200}
                        height={160}
                        alt="Picture of the author"
                        className='mx-auto'
                    />
                    <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p>These buttons are just a demo for testing purposes. Please click below to proceed. 👇</p>
                    <div class="inline-flex w-full">
                        <button
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 w-1/2 rounded-l"
                            onClick={() => handleUserTypeDemo("Publisher")}>
                            Publisher
                        </button>
                        <button
                            onClick={() => handleUserTypeDemo("Writer")}
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 w-1/2 rounded-r">
                            Writer
                        </button>
                    </div>

                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <div className="mt-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="p-1.5 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="p-1.5 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="items-center flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {
                                    loading &&
                                    <span class="loader me-1"></span>
                                }
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
