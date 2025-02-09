import * as tf from '@tensorflow/tfjs';

// Raaga-specific note sequences
const raagaPatterns = {
  bhairav: ['S', 'r', 'G', 'm', 'P', 'd', 'N'],
  yaman: ['N', 'r', 'G', 'm', 'P', 'D', 'N'],
  bhupali: ['S', 'R', 'G', 'P', 'D'],
};

// Convert notes to ABC notation
export function notesToABC(notes: string[], raaga: string): string {
  const header = `X:1
T:${raaga} Composition
M:4/4
L:1/8
K:C
`;
  
  // Group notes into measures
  const measures = [];
  for (let i = 0; i < notes.length; i += 8) {
    measures.push(notes.slice(i, i + 8).join(''));
  }
  
  return header + '|: ' + measures.join(' | ') + ' :|';
}

// LSTM-based sequence generation
export async function generateSequence(
  model: tf.LayersModel,
  seed: string[],
  length: number,
  raaga: string
): Promise<string[]> {
  const validNotes = raagaPatterns[raaga as keyof typeof raagaPatterns];
  const sequence = [...seed];
  
  for (let i = 0; i < length; i++) {
    const input = tf.tensor2d([sequence.slice(-8)]);
    const prediction = await model.predict(input) as tf.Tensor;
    const probabilities = await prediction.data();
    
    // Sample from valid notes based on probabilities
    const noteIndex = Math.floor(Math.random() * validNotes.length);
    sequence.push(validNotes[noteIndex]);
  }
  
  return sequence;
}