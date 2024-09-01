"use client";
import { Checkbox } from "../ui/checkbox";
import { useUpdateTodo } from "./mutations";
type CompleteTodoProps = {
  todoId: string;
  keyDate: string;
  completed: boolean;
};
function CompleteTodo({ completed, todoId, keyDate }: CompleteTodoProps) {
  const { mutate, isPending } = useUpdateTodo(keyDate);
  return (
    <Checkbox
      checked={completed}
   
      onCheckedChange={(e)=>mutate({completed:!completed,id:todoId})}
    />
  );
}

export default CompleteTodo;
