import React, { useState } from 'react';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onTaskCreated({ title, description });
      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-fade-in" style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600 }}>Create New Task</h2>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Description (Optional)
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder="Add some details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            style={{ resize: 'none' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '0.75rem',
            width: '100%',
            marginTop: '0.5rem',
            opacity: isSubmitting || !title.trim() ? 0.7 : 1,
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
        >
          {isSubmitting ? 'Creating...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
