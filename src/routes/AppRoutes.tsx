import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { AdminLayout, BaseLayout } from "@/layouts";
import { SignUp, SignIn } from "@/pages/auth";
import { Task } from "@/modules/user/pages";
import { UsersList } from "@/modules/admin/pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* BASE LAYOUT (HEADER + FOOTER) */}
        <Route element={<BaseLayout />}>
          {/* USER FLOW */}
          <Route path="/user/task" element={<Task />} />

          {/* ADMIN FLOW */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/users" element={<UsersList />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
