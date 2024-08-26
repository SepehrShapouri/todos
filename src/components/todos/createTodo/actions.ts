"use server";

import { validateRequest } from "@/lib/validate-request";
import { revalidatePath } from "next/cache";
import { db } from "../../../../db";
export interface todoData {
  id?:string;
  userId?:string;
  title: string;
  color: string;
  hours: string;
  minute: string;
  dueDate: string;
}

export async function createTodo(todoData:todoData) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");
  const { color, hours, minute, title, dueDate } = todoData;
  const formattedTime = `${hours}:${minute}`;
  const formattedDate = dueDate.split("T")[0];


  const newTodo = await db.todos.create({
    data: {
      color,
      title,
      time: formattedTime,
      userId: user!.id,
      dueDate: formattedDate,
    },
  });
  return newTodo;
}

export async function updateTodo({todoData,id}:{todoData:todoData,id:string}) {
  const result = await validateRequest();
  if (!result) return;
  console.log(result);
  const { color, hours, minute, title, dueDate } = todoData;
  const formattedTime = `${hours}:${minute}`;
  const formattedDate = dueDate.split("T")[0];
  console.log(formattedDate);
  if (!todoData) {
    return { error: "Please complete all the required fields" };
  }
  try {
    const res = await db.todos.update({
      where: { id },      data: {
        color,
        title,
        time: formattedTime,
        userId: result!.user!.id,
        dueDate:formattedDate,
      },
    });
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log(error);
  }
}
