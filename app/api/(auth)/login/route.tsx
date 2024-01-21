import connectToDB from "@/database/connect";
import User from "@/database/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import * as jose from 'jose';


export async function POST(request: Request) {
    try {
        const req = await request.json();

        if (!req.username || !req.password) {
            return NextResponse.json({ Message: "Missing Fields" }, { status: 400 });
        }

        const { username, password } = req;

        await connectToDB();

        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return NextResponse.json({ Message: "User not found" }, { status: 400 });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return NextResponse.json({ Message: "Invalid Credentials" }, { status: 400 });
        }

        // const token = jwt.sign({ id: existingUser.id, username: existingUser.username, isAdmin: existingUser.isAdmin, isHospital: existingUser.isHospital }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const token = await new jose.SignJWT({
            id: existingUser.id,
            username: existingUser.username,
            isAdmin: existingUser.isAdmin,
            isHospital: existingUser.isHospital,
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

        console.log(token);
        return new NextResponse('successfully logged', {
            status: 200,
            headers: { 'Set-Cookie': `token=${token};path=/;` },
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}