"use client";
import { LoadingProvider } from "@/context/LoadingContext";
import { DarkModeProvider } from "@/context/DarkModeContext";
import LoadingScreen from "@/component/ui/LoadingScreen";
import PageTransition from "@/component/ui/PageTransition";
import NavbarWrapper from "@/component/layout/NavbarWrapper";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      <LoadingProvider>
        <LoadingScreen />
        <PageTransition>
          <NavbarWrapper />
          {children}
        </PageTransition>
      </LoadingProvider>
    </DarkModeProvider>
  );
}
