import { useState } from 'react';
import styles from './SearchBar.module.css';
import useProjectsStore from '@/store/useProjectsStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, viewMode, setViewMode } = useProjectsStore();
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortMenu(false);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.viewOptions}>
        <button 
          className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
          onClick={() => setViewMode('grid')}
          title="Vista Grid"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="11" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <button 
          className={`${styles.viewBtn} ${viewMode === 'table' ? styles.active : ''}`}
          onClick={() => setViewMode('table')}
          title="Vista Tabla"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <button 
          className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => setViewMode('list')}
          title="Vista Lista"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="3" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="8" width="14" height="3" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="13" width="14" height="3" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <button 
          className={`${styles.viewBtn} ${viewMode === 'map' ? styles.active : ''}`}
          onClick={() => setViewMode('map')}
          title="Vista Mapa"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 2C5 2 2 10 2 10s3 8 8 8 8-8 8-8-3-8-8-8z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      <div className={styles.searchWrapper}>
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="2"/>
          <path d="M13.5 13.5L17 17" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className={styles.sortWrapper}>
        <button 
          className={styles.sortBtn}
          onClick={() => setShowSortMenu(!showSortMenu)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M6 10h8M9 14h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filtros
        </button>
        
        {showSortMenu && (
          <div className={styles.sortMenu}>
            <button 
              className={sortBy === 'alphabetical' ? styles.active : ''}
              onClick={() => handleSortChange('alphabetical')}
            >
              Orden alfabético
            </button>
            <button 
              className={sortBy === 'incidents' ? styles.active : ''}
              onClick={() => handleSortChange('incidents')}
            >
              Número de incidencias
            </button>
            <button 
              className={sortBy === 'rfi' ? styles.active : ''}
              onClick={() => handleSortChange('rfi')}
            >
              Número de RFI
            </button>
            <button 
              className={sortBy === 'tasks' ? styles.active : ''}
              onClick={() => handleSortChange('tasks')}
            >
              Número de tareas
            </button>
          </div>
        )}
      </div>

      <button className={styles.createBtn}>
        + Crear proyecto
      </button>
    </div>
  );
}
