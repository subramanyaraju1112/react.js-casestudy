import { profilePic } from "@/assets";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { ArrowRight2 } from "iconsax-reactjs";

type UserCardProps = {
  name: string;
  email: string;
  onClick?: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ name, email, onClick }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex gap-2 items-center">
          <img src={profilePic} alt="profile-pic" width={50} height={50} />
          <div>
            <h1 className="text-text-primary text-xl font-semibold dark:text-white">{name}</h1>
            <span className="text-text-secondary text-sm dark:text-text-gray">{email}</span>
          </div>
        </div>
        <CardAction>
          <button
            type="button"
            className="p-2 hover:cursor-pointer transition"
            aria-label="View User"
            onClick={onClick}
          >
            <ArrowRight2 size={22} className="text-text-primary dark:text-white" />
          </button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
