# AI Studio V2

AI Studio V2 is a comprehensive AI-powered platform that combines conversational AI, document processing, voice transcription, text-to-speech, and plugin extensibility. Built with a modern full-stack architecture using FastAPI backend and React frontend.

## Features

### Core Functionality
- **Conversational AI**: Chat with multiple LLM models (OpenAI GPT, Groq)
- **Document Processing**: Upload and process PDF documents with page number support
- **Voice Integration**: Real-time speech-to-text transcription using Deepgram
- **Text-to-Speech**: Convert AI responses to audio output
- **Plugin System**: Extensible architecture with downloadable plugins
- **Analytics Dashboard**: Monitor usage and performance metrics
- **Knowledge Base**: Store and retrieve contextual information

### Technical Features
- **Multi-Modal Input**: Support for text, voice, and document inputs
- **Streaming Responses**: Real-time response generation
- **Session Management**: Persistent chat sessions with cleanup
- **Embedding Service**: Vector-based document search and retrieval
- **Reranking**: Improved search result relevance
- **Enhanced Logging**: Comprehensive logging system

## Architecture

### Backend (Python/FastAPI)
- **Framework**: FastAPI with automatic API documentation
- **AI Services**:
  - OpenAI integration for GPT models
  - Groq for fast inference
  - Deepgram for speech processing
- **Document Processing**: PyMuPDF for PDF handling
- **Vector Database**: Embedding and retrieval services
- **Plugin Repository**: Hosted plugin wheel files

### Frontend (React/Vite)
- **Framework**: React 19 with Vite for fast development
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router for navigation
- **Charts**: Recharts for analytics visualization
- **3D Elements**: Three.js integration
- **Icons**: Lucide React icon library

## Project Structure

```
AIStudio/
├── Backend/
│   ├── api/
│   │   ├── routes.py          # Main chat API endpoints
│   │   ├── transcribe.py      # Voice transcription API
│   │   └── tts_route.py       # Text-to-speech API
│   ├── services/
│   │   ├── responder.py       # LLM response generation
│   │   ├── file_service.py    # File upload/processing
│   │   ├── embedding_service.py # Vector embeddings
│   │   ├── transcriber.py     # Deepgram integration
│   │   └── tts.py            # Speech synthesis
│   ├── utils/
│   │   ├── content_processor.py
│   │   ├── logger.py
│   │   └── snowflake_setup.py
│   ├── schemas/
│   ├── logs/
│   ├── plugins_repo/          # Plugin wheel files
│   ├── config.py
│   ├── config.yaml
│   ├── main.py               # FastAPI application
│   ├── requirements.txt
│   └── test_transcribe_modes.py
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat.jsx
│   │   │   ├── header.jsx
│   │   │   ├── settingsPanel.jsx
│   │   │   └── sidebar.jsx
│   │   ├── pages/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   ├── Knowledge.jsx
│   │   │   ├── Plugins.jsx
│   │   │   ├── studio.jsx
│   │   │   └── setting.jsx
│   │   ├── context/
│   │   │   └── ChatContext.jsx
│   │   ├── plugins/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── navigation.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- API Keys:
  - OpenAI API key
  - Deepgram API key
  - Groq API key (optional)

## Installation

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_key
   DEEPGRAM_API_KEY=your_deepgram_key
   GROQ_API_KEY=your_groq_key
   URL=http://localhost:8077
   ```

5. Run the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (if needed):
   ```
   VITE_BACKEND_URL=http://localhost:8077
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Chat Interface
- Select AI models and adjust parameters
- Upload documents for context-aware responses
- Use voice input for transcription
- Enable document mode for enhanced processing

### Plugins
- Browse available plugins in the Plugins section
- Download and install plugins from the repository
- Extend functionality with custom plugins

### Analytics
- View usage statistics and performance metrics
- Monitor chat sessions and response times
- Track plugin usage

### Settings
- Configure AI model parameters
- Manage system prompts
- Adjust voice settings

## API Endpoints

### Chat
- `POST /chat` - Send chat messages
- `POST /chat/stream` - Streaming chat responses
- `POST /cleanup-session` - Clean up chat sessions

### Transcription
- `POST /transcribe` - Transcribe audio files

### TTS
- `POST /tts` - Convert text to speech

### Plugins
- `GET /static/{plugin_name}` - Download plugin files

## Configuration

### Backend Configuration
- Edit `config.py` for system prompts and settings
- Modify `config.yaml` for additional configuration (currently minimal)

### Frontend Configuration
- Environment variables in `.env`
- Vite configuration in `vite.config.js`
- Tailwind configuration in `tailwind.config.js`

## Development

### Running Tests
```bash
# Backend tests
cd Backend
python -m pytest

# Frontend tests (if configured)
cd Frontend
npm test
```

### Building for Production
```bash
# Backend
cd Backend
# Use a production WSGI server like gunicorn

# Frontend
cd Frontend
npm run build
```

### Linting
```bash
# Frontend
npm run lint
```

## Plugins

The platform supports a plugin system with the following available plugins:

- **Insight Logger**: Logging utilities
- **Confique**: Configuration loader
- **API Bridge**: Frontend API integration
- **DocFlow**: Document processing workflow
- **Intelligence Agent**: AI utility orchestrator
- **Vocalis**: Voice assistant features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]

## Support

For support and questions:
- Check the logs in `Backend/logs/`
- Review API documentation at `http://localhost:8077/docs`
- Check browser console for frontend issues

## Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Custom model fine-tuning
- [ ] Real-time collaboration
- [ ] Mobile app development