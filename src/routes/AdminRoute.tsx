import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return <Navigate to="/signin" replace />;
  }

  const user = JSON.parse(userStr);

  if (user?.role !== "admin") {
    return <Navigate to="/user/task" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
