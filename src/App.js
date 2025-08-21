
import './App.css'
import Header from './components/Header'
import AddTask from './components/AddTask'
import ShowTask from './components/ShowTask'
import { useState } from 'react'




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
    },
    {
      "id": 4,
      "name": "call the bank for account update",
      "time": "2025-08-23T14:00:00Z"
    },
    {
      "id": 5,
      "name": "read 20 pages of a book",
      "time": "2025-08-24T10:30:00Z"
    },
    {
      "id": 6,
      "name": "water the plants",
      "time": "2025-08-25T16:00:00Z"
    },
    {
      "id": 7,
      "name": "practice meditation for 15 minutes",
      "time": "2025-08-26T11:30:00Z"
    }
  ]
  )
  return (
    <>
    <Header/>

    <AddTask tasks={tasks} setTasks={setTasks}/>
    
    <ShowTask tasks={tasks} setTasks={setTasks}/>
    </>
  )
}
