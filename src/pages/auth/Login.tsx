import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useSignIn } from "@/hooks/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { mutateAsync, isPending } = useSignIn();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: LoginFormData) => {
    await mutateAsync(data);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="max-h-screen flex flex-col">
        <Card className="flex-1 flex items-center justify-center shadow-none border-none bg-card text-foreground">
          <CardHeader className="w-full max-w-md">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent className="w-full max-w-md">
            <form className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  {...register("email")}
                  id="email"
                  placeholder="john.doe@gmail.com"
                  label="E-mail"
                  type="text"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-muted-foreground hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <FormInput
                  {...register("password")}
                  id="password"
                  placeholder="Insert your password"
                  type="password"
                />

                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-sm">
                  <Checkbox id="remember" />
                  <span className="text-muted-foreground">Remember Password</span>
                </span>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between w-full max-w-md flex-col">
            <Button
              type="submit"
              disabled={isPending}
              className="w-70 h-10 text-white cursor-pointer rounded-md"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <span>Don't have an account? </span>
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
