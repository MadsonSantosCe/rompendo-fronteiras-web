export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-muted text-foreground flex flex-col justify-center items-center p-4 font-sans">
        {children}
    </div>
  );
};
