import connectToDB from "@/database/connect";
import Department from "@/database/models/department.models";
import { NextResponse } from "next/server";


export async function DELETE(request: Request) {
    try {
        const params = request.url;
        const segments = params?.split('/');
        const id = segments?.[segments.length - 1];

        await connectToDB();

        await Department.findByIdAndDelete(id);

        return NextResponse.json({ Message: "User Deleted" }, { status: 201 })
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}