import { logo, profilePic } from "@/assets";
import { Moon, Sun1 } from "iconsax-reactjs";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-7 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="logo" width={35} height={35} />
          <h1 className="text-text-primary text-xl font-bold">Task Manager</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Sun1 size={24} className="text-white" />
          <Moon size={24} className="text-text-primary hover:cursor-pointer" />
          <img
            src={profilePic}
            alt="profile-pic"
            width={40}
            height={40}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
