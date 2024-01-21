"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Item } from "@radix-ui/react-select"



const data = [
        {
            id: 1,
            name:"sachi",
            availday: "Monday",
            timeslot: "10AM - 4PM",
        },
        {
            id: 2,
            name:"spear",
            availday: "Tuesday",
            timeslot: "11AM - 3PM",
        },
]


export default function SchedulePage() {
    const router = useRouter()

    const deleteSchedule = (id: any) => {
        console.log(id)
    }

    return (
            <div className="w-full">
                <div className="flex items-center">
                    <h1 className="text-xl flex justify-evenly items-center w-[80%] p-4 font-bold mb-10">Schedule</h1> 
                    <Button className="flex gap-2 items-center" onClick={() => router.push("/admin/schedule/create")}>Add New <Icons.add /></Button> 
                </div>

                <div className="flex justify-evenly items-center w-[80%] p-4 mb-10">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-10 pt-7">

                <Table>
                    <TableCaption className="justify-evenly items-center w-[80%] ">A list of doctors availibity.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Avail. Day</TableHead>
                        <TableHead>Time Slot</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {data.map((item, index) =>
                        <TableRow key={index}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.availday}</TableCell>
                                <TableCell>{item.timeslot}</TableCell>
                                <TableCell className="flex space-x-2">
                                        <Button onClick={() => router.push(`/admin/schedule/edit/${item.id}`)}>
                                            <Icons.edit />
                                        </Button>
                                        <Button variant={"destructive"} onClick={() => deleteSchedule(item.id)}>
                                            <Icons.delete />
                                        </Button>
                                </TableCell>
                        </TableRow>

                            )}
                            
                    </TableBody>
                </Table>
                </div>

            </div>
    )
}