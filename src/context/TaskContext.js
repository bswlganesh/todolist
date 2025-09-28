import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [deletedTasks, setDeletedTasks] = useState(() => JSON.parse(localStorage.getItem("deletedTasks")) || []);

  // Undo/Redo state
  const [history, setHistory] = useState([tasks]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isInitialMount = useRef(true);

  const updateTasks = useCallback((newTasks) => {
    // Using a function with previous history to avoid stale state
    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      const updatedHistory = [...newHistory, newTasks];
      setHistoryIndex(updatedHistory.length - 1);
      return updatedHistory;
    });
    setTasks(newTasks);
  }, [historyIndex]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [tasks, deletedTasks]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setHistory([tasks]);
      setHistoryIndex(0);
    }
  }, [tasks]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTasks(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setTasks(history[newIndex]);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const value = { tasks, updateTasks, deletedTasks, setDeletedTasks, handleUndo, handleRedo, canUndo, canRedo };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;