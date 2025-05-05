export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f3f3",
      }}
    >
      <div
        style={{ background: "white", padding: "2rem", borderRadius: "8px" }}
      >
        {children}
      </div>
    </div>
  );
};
