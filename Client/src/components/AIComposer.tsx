import  { useState, useEffect } from 'react';
import { loadModels, generateMusic } from '../lib/models';
import { generateSequence, notesToABC } from '../lib/models/musicUtils';
import * as tf from '@tensorflow/tfjs';

export function AIComposer() {
  const [selectedRaaga, setSelectedRaaga] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generatedNotation, setGeneratedNotation] = useState<string>('');
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    // Load LSTM model for sequence generation
    const loadSequenceModel = async () => {
      try {
        const sequenceModel = await tf.loadLayersModel('/models/sequence/model.json');
        setModel(sequenceModel);
      } catch (error) {
        console.error('Error loading sequence model:', error);
      }
    };
    loadSequenceModel();
  }, []);

  const handleGenerate = async () => {
    if (!model || !selectedRaaga) return;
    
    setIsGenerating(true);
    try {
      // Generate note sequence using LSTM
      const seedNotes = ['S', 'R', 'G', 'M'];
      const generatedSequence = await generateSequence(model, seedNotes, 32, selectedRaaga);
      
      // Convert to ABC notation
      const abcNotation = notesToABC(generatedSequence, selectedRaaga);
      setGeneratedNotation(abcNotation);

      // Generate audio using RAVE model
      const models = await loadModels();
      const seedAudio = new Float32Array(44100); // 1 second of silence
      const duration = 30; // 30 seconds
      
      const generatedAudio = await generateMusic(
        models.raveModel,
        models.melganModel,
        seedAudio,
        duration
      );

      const audioBlob = new Blob([generatedAudio], { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error generating music:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToLibrary = async () => {
    if (!audioUrl || !generatedNotation) return;
    
    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('compositions')
        .insert({
          raaga: selectedRaaga,
          notation: generatedNotation,
          audio_url: audioUrl
        });

      if (error) throw error;
      
      alert('Composition saved to library!');
    } catch (error) {
      console.error('Error saving to library:', error);
      alert('Failed to save composition');
    }
  };

  return (
    <div className="space-y-6">
    {/* Raaga Selection & Duration */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="raaga" className="block text-sm font-medium text-indigo-300 mb-2">
          Select Raaga
        </label>
        <select
          id="raaga"
          value={selectedRaaga}
          onChange={(e) => setSelectedRaaga(e.target.value)}
          className="w-full rounded-md border border-indigo-500 bg-gray-700 text-indigo-300 shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all"
        >
          <option value="">Select a Raaga</option>
          <option value="bhairav">Bhairav</option>
          <option value="yaman">Yaman</option>
          <option value="bhupali">Bhupali</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-indigo-300 mb-2">
          Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          min="1"
          max="10"
          defaultValue="3"
          className="w-full rounded-md border border-indigo-500 bg-gray-700 text-white shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all"
        />
      </div>
    </div>
  
    {/* Action Buttons */}
    <div className="flex gap-2">
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !selectedRaaga}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate Composition'}
      </button>
      <button
        onClick={handleSaveToLibrary}
        disabled={!audioUrl}
        className="px-4 py-2 text-sm font-medium text-indigo-300 bg-gray-700/50 backdrop-blur-md rounded-md shadow-md transition-all hover:bg-gray-600 hover:shadow-indigo-500/30 disabled:opacity-50"
      >
        Add to Library
      </button>
    </div>
  
    {/* Generated Notation Display */}
    {generatedNotation && (
      <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-4 shadow-md transition-all hover:shadow-indigo-500/30">
        <h3 className="text-sm font-medium text-indigo-300 mb-2">Generated Notation</h3>
        <pre className="whitespace-pre-wrap font-mono text-sm text-indigo-200">{generatedNotation}</pre>
      </div>
    )}
  
    {/* Generated Audio */}
    {audioUrl && (
      <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-4 shadow-md transition-all hover:shadow-indigo-500/30">
        <h3 className="text-sm font-medium text-indigo-300 mb-2">Generated Audio</h3>
        <audio controls className="w-full" src={audioUrl} />
      </div>
    )}
  </div>
  
  );
}