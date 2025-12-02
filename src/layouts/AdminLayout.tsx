import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   if (user?.role !== "admin") {
//     return <Navigate to="/signin" replace />;
//   }

  return <Outlet />;
};

export default AdminLayout;
