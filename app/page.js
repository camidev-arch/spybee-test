'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useProjectsStore from '@/store/useProjectsStore';
import Header from '@/components/Header/Header';
import SearchBar from '@/components/SearchBar/SearchBar';
import ProjectsTable from '@/components/ProjectsTable/ProjectsTable';
import ProjectsMap from '@/components/ProjectsMap/ProjectsMap';
import Pagination from '@/components/Pagination/Pagination';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { 
    isAuthenticated,
    login,
    setProjects, 
    filteredProjects, 
    viewMode 
  } = useProjectsStore();

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (!authStatus) {
      router.push('/login');
      return;
    }

    // Restore user session in Zustand
    if (userData) {
      try {
        const user = JSON.parse(userData);
        login(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
        return;
      }
    }

    // Load projects data
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading projects:', error);
        setIsLoading(false);
      });
  }, [router, setProjects, login]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Mis proyectos</h1>
              <span className={styles.count}>{filteredProjects.length} Proyectos</span>
            </div>
            <SearchBar />
          </div>

          {viewMode === 'map' ? (
            <div className={styles.mapView}>
              <ProjectsMap />
              <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                  <h2>Resumen</h2>
                  <button className={styles.filterBtn}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Filtros
                  </button>
                </div>
                <div className={styles.sidebarContent}>
                  <p className={styles.sidebarText}>
                    Selecciona un proyecto del mapa o la tabla para ver más detalles
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ProjectsTable />
              <Pagination />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
