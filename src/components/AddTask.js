import React, { useState } from 'react'
import './AddTask.css'
export default function AddTask({tasks,setTasks}) {
  const [name,setName]=useState("")
  function handleChange(e) { 
    setName(e.target.value)
    
   }
  
  function HandleSubmit(e) {
    e.preventDefault();
    const task={
      id:Math.floor(Math.random()*10000),
      name: name,
      subtasks: [],
      completed: false
    }
    if (!name.trim()) {
      return; // Prevents adding empty tasks
    }
    setTasks([...tasks, task]);
    setName('');
    }
  return (
    <>
      <div className='container'>
    <form onSubmit={HandleSubmit} className='form' action="">
      <input onChange={handleChange} className='input' type="text" placeholder='Add New Task' value={name}/>
      <button  className='submit' type="submit">Add Task</button>
    </form>
    
  </div>
  <hr/>
    </>
  
  )
}
