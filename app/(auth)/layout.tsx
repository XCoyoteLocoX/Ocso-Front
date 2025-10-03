import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-orange-200 w-screen h-screen flex flex-col items-center justify-center gap-8">
      <Image
        src="/ocsoLogo.png"
        alt="Logo de Oxxo"
        width={250}
        height={250}
      />
      {children}
    </div>
  );
}
