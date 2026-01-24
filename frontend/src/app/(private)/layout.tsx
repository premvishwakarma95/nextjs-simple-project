import AuthWrapper from "@/components/AuthWrapper";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
