import { AddTaskModal, TaskCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Add } from "iconsax-reactjs";
import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetTasksQuery, useUpdateTaskMutation } from "@/redux/services/taskApi";
import type { UserTask } from "@/redux/types/userTypes";

const TASKS_PER_PAGE = 6;

const Task: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data, isLoading, isError, error } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  const tasks: UserTask[] = data?.tasks || [];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: any) => {
      const query = search.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.createdAt?.toLowerCase().includes(query)
      );
    });
  }, [search, tasks]);

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const today = new Date().toDateString();

  const errorMessage =
    (error as any)?.data?.message ||
    (error as any)?.error ||
    "Failed to fetch tasks";

  return (
    <section className="flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <span className="text-text-primary text-sm dark:text-white">
          {today}
        </span>
        {/* TOP LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
          {/* LEFT SIDE TEXT */}
          <div className="text-text-primary text-2xl sm:text-3xl leading-tight dark:text-white">
            <h1>Hey {user?.username || "User"},</h1>
            <p>Here’s your To-Do List.</p>
          </div>

          {/* RIGHT SIDE SEARCH + BUTTON */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Input
              placeholder="Search by name, date..."
              className="w-full sm:w-64 text-text-secondary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  className="flex items-center gap-2 justify-center"
                >
                  <Add size={20} className="text-white" />
                  Add Task
                </Button>
              </DialogTrigger>
              {/* Add Task Modal */}
              <AddTaskModal onClose={() => setOpen(false)} />
            </Dialog>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* isLoading */}
        {isLoading && (
          <p className="text-center col-span-full text-text-secondary">
            Fetching Tasks...
          </p>
        )}
        {/* Error */}
        {isError && (
          <p className="text-center col-span-full text-red-500">
            {errorMessage}
          </p>
        )}
        {/* Task Card */}
        {!isLoading &&
          !isError &&
          currentTasks.map((task) => {
            return (
              <TaskCard
                taskId={task._id}
                key={task._id}
                title={task.title}
                description={task.description}
                status={task.status}
                role="user"
                createdOn={task.createdAt}
                onEdit={(data) => updateTask({ id: task._id, ...data }).unwrap()}
                onComplete={() =>
                  updateTask({
                    id: task._id,
                    status: "completed",
                  }).unwrap()
                }
              />
            );
          })}
      </section>

      {/* NO RESULTS MESSAGE */}
      {currentTasks.length === 0 && (
        <p className="text-center text-text-secondary dark:text-white">
          No Tasks Found.
        </p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination className="justify-center mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className="dark:hover:bg-theme dark:text-white"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default Task;
