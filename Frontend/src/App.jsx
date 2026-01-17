import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Paperclip, Mic, MicOff } from "lucide-react";
import Header from "./components/header";
import SettingsPanel from "./components/settingsPanel";
import { ChatContext, ChatProvider } from "../context/ChatContext";
import Chat from "./components/chat";

const NEXUSAiStudio = () => {
  // Get context values
  const {
    chatHistory,
    addMessage,
    model,
    setModel,
    temperature,
    setTemperature,
    topP,
    setTopP,
    systemPrompt,
    setSystemPrompt,
    handleResetSystem,
    handlePresetClick,
    setSystemMessage,
    systemMessage,
    addSystemMessage,
    handleApplySystem,
    modelNames,
    handleVoiceTranscription,
    messages,
    setMessages,
    systemStatus,
    showSystemStatus,
    handleSendMessage, // Added this from context
  } = useContext(ChatContext);

  // Local state
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("Chat");
  const [activeNavItem, setActiveNavItem] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [maxTokens, setMaxTokens] = useState(2000);
  const [activePreset, setActivePreset] = useState("helpful");
  const [streamResponse, setStreamResponse] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [codeHighlighting, setCodeHighlighting] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentMode, setDocumentMode] = useState(false); // Document mode state

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const navigate = useNavigate();

  // Session management for document cleanup
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // Cleanup function to delete session data
  const cleanupSession = async (sessionId) => {
    if (!sessionId) return;
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8077';
      const response = await fetch(`${backendUrl}/api/cleanup-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
      
      if (response.ok) {
        console.log('🧹 Session cleaned up successfully');
        setCurrentSessionId(null);
      } else {
        console.error('❌ Failed to cleanup session');
      }
    } catch (error) {
      console.error('❌ Error cleaning up session:', error);
    }
  };

  // Manual clear chat function - PRESERVES DOCUMENTS
  const handleClearChat = () => {
    // DISABLED: Don't delete documents when clearing chat
    // if (currentSessionId) {
    //   cleanupSession(currentSessionId);
    // }

    // Only clear the UI, keep documents and session
    setInputValue('');
    setMessages([]);
    console.log('🧹 Chat UI cleared, documents preserved');
  };

  // Manual delete documents function - EXPLICIT ACTION ONLY
  const handleDeleteDocuments = async () => {
    if (currentSessionId && window.confirm('Are you sure you want to delete all uploaded documents? This action cannot be undone.')) {
      await cleanupSession(currentSessionId);
      setDocumentMode(false);
      setInputValue('');
      setMessages([]);
      console.log('🗑️ Documents deleted and session reset');
    }
  };

  const presets = {
    helpful:
      "You are a helpful AI assistant. You provide accurate, thoughtful responses and ask clarifying questions when needed.",
    creative:
      "You are a creative writing assistant. You help users brainstorm ideas, write engaging content, and explore imaginative concepts with enthusiasm and originality.",
    technical:
      "You are a technical expert and programming assistant. You provide detailed, accurate technical information, debug code, and explain complex concepts clearly.",
    teacher:
      "You are a patient and encouraging teacher. You break down complex topics into understandable steps, provide examples, and adapt your explanations to the student's level.",
  };

  const startSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputValue(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      window.currentRecognition = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser");
      setIsRecording(false);
    }
  };

  const stopSpeechRecognition = () => {
    if (window.currentRecognition) {
      window.currentRecognition.stop();
      window.currentRecognition = null;
    }
  };

  useEffect(() => {
    createParticles();
    handlePresetClick("helpful");

    // Cleanup function
    return () => {
      if (window.currentRecognition) {
        window.currentRecognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Exit detection and session cleanup - DISABLED TO PRESERVE DOCUMENTS
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (currentSessionId) {
        console.log('🚪 User is leaving, but preserving session data...');
        // DISABLED: Automatic cleanup to preserve documents
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8077'}/api/cleanup-session`, false);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify({ session_id: currentSessionId }));
      }
    };

    const handlePageHide = (event) => {
      if (currentSessionId && event.persisted === false) {
        console.log('📱 Page is being hidden, but preserving session data...');
        // DISABLED: Automatic cleanup to preserve documents
        // cleanupSession(currentSessionId);
      }
    };

    // Add event listeners (for logging only)
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);

      // DISABLED: Automatic cleanup to preserve documents
      // if (currentSessionId) {
      //   cleanupSession(currentSessionId);
      // }
    };
  }, [currentSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const processUploadedFiles = async (files) => {
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        // Handle image files
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target.result;
          // Add message to context instead of local addMessage
          setMessages((prev) => [
            ...prev,
            {
              sender: "user",
              content: `[Image uploaded: ${file.name}]`,
              timestamp: new Date().toISOString(),
            },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "text/plain") {
        // Handle text files
        const reader = new FileReader();
        reader.onload = (e) => {
          const textContent = e.target.result;
          setMessages((prev) => [
            ...prev,
            {
              sender: "user",
              content: `[File uploaded: ${file.name}]\n\n${textContent}`,
              timestamp: new Date().toISOString(),
            },
          ]);
        };
        reader.readAsText(file);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "user",
            content: `[File uploaded: ${file.name} (${file.type})]`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }
  };

  const createParticles = () => {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = "";

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = 8 + Math.random() * 4 + "s";
      particlesContainer.appendChild(particle);
    }
  };

  const simulateAIResponse = async (userMessage) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const responses = [
      "That's a great question! Let me help you with that...",
      "I can definitely assist you with this. Here's what I suggest...",
      "Excellent! Let's break this down step by step...",
      "Perfect! I have some ideas that might work well for your use case...",
      `You asked about: "${userMessage}". Here's my response based on the current system settings.`,
      `Based on your question about "${userMessage}", I can provide some insights. The current model is set to ${model} with temperature ${temperature} and top-p ${topP}.`,
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        content: response,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleNavItemClick = (item) => {
    console.log(item);
    if (activeNavItem !== item) {
      setActiveNavItem(item);
      navigate(`/${item}`);
    }
  };

  const handleToggleSwitch = (toggle) => {
    switch (toggle) {
      case "stream":
        setStreamResponse(!streamResponse);
        break;
      case "autoSave":
        setAutoSave(!autoSave);
        break;
      case "codeHighlighting":
        setCodeHighlighting(!codeHighlighting);
        break;
      case "voiceInput":
        setVoiceInput(!voiceInput);
        break;
      default:
        break;
    }
  };
  //chat logic
  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(documentMode);
    }
  };

  // Send message function
  const sendMessage = async (documentMode = false) => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      // Add user message immediately
      addMessage(message, "user");

      // Send to API with document mode
      await handleSendMessage(message, documentMode);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        try {
          setIsLoading(true);
          await handleVoiceTranscription(audioBlob, documentMode);
        } catch (error) {
          console.error("Voice transcription error:", error);
          addMessage(
            "Sorry, I couldn't process your voice message. Please try again.",
            "ai"
          );
        } finally {
          setIsLoading(false);
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // File handling
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsLoading(true);
      
      try {
        const results = [];
        
        for (const file of files) {
          console.log(`Uploading: ${file.name}`);
          
          const formData = new FormData();
          formData.append('file', file);
          
          const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8077';
          const response = await fetch(`${VITE_BACKEND_URL}/api/upload-document`, {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`Upload failed for ${file.name}: ${response.statusText}`);
          }
          
          const result = await response.json();
          results.push(result);
          
          // Store session ID if this is the first file or if we get a new session
          if (result.session_id && (!currentSessionId || result.session_id !== currentSessionId)) {
            setCurrentSessionId(result.session_id);
            console.log(`🆕 New session created: ${result.session_id}`);
          }
          
          // Add success message for each file
          addMessage(
            `✅ Uploaded: ${result.filename}\n📄 Created ${result.embedding_result?.chunks_created || 0} chunks for AI knowledge`,
            "ai"
          );
        }
        
        // Summary message if multiple files
        if (results.length > 1) {
          const totalChunks = results.reduce((sum, r) => sum + (r.embedding_result?.chunks_created || 0), 0);
          addMessage(
            `🎉 Successfully uploaded ${results.length} documents with ${totalChunks} total chunks!\n\nYou can now ask me questions about these documents.`,
            "ai"
          );
        } else {
          addMessage(
            "💡 You can now ask me questions about this document!",
            "ai"
          );
        }
        
      } catch (error) {
        console.error("Upload error:", error);
        addMessage(
          `❌ Upload failed: ${error.message}`,
          "ai"
        );
      } finally {
        setIsLoading(false);
        // Clear the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  // Tab handling
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Clean up recording on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder, isRecording]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-950 text-white overflow-hidden">
      {/* Floating Particles */}
      <div
        id="particles"
        className="fixed inset-0 pointer-events-none z-0"
      ></div>

      <div className="flex h-screen w-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header modelNames={modelNames} selectedModel={selectedModel} onClearChat={handleClearChat} />

          {/* Workspace */}
          <div className="flex-1 flex p-6 gap-6 min-h-0">
            {/* Chat Panel */}
            <Chat
              messages={messages}
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              sendMessage={sendMessage}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              isRecording={isRecording}
              toggleRecording={toggleRecording}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
              handleFileChange={handleFileChange}
              textareaRef={textareaRef}
              messagesEndRef={messagesEndRef}
              showSystemStatus={showSystemStatus}
              isLoading={isLoading}
              systemStatus="System configured • Ready for conversation"
              documentMode={documentMode}
              setDocumentMode={setDocumentMode}
            />

            {/* Settings Panel */}
            <SettingsPanel
              selectedModel={selectedModel}
              temperature={temperature}
              setTemperature={setTemperature}
              maxTokens={maxTokens}
              setMaxTokens={setMaxTokens}
              topP={topP}
              setTopP={setTopP}
              activePreset={activePreset}
              systemMessage={systemMessage}
              setSystemMessage={setSystemMessage}
              handlePresetClick={handlePresetClick}
              handleResetSystem={handleResetSystem}
              handleApplySystem={handleApplySystem}
              handleToggleSwitch={handleToggleSwitch}
              streamResponse={streamResponse}
              autoSave={autoSave}
              codeHighlighting={codeHighlighting}
              voiceInput={voiceInput}
              modelNames={modelNames}
              presets={presets}
            />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            border-radius: 50%;
            cursor: pointer;
          }

          .slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            border-radius: 50%;
            cursor: pointer;
            border: none;
          }

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

          /* Custom Scrollbar Styles */
          .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: #475569 #1e293b;
          }

          .scrollbar-thin::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .scrollbar-thin::-webkit-scrollbar-track {
            background: #1e293b;
            border-radius: 4px;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 4px;
            border: 1px solid #1e293b;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }

          .scrollbar-thin::-webkit-scrollbar-corner {
            background: #1e293b;
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NEXUSAiStudio;
