import React, { useEffect, useState } from 'react';
import './App.css';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskCard } from '../TaskCard/TaskCard';
import type { Task } from '../../types/task';
import { TaskList } from '../TaskList/TaskList';
import { taskApiClient } from '../../services/taskApiClient';

function App() {
 
 const [tasks, setTasks] = useState<Task[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 useEffect(() => {
    loadTasks();
  }, []);
  
  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const fetchedTasks = await taskApiClient.getRecentTasks(5);
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please refresh the page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <div className="app">
      <header className="app-header">
        <h1>My Todo Tasks</h1>
        <p>Stay organized and get things done</p>
      </header>
      
      <section>
        <TaskForm />
      </section>
      <section>
       <TaskList tasks={tasks} onTaskComplete={async (id: string) => {}} />
      </section>


      <footer className="app-footer">
        <p>&copy; 2024 Todo App. Stay productive!</p>
      </footer>
    </div>
  );
}

export default App;
