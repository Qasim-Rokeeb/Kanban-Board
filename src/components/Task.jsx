import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function Task({ task, index, onRemove }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 p-3 rounded-lg flex items-center justify-between text-sm transition-all
            ${snapshot.isDragging ? "shadow-2xl scale-105" : "shadow-md"}
            bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-card)]`}
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-[var(--text-primary)]">{task.content}</span>
          <button
            onClick={onRemove}
            className="text-red-400 hover:text-red-300 transition"
          >
            <Trash2 size={16} />
          </button>
        </motion.div>
      )}
    </Draggable>
  );
}