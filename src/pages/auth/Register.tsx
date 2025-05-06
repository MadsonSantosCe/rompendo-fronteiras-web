import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { useSignUp } from "@/hooks/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = "John Doe";
    const email = "example@mail.com";
    const password = "123456";

    try {
      await mutateAsync({ name, email, password });
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
              Sign up
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full max-w-md">
            <form className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  label="Name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  id="email"
                  name="email"
                  placeholder="john.doe@gmail.com"
                  label="E-mail"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  id="password"
                  name="password"
                  placeholder="insert your password"
                  label="Password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="repeat your password"
                  label="Confirme Password"
                  type="password"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between w-full max-w-md flex-col">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              onClick={handleSubmit}
            >
              Register
            </Button>

            <div className="text-center text-sm text-gray-600 mt-2">
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="text-red-400 hover:text-red-500 font-medium"
              >
                Sign in
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
