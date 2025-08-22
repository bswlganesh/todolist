
import './App.css'
import Header from './components/Header'
import AddTask from './components/AddTask'
import ShowTask from './components/ShowTask'
import { useState } from 'react'
import Counter from './components/Counter'



export default function App() {
  const [tasks,setTasks]=useState([
    {
      "id": 1,
      "name": "finish coding assignment",
      "time": "2025-08-20T11:00:00Z"
    },
    {
      "id": 2,
      "name": "buy groceries for the week",
      "time": "2025-08-21T15:30:00Z"
    },
    {
      "id": 3,
      "name": "attend gym session",
      "time": "2025-08-22T09:00:00Z"
    } 
  ]
  
  )
  

  return (
    <>
    <Header/>
    
    <AddTask tasks={tasks} setTasks={setTasks}/>
    <Counter tasks={tasks}/>
    <ShowTask tasks={tasks} setTasks={setTasks}/>
    </>
  )
}
