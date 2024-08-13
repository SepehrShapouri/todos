"use client";
import React, { useState } from "react";
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
import {useMutation} from "@tanstack/react-query"
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
import { createTodo } from "./actions";
import { toast } from "sonner";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Please add the title of your task",
  }),
  description: z
    .string()
    .min(2, { message: "Please add the description of your task" }),
  hours: z
    .string()
    .min(1, { message: "Please add the due time for your task" }),
  minute: z
    .string()
    .min(1, { message: "Please add the due time for your task" }),
  color: z.string().min(1, { message: "Please add the color of your task" }),
  category: z
    .string()
    .min(2, { message: "Please add the cateogry of your task" }),
    dueDate:z.string().datetime()
});
function CreateTodo({selectedDate}:{selectedDate:Date}) {
  console.log(selectedDate.toISOString())
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      color: "",
      category: "",
      hours: "",
      minute: "",
      dueDate:selectedDate.toISOString()
    },
  });
  
  const [addTodoModal, setAddTodoModal] = useState<boolean>(false);
  const {mutate,isPending:isLoading} = useMutation({
    mutationKey:['add-todo-fn'],
    mutationFn:createTodo,
    onSuccess:(data)=>{
      // setAddTodoModal(false)
      console.log(data)
      toast.success("added new task")
    },
    onError:(err)=>console.log(err)
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await mutate(values)
    console.log(res)
  }
  return (
    <>
      <div className="w-full h-[100px] fixed bottom-10 flex items-center justify-center">
        <span
          className="w-[70px] h-[70px] rounded-full shrink-0 bg-sky-200 flex items-center justify-center hover:bg-blue-300 transition-colors shadow-lg drop-shadow-md"
          onClick={() => setAddTodoModal(true)}
        >
          <PlusIcon className="w-8 h-8 font-extrabold text-white" />
        </span>
      </div>
      <Drawer open={addTodoModal} onClose={()=>setAddTodoModal(false)}>
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
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="description" {...field} />
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
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Task category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {CATEGORIES.map((item) => (
                                  <SelectItem
                                    value={item.value}
                                    className="flex items-center"
                                  >
                                    <p className="flex items-center gap-2">
                                      {<item.icon className="w-3 h-3" />}
                                      {item.title}
                                    </p>
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
              <DrawerFooter>
                <Button className="bg-sky-200 hover:bg-sky-400" type="submit" isLoading={isLoading} loadingText="adding todo">
                  Add
                </Button>
              </DrawerFooter>
            </form>
          </Form>
          <DrawerClose className="pb-8">
                  <Button variant="secondary" className="w-full">
                    Never mind
                  </Button>
                </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateTodo;
