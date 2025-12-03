import { Input } from "@/components/ui/input";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <section className="flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <span className="text-text-primary text-sm dark:text-white">
          Mon, Jun 07
        </span>
        {/* TOP LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
          {/* LEFT SIDE TEXT */}
          <div className="text-text-primary text-2xl sm:text-3xl leading-tight dark:text-white">
            <h1>Hey Johnathan,</h1>
            <p>Here’s your To-Do List.</p>
          </div>

          {/* RIGHT SIDE SEARCH + BUTTON */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Input
              placeholder="Search by name or email..."
              className="w-full sm:w-64 text-text-secondary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
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
                  className="hover:bg-theme dark:text-white"
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
