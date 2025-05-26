import { AuthLayout } from "@/components/layout/AuthLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyEmail } from "@/hooks/auth/useAuthentication";

const EmailVerifySchema = z.object({
  code: z.string().regex(/^\d{6}$/, {
    message: "O código deve conter apenas 6 números.",
  }),
});

type EmailVerifydata = z.infer<typeof EmailVerifySchema>;

export const EmailVerification = () => {
  const {
    handleSubmit,
    setValue,
    clearErrors,
    watch,    
    formState: { errors },
  } = useForm<EmailVerifydata>({
    resolver: zodResolver(EmailVerifySchema),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  const otp = watch("code") || "";

  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();

  const onSubmit = async ({ code }: EmailVerifydata) => {
    await verifyEmail(code);
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-700 flex items-center justify-center gap-2 dark:text-white">
              Verifique seu e-mail
            </CardTitle>
            <CardDescription>Digite o código de verificação!</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp || ""}
                  onChange={(value) => {
                    setValue("code", value);
                    if (errors.code) clearErrors("code");
                  }}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot className="w-10" key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex justify-center">
                {errors.code && (
                  <p className="text-red-400 text-xs italic pt-1">{errors.code.message}</p>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-50"
                  disabled={otp.length < 6 || isPending}
                >
                  Verificar e-mail
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};
