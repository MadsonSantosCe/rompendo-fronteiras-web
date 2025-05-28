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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
});

type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

export const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = ({ email }: ForgotPasswordForm) => {
    console.log(email);
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-700 flex items-center justify-center gap-2 dark:text-white">
              Esqueceu a Senha?
            </CardTitle>
            <CardDescription>
              Digite seu e-mail para
              redefinir sua senha.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
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

              <div className="flex justify-center">
                <Button type="submit" className="w-full mt-10" disabled={false}>
                  Enviar e-mail
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-slate-400">
              <span>Lembou da senha? </span>
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
