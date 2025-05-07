export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted text-foreground">
      <div className="w-full max-w-md p-4">
        {children}
      </div>
    </div>
  );
};
