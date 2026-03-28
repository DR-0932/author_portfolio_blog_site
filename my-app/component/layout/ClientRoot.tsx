"use client";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/component/ui/LoadingScreen";
import NavbarWrapper from "@/component/layout/NavbarWrapper";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <NavbarWrapper />
      {children}
    </LoadingProvider>
  );
}
