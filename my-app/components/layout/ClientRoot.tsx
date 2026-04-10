"use client";
import { LoadingProvider } from "@/context/LoadingContext";
import { DarkModeProvider } from "@/context/DarkModeContext";
import LoadingScreen from "@/components/layout/LoadingScreen";
import PageTransition from "@/components/layout/PageTransition";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

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
