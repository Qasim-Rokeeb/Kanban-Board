import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default function Column({ column, columnId, addTask, removeTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTask(columnId, input);
    setInput('');
  };

  return (
    <div className="bg-white rounded shadow p-4 min-w-[300px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">{column.name}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="flex-1 min-h-[100px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} onRemove={() => removeTask(columnId, task.id)} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-1 border rounded-l"
          placeholder="New task..."
        />
        <button type="submit" className="bg-purple-600 text-white px-4 rounded-r">
          +
        </button>
      </form>
    </div>
  );
}
