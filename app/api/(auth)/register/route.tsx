import connectToDB from '@/database/connect';
import User from '@/database/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import * as jose from 'jose';

export async function POST(request: Request) {
    try {
        const req = await request.json();

        if (!req.username || !req.email || !req.password || !req.fullname) {
            return NextResponse.json({ Message: "Missing Fields" }, { status: 400 });
        }

        const { username, email, password, fullname } = req;

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
            fullname: fullname,
        });

        console.log(user);
        
        // const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin, isHospital: user.isHospital }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
        const token = await new jose.SignJWT({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            isHospital: user.isHospital,
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('10h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET!));


        console.log(token);
        return new NextResponse('Hello, Next.js!', {
            status: 200,
            headers: { 'Set-Cookie': `token=${token};path=/;` },
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}
