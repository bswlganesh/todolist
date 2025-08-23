import React from 'react'

export default function Task({setTasks,tasks,task}) {
    function handeDelete(taskId) { 
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
     }
    function handleUpdate() {
        
    }
  return (
    <div className='li'>
        <p>Name: {task.name}</p>
        <p>Time: {task.time}</p>
        <button onClick={() => handeDelete(task.id)}>Detete</button>
        <button onClick={handleUpdate}>Update</button>
    </div>
  )
}
