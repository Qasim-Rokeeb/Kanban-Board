import React, { useState, useEffect } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const initialData = {
  columns: {
    [uuidv4()]: {
      name: 'To Do',
      tasks: []
    },
    [uuidv4()]: {
      name: 'In Progress',
      tasks: []
    },
    [uuidv4()]: {
      name: 'Done',
      tasks: []
    }
  }
};

export default function Board() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('kanban-data');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('kanban-data', JSON.stringify(data));
  }, [data]);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const [removed] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, removed);
    setData({
      columns: {
        ...data.columns,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol
      }
    });
  };

  const addTask = (columnId, text) => {
    const newTask = { id: uuidv4(), content: text };
    const updated = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          tasks: [...data.columns[columnId].tasks, newTask]
        }
      }
    };
    setData(updated);
  };

  const removeTask = (columnId, taskId) => {
    const updatedTasks = data.columns[columnId].tasks.filter(t => t.id !== taskId);
    const updated = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          tasks: updatedTasks
        }
      }
    };
    setData(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto">
        {Object.entries(data.columns).map(([colId, col]) => (
          <Column
            key={colId}
            columnId={colId}
            column={col}
            addTask={addTask}
            removeTask={removeTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
