export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md rounded-lg bg-card p-8  border-2 border-accent shadow-md">
        {children}
      </div>
    </div>
  );
};
