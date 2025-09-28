import React, { useState } from 'react'
import './AddTask.css'
export default function AddTask({tasks,setTasks}) {
  const [name,setName]=useState("")
  const [showForm, setShowForm] = useState(false);
  function handleChange(e) { 
    setName(e.target.value)
    
   }
  
  function HandleSubmit(e) {
    e.preventDefault();
    const task={
      id:Math.floor(Math.random()*10000),
      name: name,
      subtasks: [], // Ensure subtasks is initialized
      completed: false
    }
    if (!name.trim()) {
      return; // Prevents adding empty tasks
    }
    setTasks([...tasks, task]);
    setName('');
    setShowForm(false);
    }
  return (
    <div className='add-task-container'>
      {showForm ? (
        <form onSubmit={HandleSubmit} className='form' action="">
          <input onChange={handleChange} className='input' type="text" placeholder='Add New Task' value={name} autoFocus/>
          <button  className='submit' type="submit">Add Task</button>
          <button type="button" className="cancel-add-btn" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      ) : (
        <button className="show-add-form-btn floating-btn" onClick={() => setShowForm(true)}>+</button>
      )}
    </div>
  
  )
}
