import  { useEffect, useRef } from 'react';
import { useAudioStore } from '../lib/store';

export function AudioVisualizer() {
  const { analyzer } = useAudioStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!analyzer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyzer || !ctx) return;

      animationRef.current = requestAnimationFrame(draw);
      analyzer.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgb(249, 250, 251)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(79, 70, 229)';
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyzer]);

  return (
    <div className="space-y-6">
  {/* Visualizer Canvas */}
  <canvas
    ref={canvasRef}
    className="w-full h-32 bg-gray-700/40 backdrop-blur-md rounded-lg shadow-md transition-all duration-300 hover:shadow-indigo-500/30"
    width={800}
    height={128}
  />

  {/* Grid for Tempo & Key */}
  <div className="grid grid-cols-2 gap-4">
    {/* Tempo Box */}
    <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30">
      <h3 className="text-sm font-medium text-indigo-400 mb-2">⏳ Tempo</h3>
      <p className="text-indigo-300 font-semibold">
        {Math.floor(Math.random() * 40) + 80} BPM
      </p>
    </div>

    {/* Key Box */}
    <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30">
      <h3 className="text-sm font-medium text-indigo-400 mb-2">🎼 Key</h3>
      <p className="text-indigo-300 font-semibold">Sa</p>
    </div>
  </div>
</div>

  );
}