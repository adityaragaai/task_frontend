import React, { useState } from 'react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(task._id, { completed: !task.completed });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <div className="card animate-fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1rem',
      opacity: isDeleting ? 0.5 : 1,
      position: 'relative',
      borderLeft: task.completed ? '4px solid var(--success)' : '4px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-muted)' : 'var(--text-main)'
          }}>
            {task.title}
          </h3>
          {task.description && (
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-muted)', 
              marginTop: '0.25rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {task.description}
            </p>
          )}
        </div>
        <span className={`badge ${task.completed ? 'badge-success' : 'badge-pending'}`}>
          {task.completed ? 'Done' : 'Pending'}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleToggleComplete}
            disabled={isUpdating || isDeleting}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.75rem',
              backgroundColor: task.completed ? 'var(--secondary)' : 'var(--success)',
              color: 'white',
            }}
          >
            {isUpdating ? '...' : task.completed ? 'Undo' : 'Complete'}
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.75rem',
              backgroundColor: 'var(--danger)',
              color: 'white',
            }}
          >
            {isDeleting ? '...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
