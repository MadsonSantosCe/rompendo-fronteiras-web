export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted px-4 text-foreground">
      <div className="w-full max-w-md rounded-lg p-8">
        {children}
      </div>
    </div>
  );
};
