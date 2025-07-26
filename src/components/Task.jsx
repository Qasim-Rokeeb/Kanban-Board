import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

export default function Task({ task, index, onRemove }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <motion.div
          className="bg-slate-100 p-2 my-2 rounded shadow flex justify-between items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          whileHover={{ scale: 1.02 }}
        >
          <span>{task.content}</span>
          <button onClick={onRemove} className="text-red-500 hover:text-red-700">
            <FiTrash2 />
          </button>
        </motion.div>
      )}
    </Draggable>
  );
}
