import  { useEffect, useRef, useState } from "react";
import ABCJS from "abcjs";

export function MusicNotation() {
  const [notation, setNotation] = useState<string>(() => {
    return localStorage.getItem("notation") || `X:1
T:Sample Composition
M:4/4
L:1/8
K:C
|: "C"C2 E2 G2 E2 | "G"D2 F2 A2 F2 | "Am"E2 A2 c2 A2 | "F"F2 A2 c2 A2 :|`;
  });

  const notationRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<any>(new ABCJS.synth.CreateSynth());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTempo, setCurrentTempo] = useState(120);
  const [visualObj, setVisualObj] = useState<ABCJS.TuneObject | null>(null);
  const [exporting,setExporting] = useState<boolean>(false);

  useEffect(() => {
    if (notationRef.current) {
      const visual = ABCJS.renderAbc(notationRef.current, notation)[0];
      setVisualObj(visual);
    }
  }, [notation]);

  useEffect(() => {
    localStorage.setItem("notation", notation);
  }, [notation]);


const handlePlayback = async () => {
  console.log("Audio Context State:", ABCJS.synth.supportsAudio());

  if (!synthRef.current || !visualObj) return;

  try {
    if (isPlaying) {
      console.log("Stopping playback...");
      await synthRef.current.stop();
      setIsPlaying(false);
    } else {
      console.log("Initializing synth...");
      const synth = synthRef.current;

      const audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === "suspended") {
          console.log("Resuming AudioContext...");
          await audioContext.resume();
        }


      const result = await synth.init({
        visualObj,
        audioContext: new AudioContext(),
        millisecondsPerMeasure: 500, // Adjust tempo if needed
      });
      synthRef.current.setMasterVolume(1.0);

      console.log("Synth initialized:", result);
      
      synthRef.current.prime().then(() => {
        console.log("Synth primed, playing test note...");
        synthRef.current.audioContext.resume(); // Ensure audio is running
        synthRef.current.midiBuffer.play({ when: 0 }); // Play immediately
      });
      

      if (result && synth.start) {
        console.log("Starting playback...");
        await synth.start();
        setIsPlaying(true);
      } else {
        console.error("Synth failed to start.");
      }
    }
  } catch (error) {
    console.error("Playback error:", error);
  }
};

  
  
  

  const handleExportMIDI = async () => {
    if (!visualObj) return;
  
    try {
      const midiData = ABCJS.synth.getMidiFile(visualObj, { fileName: "composition.mid" });
  
      if (midiData) {
        setExporting(true);
        const blob = new Blob([midiData], { type: "audio/midi" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "composition.mid";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting MIDI:", error);
    } finally {
      setExporting(false); // Restore button state
    }
  };
  
  const handleExportNotation = () => {
    const blob = new Blob([notation], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "composition.abc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Notation Display */}
      <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-4 shadow-md hover:shadow-indigo-500/30">
        <div ref={notationRef} className="w-full min-h-[200px]" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayback}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 hover:shadow-indigo-500/30"
        >
          {isPlaying ? "Stop" : "Play"}
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm text-indigo-300">Tempo:</label>
          <input
  type="number"
  value={currentTempo}
  onChange={(e) => {
    const newTempo = Number(e.target.value);
    setCurrentTempo(newTempo);

    if (isPlaying) {
      handlePlayback(); // Restart playback with new tempo
    }
  }}
  className="w-20 px-2 py-1 bg-gray-700 text-white border border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-400"
  min="60"
  max="200"
/>

        </div>
      </div>

      {/* Notation Input */}
      <textarea
        value={notation}
        onChange={(e) => setNotation(e.target.value)}
        className="w-full h-32 p-2 bg-gray-700 text-indigo-300 border border-indigo-500 rounded-md font-mono text-sm focus:ring-2 focus:ring-indigo-400"
        placeholder="Enter ABC notation here..."
      />

      {/* Action Buttons */}
      <div className="flex gap-2">
      <button 
  onClick={handleExportMIDI} 
  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-500"
  disabled={exporting}
>
  {exporting ? "Exporting..." : "Convert to MIDI"}
</button>


        <button onClick={handleExportNotation} className="px-4 py-2 text-sm font-medium text-indigo-300 bg-gray-700/50 rounded-md hover:bg-gray-600">
          Export Notation
        </button>
      </div>
    </div>
  );
}
