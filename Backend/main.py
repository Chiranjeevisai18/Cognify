from fastapi import FastAPI, File, UploadFile
import librosa
import numpy as np
import pretty_midi
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

def audio_to_notation(audio_path):
    y, sr = librosa.load(audio_path)

    # Extract pitches and onsets
    onset_frames = librosa.onset.onset_detect(y=y, sr=sr)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)

    notation_data = []

    for onset in onset_times:
        pitch_index = np.argmax(pitches[:, int(onset * sr / 512)])
        if pitch_index > 0:
            note_name = pretty_midi.note_number_to_name(pitch_index)
            notation_data.append({
                "pitch": note_name,
                "start": float(onset),
                "duration": 0.5
            })

    return notation_data
@app.get("/")
async def root():
    return {"message": "Welcome to the Raga Notation API"}

@app.post("/upload/")
async def upload_audio(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    notation = audio_to_notation(file_path)
    
    return {"notation": notation}

