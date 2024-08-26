"use client";
import { useState } from "react";
//bg-sky-200
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { CardContent } from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useCreateTodo } from "./mutations";
import { COLORS } from "./option-validators";

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
function CreateTodo({ selectedDate }: { selectedDate: Date }) {
  const [addTodoModal, setAddTodoModal] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      color: "",
      hours: "",
      minute: "",
      dueDate: selectedDate.toISOString(),
    },
  });

  const { mutate, isPending: isLoading } = useCreateTodo(selectedDate);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { ...values, dueDate: selectedDate.toISOString() },
      {
        onSuccess: () => {
          setAddTodoModal(false);
        },
      }
    );
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
                  disabled={isLoading}
                  className="bg-sky-200 hover:bg-sky-400"
                  type="submit"
                  isLoading={isLoading}
                  loadingText={`${isLoading ? "Adding todo" : "Updating todo"}`}
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
