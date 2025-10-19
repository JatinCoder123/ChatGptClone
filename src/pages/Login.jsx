import { motion } from "framer-motion";
import ElectricBorder from "../Components/ElectricBorder";
import { useState } from "react";
import { BACKEND_URL, BASE_PATH } from "../store/constants.js";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const handleLoginWithGoogle = () => {
    window.location.href = `${BACKEND_URL}?controller=auth&action=googleLogin`;
  };
  const handleLoginWithMicrosoft = () => {
    window.location.href = `${BACKEND_URL}?controller=auth&action=microsoftLogin`;
  };
  return (
    <div
      data-theme="dark"
      className="flex min-h-screen bg-[var(--background)] text-[var(--text-primary)]"
    >
      {/* Left Side - Auth Form */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 flex-col items-center justify-center p-6 sm:p-8 w-full min-h-screen"
      >
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-heading font-bold text-center">
            {isLogin ? "Login to your account" : "Create your account"}
          </h1>
          <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
            {isLogin
              ? "Enter your email below to login to your account"
              : "Sign up with your email and password to get started"}
          </p>
        </div>

        <div className="mt-4 w-full max-w-sm">
          <button
            className="mt-6 w-full flex items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 font-medium hover:bg-[var(--surface)] transition"
            onClick={handleLoginWithGoogle}
          >
            <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
            </span>
            <span>
              {isLogin ? "Login With Google" : "Continue With Google"}
            </span>
          </button>
          <button
            className="mt-6 w-full flex items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 font-medium hover:bg-[var(--surface)] transition"
            onClick={handleLoginWithMicrosoft} // your MS login handler
            disabled
          >
            <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="w-4 h-4"
              />
            </span>
            <span>
              {isLogin ? "Login With Microsoft" : "Continue With Microsoft"}
            </span>
          </button>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-[var(--accent-primary)] hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Image */}

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden flex-1 items-center justify-center bg-[var(--surface)] lg:flex"
      >
        <ElectricBorder
          color="#7df9ff"
          speed={0.7}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: "50%" }} // <-- makes it circular
        >
          <img
            src={`${BASE_PATH}/logo.png`}
            alt="Auth"
            className="max-w-sm rounded-full" // <-- ensures the image matches the border
          />
        </ElectricBorder>
      </motion.div>
    </div>
  );
}
