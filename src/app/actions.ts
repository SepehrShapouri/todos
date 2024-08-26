"use server";

import { validateRequest } from "@/lib/validate-request";
import { db } from "../../db";

export async function getTodos(date: string) {
  const user = await validateRequest();
  const todos = await db.todos.findMany({
    where: { dueDate: date, userId: user!.user?.id },
    orderBy: { createdAt: "desc" },
  });
  console.log(todos);
  return todos;
}

export async function getSingleTodo(todoId: string) {
  const user = await validateRequest();
  if (!user) throw Error("unauthenticated");
  const todo = await db.todos.findUnique({
    where: { id: todoId, userId: user?.user?.id },
  });
  return todo;
}
