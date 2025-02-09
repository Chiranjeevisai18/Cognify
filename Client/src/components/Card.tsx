import React from "react";

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg shadow-blue-500/50 border border-gray-700 rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-blue-400/50">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-gray-400">{description}</p>
      <div className="mt-4">{children}</div> {/* Equivalent to CardContent */}
    </div>
  );
};

export default Card;
