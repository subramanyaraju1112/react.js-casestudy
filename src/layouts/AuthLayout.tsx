import { authBG, logoMini } from "@/assets";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
      {/* LEFT SIDE IMAGE - hidden on mobile & tablet */}
      <div className="hidden lg:block lg:col-span-6 relative">
        {/* IMAGE */}
        <img
          src={authBG}
          alt="auth-bg"
          className="h-full w-full object-cover"
        />
        <img
          src={logoMini}
          width={40}
          height={40}
          className="absolute top-20 left-20"
        />
        {/* TEXT OVERLAY */}
        <div className="absolute bottom-6 sm:bottom-10 lg:bottom-20 left-1/2 -translate-x-1/2 w-full px-6 sm:px-10 lg:px-16 text-center lg:text-left">
          <h1 className="text-theme text-2xl sm:text-3xl lg:text-4xl xl:text-4xl">
            Meet Task Manager<span className="text-white">,</span>
          </h1>

          <p className="text-white text-2xl mt-2 sm:mt-4 max-w-sm sm:max-w-xl lg:max-w-3xl">
            Manage tasks, deadlines, and responsibilities with a platform built
            to simplify how you work.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE SIGNUP */}
      <div className="lg:col-span-6 flex items-center justify-center bg-white p-6 sm:p-8">
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
