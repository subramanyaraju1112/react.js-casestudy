import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import {SignUp,SignIn  }from "@/pages/auth";

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

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
