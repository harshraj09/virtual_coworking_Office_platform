import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import styles from './TaskList.module.css';

interface TaskListProps {
  isAdmin: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ isAdmin }) => {
  const { tasks } = useTaskContext();

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default TaskList;

