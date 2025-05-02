import { UseAuthentication } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const { signIn } = UseAuthentication();

  const handleSignIn = () => {
    signIn("user@email.com", "123456");
  };

  return (
    <div>
      <Button className="m-4" onClick={handleSignIn}>SignIn</Button>
    </div>
  );
};
