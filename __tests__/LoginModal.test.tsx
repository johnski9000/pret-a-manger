jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(() =>
        Promise.resolve({
          data: { session: null },
          error: null,
        })
      ),
      signInWithOAuth: jest.fn(() =>
        Promise.resolve({
          data: { url: "https://mock-oauth-url.com" },
          error: null,
        })
      ),
      signInWithPassword: jest.fn(() =>
        Promise.resolve({
          data: { user: null, session: null },
          error: null,
        })
      ),
      signUp: jest.fn(() =>
        Promise.resolve({
          data: { user: null, session: null },
          error: null,
        })
      ),
      signOut: jest.fn(() =>
        Promise.resolve({
          error: null,
        })
      ),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  })),
}));

const mockOpenLoginModal = jest.fn();
const mockCloseLoginModal = jest.fn();
let mockLoginModalOpened = false;

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    loginModalOpened: mockLoginModalOpened,
    openLoginModal: mockOpenLoginModal,
    closeLoginModal: mockCloseLoginModal,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginModal from "@/components/LoginModal/LoginModal";
import React from "react";
import { MantineProvider } from "@mantine/core";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe("LoginModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoginModalOpened = false;
  });

  test("renders base flow with Google and Email sign-in options", async () => {
    mockLoginModalOpened = true;
    renderWithProviders(<LoginModal />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with email/i })
    ).toBeInTheDocument();
  });

  test("displays correct title for each flow state", async () => {
    mockLoginModalOpened = true;
    renderWithProviders(<LoginModal />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", { name: /welcome back!/i })
    ).toBeInTheDocument();

    const emailLoginButton = screen.getByRole("button", {
      name: /sign in with email/i,
    });
    await userEvent.click(emailLoginButton);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /sign in with email/i })
      ).toBeInTheDocument();
    });

    const signUpLink = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(signUpLink);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /create account/i })
      ).toBeInTheDocument();
    });
  });

  test("shows back button only when not in base flow", async () => {
    mockLoginModalOpened = true;
    renderWithProviders(<LoginModal />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const backButton = screen.getByTestId("back-button");

    expect(backButton).toHaveStyle({ visibility: "hidden" });

    const emailLoginButton = screen.getByRole("button", {
      name: /sign in with email/i,
    });
    await userEvent.click(emailLoginButton);

    await waitFor(() => {
      expect(backButton).toHaveStyle({ visibility: "visible" });
    });
  });

  test("modal is not rendered when loginModalOpened is false", () => {
    mockLoginModalOpened = false;
    renderWithProviders(<LoginModal />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("modal is rendered when loginModalOpened is true", async () => {
    mockLoginModalOpened = true;
    renderWithProviders(<LoginModal />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(screen.getByAltText(/pret a manger logo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /welcome back!/i })
    ).toBeInTheDocument();
  });
});
