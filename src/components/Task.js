import React, { useState } from 'react';
import "./Task.css"
export default function Task({ setTasks, tasks, task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  function handeDelete(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleUpdate(taskId, updatedData) {
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, ...updatedData };
      }
      return t;
    });
    setTasks(updatedTasks);
  }

  function handleSave() {
    handleUpdate(task.id, { name: editedTask.name, time: editedTask.time });
    setIsEditing(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value });
  }

  return (
    <div className='li'>
      {isEditing ? (
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
          <div className="actions">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="task-content">
            <p>{task.name}</p>
            <p>{task.time}</p>
          </div>
          <div className="actions">
            <button className="delete-btn" onClick={() => handeDelete(task.id)}>Delete</button>
            <button className="update-btn" onClick={() => setIsEditing(true)}>Update</button>
          </div>
        </>
      )}
    </div>
  );
}