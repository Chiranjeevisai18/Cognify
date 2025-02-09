import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, StaveNote, Voice, Formatter } from "vexflow";

interface Note {
  pitch: string;
  start: number;
  duration: number;
}

const MAX_NOTES_TO_DISPLAY = 20; // Display first 20 notes to prevent overflow

const Notation = ({ notationData }: { notationData: Note[] | null }) => {
  const notationRef = useRef<HTMLDivElement | null>(null);
  const [visibleNotes, setVisibleNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!notationData || !Array.isArray(notationData) || notationData.length === 0) {
      console.warn("Invalid notation data:", notationData);
      return;
    }
    if (!notationRef.current) return;

    // Limit the number of displayed notes
    setVisibleNotes(notationData.slice(0, MAX_NOTES_TO_DISPLAY));

    // Clear previous SVG elements before rendering new ones
    notationRef.current.innerHTML = "";

    const renderer = new Renderer(notationRef.current, Renderer.Backends.SVG);
    renderer.resize(600, 150);
    const context = renderer.getContext();
    const stave = new Stave(10, 40, 500);
    stave.addClef("treble").setContext(context).draw();

    try {
      const vexNotes = visibleNotes.map(
        (note) =>
          new StaveNote({
            keys: [`${note.pitch.toLowerCase()}/4`],
            duration: note.duration >= 1 ? "q" : "8",
          })
      );

      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(vexNotes);

      new Formatter().joinVoices([voice]).format([voice], 400);
      voice.draw(context, stave);
    } catch (error) {
      console.error("Error rendering notation:", error);
    }
  }, [notationData, visibleNotes]);

  // Function to download notation data as JSON
  const downloadNotation = () => {
    if (!notationData) return;

    const jsonData = JSON.stringify(notationData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "music_notation.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-5 bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg text-white">
    {(!notationData || notationData.length === 0) ? (
      <p className="text-center text-gray-400 text-sm italic animate-fade-in">
        🚫 No notation data available. Upload a file to begin!
      </p>
    ) : (
      <>
        <p className="text-gray-300 text-sm mb-3 bg-gray-800 p-3 rounded-lg shadow-md">
          🎵 Download full notation for more details.
        </p>
        
        <button
          onClick={downloadNotation}
          className="w-full px-5 py-2 bg-indigo-600 hover:bg-indigo-700 
                     text-white font-medium text-sm rounded-lg shadow-md 
                     transition-transform transform hover:scale-105 focus:ring focus:ring-indigo-500"
        >
          📥 Download Notation
        </button>
        
        <div ref={notationRef} className="mt-5 bg-gray-800 p-4 rounded-lg shadow-md" />
      </>
    )}
  </div>
  
  );
};

export default Notation;
