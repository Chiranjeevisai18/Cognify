import librosa
import librosa.display
import numpy as np
import json
import os

# Directory containing audio files
audio_dir = "assets/audio_files"
output_json = "audio_features.json"

def extract_audio_features(file_path):
    y, sr = librosa.load(file_path, sr=None)
    
    # Extract features
    tempo_array, _ = librosa.beat.beat_track(y=y, sr=sr)
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
    
    # Convert to list format
    pitch_values = np.mean(pitches, axis=0).tolist()  # Convert to list
    spectral_values = spectral_centroid.flatten().tolist()  # Flatten and convert to list
    
    return {
        "file": os.path.basename(file_path),
        "tempo": tempo_array.item() if np.isscalar(tempo_array) else float(tempo_array[0]),  # Fix conversion
        "pitches": pitch_values,
        "spectral_centroid": spectral_values
    }


def process_audio_files(audio_dir):
    features_list = []
    for file in os.listdir(audio_dir):
        if file.endswith(".wav"):  # Assuming files are WAV
            file_path = os.path.join(audio_dir, file)
            features = extract_audio_features(file_path)
            features_list.append(features)
    
    # Save extracted features to JSON
    with open(output_json, "w") as f:
        json.dump(features_list, f, indent=4)
    
    print(f"✅ Audio features saved to {output_json}")

if __name__ == "__main__":
    process_audio_files(audio_dir)
