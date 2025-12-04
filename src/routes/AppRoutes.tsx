import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { AdminLayout, BaseLayout } from "@/layouts";
import { SignUp, SignIn } from "@/pages/auth";
import { Task } from "@/modules/user/pages";
import { TasksList, UsersList } from "@/modules/admin/pages";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* AUTH ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>

            {/* USER FLOW */}
            <Route path="/user/task" element={<Task />} />

            {/* ADMIN FLOW */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/all-users" element={<UsersList />} />
                <Route path="/admin/all-users/:userId/tasks" element={<TasksList />} />
              </Route>
            </Route>

          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/signin" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
