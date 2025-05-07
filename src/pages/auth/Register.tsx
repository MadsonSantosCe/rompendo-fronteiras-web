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

const RegisterFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof RegisterFormSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const handleFormSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    clearErrors("confirmPassword");
    await mutateAsync(data);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="max-h-screen flex flex-col">
        <Card className="flex-1 flex items-center justify-center shadow-none border-none bg-card text-foreground">
          <CardHeader className="w-full max-w-md">
            <CardTitle className="text-3xl font-bold">Sign up</CardTitle>
            <CardDescription>
              Create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full max-w-md">
            <form className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  {...register("name")}
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  label="Name"
                  type="text"
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>
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
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <FormInput
                  {...register("password")}
                  id="password"
                  name="password"
                  placeholder="Insert your password"
                  label="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <FormInput
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  label="Confirm Password"
                  type="password"
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between w-full max-w-md flex-col">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-10 cursor-pointer text-white rounded-md"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Register
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
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
