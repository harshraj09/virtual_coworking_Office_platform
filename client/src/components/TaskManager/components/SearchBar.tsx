import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchTasks } = useTaskContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchTasks(query);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />
      <button type="submit" className="btn btn-primary">
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;

