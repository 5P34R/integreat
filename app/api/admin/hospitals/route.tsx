import connectToDB from "@/database/connect";
import Hospital from "@/database/models/hospital.model";
import User from "@/database/models/user.model";
import { add } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectToDB()

    const hospitals = await Hospital.find({});

    return new Response(JSON.stringify(hospitals), {
        headers: { 'content-type': 'application/json' },
    });
}


export async function POST(request: Request) {
    try {
        const req = await request.json();

        console.log(req);

        if (!req.name || !req.address ) {
            return NextResponse.json({ Message: "Missing Fields" }, { status: 400 });
        }

        const { name, address, user } = req;

        await connectToDB();

        const existingHospital = await Hospital.findOne({ name: name, address: address });
        if (existingHospital) {
            return NextResponse.json({ Message: "Hostpial Already Exist" }, { status: 400 });
        }

        const existingUser = await User.findById(user);

        console.log(user)

        const hospital = await Hospital.create({
            name: name,
            address: address,
            user: existingUser,
        });

        console.log(hospital);
      

    return NextResponse.json(hospital);
    }
        catch (error) {
            console.error('Error processing request:', error);
            return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
} 
}