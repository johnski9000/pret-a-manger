"use client";
import {
  Modal,
  Button,
  ActionIcon,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { MdKeyboardBackspace } from "react-icons/md";

type FlowState = "base" | "email-login" | "email-register";

function LoginModal() {
  const { loginModalOpened, openLoginModal, closeLoginModal } = useAuth();
  console.log(loginModalOpened);
  const [flowState, setFlowState] = useState<FlowState>("base");
  const [direction, setDirection] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logo = "/pret-a-manger-logo.png";
  const emailLogo = "/email-icon.jpeg";
  const googleLogo = "/google-icon.png";
  const supabase = createClient();

  const resetForm = () => {
    setEmailInput("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setLoading(false);
  };

  const handleClose = () => {
    closeLoginModal(); // Use the context function instead of local close
    setTimeout(() => {
      setFlowState("base");
      resetForm();
    }, 200);
  };
  const isModalOpen = () => {
    return loginModalOpened;
  };
  const navigateToFlow = (newFlow: FlowState) => {
    if (
      flowState === "base" &&
      (newFlow === "email-login" || newFlow === "email-register")
    ) {
      setDirection(1);
    } else if (
      (flowState === "email-login" || flowState === "email-register") &&
      newFlow === "base"
    ) {
      setDirection(-1);
    } else if (flowState === "email-login" && newFlow === "email-register") {
      setDirection(1);
    } else if (flowState === "email-register" && newFlow === "email-login") {
      setDirection(-1);
    }
    setFlowState(newFlow);
  };

  const signInGoogle = async () => {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    console.log(data);
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("Signed in:", data);
      handleClose();
    }
  };

  const signUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("Signed up:", data);
      setError("Check your email to confirm your account!");
      setTimeout(() => handleClose(), 2000);
    }
  };

  const handleBack = () => {
    if (flowState === "email-login" || flowState === "email-register") {
      navigateToFlow("base");
      resetForm();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const BaseFlow = () => {
    return (
      <AnimatePresence mode="wait">
        {flowState === "base" && (
          <motion.div
            key="base"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center mt-4 px-4"
          >
            <Button
              fullWidth
              variant="outline"
              style={{ margin: "10px", maxWidth: "280px" }}
              onClick={signInGoogle}
              leftSection={
                <img
                  src={googleLogo}
                  alt="Google Icon"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              Sign in with Google
            </Button>

            <div className="flex w-full items-center my-4 gap-4 max-w-[280px]">
              <div className="flex-1 bg-gray-200 h-[1px]"></div>
              <p className="text-gray-500 text-sm">Or</p>
              <div className="flex-1 bg-gray-200 h-[1px]"></div>
            </div>

            <Button
              fullWidth
              variant="outline"
              style={{ margin: "10px", maxWidth: "280px" }}
              onClick={() => navigateToFlow("email-login")}
              leftSection={
                <img
                  src={emailLogo}
                  alt="Email Icon"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              Sign in with Email
            </Button>

            <p className="text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => navigateToFlow("email-register")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const EmailLoginFlow = () => {
    return (
      <AnimatePresence mode="wait" custom={direction}>
        {flowState === "email-login" && (
          <motion.div
            key="email-login"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center mt-4 px-4"
          >
            <form onSubmit={signInWithEmail} className="w-full ">
              <TextInput
                label="Email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                type="email"
                style={{ marginBottom: 16 }}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: 8 }}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mb-4"
                >
                  {error}
                </motion.p>
              )}

              <Button
                fullWidth
                type="submit"
                loading={loading}
                style={{ marginTop: 16 }}
              >
                Sign In
              </Button>

              <p className="text-sm text-gray-600 mt-6 text-center">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    navigateToFlow("email-register");
                    resetForm();
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const EmailRegisterFlow = () => {
    return (
      <AnimatePresence mode="wait" custom={direction}>
        {flowState === "email-register" && (
          <motion.div
            key="email-register"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center mt-4 px-4"
          >
            <form onSubmit={signUpWithEmail} className="w-full">
              <TextInput
                label="Email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                type="email"
                style={{ marginBottom: 16 }}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: 16 }}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ marginBottom: 8 }}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm mb-4 ${
                    error.includes("Check your email")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {error}
                </motion.p>
              )}

              <Button
                fullWidth
                type="submit"
                loading={loading}
                style={{ marginTop: 16 }}
              >
                Create Account
              </Button>

              <p className="text-sm text-gray-600 mt-6 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    navigateToFlow("email-login");
                    resetForm();
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const getTitleText = () => {
    switch (flowState) {
      case "base":
        return "Welcome Back!";
      case "email-login":
        return "Sign in with Email";
      case "email-register":
        return "Create Account";
    }
  };

  return (
    <>
      <Modal
        opened={isModalOpen()}
        onClose={handleClose}
        centered
        withCloseButton={false}
        style={{ overflow: "hidden" }}
      >
        <div className="p-4 relative">
          <ActionIcon
            data-testid="back-button"
            variant="transparent"
            onClick={handleBack}
            className="absolute top-2 left-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ visibility: flowState !== "base" ? "visible" : "hidden" }}
          >
            <MdKeyboardBackspace size={24} />
          </ActionIcon>

          <img
            className="mx-auto"
            src={logo}
            alt="Pret A Manger Logo"
            style={{ width: 100, marginBottom: 20 }}
          />

          <h2
            key={`title-${flowState}`}
            className="text-2xl font-bold text-center mb-2"
          >
            {getTitleText()}
          </h2>
        </div>

        <div style={{ overflow: "hidden" }}>
          <BaseFlow />
          <EmailLoginFlow />
          <EmailRegisterFlow />
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
