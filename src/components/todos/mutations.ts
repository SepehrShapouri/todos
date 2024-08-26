import { useSession } from "@/components/Providers/SessionProvider";
import { useToast } from "@/components/ui/use-toast";
import { QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodos } from "./actions";
import { todoData } from "./createTodo/actions";

export function useDeleteTodo(selectedDate:Date) {
    const { toast } = useToast();
    const queryClient = useQueryClient();    
    const { mutate, isPending } = useMutation({
      mutationKey: ["delete-todo"],
      mutationFn: deleteTodos,
      onSuccess: async (deletedTodo) => {
        const queryFilter = {
          queryKey: ["todos",selectedDate],
        } satisfies QueryFilters;
        await queryClient.cancelQueries(queryFilter);
  
        queryClient.setQueryData(
          queryFilter.queryKey,
          (todos?:todoData[])=>{
            return todos?.filter((todo)=>todo.id != deletedTodo.id)
          }
        );
  
        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
        });
        toast({ description: "deleted todo" });
      },
      onError: () => {
        toast({
          variant: "destructive",
          description: "failed to add new post, please try again.",
        });
      },
    });
    return { mutate, isPending };
  }
  