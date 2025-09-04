"use client"
import { AuthProvider } from "./contexts/AuthContext";
import { SmoothScrollProvider } from "./contexts/SmoothScrollContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import CustomCursor from "./components/CustomCursor";
import TopLoadingBar from "./components/TopLoadingBar";
import AuthModal from "./components/Auth/AuthModal";
import { useAuth } from "./contexts/AuthContext";

function AppWithProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SmoothScrollProvider>
        <LoadingProvider>
          <AppWithAuth>{children}</AppWithAuth>
        </LoadingProvider>
      </SmoothScrollProvider>
    </AuthProvider>
  );
}

function AppWithAuth({ children }: { children: React.ReactNode }) {
  const { isAuthModalOpen, authModalMode, closeAuthModal } = useAuth();

  return (
    <>
      <CustomCursor />
      <TopLoadingBar />
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AppWithProviders>{children}</AppWithProviders>;
}
