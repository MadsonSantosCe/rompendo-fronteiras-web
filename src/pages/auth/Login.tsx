import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = "example@mail.com";
    const password = "123456";

    try {
      await mutateAsync({ email, password });
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
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                <p className="text-gray-500 text-sm">
                  Login to access your account
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value="••••••••••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                    <button
                      type="button"
                      disabled={isPending}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <EyeOff className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded text-blue-600"
                    />
                    <span className="text-gray-500">Remember me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm text-red-400 hover:text-red-500 font-medium"
                  >
                    Forgot Password
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  onClick={handleSubmit}
                >
                  Login
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
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
              </form>
            </div>
          </div>
        </main>
      </div>
    </AuthLayout>
  );
};
