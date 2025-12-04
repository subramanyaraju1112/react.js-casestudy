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

interface EditTaskModalProps {
  title: string;
  description: string;
  onSubmit: (data: { title: string; description: string }) => Promise<any>;
  onClose?: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  title,
  description,
  onSubmit: onSubmitProp,
  onClose,
}) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await onSubmitProp(data);
      toast.success("Task updated successfully");
      onClose?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="pb-5 text-xl text-text-primary border-b dark:text-white">
          Edit Task
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
              <Input placeholder={title} {...form.register("title")} />
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
                placeholder={description}
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
                  onClick={onClose}
                  className="dark:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Updating..." : "Update Task"}
                </Button>
              </>
            </DialogFooter>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};

export default EditTaskModal;
