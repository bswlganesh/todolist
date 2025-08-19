import React from 'react'
import './AddTask.css'
export default function AddTask() {
  return (
    <div  >
      <form className='form' action="">
        <input className='input' type="text" placeholder='Add New Task'/>
        <button className='submit' type="submit">submit</button>
      </form>
      <hr/>
    </div>
  )
}
