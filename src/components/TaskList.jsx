import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, isLoading }) => {
  if (isLoading) {
    return (
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-fade-in" style={{ height: '140px', opacity: 0.5 }}>
            <div style={{ height: '20px', width: '60%', background: '#eee', marginBottom: '10px', borderRadius: '4px' }}></div>
            <div style={{ height: '15px', width: '80%', background: '#f5f5f5', borderRadius: '4px' }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>No tasks found</h3>
        <p>Get started by adding your first task above!</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gap: '1rem', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
    }}>
      {tasks.map((task) => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onUpdate={onUpdateTask} 
          onDelete={onDeleteTask} 
        />
      ))}
    </div>
  );
};

export default TaskList;
