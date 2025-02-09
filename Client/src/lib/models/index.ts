import * as tf from '@tensorflow/tfjs';

// Load pre-trained models
export async function loadModels() {
  const raaganModel = await tf.loadLayersModel('/models/raagan/model.json');
  const melganModel = await tf.loadLayersModel('/models/melgan/model.json');
  const raveModel = await tf.loadLayersModel('/models/rave/model.json');
  
  return {
    raaganModel,
    melganModel,
    raveModel
  };
}

// Convert audio data to spectrogram
export async function audioToSpectrogram(audioData: Float32Array): Promise<tf.Tensor> {
  const frameSize = 2048;
  const hopSize = 512;
  
  const frames = [];
  for (let i = 0; i < audioData.length - frameSize; i += hopSize) {
    frames.push(audioData.slice(i, i + frameSize));
  }
  
  const spectrograms = frames.map(frame => {
    const signal = tf.tensor1d(frame);
    return tf.spectral.stft(signal, frameSize, hopSize);
  });
  
  return tf.stack(spectrograms);
}

// Predict Raaga from spectrogram
export async function predictRaaga(spectrogram: tf.Tensor, model: tf.LayersModel): Promise<string> {
  const prediction = await model.predict(spectrogram) as tf.Tensor;
  const raagas = ['Bhairav', 'Yaman', 'Bhupali', 'Malkauns', 'Darbari'];
  const index = (await prediction.argMax().data())[0];
  return raagas[index];
}

// Generate music using RAVE model
export async function generateMusic(
  raveModel: tf.LayersModel,
  melganModel: tf.LayersModel,
  seedAudio: Float32Array,
  duration: number
): Promise<Float32Array> {
  const latentSize = 256;
  const sampleRate = 44100;
  
  // Encode seed audio to latent space
  const seedSpectrogram = await audioToSpectrogram(seedAudio);
  const latent = await raveModel.predict(seedSpectrogram) as tf.Tensor;
  
  // Generate new latent vectors
  const numSteps = Math.floor(duration * sampleRate / 512);
  const generated = [];
  let currentLatent = latent;
  
  for (let i = 0; i < numSteps; i++) {
    const newLatent = await raveModel.predict(currentLatent) as tf.Tensor;
    generated.push(newLatent);
    currentLatent = newLatent;
  }
  
  // Decode latent vectors to audio using MelGAN
  const combinedLatent = tf.concat(generated);
  const audio = await melganModel.predict(combinedLatent) as tf.Tensor;
  
  return new Float32Array(await audio.data());
}