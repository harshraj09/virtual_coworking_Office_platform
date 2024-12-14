import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onClose: () => void;
  isAdmin: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, isAdmin }) => {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes = (parseInt(hours) * 60 + parseInt(minutes)) || 0;
    addTask({
      title,
      description,
      assignee,
      status: 'todo',
      dueIn: totalMinutes,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <form className={`${styles.form} card`} onSubmit={handleSubmit}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.formTitle}>Add New Task</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="assignee">Assignee</label>
          <input
            id="assignee"
            type="text"
            placeholder="Enter assignee name"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            className="input"
          />
        </div>
        {isAdmin && (
          <div className={styles.timeInputGroup}>
            <label>
              <Clock size={16} />
              Time to Complete
            </label>
            <div className={styles.timeInputs}>
              <input
                type="number"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
                className="input"
              />
              <input
                type="number"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
                className="input"
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

