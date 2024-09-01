"use server";

import { validateRequest } from "@/lib/validate-request";
import { db } from "../../../db";
import { Todos } from "@prisma/client";
import { todoData } from "./createTodo/actions";

export async function deleteTodos(id: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const todosToDelete = await db.todos.findUnique({ where: { id } });

  if (!todosToDelete) throw Error("todo not found");

  if (todosToDelete.userId !== user.id) throw Error("Unauthorized");

  const deletedTodos = await db.todos.delete({ where: { id } });
  return deletedTodos;
}

export async function updateTodo({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  console.log(completed, id);
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

export async function editTodo(todoData: todoData) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");
  console.log(todoData);
  const todoToEdit = await db.todos.findUnique({
    where: { userId: todoData.userId, id: todoData.id },
  });
  const { color, hours, minute, title, id } = todoData;
  const formattedTime = `${hours}:${minute}`;
  if (!todoToEdit) throw Error("Todo not found");
  const edittedTodo = await db.todos.update({
    where: { userId: todoData.userId, id },
    data: { title, time: formattedTime, color },
  });
  return edittedTodo;
}
