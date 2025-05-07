import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useSignUp } from "@/hooks/auth/useAuth";
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

const RegisterFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof RegisterFormSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const handleFormSubmit = async (data: RegisterForm) => {
    await mutateAsync(data);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center bg-card shadow-sm rounded-lg">
        <Card className="w-full max-w-md m-4 border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Register</CardTitle>
            <CardDescription className="text-sm text-gray-500">
            Create your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  {...register("name")}
                  id="name"
                  placeholder="John Doe"
                  label="Name"
                  type="text"
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                <FormInput
                  {...register("password")}
                  id="password"
                  placeholder="Insert your password"
                  label="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <FormInput
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="Repeat your password"
                  label="Confirm Password"
                  type="password"
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="text-white w-full h-10"
                onClick={handleSubmit(handleFormSubmit)}
              >
                Register
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-muted-foreground">
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
