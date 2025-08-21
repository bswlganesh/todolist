import React, { useState } from 'react'
import './AddTask.css'
export default function AddTask({tasks,setTasks}) {
  const [name,setName]=useState("")
  function handleChange(e) { 
    setName(e.target.value)
    console.log(name);
    
   }
  
  function HandleSubmit(e) {
    e.preventDefault();
    const task={
      id:Math.floor(Math.random()*1000),
      name: name,
      time:new Date().toLocaleTimeString()
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
      <button  className='submit' type="submit">submit</button>
    </form>
    
  </div>
  <hr/>
    </>
  
  )
}
