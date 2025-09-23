import React, { useState } from 'react';
import "./Task.css"

export default function Task({ setTasks, tasks, task, setDeletedTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subtaskName, setSubtaskName] = useState("");
  const [subtasksVisible, setSubtasksVisible] = useState(true);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editedSubtask, setEditedSubtask] = useState({});

  function handeDelete(taskId) {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setDeletedTasks(prev => [...prev, { ...taskToDelete, deletedOn: new Date() }]);
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

  function handleSubtaskChange(e) {
    setSubtaskName(e.target.value);
  }

  function handleAddSubtask(e) {
    e.preventDefault();
    if (!subtaskName.trim()) return;

    const newSubtask = {
      id: Math.floor(Math.random() * 10000),
      name: subtaskName,
      completed: false,
    };
    const updatedSubtasks = [...(task.subtasks || []), newSubtask];
    handleUpdate(task.id, { subtasks: updatedSubtasks });
    setSubtaskName("");
  }

  function handleSave() {
    handleUpdate(task.id, { name: editedTask.name });
    setIsEditing(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value });
  }

  function handleDeleteSubtask(subtaskId) {
    const updatedSubtasks = task.subtasks.filter(sub => sub.id !== subtaskId);
    handleUpdate(task.id, { subtasks: updatedSubtasks });
  }

  function handleEditSubtask(subtask) {
    setEditingSubtaskId(subtask.id);
    setEditedSubtask({ ...subtask });
  }

  function handleSubtaskInputChange(e) {
    const { name, value } = e.target;
    setEditedSubtask({ ...editedSubtask, [name]: value });
  }

  function handleSaveSubtask(subtaskId) {
    const updatedSubtasks = task.subtasks.map(sub =>
      sub.id === subtaskId ? editedSubtask : sub
    );
    handleUpdate(task.id, { subtasks: updatedSubtasks });
    setEditingSubtaskId(null);
    setEditedSubtask({});
  }

  function toggleTaskComplete() {
    handleUpdate(task.id, { completed: !task.completed });
  }

  function toggleSubtaskComplete(subtaskId) {
    const updatedSubtasks = task.subtasks.map(sub =>
      sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
    );
    handleUpdate(task.id, { subtasks: updatedSubtasks });
  }

  return (
    <li className={`li ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedTask.name}
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
              <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleTaskComplete}
              />
              <p className="task-name">{task.name}</p>
            </div>
            <div className="actions task-actions">
              {task.subtasks && task.subtasks.length > 0 && (
                <button className={`toggle-subtasks-btn ${subtasksVisible ? 'open' : ''}`} onClick={() => setSubtasksVisible(!subtasksVisible)}>
                  ▼
                </button>
              )}
              <button className="add-subtask-btn" onClick={() => { setShowSubtaskForm(!showSubtaskForm); setSubtasksVisible(true); }}>Sub-task</button>
              <button className="update-btn" onClick={() => setIsEditing(true)}>Update</button>
              <button className="delete-btn" onClick={() => handeDelete(task.id)}>Delete</button>
            </div>
          </>
        )}
      </div>
      {showSubtaskForm && (
        <form onSubmit={handleAddSubtask} className="subtask-form">
          <input
            type="text"
            placeholder="Add new sub-task"
            value={subtaskName}
            onChange={handleSubtaskChange}
          />
          <button type="submit">Add</button>
        </form>
      )}
      {subtasksVisible && task.subtasks && task.subtasks.length > 0 && (
        <ul className="subtask-list">
          {task.subtasks.map(sub => (
            editingSubtaskId === sub.id ? (
              <li key={sub.id} className="subtask-item editing">
                <input type="text" name="name" value={editedSubtask.name} onChange={handleSubtaskInputChange} />
                <div className="actions">
                  <button className="save-btn" onClick={() => handleSaveSubtask(sub.id)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingSubtaskId(null)}>Cancel</button>
                </div>
              </li>
            ) : (
              <li key={sub.id} className={`subtask-item ${sub.completed ? 'completed' : ''}`}>
                <div className="subtask-content">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => toggleSubtaskComplete(sub.id)}
                  />
                  <span className="subtask-name">{sub.name}</span>
                </div>
                <div className="actions">
                  <button className="update-btn" onClick={() => handleEditSubtask(sub)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDeleteSubtask(sub.id)}>Delete</button>
                </div>
              </li>
            )
          ))}
        </ul>
      )}
    </li>
  );
}