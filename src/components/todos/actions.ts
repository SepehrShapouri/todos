"use server";

import { validateRequest } from "@/lib/validate-request";
import { db } from "../../../db";

export async function deleteTodos(id: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const todosToDelete = await db.todos.findUnique({ where: { id } });

  if (!todosToDelete) throw Error("todo not found");

  if (todosToDelete.userId !== user.id) throw Error("Unauthorized");

  const deletedTodos = await db.todos.delete({ where: { id } });
  return deletedTodos;
}


export async function updateTodo({id, completed}:{id:string,completed:boolean}) {
  console.log(completed,id)
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  const todoToComplete = await db.todos.findUnique({ where: { id } });
  if (!todoToComplete) throw Error("todo not found");
  const updatedTodo = await db.todos.update({
    where: { userId: user.id, id: todoToComplete.id },
    data: { completed },
  });
  return updatedTodo;
}
