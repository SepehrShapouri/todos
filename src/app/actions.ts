"use server";

import { db } from "../../db";

export async function getTodos(date: string) {
  console.log(date);
  const todos = await db.todos.findMany({ where: { dueDate: date } });
  console.log(todos);
  return todos;
}
export async function hanleTodoState({
  state,
  id,
}: {
  state: boolean;
  id: string;
}) {
  const updatedTodo = await db.todos.update({
    where: { id },
    data: {
      completed: state,
    },
  });
  console.log(updatedTodo);
  return updatedTodo;
}
export async function deleteTodo(id: string) {
  const deletedTodo = await db.todos.delete({ where: { id } });
  return deletedTodo
}
