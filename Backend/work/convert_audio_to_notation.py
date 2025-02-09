import os
import librosa
import numpy as np
import pandas as pd
import json

# Load the final dataset containing Raga names and their notations
raga_notations = pd.read_csv("Finalized_Raga_Dataset.csv")
 

# Directory where audio files are stored
AUDIO_DIR = "assets/audio_files"

# Function to extract pitch from an audio file
def extract_pitch(audio_path):
    try:
        y, sr = librosa.load(audio_path, sr=22050)  # Load audio
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        
        # Get the most dominant pitch for each frame
        pitch_values = []
        for i in range(pitches.shape[1]):
            index = np.argmax(magnitudes[:, i])  # Get index of highest magnitude
            pitch = pitches[index, i]
            if pitch > 0:  # Ignore zero (no pitch)
                pitch_values.append(pitch)
        
        return pitch_values
    except Exception as e:
        print(f"Error processing {audio_path}: {e}")
        return []

# Function to map pitch frequencies to Sargam notation
def frequency_to_sargam(frequencies):
    SARGAM_NOTES = {
        "C": 261.63, "C#": 277.18, "D": 293.66, "D#": 311.13, "E": 329.63, 
        "F": 349.23, "F#": 369.99, "G": 392.00, "G#": 415.30, "A": 440.00, 
        "A#": 466.16, "B": 493.88
    }
    
    sargam_sequence = []
    for freq in frequencies:
        closest_note = min(SARGAM_NOTES, key=lambda note: abs(SARGAM_NOTES[note] - freq))
        sargam_sequence.append(closest_note)
    
    return sargam_sequence

# Function to process all audio files and generate notations
def process_audio_files():
    results = {}
    
    for file in os.listdir(AUDIO_DIR):
        if file.endswith(".wav"):
            file_path = os.path.join(AUDIO_DIR, file)
            
            print(f"Processing: {file}")
            frequencies = extract_pitch(file_path)
            notations = frequency_to_sargam(frequencies)

            # Store results
            raga_name = file.split("_")[0]  # Assuming filenames are like 'RagaName_xxx.wav'
            results[raga_name] = {
                "audio_file": file,
                "notations": notations
            }
    
    # Save results to a JSON file
    with open("raga_notations.json", "w") as json_file:
        json.dump(results, json_file, indent=4)
    
    print("✅ Notation conversion complete! Data saved to 'raga_notations.json'.")

# Run the process
if __name__ == "__main__":
    process_audio_files()
