import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [activeNavItem, setActiveNavItem] = useState("Chat");
  const navigate = useNavigate();
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    navigate(`/${item}`);
  };

  return (
    <>
      <div className="w-64 bg-slate-900  border-r border-slate-700 flex flex-col text-white">
        {/* Logo */}
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <div className="text-white font-semibold">NEXUS AI</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-5">
          {/* Workspace Section */}
          <div className="mb-8">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Workspace
            </div>
            <div className="space-y-1">
              {[
                { name: "Chat", icon: "💬" },
                { name: "Studio", icon: "🎨" },
                { name: "Analytics", icon: "📊" },
              ].map((item) => (
                <div
                  onClick={() => handleNavItemClick(item.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    activeNavItem === item.name
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span>{item.icon}</span> {item.name}
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Tools
            </div>
            <div className="space-y-1">
              {[
                { name: "Plugins", icon: "🔌" },
                { name: "Knowledge", icon: "📚" },
                { name: "Settings", icon: "⚙️" },
                { name: "Security", icon: "🔒" },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleNavItemClick(item.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    activeNavItem === item.name
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span>{item.icon}</span> {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
