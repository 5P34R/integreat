import Hospital from '@/database/models/hospital.model';
import User from '@/database/models/user.model';
import { useSearchParams } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const query = request.url.split('?')[1];
    
    const userId = query.split('=')[1];
    const user = await User.findById(userId); 
    const hospital = await Hospital.findOne({user: user})

    return NextResponse.json({ hospital }, { status: 200 });
}