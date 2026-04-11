"use client";
import { LoadingProvider } from "@/context/LoadingContext";
import { DarkModeProvider } from "@/context/DarkModeContext";
import LoadingScreen from "@/components/layout/LoadingScreen";
import PageTransition from "@/components/layout/PageTransition";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeProvider>
      <LoadingProvider>
        <LoadingScreen />
        <PageTransition>
          <NavbarWrapper />
          <div className="h-16 md:h-20" />
          {children}
          <Footer />
        </PageTransition>
      </LoadingProvider>
    </DarkModeProvider>
  );
}
