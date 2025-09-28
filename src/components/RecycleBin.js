import React, { useContext } from 'react';
import './RecycleBin.css';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';

function RecycleBin() {
  const { deletedTasks, setDeletedTasks, updateTasks, tasks } = useContext(TaskContext);
  const restoreTask = (taskId) => {
    const taskToRestore = deletedTasks.find(task => task.id === taskId);
    // remove deletedOn property before restoring
    const { deletedOn, ...restoredTask } = taskToRestore;
    updateTasks([...(tasks || []), restoredTask]);
    setDeletedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const permanentlyDeleteTask = (taskId) => {
    setDeletedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="recycle-bin">
      <h2>Recycle Bin</h2>
      {deletedTasks.length > 0 ? (
        <ul>
          {deletedTasks.map(task => (
            <li key={task.id} className="deleted-item">
              <div className="deleted-item-content">
                <span>{task.name}</span>
                <small>Deleted on: {new Date(task.deletedOn).toLocaleString()}</small>
              </div>
              <div className="actions">
                <button className="restore-btn" onClick={() => restoreTask(task.id)}>
                  Restore
                </button>
                <button className="perm-delete-btn" onClick={() => permanentlyDeleteTask(task.id)}>
                  Delete Permanently
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-bin">
          <p>The recycle bin is empty.</p>
          <Link to="/" className="nav-link">Back to Home</Link>
        </div>
      )}
    </div>
  );
}

export default React.memo(RecycleBin);