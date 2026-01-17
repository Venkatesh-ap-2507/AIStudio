from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as chat_router
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os
from urllib.parse import urlparse
from api.transcribe import app as transcribe_router
from api.tts_route import app as tts_router
from utils.logger import setup_logger
load_dotenv()
url = os.getenv("URL")
parsed_url = urlparse(url)
host = parsed_url.hostname
port = parsed_url.port

app = FastAPI(title="AI Studio V2",
              description="Enhanced AI Studio with PDF Page Number Support")

# Initialize logger on startup


@app.on_event("startup")
async def startup_event():
    setup_logger("ai_studio", "INFO")
    print("🚀 AI Studio V2 Backend starting up...")
    print("📄 PDF Page Number Support: ENABLED")
    print("🔍 Enhanced logging: ENABLED")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://13.202.236.112:5177",
        "http://localhost:5177", "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="plugins_repo"), name="plugins_repo")
app.include_router(chat_router)
app.include_router(transcribe_router)
app.include_router(tts_router)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=host, port=port, reload=True)
