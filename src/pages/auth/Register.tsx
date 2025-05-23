import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Link } from "react-router-dom";
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
import { useSignUp } from "@/hooks/auth/useAuthentication";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { mutateAsync: signUp, isPending } = useSignUp();

  const handleFormSubmit = async ({ name, email, password }: RegisterForm) => {
    await signUp({ name, email, password });
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-700 flex items-center justify-center gap-2 dark:text-white">
              Crie sua Conta
            </CardTitle>
            <CardDescription>Junte-se a nós! É rápido e fácil.</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-400">
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
                <label htmlFor="email" className="text-sm font-medium text-slate-400">
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
                <label htmlFor="password" className="text-sm font-medium text-slate-400">
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
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-400">
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

              <Button type="submit" className="text-white w-full h-10" disabled={isPending}>
                Cadastrar
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-slate-400">
              <span>Já tem uma conta? </span>
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Entrar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
