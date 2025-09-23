import React, { useEffect } from 'react';
import AddTask from '../components/AddTask';
import ShowTask from '../components/ShowTask';

export default function HomePage({ tasks, setTasks, setDeletedTasks, history, setHistory, isInitialMount }) {

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setHistory(prevHistory => [...prevHistory.slice(-9), tasks]); // Keep last 10 states
    }
  }, [tasks, isInitialMount, setHistory]);

  const handleUndo = () => {
    if (history.length > 1) {
      const previousState = history[history.length - 2];
      setTasks(previousState);
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <>
      <AddTask tasks={tasks} setTasks={setTasks} />
      {history.length > 1 && <div className="app-controls"><button onClick={handleUndo} className="undo-btn">Undo</button></div>}
      <ShowTask tasks={sortedTasks} setTasks={setTasks} setDeletedTasks={setDeletedTasks} />
    </>
  );
}