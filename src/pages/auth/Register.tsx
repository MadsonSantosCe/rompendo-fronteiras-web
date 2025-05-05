import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-gray-800">Sign up</h1>
              <p className="text-sm text-gray-600">Create your account</p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-12 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@gmail.com"
                  className="h-12 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 border border-gray-300"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Sign up
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
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
          </div>
        </main>
      </div>
    </AuthLayout>
  );
};
