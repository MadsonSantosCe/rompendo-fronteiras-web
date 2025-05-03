import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth/authServices";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div>
      <ModeToggle />
      <Button className="m-4" onClick={handleSignOut}>
        SignOut
      </Button>
    </div>
  );
};
