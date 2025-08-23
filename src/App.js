
import './App.css'
import Header from './components/Header'
import AddTask from './components/AddTask'
import ShowTask from './components/ShowTask'
import { useEffect, useState } from 'react'
import Counter from './components/Counter'



export default function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div className='App'>

    
    <Header/>
    
    <AddTask tasks={tasks} setTasks={setTasks}/>
    <Counter tasks={tasks}/>
    <ShowTask tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}
