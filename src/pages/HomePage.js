import React, { useContext } from 'react';
import AddTask from '../components/AddTask';
import ShowTask from '../components/ShowTask';
import TaskContext from '../context/TaskContext';

export default function HomePage() {
  const { tasks, handleUndo, handleRedo, canUndo, canRedo } = useContext(TaskContext);

  // Sorting can be expensive, use React.useMemo if list gets very long
  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <>
      <AddTask />
      {(canUndo || canRedo) && <div className="app-controls">
        <button onClick={handleUndo} className="undo-btn" disabled={!canUndo}>Undo</button>
        <button onClick={handleRedo} className="redo-btn" disabled={!canRedo}>Redo</button>
      </div>}
      <ShowTask tasks={sortedTasks} />
    </>
  );
}