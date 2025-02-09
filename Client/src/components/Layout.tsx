import React from 'react';
import bg from './Assets/___4_-removebg-preview.png';
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      <nav className="bg-gradient-to-r from-indigo-800 to-purple-700 shadow-md py-4 transition-all duration-500 ease-in-out hover:shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform">
            <img src={bg} alt="Cognify Logo" className="h-8 w-auto animate-spin transition-transform duration-[2000ms]" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 tracking-wide ">Cognify</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <span className="text-white font-medium">{user?.fullName}</span>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>
      <main className="w-full flex-grow">{children}</main>
      <footer className="bg-gradient-to-r from-indigo-800 to-purple-700 border-t py-6 transition-all duration-500 ease-in-out hover:shadow-lg p-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p className="text-center md:text-left hover:text-white transition-colors duration-300">
            © 2025 Cognify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/about" className="hover:text-white transition-colors duration-300">About Us</a>
            <a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a>
            <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-4 flex justify-center space-x-6 text-gray-300">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
