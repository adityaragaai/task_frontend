import React, { useState, useEffect, useCallback } from 'react';
import { taskService } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import StatusMessage from './components/StatusMessage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskService.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      setMessage('Task added successfully!');
      fetchTasks();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update task
  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskService.updateTask(id, taskData);
      // Optimistic update or just refetch
      setTasks(prev => prev.map(t => t._id === id ? { ...t, ...taskData } : t));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      setMessage('Task deleted');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--primary)' }}>
          Task Focus
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Stay organized and productive.</p>
      </header>

      <main>
        <TaskForm onTaskCreated={handleCreateTask} />
        
        {error && <StatusMessage type="error" message={error} />}
        {message && <StatusMessage type="success" message={message} />}

        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Your Tasks</h2>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              {tasks.length} total
            </span>
          </div>

          <TaskList 
            tasks={tasks} 
            isLoading={isLoading} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      <footer style={{ marginTop: 'auto', padding: '4rem 0 2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Task Focus API Dashboard
      </footer>
    </div>
  );
}

export default App;
