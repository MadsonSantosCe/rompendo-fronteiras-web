import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending ,error } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name  = "John Doe";
    const email = "example@mail.com";
    const password = "123456";

    try {
      await mutateAsync({ name, email, password });
      navigate("/");
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className="m-4" disabled={isPending} type="submit">
        SignUp
      </Button>
      {error && <p>Erro ao autenticar</p>}
    </form>
  );
};
