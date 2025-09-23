
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import RecycleBin from './components/RecycleBin'
import HomePage from './pages/HomePage';

export default function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [deletedTasks, setDeletedTasks] = useState(JSON.parse(localStorage.getItem("deletedTasks")) || []);
  const [history, setHistory] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [tasks, deletedTasks]);

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} setDeletedTasks={setDeletedTasks} history={history} setHistory={setHistory} isInitialMount={isInitialMount} />} />
        <Route path="/recycle-bin" element={<RecycleBin deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks} setTasks={setTasks} />} />
      </Routes>
    </div>
  )
}
