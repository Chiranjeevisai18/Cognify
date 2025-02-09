import os
from pydub import AudioSegment

# Define the directory where audio files are stored
AUDIO_DIR = "assets/audio_files"

# Ensure the directory exists
if not os.path.exists(AUDIO_DIR):
    print(f"❌ Error: Directory '{AUDIO_DIR}' not found!")
    exit()

# Convert all MP3 files in the folder to WAV
def convert_mp3_to_wav():
    converted_files = 0

    for file in os.listdir(AUDIO_DIR):
        if file.endswith(".mp3"):
            mp3_path = os.path.join(AUDIO_DIR, file)
            wav_path = os.path.join(AUDIO_DIR, file.replace(".mp3", ".wav"))

            # Skip conversion if WAV file already exists
            if os.path.exists(wav_path):
                print(f"✅ Already converted: {file}")
                continue

            try:
                # Convert MP3 to WAV
                audio = AudioSegment.from_mp3(mp3_path)
                audio.export(wav_path, format="wav")
                converted_files += 1
                print(f"🎵 Converted: {file} → {wav_path}")
            except Exception as e:
                print(f"❌ Error converting {file}: {e}")

    if converted_files == 0:
        print("⚡ No new MP3 files were converted.")
    else:
        print(f"🎉 Done! {converted_files} MP3 files converted to WAV.")

# Run conversion
if __name__ == "__main__":
    convert_mp3_to_wav()
