import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Book,
  Settings,
  MessageCircle,
  Zap,
  Shield,
  Code,
  Lightbulb,
  Search,
  Package,
  Brain,
  GitBranch,
  Eye,
  Link,
  ArrowLeft,
  FileText,
  ExternalLink,
  Download,
  Star,
  AlertCircle,
  Mic,
  Link2,
} from "lucide-react";

const Knowledge = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activePlugin, setActivePlugin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Plugin configuration with icons, colors, and README content
  const pluginConfig = {
    "intelligence-agent": {
      name: "Intelligence Agent",
      icon: <Brain className="w-5 h-5" />,
      color: "from-blue-500 to-purple-600",
      status: "active",
      readmeContent: `# Intelligence Agent

A modular, AI-powered utility orchestration package that routes natural language queries to the right tools using LLMs (OpenAI GPT-4o-mini). This plug-and-play framework powers intelligent decisions, dynamic context management, and multi-format response generation for building next-gen AI-native systems.

## Features

### Agent Orchestration Engine
- Smart natural language routing using LLMs  
- Auto-selects tools and generates responses intelligently  
- Maintains context with user chat history  

### Dynamic Tool Registry
- Plug-and-play tool registration  
- Input schema validation for tools  
- Dynamic imports and modular microservice support  

### Context Management
- Persistent JSON-based chat history  
- Customizable roles and metadata injection  
- Configurable memory window for context  

### LLM Response Formatting
- Outputs in JSON, YAML, Python, plain-text  
- Built-in formatting + fallback handling  
- Supports raw or system-prompt guided outputs  

### AI Parameter Enhancement
- Enhances user input dynamically before tool execution  
- LLM-powered parameter filling  
- Highly configurable prompt + temperature tuning  

### Dynamic Import + Registry Helpers
- Decorators to register tools via strings  
- Simple interface for dynamic plugin systems  

## Installation

### Prerequisites

- Python 3.8+
- At least one LLM provider key:
  - OpenAI API Key (\`OPENAI_API_KEY\`)
  - Google Gemini API Key (\`GEMINI_API_KEY\`)
  - Groq API Key (\`GROQ_API_KEY\`)
- Internet connection (for real-time LLM calls)

### Install Locally from Wheel

\`\`\`bash
pip install path/to/logging_utils-<version>-py3-none-any.whl 

Example: 

pip install ai_utility_orchestrator-0.1.0-py3-none-any.whl 
\`\`\`

## Quickstart

### 1. Run the Agent

\`\`\`python
from agent_builder import agent_executor
from utils.toolkit import ConfigUtils

config = ConfigUtils.load_config("config/config_default.json")
prompt = "Search for Python programming tutorials"

response = agent_executor(prompt, config=config)
print(response["final_response"])
\`\`\`

### 2. Load Config with Overrides

\`\`\`python
overrides = {
    "llm": {"temperature": 0.3},
    "enable_parameter_enhancement": True
}

config = ConfigUtils.load_config("config/config_default.json", overrides=overrides)
print(config["llm"]["temperature"])
\`\`\`

### 3. Tool Registration

\`\`\`python
from agent_registry import ToolRegistry, Tool

def greet_tool(params):
    return f"Hello, {params.get('name', 'User')}!"

registry = ToolRegistry()
tool = Tool(name="greeter", description="Greets the user", execute_func=greet_tool, schema={})
registry.register_tool(tool)

result = registry.get_tool("greeter").execute({"name": "Akshay"})
print(result)
\`\`\`

### 4. LLM Response Formatter

\`\`\`python
from utils.response_formatter import format_response

prompt = "Give me three benefits of using AI in healthcare."
formatted = format_response(prompt, formatter="json", model_name="gpt-4o-mini", return_meta=True)

print("Parsed Output:", formatted["parsed_response"])
\`\`\`

## Agent Orchestration Overview

The core orchestrator is \`agent_executor\`. It:
1. Loads available tools  
2. Prompts LLM to infer intent  
3. Executes the chosen tool  
4. Enhances or parses output  
5. Saves chat history in JSON  

## API Reference

| Function/Class               | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| \`agent_executor\`            | Main agent engine that routes user input to the correct tool using LLMs.    |
| \`Tool\`                      | Represents a callable tool with metadata and optional input schema.         |
| \`ToolRegistry\`              | Handles tool registration, listing, and dynamic retrieval.                  |
| \`register_tool\`             | Registers a tool into the live registry during runtime.                     |
| \`ContextManager\`            | Manages user chat history and maintains message context.                    |
| \`get_recent_messages\`       | Returns a limited number of recent messages for a specific user.            |
| \`format_response\`           | Sends prompts to LLM and formats the output into JSON, text, etc.           |

## License

This project is licensed under the **64 Squares License**.`,
    },
    confique: {
      name: "Confique",
      icon: <Settings className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-600",
      status: "active",
      readmeContent: `# Confique

A lightweight configuration utility that provides reliable environment and YAML-based configuration loading. 
Designed for modern Python applications, supporting clean separation of runtime vs. static configuration with fallback handling.

## ✨ Features

- ✅ Load from \`.env\` and \`.yml\` configuration files
- ✅ Fallback defaults for missing keys
- ✅ Simple \`.get()\` interface for key-based access
- ✅ Safe and readable error handling
- ✅ Class-based loaders for modularity
- ✅ Supports different environments (dev, prod, test)

## 📥 Installation

### Method 1: Install from Wheel File

\`\`\`bash
pip install path/to/config_loader-<version>-py3-none-any.whl
\`\`\`

Example:

\`\`\`bash
pip install ./dist/config_loader-0.1.0-py3-none-any.whl
\`\`\`

### Install Dependencies

\`\`\`bash
pip install python-dotenv pyyaml
\`\`\`

## ⚙️ Basic Usage

### Create a \`.env\` file

\`\`\`env
APP_ENV=production
DEBUG=true
DB_HOST=prod-db
DB_PORT=5432
API_KEY=prod-secret-key
\`\`\`

### Create a \`config.yml\` file

\`\`\`yaml
APP_NAME: MyApp
VERSION: 1.0
ENABLE_LOGGING: true
\`\`\`

### Load Config in Python

\`\`\`python
from config_loader import EnvConfigLoader, YamlConfigLoader

env_loader = EnvConfigLoader(".env")
print(env_loader.get("APP_ENV"))   # production
print(env_loader.get("DB_PORT"))   # 5432

yaml_loader = YamlConfigLoader("config.yml")
print(yaml_loader.get("APP_NAME"))  # MyApp
print(yaml_loader.get("VERSION"))   # 1.0
\`\`\`

## 🔍 API Reference

| Class / Function         | Description                                              | Parameters                                                  | Returns                       |
|--------------------------|----------------------------------------------------------|-------------------------------------------------------------|-------------------------------|
| \`EnvConfigLoader(path)\`  | Loads environment config from a \`.env\` file              | \`path\`: str – Path to \`.env\` file (default: \`.env\`)         | Instance of EnvConfigLoader   |
| \`get(key, default=None)\` | Get value from \`.env\` config                             | \`key\`: str, \`default\`: any (optional)                       | Value from \`.env\` or default  |
| \`YamlConfigLoader(path)\` | Loads structured config from a \`.yml\` file               | \`path\`: str – Path to \`.yml\` file (default: \`config.yml\`)   | Instance of YamlConfigLoader  |
| \`get(key, default=None)\` | Get value from \`.yml\` config                             | \`key\`: str, \`default\`: any (optional)                       | Value from \`.yml\` or default  |

## 🧪 Testing

\`\`\`bash
python tests/you_test_file.py
\`\`\`

## 📄 License

This project is licensed under the 64 Squares LLC License.`,
    },
    docflow: {
      name: "DocFlow",
      icon: <FileText className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      status: "active",
      readmeContent: `# DocFlow

A modular, plug-and-play suite for reading, cleaning, embedding, indexing, and managing documents across local and cloud environments. Supports full RAG pipelines with vector search, OCR, file handling, and multi-cloud storage support.

## Features

### File Handling

- Source: file_handler.py
  The UniversalFileHandler class provides a universal API to manage files across local and cloud storage systems.

- Local File Upload/Download:
  Uploads files to a default or specified directory with versioning
  → upload_file, upload_files, _upload_to_local
  Reads different formats using MIME type detection
  (e.g., .txt, .json, .csv, .docx, .pdf)
  → read_file, read_files
  Writes content in .txt, .json, or .csv format
  → write_file, write_files

- Cloud File Handling:
  Supports upload/download to:
  AWS S3
  → _upload_to_aws, _download_from_aws
  Google Cloud Storage
  → _upload_to_gcp, _download_from_gcp
  Azure Blob Storage
  → _upload_to_azure, _download_from_azure
  Uses cloud-specific credentials with validation via CloudConnectionValidator
  snowflake
  → _upload_to_snowflake, _download_from_snowflake
  Google Cloud Storage
  → _upload_to_mongodb, _download_from_mongodb

- Validation:
  Validate file type, size, and presence
  → validate_file, validate_files

### Text Cleaning

- Source: cleaner.py
  The TextCleaner class implements a configurable and extensible cleaning pipeline for raw text.

- Configurable Steps (applied in order):
  remove_html_tags — Strips HTML using BeautifulSoup
  remove_emojis — Removes Unicode emojis using regex
  remove_accents — Normalizes accented characters using unicodedata
  to_lower — Converts to lowercase
  normalize_whitespace — Normalizes whitespace
  remove_punctuation — Removes punctuation using string.punctuation
  remove_special_chars — Removes non-alphanumeric characters
  remove_stopwords — Removes stopwords using NLTK

- Language Detection:
  Uses langdetect.detect()→ detect_language(text)

- Batch Processing:
  Clean a list of texts → clean_texts(texts)
  Clean a single text → clean_single(text)

### Embedding

- Source: embeddings.py
  The Embedder class provides dynamic embedding generation based on the provider and modality.

- Supported Providers:
  OpenAI — Text only
  Cohere — Text, Image, Multimodal
  Gemini — Text only

- Text Embedding:
  Batching with retry logic→ embed_texts(), _embed_texts_openai, _embed_texts_cohere, _embed_texts_gemini

- Image Embedding:
  Available for Cohere only→ embed_images(), _embed_images_cohere()

- Multimodal Embedding (Text + Image):
  Available for Cohere only→ embed_multimodal(), _embed_multimodal_cohere()

- Token-based batching using tiktoken→ _token_based_batches()

- Environment-based loading via .env keys→ from_env(), config_loader()

### Vector Store Integration

- Source: vector.py
  Supports storing and querying embeddings from various vector databases.

- Databases Supported:
  Chroma → via chromadb.Client()
  PostgreSQL → via psycopg2
  MongoDB (Atlas or Local) → via pymongo
  Snowflake → via snowflake.connector
  Neo4j → via GraphDatabase

- Functions:
  generate_embedding(text) — Generates embeddings using OpenAI
  _index_file(file_path) — Reads and indexes file content
  _index() — Writes documents and embeddings to the database
  _delete_file(file_id) — Deletes documents from the database
  query(query_text, top_k=3) — Returns top matching documents (MongoDB implemented)

## Installation

### Prerequisites
- Python ≥ 3.8
- pip ≥ 20.0
- virtualenv (recommended)

### Install from Wheel

\`\`\`bash
pip install path/to/docflow-<version>-py3-none-any.whl

# Example:
pip install ./dist/docflow-0.1.0-py3-none-any.whl
\`\`\`

## Quickstart

### Manual Processing Workflow

\`\`\`python
from file_utils import UniversalFileHandler
from text_cleaning import TextCleaner
from embedding_utils import Embedder
from vector_utils import VectorStore

text = UniversalFileHandler().read_file("docs/sample.pdf")
cleaned = TextCleaner().clean_single(text)
embedding = Embedder(provider="openai").embed_texts([cleaned])
VectorStore("chroma")._index_file("docs/sample.pdf")
\`\`\`

## API Reference

| Function/Class               | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| \`UniversalFileHandler\`       |Unified interface for reading, writing, validating, uploading, and           |
|                              |downloading files across local, AWS S3, GCP, Azure, MongoDB,and Snowflake.   |
|                              |Supports various formats including \`.txt\`, \`.pdf\`, \`.docx\`, \`.csv\`, \`.json\`, |
|                              |\`.yaml\`.                                                                     |
| \`TextCleaner\`                |Flexible and configurable text preprocessor that supports removing HTML tags |
|                              |,emojis, accents, stopwords, and punctuation. Can clean individual           |
|                              |strings or batches with language detection and custom cleaning pipelines.    |
| \`Embedder\`                   |Generates vector embeddings from text, images, or multimodal data using      |
|                              |OpenAI, Cohere, or Gemini. Supports batch embedding with retry logic and     |
|                              |dynamic provider switching.                                                  |
| \`VectorStore\`                |Abstract handler for connecting to vector databases (Chroma, PostgreSQL,     |
|                              |MongoDB, Snowflake, etc.), and indexing/querying document embeddings using   |
|                              |semantic similarity.                                                         |    

## License

This project is licensed under the **64 Squares License**.`,
    },
    "insight-logger": {
      name: "InsightLogger",
      icon: <FileText className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-600",
      status: "active",
      readmeContent: `# InsightLogger

A comprehensive, production-ready logging utility that provides universal logging capabilities supporting file, console, and multiple databases (MongoDB, Snowflake). Designed for modern Python applications with built-in support for web frameworks, async operations, and automatic logging features.

## Features

- **Multi-Output Logging**: File, console, and database logging simultaneously  
- **Database Support**: MongoDB and Snowflake integration out of the box  
- **JSON & Plain Text Formats**: Structured logging with customizable formats  
- **Async-Safe Logging**: Queue-based logging for high-performance applications  
- **Automatic Logging**: Decorators and middleware for automatic function/request logging  
- **Web Framework Integration**: Built-in support for Flask and FastAPI  
- **Exception Handling**: Global exception logging and automatic traceback capture  
- **Log Rotation**: Configurable file rotation with size limits  
- **Custom Fields**: Add contextual information to any log entry  
- **Standard Library Integration**: Capture logs from third-party libraries  

## Installation

### Method 1: Install from Wheel File
\`\`\`bash
pip install path/to/logging_utils-<version>-py3-none-any.whl
\`\`\`

Example:
\`\`\`bash
pip install ./dist/logging_utils-0.1.0-py3-none-any.whl
\`\`\`

### Install Dependencies
\`\`\`bash
pip install pymongo snowflake-connector-python
\`\`\`

## Basic Usage

### Simple Setup
\`\`\`python
from logging_utils import UniversalLogger

logger = UniversalLogger(name="MyApp")
logger.info("Hello from logging_utils!")
\`\`\`

### Advanced Configuration
\`\`\`python
from logging_utils import UniversalLogger

logger = UniversalLogger(
    name="ProductionApp",
    log_file="production.log",
    log_level="DEBUG",
    max_file_size=10 * 1024 * 1024,
    backup_count=5,
    log_format="json",
    console_output=True,
    async_safe=False
)
\`\`\`

### Log Levels
- \`DEBUG\`, \`INFO\`, \`WARNING\`, \`ERROR\`, \`CRITICAL\`

### Async-Safe Logging
- Use \`async_safe=True\` for FastAPI/Flask apps

## Log Structure

### Default Fields
Includes timestamp, level, name, message, filename, line number, thread, and process

### Custom Fields
\`\`\`python
logger.info("User logged in", extra={"user_id": 123, "action": "login"})
\`\`\`

### Exception Logging
\`\`\`python
try:
    1 / 0
except ZeroDivisionError:
    logger.exception("Math failed")
\`\`\`

## Database Logging

### MongoDB
\`\`\`python
logger.add_db_handler(
    "mongodb",
    {"uri": "mongodb://localhost:27017", "database": "myapp"},
    "logs"
)
\`\`\`

### Snowflake
\`\`\`python
logger.add_db_handler(
    "snowflake",
    {
        "user": "username",
        "password": "password",
        "account": "account",
        "warehouse": "warehouse",
        "database": "database",
        "schema": "schema",
        "role": "role"
    },
    "logs"
)
\`\`\`

## Automatic Logging Features

### Auto-Log Uncaught Exceptions
\`\`\`python
from logging_utils import auto_log_exceptions
auto_log_exceptions(logger)
\`\`\`

### Auto-Log Functions
\`\`\`python
from logging_utils import auto_log_function

@auto_log_function(logger)
def my_function(x, y):
    return x + y
\`\`\`

### Capture Standard Logs
\`\`\`python
from logging_utils import auto_log_standard
auto_log_standard(logger)
\`\`\`

## Web Framework Integration

### Flask
\`\`\`python
from flask import Flask
from logging_utils import auto_log_flask

app = Flask(__name__)
auto_log_flask(app, logger)
\`\`\`

### FastAPI
\`\`\`python
from fastapi import FastAPI
from logging_utils import auto_log_fastapi

app = FastAPI()
auto_log_fastapi(app, logger)
\`\`\`

## Real-World Examples

### Simple Application
\`\`\`python
from logging_utils import UniversalLogger, auto_log_function

logger = UniversalLogger(name="MyApp", log_file="app.log")

@auto_log_function(logger)
def process_data(data):
    logger.info("Processing data", extra={"data_size": len(data)})
    return data.upper()

result = process_data("hello world")
\`\`\`

### With MongoDB
\`\`\`python
logger = UniversalLogger(name="WebApp")

logger.add_db_handler(
    "mongodb",
    {"uri": "mongodb://localhost:27017", "database": "myapp"},
    "logs"
)

logger.info("Application started")
\`\`\`

## License

This project is licensed under the **64 Squares License**.`,
    },
    "voice-assistant": {
      name: "Voice Assistant API",
      icon: <Mic className="w-5 h-5" />,
      color: "from-green-500 to-teal-600",
      status: "active",
      readmeContent: `# 🎙️ Voice Assistant API

This package can be used for real-time AI conversation using voice.
Users send an audio file → get a natural response in text and audio format.

## ✅ What This API Does

* Accepts a voice/audio file (\`.mp3\`, \`.wav\`, etc.)
* Transcribes speech to text using Deepgram
* Sends the transcript to a friendly AI model (OpenAI GPT or Groq LLaMA)
* Converts the AI response back to audio using Deepgram TTS
* Returns:
  * the transcript,
  * the AI's response (text),
  * and a base64 MP3 audio response

## ⚙️ How to Use This API
You can start using this package in 3 simple steps:

1. Make sure the backend is deployed
Ask your developer, team, or hosting service for the backend URL
(e.g. \`https://your-backend.com/transcribe\`)
You don't need to clone or install anything yourself.

2. Send a \`POST\` request to \`/transcribe\` with your audio file
Here's a quick example using \`curl\`:

\`\`\`bash
curl -X POST https://your-backend.com/transcribe \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio=@your_audio_file.mp3"
\`\`\`

You can also use:
* Postman
* JavaScript \`fetch\`
* Python \`requests\`

## 🧑‍💻 Example: Send Audio (JavaScript)
\`\`\`js
const formData = new FormData();
formData.append("audio", yourAudioBlobOrFile, "audio.wav");

const response = await fetch("https://your-backend.com/transcribe", {
  method: "POST",
  body: formData
});

const data = await response.json();
console.log("Transcript:", data.transcript);
console.log("AI Response:", data.response);
\`\`\`

## 🔊 Example: Play AI Response Audio (JavaScript)
\`\`\`js
if (data.audio) {
  const audioData = atob(data.audio); // decode base64
  const audioArray = new Uint8Array(audioData.length);
  for (let i = 0; i < audioData.length; i++) {
    audioArray[i] = audioData.charCodeAt(i);
  }
  const audioBlob = new Blob([audioArray], { type: "audio/mpeg" });
  const audioUrl = URL.createObjectURL(audioBlob);
  const audioPlayer = new Audio(audioUrl);
  audioPlayer.play();
}
\`\`\`

3. Get the response
You'll receive a JSON response like this:

\`\`\`json
{
  "transcript": "Hey, how are you?",
  "response": "Hey! I'm doing great, thanks for asking. How about you?",
  "audio": "BASE64_ENCODED_MP3_STRING",
  "audio_format": "mp3"
}
\`\`\`

You can:
* Read the response text
* Play the audio by decoding the base64 string in the frontend

## 🔧 How to Configure It (for developers)
To configure this backend, set up a \`.env\` file with the following:
\`\`\`env
Required API key for Deepgram (for both transcription and speech)
DEEPGRAM_API_KEY=your_deepgram_key

Provide the API key for the selected LLM
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

Choose one LLM provider
Options: "groq", "openai", "mistral"
LLM_PROVIDER=groq 
\`\`\`
Whichever model is selected in \`LLM_PROVIDER\`, the corresponding key must be available.

## 🧠 Supported LLM Models
- For openai, it uses gpt-4o
- For groq, it uses meta-llama/llama-4-scout-17b-16e-instruct
- Mistral option is placeholder for future use (not yet implemented)

## 📦 Features
* No installation or cloning required for end users
* Accepts audio files up to 10MB
* Friendly AI responses in casual tone
* Base64 audio output for easy embedding in web/mobile apps

## 💡 Use Cases
* Voice-powered chatbots
* Personal AI assistants
* Voice user interfaces for apps
* Conversational AI demos

## License
This project is licensed under the **64 Squares License**.`,
    },"api-bridge": {
      name: "APIBridge",
      icon: <Link2 className="w-5 h-5" />,
      color: "from-red-500 to-orange-600",
      status: "active",
      readmeContent: `# 🧠 APIBridge 

A modular, production-ready FastAPI application to bridge your frontend with LLMs or backend logic. Built for intelligent applications requiring dynamic queries, contextual memory, analytics, and document management.

## ✨ Features

- ✅ Organized routers for LLM, documents, and analytics  
- ✅ Pluggable LLM handler via constructor  
- ✅ Static file serving for frontend UIs (React, HTML, etc.)  
- ✅ Robust validation and error handling  
- ✅ Fully CORS-compliant  
- ✅ Compatible with any backend model or engine (OpenAI, Claude, custom logic)  
- ✅ Health checks, analytics, and status endpoints  
- ✅ Swagger UI auto-generated  

## 📥 Installation

### Prerequisites
- Python ≥ 3.8

### Option 1: Standard Installation

\`\`\`bash
pip install fastapi uvicorn pydantic
\`\`\`

### Option 2: Install from Wheel

\`\`\`bash
pip install ./dist/frontend_api-0.1.2-py3-none-any.whl
\`\`\`

## 🧪 Quickstart Example

Create a file called \`test_frontend.py\`:

\`\`\`python
from frontend_api.frontend.frontend_api import FrontendUtilsAPI

def dummy_llm_handler(query, metadata):
    return f"Answer to: {query}"

def dummy_info_handler(context, metadata):
    return f"Stored info: {context}"

api = FrontendUtilsAPI(dummy_llm_handler, dummy_info_handler)
app = api.get_app()
\`\`\`

Run the API:

\`\`\`bash
uvicorn test_frontend:app --reload
\`\`\`

Swagger UI will be available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## 📘 API Reference

| Method | Endpoint              | Description                            | Request Body / Query Params                                                                 | Response Example |
|--------|-----------------------|----------------------------------------|---------------------------------------------------------------------------------------------|------------------|
| POST   | \`/ask\`                | Ask a question and receive a response  | \`{ "query": "What is FastAPI?", "metadata": { "user": "test" } }\`                          | \`{ "response": "Answer to: What is FastAPI?" }\` |
| POST   | \`/add-info\`           | Add contextual information             | \`{ "context": "FastAPI is a Python web framework.", "metadata": { "source": "Wikipedia" } }\` | \`{ "response": "Stored info: FastAPI is a Python web framework." }\` |
| GET    | \`/status\`             | Check if the API is running            | _None_                                                                                      | \`{ "status": "API is running" }\` |
| PUT    | \`/update-info\`        | Replace stored context                 | \`{ "context": "Updated definition of FastAPI.", "metadata": {} }\`                           | *Depends on handler* |
| DELETE | \`/delete-info\`        | Delete specific info by query string   | Query: \`?query=fastapi\`                                                                     | \`{ "message": "Deleted info related to query: fastapi" }\` |
| PATCH  | \`/patch-info\`         | Partially update stored context        | \`{ "context": "Additional details added to context.", "metadata": {} }\`                     | *Depends on handler* |
| GET    | \`/llm/models\`         | List available LLM model names         | _None_                                                                                      | \`["gpt-4", "claude-3", "llama-3"]\` |

## 📄 Document Management API

### 📤 Upload a Document

\`\`\`python
import requests

with open("resume.pdf", "rb") as file:
    response = requests.post(
        "http://localhost:8000/documents/upload",
        files={"file": ("resume.pdf", file, "application/pdf")}
    )

print(response.json())
\`\`\`

## 📈 Analytics Endpoints

### \`GET /analytics/stats\`

Returns usage statistics:

\`\`\`json
{
  "total_queries": 1250,
  "avg_response_time": 0.85,
  "popular_topics": ["AI", "FastAPI", "Python"]
}
\`\`\`

### \`GET /analytics/health\`

Returns API health and uptime:

\`\`\`json
{
  "status": "healthy",
  "uptime": "24h"
}
\`\`\`

## 🧪 Running Tests

Make sure your tests are in the \`tests/\` folder. Run:

\`\`\`bash
pytest tests/test_frontend.py
python tests/your_test_file.py
\`\`\`

## 📄 License

This project is licensed under the **64 squares License**.`
    }
  };

  // Parse README content into sections
  const parseReadmeContent = (content, pluginId) => {
    const lines = content.split("\n");
    const sections = [];
    let currentSection = null;
    let currentContent = [];

    for (const line of lines) {
      if (line.startsWith("#")) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            content: currentContent.join("\n").trim(),
          });
        }

        // Start new section
        currentSection = line.replace(/^#+\s*/, "");
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }

    // Add last section
    if (currentSection) {
      sections.push({
        title: currentSection,
        content: currentContent.join("\n").trim(),
      });
    }

    // If no sections found, create a single overview section
    if (sections.length === 0) {
      sections.push({
        title: "Overview",
        content: content,
      });
    }

    return sections;
  };

  // Extract description from README content
  const extractDescription = (content) => {
    const lines = content.split("\n");
    for (const line of lines) {
      if (line.trim() && !line.startsWith("#") && !line.startsWith("```")) {
        return line.trim();
      }
    }
    return "Plugin documentation";
  };

  // Extract version from README content
  const extractVersion = (content) => {
    const versionMatch = content.match(/version[:\s]+(\d+\.\d+\.\d+)/i);
    return versionMatch ? versionMatch[1] : "1.0.0";
  };

  // Load plugins from config
  useEffect(() => {
    const loadPlugins = async () => {
      setLoading(true);
      setError(null);

      try {
        const loadedPlugins = [];

        for (const [pluginId, config] of Object.entries(pluginConfig)) {
          try {
            const sections = parseReadmeContent(config.readmeContent, pluginId);
            const description = extractDescription(config.readmeContent);
            const version = extractVersion(config.readmeContent);

            loadedPlugins.push({
              id: pluginId,
              name: config.name,
              description: description,
              icon: config.icon,
              version: version,
              status: config.status,
              color: config.color,
              sections: sections,
            });
          } catch (pluginError) {
            console.warn(`Error processing plugin ${pluginId}:`, pluginError);
            loadedPlugins.push({
              id: pluginId,
              name: config.name,
              description: `${config.name} plugin documentation`,
              icon: config.icon,
              version: "1.0.0",
              status: config.status,
              color: config.color,
              sections: [
                {
                  title: "Overview",
                  content: `# ${config.name}\n\nDocumentation for ${config.name} plugin.`,
                },
              ],
            });
          }
        }

        setPlugins(loadedPlugins);
      } catch (err) {
        setError("Failed to load plugin documentation");
        console.error("Error loading plugins:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlugins();
  }, []);

  const aiStudioSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Lightbulb className="w-4 h-4" />,
      content: {
        title: "Getting Started with NEXUS AI Studio",
        description:
          "Learn the basics of using AI Playground to build intelligent conversations",
        items: [
          {
            title: "Quick Start Guide",
            content: `
**Welcome to NEXUS AI Studio!** 🚀

The AI Playground is your creative workspace for building and testing AI conversations. Here's how to get started:

### 1. Choose Your AI Model
- Navigate to the **Model Configuration** panel on the right
- Select from GPT-4 Turbo, Claude 3, Gemini Pro, and more
- Each model has different strengths and capabilities

### 2. Configure System Message
- Use preset roles: Helpful Assistant, Creative Writer, Technical Expert, or Teacher
- Customize the system message to define your AI's personality and behavior
- Click "Apply" to activate your changes

### 3. Start Conversing
- Type your message in the chat input
- Use Shift+Enter for new lines, Enter to send
- Watch your AI respond based on your configuration

### 4. Fine-tune Parameters
- **Temperature**: Controls creativity (0 = focused, 1 = creative)
- **Max Tokens**: Sets response length limit
- **Top P**: Affects response diversity

🎯 **Pro Tip**: Start with the "Helpful Assistant" preset and gradually customize from there!
            `,
          },
          {
            title: "Interface Overview",
            content: `
### Main Interface Components

**🗨️ Chat Panel**
- View conversation history
- Switch between Chat, Code, and Preview modes
- Real-time message streaming

**⚙️ Settings Panel**
- Model selection and configuration
- System message customization
- Parameter adjustment sliders

**📊 Status Indicators**
- Green dot: System ready
- Model badge: Currently selected AI
- System messages: Configuration updates

**🔧 Action Buttons**
- Export: Save conversations
- Deploy: Publish your AI configuration
- Reset: Return to default settings
            `,
          },
        ],
      },
    },
    {
      id: "plugins-overview",
      title: "Plugins",
      icon: <Package className="w-4 h-4" />,
      content: {
        title: "Plugin System Overview",
        description: "Extend NEXUS AI Studio with powerful plugins",
        items: [
          {
            title: "Available Plugins",
            content: `
NEXUS AI Studio supports a rich ecosystem of plugins to extend functionality:

### 🧠 Intelligence Agent
Advanced AI orchestration and tool routing system.

### 👁️ Web Scraper  
Extract and process web content intelligently.

### 🔄 Data Processor
Transform and analyze data with AI assistance.

### 🔗 API Connector
Seamlessly integrate with external services.

### 📝 Content Generator
Create various types of content using AI.

Click on any plugin below to view detailed documentation.
            `,
          },
        ],
      },
    },
  ];

  const filteredSections = aiStudioSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const filteredPlugins = plugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSection = aiStudioSections.find((s) => s.id === activeSection);
  const currentPlugin = plugins.find((p) => p.id === activePlugin);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/20";
      case "beta":
        return "text-yellow-400 bg-yellow-500/20";
      case "inactive":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const handlePluginClick = (pluginId) => {
    setActivePlugin(pluginId);
    setActiveSection(null);
  };

  const handleBackToStudio = () => {
    setActivePlugin(null);
    setActiveSection("getting-started");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white/60">Loading plugin documentation...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <AlertCircle className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-white/60 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/30 transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-950 text-white">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 8 + "s",
              animationDuration: 8 + Math.random() * 4 + "s",
            }}
          />
        ))}
      </div>

      <div className="h-screen w-full relative z-10 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {activePlugin && (
                  <button
                    onClick={handleBackToStudio}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
                    {activePlugin ? (
                      <>
                        {currentPlugin?.icon}
                        {currentPlugin?.name}
                      </>
                    ) : (
                      <>
                        <Book className="w-8 h-8 text-blue-400" />
                        Knowledge Base
                      </>
                    )}
                  </h1>
                  <p className="text-white/60 text-lg">
                    {activePlugin
                      ? currentPlugin?.description
                      : "Complete guide to NEXUS AI Studio and plugins"}
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            {!activePlugin ? (
              <div className="flex flex-wrap gap-2 mb-8">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                        : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${currentPlugin?.color} bg-opacity-20`}
                  >
                    {currentPlugin?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold">
                        Version {currentPlugin?.version}
                      </span>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          currentPlugin?.status
                        )}`}
                      >
                        {currentPlugin?.status}
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">
                      {currentPlugin?.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          {activePlugin ? (
            /* Plugin Documentation */
            <div className="space-y-6">
              {currentPlugin?.sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      toggleExpanded(`plugin-${activePlugin}-${index}`)
                    }
                    className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-200"
                  >
                    <h3 className="text-xl font-semibold text-left">
                      {section.title}
                    </h3>
                    {expandedItems[`plugin-${activePlugin}-${index}`] ? (
                      <ChevronDown className="w-5 h-5 text-blue-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-white/60" />
                    )}
                  </button>

                  {expandedItems[`plugin-${activePlugin}-${index}`] && (
                    <div className="px-6 pb-6">
                      <div className="prose prose-invert prose-blue max-w-none">
                        <div
                          className="text-white/80 leading-relaxed whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: section.content
                              .replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-white font-semibold">$1</strong>'
                              )
                              .replace(
                                /\*(.*?)\*/g,
                                '<em class="text-blue-300">$1</em>'
                              )
                              .replace(
                                /###\s(.*)/g,
                                '<h3 class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>'
                              )
                              .replace(
                                /##\s(.*)/g,
                                '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>'
                              )
                              .replace(
                                /```([\s\S]*?)```/g,
                                '<pre class="bg-black/30 border border-white/20 rounded-lg p-4 mt-4 mb-4 overflow-x-auto"><code class="text-green-300 text-sm">$1</code></pre>'
                              )
                              .replace(
                                /`(.*?)`/g,
                                '<code class="bg-white/10 px-2 py-1 rounded text-green-300 text-sm">$1</code>'
                              )
                              .replace(
                                /^- (.*)/gm,
                                '<li class="ml-4 mb-2">$1</li>'
                              )
                              .replace(
                                /(\d+\.\s.*)/g,
                                '<div class="ml-4 mb-2">$1</div>'
                              )
                              .replace(
                                /\|(.*)\|/g,
                                '<div class="overflow-x-auto"><table class="w-full border-collapse border border-white/20 mt-4 mb-4"><tr class="bg-white/5">$1</tr></table></div>'
                              ),
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : activeSection === "plugins-overview" ? (
            /* Plugin Listing */
            <div>
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  Available Plugins
                </h2>
                <p className="text-white/70 text-lg">
                  Extend NEXUS AI Studio with these powerful plugins
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {filteredPlugins.map((plugin) => (
                  <div
                    key={plugin.id}
                    className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => handlePluginClick(plugin.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${plugin.color} bg-opacity-20 flex-shrink-0`}
                      >
                        {plugin.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold truncate">
                            {plugin.name}
                          </h3>
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              plugin.status
                            )}`}
                          >
                            {plugin.status}
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mb-3">
                          {plugin.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-white/60">
                            v{plugin.version}
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">
                  Plugin Development
                </h3>
                <p className="text-white/70 mb-4">
                  Want to create your own plugin? Check out our development
                  resources:
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/30 transition-all duration-200">
                    📚 Plugin API Docs
                  </button>
                  <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition-all duration-200">
                    🔧 Development Kit
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-sm hover:bg-green-500/30 transition-all duration-200">
                    💬 Community
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* AI Studio Documentation */
            currentSection && (
              <div>
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    {currentSection.icon}
                    {currentSection.content.title}
                  </h2>
                  <p className="text-white/70 text-lg">
                    {currentSection.content.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {currentSection.content.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          toggleExpanded(`${currentSection.id}-${index}`)
                        }
                        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-200"
                      >
                        <h3 className="text-xl font-semibold text-left">
                          {item.title}
                        </h3>
                        {expandedItems[`${currentSection.id}-${index}`] ? (
                          <ChevronDown className="w-5 h-5 text-blue-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-white/60" />
                        )}
                      </button>

                      {expandedItems[`${currentSection.id}-${index}`] && (
                        <div className="px-6 pb-6">
                          <div className="prose prose-invert prose-blue max-w-none">
                            <div
                              className="text-white/80 leading-relaxed whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{
                                __html: item.content
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<strong class="text-white font-semibold">$1</strong>'
                                  )
                                  .replace(
                                    /\*(.*?)\*/g,
                                    '<em class="text-blue-300">$1</em>'
                                  )
                                  .replace(
                                    /###\s(.*)/g,
                                    '<h3 class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>'
                                  )
                                  .replace(
                                    /##\s(.*)/g,
                                    '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>'
                                  )
                                  .replace(
                                    /```([\s\S]*?)```/g,
                                    '<pre class="bg-black/30 border border-white/20 rounded-lg p-4 mt-4 mb-4 overflow-x-auto"><code class="text-green-300 text-sm">$1</code></pre>'
                                  )
                                  .replace(
                                    /`(.*?)`/g,
                                    '<code class="bg-white/10 px-2 py-1 rounded text-green-300 text-sm">$1</code>'
                                  )
                                  .replace(
                                    /^- (.*)/gm,
                                    '<li class="ml-4 mb-2">$1</li>'
                                  )
                                  .replace(
                                    /(\d+\.\s.*)/g,
                                    '<div class="ml-4 mb-2">$1</div>'
                                  ),
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
                  <h3 className="text-lg font-semibold mb-2">
                    Need More Help?
                  </h3>
                  <p className="text-white/70 mb-4">
                    Can't find what you're looking for? Check out these
                    additional resources:
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/30 transition-all duration-200">
                      📚 Tutorials
                    </button>
                    <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition-all duration-200">
                      💬 Community
                    </button>
                    <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-sm hover:bg-green-500/30 transition-all duration-200">
                      🎫 Support
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 8s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Knowledge;
