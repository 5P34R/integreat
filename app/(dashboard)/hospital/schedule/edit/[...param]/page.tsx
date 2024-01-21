"use client"
import { useParams } from 'next/navigation'

import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function ScheduleEditPage() {
   
    const params = useParams()
    const id = params.param[0]
    return (
        <div className='w-full'>
            <h1 className='w-[80%] text-xl font-bold'>Edit Schedule {params.param[0]}</h1>

            <div className='flex justify-center items-center h-full flex-col w-[80%]'>

                <h1 className='p-10 flex justify-center items-center w-[80%]'>Edit Schedule</h1>

                <form className='mt-2 space-y-10'>    
                <div>

                    <Label className='p-4'>Enter Day</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Monday</SelectItem>
                                <SelectItem value="banana">Tuesday</SelectItem>
                                <SelectItem value="blueberry">Wednesday</SelectItem>
                                <SelectItem value="grapes">Thursday</SelectItem>
                                <SelectItem value="pineapple">Friday</SelectItem>
                                <SelectItem value="pineapple">Saturday</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                </div>
                <div>
                    <Label className='p-4'>Enter Available Stating Time</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Monday</SelectItem>
                                <SelectItem value="banana">Tuesday</SelectItem>
                                <SelectItem value="blueberry">Wednesday</SelectItem>
                                <SelectItem value="grapes">Thursday</SelectItem>
                                <SelectItem value="pineapple">Friday</SelectItem>
                                <SelectItem value="pineapple">Saturday</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                </div>


                <div>
                    <Label className='p-4'>Enter Available Ending Time</Label>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Monday</SelectItem>
                            <SelectItem value="banana">Tuesday</SelectItem>
                            <SelectItem value="blueberry">Wednesday</SelectItem>
                            <SelectItem value="grapes">Thursday</SelectItem>
                            <SelectItem value="pineapple">Friday</SelectItem>
                            <SelectItem value="pineapple">Saturday</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button className='flex justify-center items-center flex-col w-[80%]'>Submit</Button>
                </form>
            </div>

            
        </div>
        
    )

}