"use client" 
import IntegreatSideBar from "@/components/IntegreatSideBar";
import IntegreatBottomBar from "@/components/IntegreatBottomBar";
import MainNav from "@/components/MainNav";
import { useEffect, useState } from "react";

export default function IntegreatPage() {
    const [hospitals, setHospitals] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/hospitals');

                if (res.ok) {
                    const data = await res.json();
                    setHospitals(data);
                } else {
                    console.error('Error fetching hospital data');
                }
            } catch (error) {
                console.error('Error fetching hospital data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Log the state values whenever they change
        console.log('Hospitals:', hospitals);
    }, [hospitals]);

    return (
        <>
            <MainNav />
            <div className="w-full">
                <div className="w-[80%] flex lg:flex-row md:flex-row flex-col mx-auto">
                    <IntegreatSideBar />
                    <div className="container justify-center items-center text-center">
                        <div className="h-14 text-xl py-2 text-left">
                            Passau
                        </div>
                        <h1 className="font-medium mt-10 text-4xl">Health</h1>
                        <div className="w-2/3 mx-auto">
                            <h2 className="font-medium text-2xl text-left mt-10">Hospitals</h2>
                            <hr className="my-0.5 h-0.5 border-t-0 bg-yellow-500 opacity-500 dark:opacity-50" />
                            
                            {hospitals && hospitals.map((hospital) => (
                                <div key={hospital._id} className="ml-10 text-left border-b border-yellow-500">
                                    <p>{hospital.name}</p>
                                    {hospital.departments && hospital.departments.map((department: any) => (
                                        <div key={department._id} className="ml-4 text-left border-b border-yellow-300">
                                            <p>{department.name}</p>
                                            {department.doctors && department.doctors.map((doctor: any) => (
                                                <div key={doctor._id} className="ml-4 text-left">
                                                    <p>{doctor.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <!-- bottom bar create pdf etc..icons --> */}
                    <IntegreatBottomBar />
                </div>
            </div>
        </>
    )
}