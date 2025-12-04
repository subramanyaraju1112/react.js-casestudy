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
import { useAddTaskMutation } from "@/redux/services/taskApi";
import { useAddUserTaskMutation } from "@/redux/services/adminApi";
import { toast } from "sonner";

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

type AddTaskProps = {
  userId?: string;
  onClose?: () => void;
};

const AddTaskModal: React.FC<AddTaskProps> = ({ userId, onClose }) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [addTask] = useAddTaskMutation();
  const [addUserTask] = useAddUserTaskMutation();

  const onSubmit = async (data: TaskFormValues) => {
    try {
      let response;
      if (userId) {
        response = await addUserTask({ userId, ...data }).unwrap();
      } else {
        response = await addTask(data).unwrap();
      }
      toast.success(response.message || "Task Added Successfully");
      form.reset();
      onClose?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed To Create Task");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="pb-5 text-xl text-text-primary dark:text-white border-b">
          {userId ? "Add Task for User" : "Add New Task"}
        </DialogTitle>
        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 pt-5"
          >
            {/* TITLE */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-text-primary dark:text-white">
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
              <Textarea
                {...form.register("description")}
                rows={4}
                placeholder="Enter description..."
              />
              {form.formState.errors.description && (
                <p className="text-sm text-text-danger">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* FOOTER BUTTONS */}
            <DialogFooter className="flex justify-end">
              <>
                <Button
                  variant="outline"
                  type="button"
                  className="dark:text-white"
                  onClick={onClose}
                >
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
