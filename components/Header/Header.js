import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import useProjectsStore from '@/store/useProjectsStore';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useProjectsStore();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4AF37"/>
          <path d="M2 17L12 22L22 17" stroke="#D4AF37" strokeWidth="2"/>
          <path d="M2 12L12 17L22 12" stroke="#D4AF37" strokeWidth="2"/>
        </svg>
        <span>Spybee</span>
      </div>

      <div className={styles.userMenuWrapper}>
        <div 
          className={styles.userMenu}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className={styles.userAvatar}>
            {user?.name?.charAt(0) || 'M'}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'Marco'}</span>
            <span className={styles.userRole}>{user?.role || 'Administrador'}</span>
          </div>
          <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {showMenu && (
          <div className={styles.dropdown}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
