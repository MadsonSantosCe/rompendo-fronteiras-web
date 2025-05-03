import { Button } from "@/components/ui/button";
import { UseAuthentication } from "@/services/auth/authProvider";
import { useSignUp } from "@/services/auth/authServices";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { setAuthData } = UseAuthentication();
  const navigate = useNavigate();
  const { mutateAsync, error } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name  = "John Doe";
    const email = "example@mail.com";
    const password = "123456";

    try {
      const { token, user } = await mutateAsync({ name, email, password });
      setAuthData({ token, user });
      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className="m-4" type="submit">
        SignUp
      </Button>
      {error && <p>Erro ao autenticar</p>}
    </form>
  );
};
