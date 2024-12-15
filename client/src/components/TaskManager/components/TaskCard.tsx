import React, { useState, useEffect } from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    assignee: string;
    status: 'todo' | 'in-progress' | 'completed';
    createdAt: Date;
    dueDate: Date;
  };
  isAdmin: boolean;
}

const formatTimeLeft = (timeLeft: number): string => {
  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }
  return `${minutes}m left`;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, isAdmin }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = task.dueDate.getTime() - now.getTime();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [task.dueDate]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(task.id, { status: e.target.value as 'todo' | 'in-progress' | 'completed' });
  };

  return (
    <div className={`card ${styles.taskCard} ${styles[task.status]}`}>
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p className={styles.taskDescription}>{task.description}</p>
      <p className={styles.taskAssignee}>Assignee: {task.assignee}</p>
      <div className={styles.taskMeta}>
        <span className={styles.timer}>
          <Clock size={16} />
          {formatTimeLeft(timeLeft)}
        </span>
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className={styles.statusSelect}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {isAdmin && (
        <div className={styles.actions}>
          <button className={`${styles.actionButton} ${styles.editButton}`}>
            <Edit2 size={16} />
          </button>
          <button 
            className={`${styles.actionButton} ${styles.deleteButton}`} 
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;

