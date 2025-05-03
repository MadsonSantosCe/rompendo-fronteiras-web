import { UseAuthentication } from "@/services/auth/authProvider";
import { Button } from "@/components/ui/button";

export const Register = () => {
  const { signUp } = UseAuthentication();

  const handleSignUp = () => {
    signUp("teste", "test@teste.com", "1234567");
  };

  return (
    <div>
      <Button className="m-4" onClick={handleSignUp}>
        SignUp
      </Button>
    </div>
  );
};
