
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react'
import RecycleBin from './components/RecycleBin'
import HomePage from './pages/HomePage';

export default function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [deletedTasks, setDeletedTasks] = useState(JSON.parse(localStorage.getItem("deletedTasks")) || []);
  const [history, setHistory] = useState([JSON.parse(localStorage.getItem("tasks")) || []]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isInitialMount = useRef(true);
 
  const updateTasks = useCallback((newTasks) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newTasks]);
    setHistoryIndex(newHistory.length);
    setTasks(newTasks);
  }, [history, historyIndex]);

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
      setHistoryIndex(prev => prev - 1);
      setTasks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setTasks(history[historyIndex + 1]);
    }
  };

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage tasks={tasks} setTasks={updateTasks} setDeletedTasks={setDeletedTasks} handleUndo={handleUndo} handleRedo={handleRedo} canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1} />} />
        <Route path="/recycle-bin" element={<RecycleBin deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks} setTasks={updateTasks} />} />
      </Routes>
    </div>
  )
}
