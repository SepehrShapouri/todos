"use server";

import { Todos } from "@prisma/client";
import { db } from "../../../db";
import { validateRequest } from "@/lib/validate-request";
interface todoData {
  category: string;
  title: string;
  description: string;
  color: string;
  hours: string;
  minute: string;
  dueDate: string;
}
export async function createTodo(todoData: todoData) {
  const result = await validateRequest();
  if (!result) return;
  console.log(result);
  const { category, color, hours, minute, description, title, dueDate } =
    todoData;
  const formattedTime = `${hours}:${minute}`;
  const formattedDate = dueDate.split('T')[0]
  console.log(formattedDate)
  if (!todoData) {
    return { error: "Please complete all the required fields" };
  }
  try {
    const res = await db.todos.create({
      data: {
        category,
        color,
        title,
        time: formattedTime,
        description,
        userId: result!.user!.id,
        dueDate:formattedDate,
      },
    });
   return res
  } catch (error) {
    console.log(error);
  }
}
