import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { SignUp, SignIn } from "@/pages/auth";
import { Task } from "@/modules/user/pages";
import { CommonLayout } from "@/layouts";

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

        {/* APP LAYOUT */}
        <Route element={<CommonLayout />}>
          {/* NORMAL USER ROUTE */}
          <Route path="/user/task" element={<Task />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
