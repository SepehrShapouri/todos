import { useSession } from "@/components/Providers/SessionProvider";
import { useToast } from "@/components/ui/use-toast";
import { QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, todoData } from "./actions";

export function useCreateTodo(keyDate:string) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const {user} = useSession()
    
    const { mutate, isPending } = useMutation({
      mutationKey: ["create-todo"],
      mutationFn: createTodo,
      onSuccess: async (newTodo) => {
        const queryFilter = {
          queryKey: ["todos",keyDate],
        } satisfies QueryFilters;
        await queryClient.cancelQueries(queryFilter);
  
        queryClient.setQueryData(
          queryFilter.queryKey,
          (todos?:todoData[])=>{
            return [newTodo,...(todos || [])]
          }
        );
  
        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
        });
        toast({ description: "Added new post" });
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
  