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
      <div className="max-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm m-4 p-4 shadow-lg rounded-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  {...register("email")}
                  id="email"
                  placeholder="Insert your e-mail"
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
                    className="text-sm text-muted-foreground hover:underline"
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
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <Checkbox id="remember" />
                  <span className="text-muted-foreground">Remember Password</span>
                </label>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-10"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-muted-foreground">
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
