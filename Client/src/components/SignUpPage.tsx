import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Music } from "lucide-react";

const SignUpPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85)), url('https://t4.ftcdn.net/jpg/07/18/79/19/360_F_718791990_Mhml0arWvQciOAEQVaXoyG2wByuBx3eo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="flex flex-col items-center">
          <Music className="w-14 h-14 text-indigo-400 animate-pulse mb-3" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wide leading-relaxed">
            Cognify
          </h1>
        </div>
        <p className="text-gray-300 text-lg mt-3">
          Sign up to explore AI-powered Indian Classical Music tools
        </p>
      </div>

      {/* Clerk Sign-Up Form */}
      <div className="w-full max-w-md bg-violet-600/80 p-6 rounded-xl shadow-xl border border-gray-700">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none text-white",
              headerTitle: "text-2xl font-semibold text-white text-center",
              headerSubtitle: "text-sm text-gray-400 text-center",
              formFieldLabel: "text-gray-300",
              formFieldInput:
                "bg-indigo-800 border-gray-600 text-white focus:border-indigo-500",
              submitButton:
                "w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg py-2 transition-all",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
