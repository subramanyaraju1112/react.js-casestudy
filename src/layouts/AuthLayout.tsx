import { SignIn, SignUp } from "../pages/auth";

const AuthLayout: React.FC = () => {
  return (
    <section>
      <SignUp />
      <SignIn />
    </section>
  );
};

export default AuthLayout;
