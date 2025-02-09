import { useState } from "react";
import { Layout } from "./components/Layout";
import { AudioVisualizer } from "./components/AudioVisualizer";
import { RaagaAnalyzer } from "./components/RaagaAnalyzer";
import { MusicNotation } from "./components/MusicNotation";
import { AIComposer } from "./components/AIComposer";
import { Music, AudioWaveform as Waveform, Mic } from "lucide-react";
import UploadAudio from "./components/UploadAudio";
import Notation from "./components/Notation";





function Features() {


    const [notationData, setNotationData] = useState(null); // ✅ Moved inside function

    return(
    <Layout>
        <main  className="static-container mx-auto px-4 py-8  max-w-7xl flex-grow ">

          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Music className="w-12 h-12 text-indigo-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-relaxed ...">
                Cognify
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AI-Powered Indian Classical Music Analysis & Synthesis Platform
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-800/60 backdrop-blur-md text-white rounded-xl shadow-md p-6 
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50">
  <div className="flex items-center gap-2 mb-4">
    <Mic className="w-6 h-6 text-indigo-400 transition-all duration-300 group-hover:text-indigo-300" />
    <h2 className="text-xl font-semibold transition-all duration-300 hover:text-indigo-400">Raaga Recognition</h2>
  </div>
  <RaagaAnalyzer />
</section>

<section className="bg-gray-800/60 backdrop-blur-md text-white rounded-xl shadow-md p-6 
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
  <div className="flex items-center gap-2 mb-4">
    <Waveform className="w-6 h-6 text-indigo-400 transition-all duration-300 hover:text-purple-300" />
    <h2 className="text-xl font-semibold transition-all duration-300 hover:text-purple-400">Audio Analysis</h2>
  </div>
  <AudioVisualizer />
</section>

<section className="bg-gray-800/60 backdrop-blur-md text-white rounded-xl shadow-md p-6 md:col-span-2 
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
  <div className="flex items-center gap-2 mb-4">
    <Music className="w-6 h-6 text-indigo-400 transition-all duration-300 hover:text-blue-300" />
    <h2 className="text-xl font-semibold transition-all duration-300 hover:text-blue-400">Music Notation</h2>
  </div>
  <MusicNotation />
</section>

<section className="bg-gray-800/60 backdrop-blur-md text-white rounded-xl shadow-md p-6 md:col-span-2 
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
  <div className="flex items-center gap-2 mb-4">
    <Music className="w-6 h-6 text-indigo-400 transition-all duration-300 hover:text-pink-300" />
    <h2 className="text-xl font-semibold transition-all duration-300 hover:text-pink-400">AI Composition</h2>
  </div>
  <AIComposer />
</section>


            {/* 🎼 Audio to Notation Section */}
            <section className="col-span-1 md:col-span-2 bg-gray-800/60 backdrop-blur-md text-white p-6 rounded-xl shadow-md flex flex-col items-center 
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50">
  <h2 className="text-2xl font-semibold mb-4 align-items-center transition-all duration-300 hover:text-indigo-400">🎼 Audio to Notation</h2>

  <UploadAudio onUpload={setNotationData} />

  {notationData && (
    <div className="mt-6">
      <Notation notationData={notationData} />
    </div>
  )}
</section>

          </div>
        </main>

    </Layout>
);
    
}

export default Features