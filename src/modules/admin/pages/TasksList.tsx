import { AddTaskModal, TaskCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Add, ArrowLeft } from "iconsax-reactjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tasks } from "@/constants";

const TASKS_PER_PAGE = 6;

const TasksList: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.createdOn.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  return (
    <section className="flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <div
          className="flex gap-2 items-center hover:cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} className="text-text-primary dark:text-white" />
          <span className="text-text-primary text-md dark:text-white">
            Go Back
          </span>
        </div>
        {/* TOP LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
          {/* LEFT SIDE TEXT */}
          <div className="text-text-primary text-2xl sm:text-3xl leading-tight dark:text-white">
            <h1>Task List of Johnathan</h1>
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
        {currentTasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              role="admin"
              createdOn={task.createdOn}
              onEdit={() => console.log("Edit", task.id)}
              onComplete={() => console.log("Complete", task.id)}
              onDelete={() => console.log("Delete", task.id)}
            />
          );
        })}
      </section>
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
                  className=" hover:bg-theme dark:text-white"
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
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

export default TasksList;
