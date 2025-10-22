"use client";
import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { BasketProvider } from "@/context/BasketContext";
import { LoadingOverlay } from "@mantine/core";
import LoginModal from "@/components/LoginModal/LoginModal";

function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  return (
    <>
      <LoadingOverlay visible={loading} />
      {children}
    </>
  );
}

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BasketProvider>
        <LoadingWrapper>
          <LoginModal />
          {children}
        </LoadingWrapper>
      </BasketProvider>
    </AuthProvider>
  );
}

export default ContextProvider;
