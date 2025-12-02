import { AddTaskModal } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Add } from "iconsax-reactjs";
import { useState } from "react";
import { users } from "@/constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserCard } from "../components";

const USERS_PER_PAGE = 12;

const UsersList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const indexOfLastTask = currentPage * USERS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstTask, indexOfLastTask);
  return (
    <section className="flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <span className="text-text-primary text-sm">Mon, Jun 07</span>
        {/* TOP LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
          {/* LEFT SIDE TEXT */}
          <div className="text-text-primary text-2xl sm:text-3xl leading-tight">
            <h1>Hey Johnathan,</h1>
            <p>Here’s your To-Do List.</p>
          </div>

          {/* RIGHT SIDE SEARCH + BUTTON */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Input
              placeholder="Search by name, date..."
              className="w-full sm:w-64 text-text-secondary"
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
        {currentUsers.map((user) => {
          return (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              onClick={() => console.log("User clicked")}
            />
          );
        })}
      </section>
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

export default UsersList;
