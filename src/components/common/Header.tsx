import { logo, profilePic } from "@/assets";
import { LogoutCurve, Moon, Sun1 } from "iconsax-reactjs";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/services/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/auth/sign-in");
    } catch (err: any) {
      toast.error("Logout failed");
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-text-primary">
      <div className="max-w-7xl mx-auto px-4 py-7 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="logo" width={35} height={35} />
          <h1 className="text-text-primary text-xl font-bold dark:text-white">
            Task Manager
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          {theme === "dark" ? (
            <Sun1
              size={20}
              className="text-white hover:cursor-pointer"
              onClick={() => setTheme("light")}
            />
          ) : (
            <Moon
              size={20}
              className="text-text-primary hover:cursor-pointer"
              onClick={() => setTheme("dark")}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={profilePic}
                alt="profile-pic"
                width={40}
                height={40}
                className="hover:cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="start">
              <DropdownMenuItem onClick={handleLogout}>
                <LogoutCurve size={20} className="text-text-danger" />
                <span className="text-text-danger">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
