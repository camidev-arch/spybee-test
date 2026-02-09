import { useEffect } from 'react';
import styles from './ProjectsTable.module.css';
import useProjectsStore from '@/store/useProjectsStore';

export default function ProjectsTable() {
  const { 
    getPaginatedProjects, 
    setSelectedProject, 
    getItemCounts,
    selectedProject,
    viewMode,
    setViewMode
  } = useProjectsStore();

  const projects = getPaginatedProjects();

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    if (viewMode !== 'map') {
      setViewMode('map');
    }
  };

  const getBadgeClass = (plan) => {
    switch(plan?.toLowerCase()) {
      case 'small': return styles.badgePequeño;
      case 'medium': return styles.badgeAvanzado;
      case 'big': return styles.badgePremium;
      default: return styles.badgePequeño;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return styles.badgeActivo;
      case 'inactive': return styles.badgeInactivo;
      case 'suspended': return styles.badgeSuspendido;
      case 'pending_payment': return styles.badgePendiente;
      default: return styles.badgeInactivo;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'active': 'Activo',
      'inactive': 'Inactivo',
      'suspended': 'Suspendido',
      'pending_payment': 'Pendiente pago'
    };
    return labels[status] || status;
  };

  const getPlanLabel = (plan) => {
    const labels = {
      'small': 'Pequeño',
      'medium': 'Avanzado',
      'big': 'Premium'
    };
    return labels[plan] || plan;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getInitials = (user) => {
    if (!user.name || !user.lastName) return '??';
    return (user.name.charAt(0) + user.lastName.charAt(0)).toUpperCase();
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.th}>Proyecto</div>
        <div className={styles.th}>Plan</div>
        <div className={styles.th}>Estado</div>
        <div className={styles.th}>Equipo</div>
        <div className={styles.th}>Items por vencer</div>
        <div className={styles.th}>
          <div className={styles.scrollControls}>
            <button className={styles.scrollBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.scrollBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <svg className={styles.menuIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="4" width="14" height="2" fill="currentColor"/>
              <rect x="3" y="9" width="14" height="2" fill="currentColor"/>
              <rect x="3" y="14" width="14" height="2" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.tableBody}>
        {projects.map((project) => {
          const counts = getItemCounts(project);
          const isSelected = selectedProject?._id === project._id;

          return (
            <div 
              key={project._id} 
              className={`${styles.tableRow} ${isSelected ? styles.highlighted : ''}`}
              onClick={() => handleProjectClick(project)}
            >
              <div className={styles.td}>
                <div className={styles.projectInfo}>
                  <div className={styles.projectName}>
                    {project.title}
                    {project.hasAttachment && (
                      <svg className={styles.attachmentIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12 6.5L6.5 12C5.67 12.83 4.33 12.83 3.5 12C2.67 11.17 2.67 9.83 3.5 9L9 3.5C9.55 2.95 10.45 2.95 11 3.5C11.55 4.05 11.55 4.95 11 5.5L6.5 10C6.22 10.28 5.78 10.28 5.5 10C5.22 9.72 5.22 9.28 5.5 9L9.5 5" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className={styles.projectDates}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#999" strokeWidth="1.2"/>
                      <path d="M6 3V6L8 7" stroke="#999" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {formatDate(project.createdAt)} - {formatDate(project.lastUpdated)}
                  </div>
                </div>
              </div>

              <div className={styles.td}>
                <span className={`${styles.badge} ${getBadgeClass(project.projectPlanData?.plan)}`}>
                  {getPlanLabel(project.projectPlanData?.plan)}
                </span>
              </div>

              <div className={styles.td}>
                <span className={`${styles.badge} ${getStatusBadgeClass(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>

              <div className={styles.td}>
                <div className={styles.avatars}>
                  {project.users?.slice(0, 6).map((user, index) => (
                    <div 
                      key={index} 
                      className={`${styles.avatar} ${index === 4 ? styles.avatarHighlight : ''}`}
                      title={`${user.name} ${user.lastName}`}
                    >
                      {getInitials(user)}
                    </div>
                  ))}
                  {project.users?.length > 6 && (
                    <div className={styles.avatar}>+{project.users.length - 6}</div>
                  )}
                </div>
              </div>

              <div className={styles.td}>
                <div className={styles.itemsGroup}>
                  <div className={styles.item}>
                    <span className={styles.itemNumber}>{counts.incidents}</span>
                    <span className={styles.itemLabel}>Incidencias</span>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.itemNumber}>{counts.rfi}</span>
                    <span className={styles.itemLabel}>RFI</span>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.itemNumber}>{counts.tasks}</span>
                    <span className={styles.itemLabel}>Tareas</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
