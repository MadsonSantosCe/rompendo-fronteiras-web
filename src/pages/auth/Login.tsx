import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
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
import { useAuthStore } from "@/lib/zustand/authStore";

const LoginFormSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
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

  const {signIn, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const handleFormSubmit = async ({email, password}: LoginFormData) => {
    await signIn(email, password);
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-700 flex items-center justify-center gap-2 dark:text-white">Bem-vindo de Volta!</CardTitle>
            <CardDescription>Acesse sua conta para continuar.</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6">
              <div className="space-y-2">
              <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-400"
                  >
                    E-mail
                  </label>
                <FormInput
                  {...register("email")}
                  id="email"
                  placeholder="seuemail@exemplo.com"
                  type="email"
                />
                
                {errors.email && (
                  <p className="text-red-400 text-xs italic pt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-400"
                  >
                    Senha
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <FormInput
                  {...register("password")}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
                
                {errors.password && (
                  <p className="text-red-400 text-xs italic pt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <Checkbox id="remember" />
                  <span className="text-slate-400 select-none">Lembrar-me</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="text-white w-full h-10"
                onClick={handleSubmit(handleFormSubmit)}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-slate-400">
              <span>Não tem uma conta? </span>
              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
