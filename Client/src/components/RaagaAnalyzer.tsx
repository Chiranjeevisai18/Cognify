import React, { useEffect, useRef } from 'react';
import { Mic, StopCircle } from 'lucide-react';
import { useAudioStore } from '../lib/store';

export function RaagaAnalyzer() {
  const {
    isRecording,
    startRecording,
    stopRecording,
    analyzeAudio,
    audioData
  } = useAudioStore();
  const [analysis, setAnalysis] = React.useState<{
    raaga: string;
    tempo: number;
    key: string;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (audioData) {
      analyzeAudio(audioData).then(setAnalysis);
    }
  }, [audioData, analyzeAudio]);

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className="space-y-6">
  {/* Recording Button */}
  <div className="flex items-center justify-center">
    <button
      onClick={handleToggleRecording}
      className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
        isRecording
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
      }`}
    >
      {isRecording ? (
        <StopCircle className="w-8 h-8 transition-all duration-300 hover:text-red-300" />
      ) : (
        <Mic className="w-8 h-8 transition-all duration-300 hover:text-indigo-300" />
      )}
    </button>
  </div>

  {/* Status Text */}
  <div className="text-center">
    <p className="text-sm text-gray-300 transition-all duration-300">
      {isRecording ? '🎙️ Recording in progress...' : 'Click to start recording'}
    </p>
  </div>

  {/* Visualizer Canvas */}
  <canvas ref={canvasRef} className="w-full h-24 bg-gray-700/40 rounded-lg shadow-md backdrop-blur-md" />

  {/* Analysis Results */}
  <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30">
    <h3 className="text-sm font-medium text-indigo-400 mb-2">🎵 Analysis Results</h3>
    {analysis ? (
      <div className="space-y-2 text-gray-300">
        <p>
          <span className="font-medium text-indigo-300">Detected Raaga:</span> {analysis.raaga}
        </p>
        <p>
          <span className="font-medium text-indigo-300">Tempo:</span> {analysis.tempo} BPM
        </p>
        <p>
          <span className="font-medium text-indigo-300">Key:</span> {analysis.key}
        </p>
      </div>
    ) : (
      <p className="text-gray-400 font-semibold">Not yet analyzed</p>
    )}
  </div>
</div>

  );
}