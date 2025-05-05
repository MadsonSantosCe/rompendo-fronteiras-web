import { MainLayout } from "@/components/layout/MainLayout";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { mutateAsync, isPending, error } = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    mutateAsync();
    navigate("/login");
  };

  return (
    <MainLayout>
      <div>
        <ModeToggle />
        <Button  disabled={isPending} onClick={handleSignOut}>
          SignOut
        </Button>
        {error && <p>Erro ao sair</p>}
      </div>
    </MainLayout>
  );
};
