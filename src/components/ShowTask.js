import React from 'react'
import "./ShowTask.css"
export default function ShowTask() {
  const tasks = [
    {
      id: 1,
      name: "Design the user interface",
      time: "2025-08-20T11:00:00Z"
    },
    {
      id: 2,
      name: "Develop the login feature",
      time: "2025-08-21T15:30:00Z"
    },
    {
      id: 3,
      name: "Team meeting",
      time: "2025-08-22T09:00:00Z"
    },
    {
      id: 4,
      name: "Write project documentation",
      time: "2025-08-23T14:00:00Z"
    },
    {
      id: 5,
      name: "Code review session",
      time: "2025-08-24T10:30:00Z"
    },
    {
      id: 6,
      name: "Client presentation",
      time: "2025-08-25T16:00:00Z"
    },
    {
      id: 7,
      name: "Database optimization",
      time: "2025-08-26T11:30:00Z"
    },
    {
      id: 8,
      name: "Deploy new release",
      time: "2025-08-27T09:00:00Z"
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
