'use server'

import { db } from "../../db"

export async function getTodos(date:string){
    console.log(date)
    const todos = await db.todos.findMany({where:{dueDate:date}})
    console.log(todos)
    return todos
}