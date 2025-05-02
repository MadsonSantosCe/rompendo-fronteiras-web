import { UseAuthentication } from "@/services/auth/AuthProvider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const Home = () => {
  const { signOut } = UseAuthentication();

  const handleSignOut = () => {
    signOut();
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
