import { Button } from "@/components/ui/button";
import { UseAuthentication } from "@/services/auth/authProvider";
import { useSignIn } from "@/services/auth/authServices";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  
  const navigate = useNavigate();
  const { setAuthData } = UseAuthentication();
  const { mutateAsync, error } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = "example@mail.com";
    const password = "123456";

    try {
      const { token, user } = await mutateAsync({ email, password });
      setAuthData({ token, user });
      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className="m-4" type="submit">
        SignIn
      </Button>
      {error && <p>Erro ao autenticar</p>}
    </form>
  );
}
