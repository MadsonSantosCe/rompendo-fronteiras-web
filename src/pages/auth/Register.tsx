import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/auth/useAuth";
import { EyeOff } from "lucide-react";
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
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john.doe@gmail.com"
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="********"
                  />
                  <Button
                    type="button"
                    disabled={false}
                    className="absolute inset-y-0 right-1 flex items-center justify-center p-0 text-gray-500 bg-transparent hover:bg-transparent"
                  >
                    <EyeOff className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="********"
                  />
                  <Button
                    type="button"
                    disabled={false}
                    className="absolute inset-y-0 right-1 flex items-center justify-center p-0 text-gray-500 bg-transparent hover:bg-transparent"
                  >
                    <EyeOff className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-10 mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={handleSubmit}
              >
                Login
              </Button>

              <div className="text-center text-sm text-gray-600">
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
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};
