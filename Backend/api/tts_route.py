import base64
import os
import time
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.tts import ConvertToSpeech

app = APIRouter()

class TTSRequest(BaseModel):
    text: str

@app.post("/text-to-speech")
async def text_to_speech_api(request: TTSRequest):
    start_time = time.time()

    try:
        deepgram_api_key = os.getenv("DEEPGRAM_API_KEY")
        if not deepgram_api_key:
            raise HTTPException(status_code=500, detail="DEEPGRAM_API_KEY not found")

        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text input is empty")

        if len(request.text) > 2000:
            raise HTTPException(status_code=400, detail="Text exceeds 2000 character limit")

        audio_response = await ConvertToSpeech.text_to_speech(request.text, deepgram_api_key)

        if audio_response:
            audio_base64 = base64.b64encode(audio_response).decode("utf-8")
            return {
                "audio": audio_base64,
                "audio_format": "mp3"
            }

        raise HTTPException(status_code=500, detail="Failed to generate speech")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
