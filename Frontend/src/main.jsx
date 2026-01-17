import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation";
import "./index.css";
import Plugins from "./pages/Plugins";
import { ChatProvider } from "../context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <ChatProvider>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
    </ChatProvider>
  </React.StrictMode>
);
