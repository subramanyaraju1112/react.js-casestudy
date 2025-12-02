import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "../ui/form";

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must not exceed 200 characters"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const AddTaskModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log("Task Added:", data);
    form.reset();
    onClose?.();
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="pb-5 text-xl text-text-primary border-b">
          Add New Task
        </DialogTitle>
        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 pt-5"
          >
            {/* TITLE */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-text-primary">
                Title
              </Label>
              <Input
                placeholder="Enter title of the task..."
                {...form.register("title")}
              />
              {/* ERROR */}
              {form.formState.errors.title && (
                <span className="text-sm text-text-danger">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-1">
              <Label>Description</Label>
              <Textarea {...form.register("description")} rows={4} placeholder="Enter description..."/>
              {form.formState.errors.description && (
                <p className="text-sm text-text-danger">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* FOOTER BUTTONS */}
            <DialogFooter className="flex justify-end">
              <>
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Adding..." : "Add Task"}
                </Button>
              </>
            </DialogFooter>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddTaskModal;
