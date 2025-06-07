export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh max-w-7xl mx-auto">
      {children}
    </main>
  );
}