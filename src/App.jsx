import React from "react";
import Board from "./components/Board";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function App() {
  const [dark, setDark] = useState(() => localStorage.theme === "dark");

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          🧩 Kanban Board
          <s>Effectivey manage your project, track tasks, manage workflow, and improve efficiency.</s>

        </h1>
        
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-card)]"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <Board />
    </div>
  );
}