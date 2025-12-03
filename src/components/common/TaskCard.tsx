import { Bag, Edit, More, TickCircle } from "iconsax-reactjs";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog } from "../ui/dialog";
import EditTaskModal from "./EditTaskModal";
import { useState } from "react";

export type TaskStatus = "pending" | "completed";
export type UserRole = "admin" | "user";

interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
  role: UserRole;
  createdOn: string;

  onEdit?: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
}

const statusColorMap: Record<TaskStatus, string> = {
  pending: "text-text-warning",
  completed: "text-text-success",
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  role,
  createdOn,
  onEdit,
  onComplete,
  onDelete,
}) => {
  const isAdmin = role === "admin";
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* ✅ DIALOG MOVED OUTSIDE MENU */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <EditTaskModal onClose={() => setIsDialogOpen(false)} />
      </Dialog>

      <Card className="w-full flex flex-col gap-4 rounded-xl shadow-sm">
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center justify-between">
          {/* STATUS */}
          <span
            className={`text-sm font-semibold tracking-widest uppercase ${statusColorMap[status]}`}
          >
            {status}
          </span>

          {/* ACTION MENU */}
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 focus:outline-none hover:cursor-pointer">
                  <More
                    size={18}
                    className="text-text-primary dark:text-white"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {/* ✅ OPEN DIALOG VIA STATE */}
                {onEdit && (
                  <DropdownMenuItem
                    className="cursor-pointer text-text-primary dark:text-white"
                    onClick={() => {
                      setIsDialogOpen(true);
                      onEdit(); // optional side-effect
                    }}
                  >
                    <Edit
                      size={16}
                      className="text-text-primary dark:text-white"
                    />
                    Edit Task
                  </DropdownMenuItem>
                )}

                {/* MARK COMPLETE */}
                {status !== "completed" && (
                  <DropdownMenuItem
                    onClick={onComplete}
                    className="cursor-pointer text-text-primary dark:text-white"
                  >
                    <TickCircle
                      size={16}
                      className="text-text-primary dark:text-white"
                    />
                    Mark as Complete
                  </DropdownMenuItem>
                )}

                {/* ADMIN DELETE */}
                {isAdmin && onDelete && (
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="cursor-pointer text-text-danger"
                  >
                    <Bag size={16} className="text-text-danger" />
                    Delete Task
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-text-primary dark:text-white">
            {title}
          </h2>

          <p className="text-text-secondary text-sm line-clamp-3 min-h-[72px] dark:text-text-gray">
            {description}
          </p>
        </CardContent>

        {/* FOOTER */}
        <CardFooter>
          <p className="text-base font-semibold text-black dark:text-white">
            Created On: {createdOn}
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;

