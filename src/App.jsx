import React from 'react';
import Board from './components/Board';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🧩 Kanban Board</h1>
      <Board />
    </div>
  );
}
