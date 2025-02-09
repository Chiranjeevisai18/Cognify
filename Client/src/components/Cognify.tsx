import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // ✅ Import Clerk's useUser
import "../styles/tailwind.css"; // ✅ Import Tailwind styles directly
import bg from './Assets/___4_-removebg-preview.png'
import herosec from './Assets/5cfa6524-e750-4753-92cf-26cac0b21534.jpg'
import ragaimg from './Assets/DIV@1x.png' 
import notimg from './Assets/IMG@1x.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faMusic, faDrum } from "@fortawesome/free-solid-svg-icons";


const Cognify: React.FC = () => {
  const navigate = useNavigate();
  const {isSignedIn} = useUser(); // ✅ Destructure isSignedIn from useUser


  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/features"); // ✅ Go to Features if signed in
    } else {
      navigate("/signin"); // ✅ Go to Sign In if not signed in
    }
  };


  const originsData = [
    {
      icon: faHistory,
      title: "Ancient Vedic Roots",
      text: "Originating from the sacred Vedic traditions, Indian classical music has evolved over thousands of years, preserving its spiritual essence while adapting to changing times.",
    },
    {
      icon: faMusic,
      title: "Two Major Traditions",
      text: "The Hindustani (North Indian) and Carnatic (South Indian) traditions represent the two main classical music styles, each with its unique characteristics and influences.",
    },
    {
      icon: faDrum,
      title: "Musical Evolution",
      text: "Through centuries of patronage by rulers and cultural exchange, the art form has developed sophisticated systems of melody (raga) and rhythm (tala).",
    },
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
                <img src={bg}alt="Cognify Logo" className="h-8 w-auto animate-spin transition-transform duration-[2000ms]" />
                <span className="text-xl font-semibold font-['Playfair_Display']">Cognify</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#origins" className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px]">
                About
              </a>
              <button onClick={() => navigate("/signin")} className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px]">
                Sign In
              </button>
              <button onClick={() => navigate("/signup")} className="px-4 py-2 text-sm font-medium bg-custom text-white hover:bg-custom/90 transition-all duration-300 hover:scale-105">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
          <div className="absolute inset-0 animate-pulse">
            <img src={herosec} alt="Hero Background" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900 animate-gradient"></div>
          </div>
          <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold font-['Playfair_Display'] leading-tight mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent animate-shimmer">
                Discover the Science of Indian Classical Music
              </h1>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                        Experience a revolutionary platform that combines ancient musical wisdom with cutting-edge technology. Analyze, synthesize, and explore the depths of Indian Classical Music like never before.
              </p>
              <div className="flex space-x-6">
                {/* ✅ Get Started Button with Clerk Authentication */}
                <button 
                  className="px-8 py-3 text-base font-medium bg-custom text-white hover:bg-custom/90 transition-all duration-300 hover:scale-105"
                  onClick={handleGetStarted} // ✅ Check auth status and navigate
                >
                  Get Started
                </button>
                <button className="px-8 py-3 text-base font-medium border-2 border-custom text-white hover:bg-custom/10 transition-all duration-300 hover:scale-105" onClick={() => document.getElementById("origins")?.scrollIntoView({ behavior: "smooth" })}>
                  Know More
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
      id="origins"
      className="py-20 bg-gray-800 transition-all duration-300 hover:bg-opacity-90 hover:shadow-2xl hover:shadow-custom/20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1588416820614-f8d6ed0ffd98?q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-white mb-12 text-center">
          The Origins of Indian Classical Music
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {originsData.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-700 hover:border-custom transition-all duration-300 bg-gray-800 hover:shadow-lg hover:shadow-custom/10 hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-custom/10 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={item.icon} className="text-gray-200 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

     {/* Ragas Section */}
     <section
        id="ragas"
        className="py-20 bg-gray-900 transition-all duration-300 hover:bg-opacity-90 hover:shadow-2xl hover:shadow-custom/20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-white mb-12 text-center">
            Understanding Ragas
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img
                src={ragaimg}
                alt="Raga Performance"
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "What is a Raga?",
                  text: "A raga is a melodic framework for improvisation in Indian classical music. It’s more than just a scale - it’s a set of rules for how to move between notes to create specific moods and emotions.",
                },
                {
                  title: "Time and Season",
                  text: "Each raga is associated with a particular time of day or season, reflecting the ancient Indian understanding of the connection between music and nature.",
                },
                {
                  title: "Emotional Impact",
                  text: "Ragas are designed to evoke specific emotions or moods (rasas), from peaceful contemplation to romantic longing to heroic valor.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-gray-800 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-custom/10 hover:transform hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notations Section */}
      <section
        id="notations"
        className="py-20 bg-gray-800 transition-all duration-300 hover:bg-opacity-90 hover:shadow-2xl hover:shadow-custom/20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-white mb-12 text-center">
            Music Notation Systems
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  title: "Sargam Notation",
                  text: "The traditional Indian system uses syllables Sa, Re, Ga, Ma, Pa, Dha, Ni to represent the seven basic notes, corresponding to Western Do, Re, Mi, Fa, So, La, Ti.",
                },
                {
                  title: "Western Adaptation",
                  text: "Modern Indian classical music sometimes uses modified Western staff notation, though this can’t fully capture the nuances of Indian musical ornaments and microtones.",
                },
                {
                  title: "Oral Tradition",
                  text: "Despite written systems, the oral guru-shishya (teacher-student) tradition remains vital for transmitting subtle aspects of performance practice.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-gray-700 bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-custom/10 hover:transform hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>
            <div>
              <img
                src={notimg}
                alt="Music Notation"
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default Cognify;
