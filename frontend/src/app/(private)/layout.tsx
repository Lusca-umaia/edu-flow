import React from "react";
import Navbar from "@/components/UI/Navbar/Navbar";
import { UsuarioProvider } from "@/context/UserContext/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-lg:flex-col">
      <UsuarioProvider>
        <Navbar />
        <div className="p-8 max-md:p-3 w-full max-lg:mt-10">{children}</div>
      </UsuarioProvider>
    </div>
  );
}
