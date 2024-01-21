import * as jose from 'jose';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    try{
        const cookie = request.headers.get('cookie')

        
        const cookies = cookie?.split(';');
        const lastToken = (cookies ?? []).reverse().find((c: string) => c.trim().startsWith('token='))?.split('=')[1];

        const token = lastToken ?? ''; // Declare the 'token' variable

        console.log(token); // Use the 'token' variable

        const { payload } = await jose.jwtVerify(token ?? '', new TextEncoder().encode(process.env.JWT_SECRET!));
    
        return new Response(JSON.stringify(payload), {
            headers: { 'content-type': 'application/json' },
        });
    }

    catch(error){
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}