import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import './styles/globals.css';


const TaskManager: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  return (
    <TaskProvider>
      <div className="app">
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <main className="container">
          <div className="search_component_task flex justify-between items-center my-4">
            <SearchBar />
            {isAdmin && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowTaskForm(true)}
              >
                Add New Task
              </button>
            )}
          </div>
          
          <TaskList isAdmin={isAdmin} />
          {showTaskForm && (
            <TaskForm onClose={() => setShowTaskForm(false)} isAdmin={isAdmin} />
          )}
        </main>
      </div>
    </TaskProvider>
  );
};

export default TaskManager;

