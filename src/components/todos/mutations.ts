import { useSession } from "@/components/Providers/SessionProvider";
import { useToast } from "@/components/ui/use-toast";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteTodos, updateTodo } from "./actions";
import { todoData } from "./createTodo/actions";
import { Todos } from "@prisma/client";

export function useDeleteTodo(keyDate: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: deleteTodos,
    onSuccess: async (deletedTodo) => {
      const queryFilter = {
        queryKey: ["todos", keyDate],
      } satisfies QueryFilters;
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueryData(queryFilter.queryKey, (todos?: todoData[]) => {
        return todos?.filter((todo) => todo.id != deletedTodo.id);
      });

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
      });
      toast({ description: "deleted todo" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "failed to delete the following todo, please try again.",
      });
    },
  });
  return { mutate, isPending };
}

export function useUpdateTodo(keyDate: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-todo"],
    mutationFn: updateTodo,

    onMutate: async ({ completed, id }) => {
      const queryFilter = {
        queryKey: ["todos", keyDate],
      };

      await queryClient.cancelQueries(queryFilter);

      const previousState = queryClient.getQueryData<Todos[]>([
        "todos",
        keyDate,
      ]);

      const previousTodo = previousState?.find((todo) => todo.id === id);

      if (!previousTodo) return previousState;

      const updatedTodo = { ...previousTodo, completed };

      queryClient.setQueryData(queryFilter.queryKey, (todos?: Todos[]) => {
        if (!todos) return [];
        return todos.map((todo) => (todo.id === id ? updatedTodo : todo));
      });

      console.log(previousState);
      return previousState;
    },
    onSuccess: () => {
      toast({ description: "Todo updated." });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "failed to update the following todo, please try again.",
      });
    },
  });
  return { mutate, isPending };
}
