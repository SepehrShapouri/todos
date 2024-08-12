'use server'

import { Todos } from "@prisma/client";
import { db } from "../../../db"
import { validateRequest } from "@/lib/validate-request";
interface todoData {
    category:string;
    title:string;
    description:string;
    color:string;
    time:{hour:string,minutes:string},
    dueDate:Date
}
export async function createTodo(todoData:todoData){
    const result = await validateRequest()
    if(!result) return
    console.log(result)
    const {category,color,time,description,title,dueDate} = todoData
    const formattedTime = `${time!.hour}:${time!.minutes}`
if(!todoData){
    return {error:"Please complete all the required fields"}
}
try {
  const res =   await db.todos.create({data:{category,color,title,time:formattedTime,description,userId:result!.user!.id,dueDate}})
  console.log(res)
} catch (error) {
    console.log(error)
}
}