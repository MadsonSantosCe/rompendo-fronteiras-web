import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

  const { mutateAsync, isPending, error } = useSignIn();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await mutateAsync(data);
      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <AuthLayout>
      <div className="max-h-screen flex flex-col">
        <Card className="flex-1 flex items-center justify-center shadow-none border-none">
          <CardHeader className="w-full max-w-md">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Login
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Login to acess your account
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full max-w-md">
            <form className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  {...register("email")}
                  id="email"
                  name="email"
                  placeholder="john.doe@gmail.com"
                  label="E-mail"
                  type="text"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <FormInput
                  {...register("password")}
                  id="password"
                  name="password"
                  placeholder="insert your password"
                  label="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-sm">
                  <Checkbox
                    id="remember"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-500">Remember me</span>
                </span>

                <Link
                  to="/forgot-password"
                  className="text-sm text-red-400 hover:text-red-500 font-medium"
                >
                  Forgot Password
                </Link>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between w-full max-w-md flex-col">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Login
            </Button>

            <div className="text-center text-sm text-gray-600 mt-2">
              <span>Don't have an account? </span>
              <Link
                to="/register"
                className="text-red-400 hover:text-red-500 font-medium"
              >
                Sign up
              </Link>
            </div>
            {error && (
              <p className="text-red-500 text-sm">Erro ao autenticar</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
