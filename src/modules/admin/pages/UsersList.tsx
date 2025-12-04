import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserCard } from "../components";
import { useGetUsersQuery } from "@/redux/services/adminApi";
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 12;

const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUsersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const users = data?.users || [];
  console.log("USERS LIST", users);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const today = new Date().toDateString();

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
            <h1>Hey {loggedInUser?.username || "User"},</h1>
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
        {/* LOADING */}
        {isLoading && (
          <p className="text-center text-text-secondary">Fetching Users...</p>
        )}

        {/* ERROR */}
        {isError && (
          <p className="text-center text-red-500">Failed to fetch users.</p>
        )}
        {!isLoading &&
          !isError &&
          currentUsers.map((user) => {
            return (
              <UserCard
                key={user._id}
                username={user.username}
                email={user.email}
                onClick={() => navigate(`/admin/all-users/${user._id}/tasks`)}
              />
            );
          })}
        {filteredUsers.length === 0 && !isLoading && (
          <p className="text-center text-text-secondary">No Users Found.</p>
        )}
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
