/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/zustand/authStore";
import { FullPageLoader } from "@/components/FullPageLoader";

export const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (otp.length === 6) {
      verifyEmailFn(otp);
    }
  }, [otp]);

  const verifyEmailFn = async (code: string) => {
    const result = await verifyEmail(code);
    if (result) navigate("/");
  };

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <AuthLayout>
      <div className="flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-700 flex items-center justify-center gap-2 dark:text-white">
              Verifique seu e-mail
            </CardTitle>
            <CardDescription>digite o código de verificação!</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-slate-400"></div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};
