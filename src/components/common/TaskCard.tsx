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

  return (
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
                <More size={18} className="text-text-primary" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem
                  onClick={onEdit}
                  className="cursor-pointer text-text-primary"
                >
                  <Edit size={16} className="text-text-primary" />
                  Edit Task
                </DropdownMenuItem>
              )}

              {/* MARK COMPLETE – only if not completed */}
              {status !== "completed" && (
                <DropdownMenuItem
                  onClick={onComplete}
                  className="cursor-pointer text-text-primary"
                >
                  <TickCircle className="text-text-primary" size={16} />
                  Mark as Complete
                </DropdownMenuItem>
              )}

              {/* ADMIN ONLY DELETE */}
              {isAdmin && onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="cursor-pointer text-text-danger"
                >
                  <Bag size={16} className=" text-text-danger" />
                  Delete Task
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>

        <p className="text-text-secondary text-sm line-clamp-3 min-h-[72px]">{description}</p>
      </CardContent>

      {/* FOOTER */}
      <CardFooter>
        <p className="text-base font-semibold text-black">
          Created On: {createdOn}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
