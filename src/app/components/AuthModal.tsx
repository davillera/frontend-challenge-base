"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

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
              className={`px-4 py-2 mb-4 w-full ${!isLogin ? "bg-yellow text-black" : "bg-lightgray text-white"} rounded-lg`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 w-full ${isLogin ? "bg-yellow text-black" : "bg-lightgray text-white"} rounded-lg`}
            >
              Log In
            </button>
          </div>
          {isLogin ? (
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                Welcome back to Quickbet Movies!
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 bg-black border border-lightgray text-white rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-6 bg-black border border-lightgray text-white rounded-lg"
              />
              <button className="w-full bg-yellow text-black px-4 py-2 rounded-lg">
                Continue
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                Welcome to Quickbet Movies!
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-6 bg-black border border-lightgray text-white rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-6 bg-black border border-lightgray text-white rounded-lg"
              />
              <button className="w-full bg-yellow text-black px-4 py-2 rounded-lg">
                Register with your Email
              </button>
            </div>
          )}
        </div>
        {/* Sección derecha */}
        <div className="w-1/2 p-6 bg-opacity-40 bg-black rounded-l-lg">
          <h2 className="text-white text-3xl font-bold mb-2">
            Welcome to Quickbet Movies!
          </h2>
          <p className="text-lightgray mb-6">
            🎬 Ready to unlock a universe of cinematic delights? Sign up now and
            start your journey with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
