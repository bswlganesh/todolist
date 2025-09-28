import React from 'react';
import AddTask from '../components/AddTask';
import ShowTask from '../components/ShowTask';

export default function HomePage({ tasks, setTasks, setDeletedTasks, handleUndo, handleRedo, canUndo, canRedo }) {

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <>
      <AddTask tasks={tasks} setTasks={setTasks} />
      {(canUndo || canRedo) && <div className="app-controls">
        <button onClick={handleUndo} className="undo-btn" disabled={!canUndo}>Undo</button>
        <button onClick={handleRedo} className="redo-btn" disabled={!canRedo}>Redo</button>
      </div>}
      <ShowTask tasks={sortedTasks} setTasks={setTasks} setDeletedTasks={setDeletedTasks} />
    </>
  );
}