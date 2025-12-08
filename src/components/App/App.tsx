import React, { useState } from 'react';
import './App.css';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskCard } from '../TaskCard/TaskCard';
import type { Task } from '../../types/task';
import { TaskList } from '../TaskList/TaskList';

function App() {
 
 const [tasks, setTasks] = useState<Task[]>([]);
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
