import React, { useState, useEffect, useCallback, useContext } from 'react';
import "./Task.css"
import TaskContext from '../context/TaskContext';

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const { tasks, updateTasks, setDeletedTasks } = useContext(TaskContext);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subtaskName, setSubtaskName] = useState("");
  const [subtasksVisible, setSubtasksVisible] = useState(true);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editedSubtask, setEditedSubtask] = useState({});

  const handeDelete = (taskId) => {
    // Add deleting class for animation
    updateTasks(tasks.map(t => t.id === taskId ? { ...t, isDeleting: true } : t));

    // After animation, remove the task
    setTimeout(() => {
      const taskToDelete = tasks.find(task => task.id === taskId);
      setDeletedTasks(prev => [...prev, { ...taskToDelete, deletedOn: new Date() }]);
      updateTasks(currentTasks => currentTasks.filter(t => t.id !== taskId));
    }, 300); // Corresponds to animation duration
  };

  const handleUpdate = useCallback((taskId, updatedData) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, ...updatedData };
      }
      return t;
    });
    updateTasks(updatedTasks);
  }, [tasks, updateTasks]);

  useEffect(() => {
    if (task.subtasks && task.subtasks.length > 0) {
      const allSubtasksCompleted = task.subtasks.every(sub => sub.completed);
      if (task.completed !== allSubtasksCompleted) {
        handleUpdate(task.id, { completed: allSubtasksCompleted });
      }
    }
  }, [task.subtasks, task.id, task.completed, handleUpdate]);

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

  function toggleSubtaskComplete(subtaskId) {
    const updatedSubtasks = task.subtasks.map(sub =>
      sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
    );
    handleUpdate(task.id, { subtasks: updatedSubtasks });
  }

  return (
    <li className={`li ${task.completed ? 'completed' : ''} ${task.isDeleting ? 'task-exit-active' : 'task-enter-active'}`}>
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
              <p className={`task-name ${task.completed ? 'completed' : ''}`}>{task.name}</p>
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
              <li key={sub.id} className={`subtask-item-wrapper ${sub.completed ? 'completed' : ''}`}>
                <div className="subtask-content">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => toggleSubtaskComplete(sub.id)}
                  />
                  <span className="subtask-name">{sub.name}</span>
                </div>
                <div className="actions subtask-actions-row">
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

export default React.memo(Task);