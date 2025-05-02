import { UseAuthentication } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const { signIn } = UseAuthentication();

  const handleSignIn = () => {
    signIn("test@teste.com", "1234567");
  };

  return (
    <div>
      <Button className="m-4" onClick={handleSignIn}>SignIn</Button>
    </div>
  );
};
