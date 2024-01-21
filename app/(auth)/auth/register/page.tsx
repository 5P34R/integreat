"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function RegisterPage() {
    
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string| null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Submitting form...');
        if (!username || !email || !password || !confirmPassword) {
            setError(null);
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(null);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, fullname, password }),
            });
            if (!response.ok) {
                const responseData = await response.json();
                setError(responseData.message || 'Registration failed');
                return;
            }
            console.log('User registered successfully');
            router.push('/auth/login');
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <>
            <div className="flex w-full max-h-screen justify-center items-center">
                <Card className="w-1/4">
                    <CardHeader>
                        <CardTitle className="text-center">Registration</CardTitle>
                        <CardDescription className="text-center">Sign in to stay updated</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="fullname">Full Name</Label>
                                    <Input id="fullname" placeholder="Enter Full Name" value={fullname} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password2">Confirm Password</Label>
                                    <Input id="password2" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button type="submit" onClick={handleSubmit} className="bg-[#fbd716] text-black">Save</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="w-full justify-center text-center mt-3">
                <p> Already have an account ?</p>

                <Link href="/auth/login"><Button variant={"link"} className="text-blue-500">Login here</Button></Link>
            </div>
        </>
    );
}
