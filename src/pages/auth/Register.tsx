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
    name: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
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
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-600 flex items-center justify-center gap-2 dark:text-white">Crie sua Conta</CardTitle>
            <CardDescription>Junte-se a nós! É rápido e fácil.</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-400"
                >
                  Nome
                </label>
                <FormInput
                  {...register("name")}
                  id="name"
                  placeholder="Seu nome completo"
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs italic pt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
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
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-400"
                >
                  Senha
                </label>
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

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-400"
                >
                  Confirmar Senha
                </label>
                <FormInput
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs italic pt-1">
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
                {isPending ? "Registrando..." : "Registrar"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-slate-400">
              <span>Já tem uma conta? </span>
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Entrar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
