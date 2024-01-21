import connectToDB from "@/database/connect";
import User from "@/database/models/user.model";
import { NextResponse } from "next/server";
import * as jose from 'jose';
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
    await connectToDB()

    const users = await User.find({});

    return new Response(JSON.stringify(users), {
        headers: { 'content-type': 'application/json' },
    });
}



export async function POST(request: Request) {
    try {
        const req = await request.json();

        console.log(req);

        if (!req.username || !req.email || !req.password || !req.fullName ) {
            return NextResponse.json({ Message: "Missing Fields" }, { status: 400 });
        }

        const { username, email, password, fullName, isAdmin, isHospital } = req;

        await connectToDB();

        const existingUser = await User.findOne({ username: username, email: email });
        if (existingUser) {
            return NextResponse.json({ Message: "Username Already Taken" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            fullname: fullName,
            isAdmin: isAdmin,
            isHospital: isHospital
        });

        console.log(user);
      

    return NextResponse.json(user);
    }
        catch (error) {
            console.error('Error processing request:', error);
            return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
} 
}