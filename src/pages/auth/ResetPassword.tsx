import { AuthLayout } from "@/components/layout/AuthLayout";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ForgotPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

export const ResetPassword = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const password = watch("password");
  
  const onSubmit = ({ password, confirmPassword }: ForgotPasswordForm) => {
    console.log(password, confirmPassword);
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-700 flex items-center justify-center gap-2 dark:text-white">
              Atualize sua senha
            </CardTitle>
            <CardDescription>Insira sua nova senha abaixo</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
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
                  htmlFor="confirmPassword"
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

              <div className="space-y-2">
                <PasswordStrengthMeter password={password || ""} />
              </div>

              <div className="flex justify-center">
                <Button type="submit" className="w-full mt-5" disabled={false}>
                  Atualizar senha
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-slate-400">
              <span>Lembou da senha? </span>
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
