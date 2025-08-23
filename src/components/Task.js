import React, { useState } from 'react'

export default function Task({setTasks,tasks,task}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    
   
    function handeDelete(taskId) { 
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
     }
     function handleUpdate(taskId, updatedData) {
        const updatedTasks = tasks.map((t) => {
          if (t.id === taskId) {
            // Return the updated task data
            return { ...t, ...updatedData };
          }
          return t;
        });
        setTasks(updatedTasks);
      }
      function handleSave() {
        handleUpdate(task.id, { name: editedTask.name, time: editedTask.time });
        setIsEditing(false); // Switch back to view mode
      }
      function handleInputChange(event) {
        const { name, value } = event.target;
        setEditedTask({ ...editedTask, [name]: value });
      }
      return (
        <div className='li'>
          {isEditing ? (
            // EDIT VIEW: Show input fields and Save/Cancel buttons
            <>
              <input
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="time"
                value={editedTask.time}
                onChange={handleInputChange}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            // DISPLAY VIEW: Show task details and Edit/Delete buttons
            <>
              <p>Name: {task.name}</p>
              <p>Time: {task.time}</p>
              <button onClick={() => handeDelete(task.id)}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Update</button>
            </>
          )}
        </div>
      );
    }