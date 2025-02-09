import os
import soundfile as sf

AUDIO_DIR = "assets/audio_files"

skipped_files = []
valid_files = []

for file in os.listdir(AUDIO_DIR):
    if file.endswith(".wav"):
        file_path = os.path.join(AUDIO_DIR, file)
        try:
            with sf.SoundFile(file_path) as f:
                valid_files.append(file)
        except Exception as e:
            skipped_files.append((file, str(e)))

print(f"✅ Valid files: {len(valid_files)} / 83")
print(f"❌ Skipped files: {len(skipped_files)}")
for name, error in skipped_files:
    print(f"- {name}: {error}")
