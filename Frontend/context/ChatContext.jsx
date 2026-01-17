import React, { createContext, useContext, useState } from "react";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8077';
const ChatContext = createContext();

// Export the context so it can be imported elsewhere
export { ChatContext };

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [model, setModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant."
  );
  const [systemMessage, setSystemMessage] = useState(
    "You are a helpful AI assistant. You provide accurate, thoughtful responses and ask clarifying questions when needed."
  );
  
  // TTS Settings
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoPlayTTS, setAutoPlayTTS] = useState(false);
  const [ttsVoice, setTtsVoice] = useState("default");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      content:
        "Hello! I'm ready to assist you. I'm currently configured as a helpful AI assistant. You can modify my behavior using the system message settings on the right panel.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [activePreset, setActivePreset] = useState("helpful");
  const [systemStatus, setSystemStatus] = useState(
    "System configured • Ready for conversation"
  );
  const [showSystemStatus, setShowSystemStatus] = useState(true);

  const modelNames = {
    "GPT-4o": "gpt-4o",
    "GPT-4": "gpt-4-0613",
    "GPT-3.5 Turbo": "gpt-3.5-turbo-0613",
    "GPT-3.5 Turbo 16K": "gpt-3.5-turbo-16k",
    "GPT-4o Mini": "gpt-4o-mini",
    "GPT-4o Nano": "gpt-4o-nano",
    "GPT-3.5 Mini": "gpt-3.5-mini",
    "GPT-3.5 Nano": "gpt-3.5-nano",
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
    document:
      "You are a document analysis assistant. You summarize, answer questions, and provide insights based on the uploaded document, referencing key sections and facts."
  };

  // Updated addMessage to work with both chatHistory and messages
  const addMessage = (content, role, sources = null, contextUsed = false, documentMode = false) => {
    const timestamp = new Date().toISOString();

    // Update chatHistory (for API compatibility)
    setChatHistory((prev) => [...prev, { role, content, timestamp }]);

    // Update messages (for UI display)
    const newMessage = {
      sender: role,
      content,
      timestamp,
      sources,
      contextUsed,
      documentMode
    };

    setMessages((prev) => [...prev, newMessage]);

    // Auto-play TTS for AI responses if enabled
    if (role === "ai" && autoPlayTTS && ttsEnabled) {
      setTimeout(() => {
        handleTextToSpeech(content, messages.length);
      }, 500);
    }
  };

  // Text-to-Speech functionality
  const handleTextToSpeech = async (text, messageIndex) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/text-to-speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert base64 to audio blob
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create and play audio
      const audio = new Audio(audioUrl);
      await audio.play();
      
      // Cleanup
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
      
      return true;
    } catch (error) {
      console.error('TTS Error:', error);
      return false;
    }
  };

  // Voice transcription functionality
  const handleVoiceTranscription = async (audioBlob, documentMode = false) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      formData.append('document_mode', documentMode.toString());

      const response = await fetch(`${VITE_BACKEND_URL}/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // If transcription successful, add user message and AI response
      if (data.transcript) {
        addMessage(data.transcript, "user");

        if (data.response) {
          addMessage(
            data.response,
            "ai",
            data.sources || [],
            data.context_used || false,
            data.document_mode || false
          );
        }
        
        // Play AI response audio if available
        if (data.audio && ttsEnabled) {
          const audioBlob = new Blob(
            [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
            { type: 'audio/mpeg' }
          );
          
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          await audio.play();
          
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
          };
        }
      }
      
      return data;
    } catch (error) {
      console.error('Voice transcription error:', error);
      throw error;
    }
  };

  const handlePresetClick = (preset) => {
    setSystemMessage(presets[preset]);
    setActivePreset(preset);
  };

  const addSystemMessage = (text) => {
    setSystemStatus(text);
    setShowSystemStatus(true);

    setTimeout(() => {
      setShowSystemStatus(false);
      setTimeout(() => {
        setSystemStatus("System configured • Ready for conversation");
        setShowSystemStatus(true);
      }, 100);
    }, 3000);
  };

  const handleResetSystem = () => {
    setSystemMessage(presets.helpful);
    setActivePreset("helpful");
    addSystemMessage("System message reset to default.");
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
    const selectedModelName = Object.keys(modelNames).find(
      key => modelNames[key] === e.target.value
    );
    addSystemMessage(
      `Switched to ${selectedModelName || e.target.value}. Model configuration updated.`
    );
  };

  const handleApplySystem = () => {
    if (systemMessage.trim()) {
      addSystemMessage("System message updated successfully.");
    }
  };

  // API calls
  const handleSendMessage = async (message, documentMode = false) => {
    console.log("Sending message:", message);
    console.log("Current settings:", {
      model,
      temperature,
      topP,
      systemMessage,
      documentMode,
    });

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature,
          top_p: topP,
          system_prompt: systemMessage,
          user_message: message,
          document_mode: documentMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data.response);
      console.log("Sources:", data.sources);

      // This will now properly update both chatHistory and messages with source information
      addMessage(
        data.response,
        "ai",
        data.sources || [],
        data.context_used || false,
        documentMode
      );
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message to UI
      addMessage(
        "Sorry, I encountered an error while processing your request. Please try again.",
        "ai"
      );
    }
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([
      {
        sender: "ai",
        content:
          "Hello! I'm ready to assist you. I'm currently configured as a helpful AI assistant. You can modify my behavior using the system message settings on the right panel.",
        timestamp: new Date().toISOString(),
      },
    ]);
    setChatHistory([]);
  };

  return (
    <ChatContext.Provider
      value={{
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
        handleModelChange,
        handleApplySystem,
        modelNames,
        activePreset,
        systemStatus,
        showSystemStatus,
        presets,
        handleSendMessage,
        messages,
        setMessages,
        clearMessages,
        
        // TTS Features
        ttsEnabled,
        setTtsEnabled,
        autoPlayTTS,
        setAutoPlayTTS,
        ttsVoice,
        setTtsVoice,
        handleTextToSpeech,
        handleVoiceTranscription,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);