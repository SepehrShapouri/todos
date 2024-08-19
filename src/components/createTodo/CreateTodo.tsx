"use client";
import React, { useEffect, useState } from "react";
//bg-sky-200
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { CATEGORIES, COLORS } from "./option-validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { createTodo, todoData, updateTodo } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Please add the title of your task",
  }),
  hours: z
    .string()
    .min(1, { message: "Please add the due time for your task" }),
  minute: z
    .string()
    .min(1, { message: "Please add the due time for your task" }),
  color: z.string().min(1, { message: "Please add the color of your task" }),
  dueDate: z.string().datetime(),
});
function CreateTodo({
  selectedDate,
  initialValues = null,
  id
}: {
  selectedDate: Date;
  initialValues?: todoData | null;
  id?: string
}) {
  const [addTodoModal, setAddTodoModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues == null) return;
    setAddTodoModal(true);
    setIsEdit(true);
  }, [initialValues]);
  console.log(initialValues);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: initialValues?.title || "",
      color: initialValues?.color || "",
      hours: initialValues?.hours || "",
      minute: initialValues?.minute || "",
      dueDate: selectedDate.toISOString(),
    },
    defaultValues: {
      title: initialValues?.title || "",
      color: initialValues?.color || "",
      hours: initialValues?.hours || "",
      minute: initialValues?.minute || "",
      dueDate: selectedDate.toISOString(),
    },
  });

  const { refresh } = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["add-todo-fn"],
    mutationFn: createTodo,
    onSuccess: (data) => {
      setAddTodoModal(false);
      console.log(data);
      toast.success("added new task"), refresh();
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.refetchQueries({ queryKey: ["todos"] });
      form.reset();
    },
    onError: (err) => console.log(err),
  });
  const { mutate: edit, isPending: isEditing } = useMutation({
    mutationKey: ["edit-todo-fn"],
    mutationFn: updateTodo,
    onSuccess: (data) => {
      setAddTodoModal(false);
      console.log(data);
      toast.success("added new task"), refresh();
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.refetchQueries({ queryKey: ["todos"] });
      form.reset();
    },
    onError: (err) => console.log(err),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit && id) {
      const res = await edit({
        todoData: { ...values, dueDate: selectedDate.toISOString() },
        id:id
      });
      return
    }
    const res = await mutate({
      ...values,
      dueDate: selectedDate.toISOString(),
    });
  }
  return (
    <>
      <div className="w-full h-[100px] fixed bottom-8 flex items-center justify-center">
        <span
          className="w-[60px] h-[60px] rounded-full shrink-0 bg-white flex items-center justify-center hover:bg-blue-300 transition-colors shadow-lg"
          onClick={() => setAddTodoModal(true)}
        >
          <PlusIcon className="w-8 h-8 font-extrabold text-sky-200" />
        </span>
      </div>

      <Drawer open={addTodoModal}>
        <DrawerContent className="pb-6">
          <DrawerHeader>
            <DrawerTitle>Add todo</DrawerTitle>
            <DrawerDescription>
              Add a new todo to your list for the due date
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hour</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hours" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 24 }, (_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={i.toString().padStart(2, "0")}
                                    >
                                      {i.toString().padStart(2, "0")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="minute"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minute</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Minutes" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 60 }, (_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={i.toString().padStart(2, "0")}
                                    >
                                      {i.toString().padStart(2, "0")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                              <SelectContent>
                                {COLORS.map((item) => (
                                  <SelectItem value={item.value}>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`h-4 w-4 rounded-full bg-${item.value}`}
                                      />
                                      {item.title}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </div>
              <DrawerFooter className="px-6">
                <Button
                  className="bg-sky-200 hover:bg-sky-400"
                  type="submit"
                  isLoading={isLoading || isEditing}
                  loadingText={`${isLoading ? 'adding todo' : 'Updating todo'}`}
                >
                  Add
                </Button>
              </DrawerFooter>
            </form>
          </Form>
          <DrawerClose className="pb-6 px-6">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setAddTodoModal(false)}
            >
              Never mind
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateTodo;
