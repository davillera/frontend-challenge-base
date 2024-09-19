"use client";

import { useState } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const url = isLogin
        ? `${BACKEND_URL}/users/login`
        : `${BACKEND_URL}/users/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log("Success:", data);
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="relative flex w-5/6 h-5/6 bg-darkgray rounded-lg shadow-lg">
        <div className="w-1/2 p-6 bg-gray rounded-r-lg">
          <button onClick={onClose} className="text-white text-2xl mb-4 left-0">
            &times;
          </button>
          <div className="flex justify-center items-center p-4">
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 mb-4 w-full ${
                !isLogin ? "bg-yellow text-black" : "bg-lightgray text-white"
              } rounded-lg`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 w-full ${
                isLogin ? "bg-yellow text-black" : "bg-lightgray text-white"
              } rounded-lg`}
            >
              Log In
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 bg-black border border-lightgray text-white rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 mb-6 bg-black border border-lightgray text-white rounded-lg"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow text-black px-4 py-2 rounded-lg"
          >
            {loading ? "Processing..." : isLogin ? "Continue" : "Register"}
          </button>
        </div>
        <div className="w-1/2 p-6 bg-opacity-40 bg-black rounded-l-lg">
          <h2 className="text-white text-3xl font-bold mb-2">
            Welcome to Quickbet Movies!
          </h2>
          <p className="text-lightgray mb-6">
            Ready to unlock a universe of cinematic delights? Sign up now and
            start your journey with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
