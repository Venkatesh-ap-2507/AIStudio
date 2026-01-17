import React from "react";
import { Routes, Route } from "react-router-dom";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import App from "./App";
import Sidebar from "./components/sidebar";
import "./index.css";
import Knowledge from "./pages/Knowledge";
import Plugins from "./pages/Plugins";
import LoadingPage from "./pages/LodingPage";
import SettingsComponent from "./pages/setting";
import Studio from "./pages/studio";

export default function Navigation() {
  return (
    <div className="flex">
      <Routes>
        {/* Show regular sidebar for all routes except settings */}
        <Route path="/settings/*" element={<SettingsComponent />} />
        <Route
          path="*"
          element={
            <>
              <Sidebar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/chat" element={<App />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/plugins" element={<Plugins />} />
                  <Route path="/studio" element={<Studio />} />
                  <Route path="*" element={<LoadingPage />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}
