import librosa
import numpy as np
import pretty_midi
import sys

def audio_to_midi(audio_path, output_midi_path):
    # Load audio file
    y, sr = librosa.load(audio_path)

    # Detect note onsets
    onset_frames = librosa.onset.onset_detect(y=y, sr=sr)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)

    # Extract pitch using Yin algorithm
    pitches = librosa.yin(y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))

    # Create a MIDI file
    midi = pretty_midi.PrettyMIDI()
    instrument = pretty_midi.Instrument(program=0)  # Piano

    for i in range(len(onset_times) - 1):
        pitch = librosa.hz_to_midi(pitches[onset_frames[i]])  # Convert Hz to MIDI note
        if np.isnan(pitch):  # Skip unrecognized pitches
            continue

        start_time = onset_times[i]
        end_time = onset_times[i + 1]  # Dynamic note duration

        note = pretty_midi.Note(
            velocity=100,  
            pitch=int(pitch),  # Convert to integer MIDI pitch
            start=start_time,
            end=end_time
        )
        instrument.notes.append(note)

    midi.instruments.append(instrument)
    midi.write(output_midi_path)

    print(f"🎼 MIDI file saved at: {output_midi_path}")

if __name__ == "__main__":
    audio_path = sys.argv[1] if len(sys.argv) > 1 else "input.wav"
    output_midi_path = "output.mid"
    audio_to_midi(audio_path, output_midi_path)
