export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, #EAB308 0%, transparent 70%)",
        }}
      />
      <main className="relative z-10 w-full">{children}</main>
    </div>
  );
}
