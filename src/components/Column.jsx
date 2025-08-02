import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { Plus } from "lucide-react";

export default function Column({ column, columnId, addTask, removeTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTask(columnId, input);
    setInput("");
  };

  // Dynamic pastel column headers
  const headerColors = {
    "To Do": "from-rose-400 to-pink-500",
    "In Progress": "from-amber-400 to-orange-500",
    Done: "from-emerald-400 to-green-500",
  };

  const currentGradient = headerColors[column.name] || "from-indigo-400 to-purple-500";

  return (
    <div className="min-w-[320px] max-w-xs flex flex-col">
      {/* Column header */}
      <div
        className={`bg-gradient-to-r ${currentGradient} text-white font-bold text-center py-3 rounded-t-xl shadow-lg`}
      >
        {column.name}
      </div>

      <div className="bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-card)] rounded-b-xl shadow-[var(--shadow-card)] p-4 flex-1 flex flex-col">
        <Droppable droppableId={columnId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 min-h-[120px] rounded transition-colors ${
                snapshot.isDraggingOver ? "bg-indigo-400/10" : ""
              }`}
            >
              {column.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} onRemove={() => removeTask(columnId, task.id)} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add task..."
            className="flex-1 bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md transition"
          >
            <Plus size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}