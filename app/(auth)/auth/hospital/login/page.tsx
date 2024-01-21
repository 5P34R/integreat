"use client"
import { useState } from 'react';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function HospitalLoginPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        // Implement your authentication logic here
        // For example, you might make an API request to validate the credentials
        console.log('Logging in with:', { email, password });
    };

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:block md:block sm:hidden mb">
                    <img src="/icon.jpg" alt="Company Icon" className="h-14" />
                    <div className="w-full font-medium flex-wrap text-2xl mt-10 p-2">
                        Hospital Administration
                    </div>
                </div>
                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5 px-10">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Login</h2>
                    <div className="mt-10 relative mb-4">
                        <Label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <Label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <Button
                        onClick={handleLogin}
                        className="mt-20 text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded-full text-lg font-medium"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </section>
    )
}