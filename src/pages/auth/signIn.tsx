import { logo } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Eye, EyeSlash } from "iconsax-reactjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "@/redux/services/authApi";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signIn(data).unwrap();
      console.log("SIGN IN SUCCESS:", response);

      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      toast.success(response?.message || "Login Successful");

      const role = response?.user?.role;

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/task");
        }
      }, 800);
    } catch (err) {
      console.error("SIGN IN ERROR:", err);

      let errorMessage = "Sign In failed";
      if (typeof err === "object" && err !== null && "data" in err) {
        errorMessage =
          (err as any)?.data?.message ||
          (err as any)?.error ||
          "Invalid credentials";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col">
        <img src={logo} alt="logo" width={50} height={50} />
        <div className="py-9">
          <h1 className="text-text-primary text-3xl font-medium">
            Welcome to Task Manager,
          </h1>
          <span className="text-text-secondary text-sm font-medium">
            Please enter your details to login.
          </span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <div className="min-h-[18px]">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        {/* PASSWORD */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <div className="min-h-[18px]">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

        {/* SUBMIT BUTTON */}
        <div className="py-9">
          <Button className="w-full" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        {/* SIGN UP LINK */}
        <div className="flex gap-1 justify-center items-center">
          <span className="text-text-secondary">Don’t have an account?</span>
          <Link className="p-0 text-text-theme" to="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
