import React from 'react'
import "./ShowTask.css"
export default function ShowTask() {
  const tasks = [
    {
      "tasks": [
        {
          "id": 1,
          "name": "love diksha",
          "time": "2025-08-20T11:00:00Z"
        },
        {
          "id": 2,
          "name": "buy diksha flowers",
          "time": "2025-08-21T15:30:00Z"
        },
        {
          "id": 3,
          "name": "meet diksha",
          "time": "2025-08-22T09:00:00Z"
        },
        {
          "id": 4,
          "name": "call diksha ",
          "time": "2025-08-23T14:00:00Z"
        },
        {
          "id": 5,
          "name": "surprise diksha",
          "time": "2025-08-24T10:30:00Z"
        },
        {
          "id": 6,
          "name": "thank diksha for being her",
          "time": "2025-08-25T16:00:00Z"
        },
        {
          "id": 7,
          "name": "remind diksha that i love and care about her",
          "time": "2025-08-26T11:30:00Z"
        }
      ]
    }
    
  ];
  
  return (
    <div className='list'>
    <ul>
  {tasks.map((task) => (
    <li key={task.id}>
      <p>Name: {task.name}</p>
      <p>Time: {task.time}</p>
    </li>
  ))}
</ul>
      
    </div>
  )
}
