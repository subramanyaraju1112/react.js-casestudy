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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSignUpMutation } from "@/redux/services/authApi";
import { toast } from "sonner";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

const SignUp: React.FC = () => {
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signUp(data).unwrap();
      console.log("SIGN UP SUCCESS:", response);
      toast.success(response?.message || "Account Created Successfully!");
    } catch (err: any) {
      console.error("SIGN UP ERROR:", err);
      const errorMessage = err?.data?.message || err?.error || "Signup failed";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  return (
    <Form {...form}>
      <div className="flex flex-col">
        <img src={logo} alt="logo" width={50} height={50} />
        <div className="py-9">
          <h1 className="text-text-primary text-3xl font-medium">
            Welcome to Task Manager,
          </h1>
          <span className="text-text-secondary text-sm font-medium">
            Please enter your details to create your account.
          </span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        {/* USERNAME */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter username"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <div className="min-h-[18px]">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />

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
                    autoComplete="new-password"
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

        {/* CONFIRM PASSWORD */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  >
                    {showConfirmPassword ? (
                      <EyeSlash size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
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
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </div>

        {/* SIGN IN LINK */}
        <div className="flex gap-1 justify-center items-center">
          <span className="text-text-secondary">Already have an account?</span>
          <Link className="p-0 text-text-theme" to="/signin">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
