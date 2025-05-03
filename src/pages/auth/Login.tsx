import { Button } from "@/components/ui/button";
import { useSignIn } from "@/services/auth/authServices";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  
  const navigate = useNavigate();
  const { mutateAsync, isPending ,error } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = "example@mail.com";
    const password = "123456";

    try {
      await mutateAsync({ email, password });
      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className="m-4" disabled={isPending} type="submit">
        SignIn
      </Button>
      {error && <p>Erro ao autenticar</p>}
    </form>
  );
}
