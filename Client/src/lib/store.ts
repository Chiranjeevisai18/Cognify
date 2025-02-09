import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AudioState {
  isRecording: boolean;
  audioContext: AudioContext | null;
  mediaRecorder: MediaRecorder | null;
  audioData: Blob | null;
  analyzer: AnalyserNode | null;
  setIsRecording: (isRecording: boolean) => void;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  analyzeAudio: (audioData: Blob) => Promise<{
    tempo: number;
    key: string;
    raaga: string;
  }>;
  saveRecording: (data: {
    audioUrl: string;
    raaga: string;
    tempo: number;
    key: string;
  }) => Promise<void>;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isRecording: false,
  audioContext: null,
  mediaRecorder: null,
  audioData: null,
  analyzer: null,

  setIsRecording: (isRecording) => set({ isRecording }),

  startRecording: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(analyzer);

      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        set({ audioData: blob });
      };

      mediaRecorder.start();
      set({ audioContext, mediaRecorder, analyzer, isRecording: true });
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  },

  stopRecording: () => {
    const { mediaRecorder, audioContext } = get();
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
      audioContext.close();
    }
    set({ isRecording: false, mediaRecorder: null, audioContext: null });
  },

  analyzeAudio: async (audioData) => {
    // In a real application, we would use TensorFlow.js models here
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          tempo: Math.floor(Math.random() * 40) + 80, // Random BPM between 80-120
          key: ['Sa', 'Re', 'Ga', 'Ma', 'Pa'][Math.floor(Math.random() * 5)],
          raaga: ['Bhairav', 'Yaman', 'Bhupali'][Math.floor(Math.random() * 3)]
        });
      }, 1000);
    });
  },

  saveRecording: async (data) => {
    const { data: recording, error } = await supabase
      .from('recordings')
      .insert([
        {
          audio_url: data.audioUrl,
          raaga: data.raaga,
          tempo: data.tempo,
          key: data.key
        }
      ])
      .select();

    if (error) {
      console.error('Error saving recording:', error);
      throw error;
    }

    return recording;
  }
}));