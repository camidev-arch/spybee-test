'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useProjectsStore from '@/store/useProjectsStore';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();
  const { login } = useProjectsStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication - Replace with real API call
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        const user = {
          name: 'Marco',
          email: email,
          role: 'Administrador'
        };

        login(user);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        
        router.push('/');
      } else {
        setError('Por favor ingrese email y contraseña');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4AF37"/>
            <path d="M2 17L12 22L22 17" stroke="#D4AF37" strokeWidth="2"/>
            <path d="M2 12L12 17L22 12" stroke="#D4AF37" strokeWidth="2"/>
          </svg>
          <h1>Spybee</h1>
        </div>

        <div className={styles.welcomeText}>
          <h2>Bienvenido</h2>
          <p>Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <a href="#" className={styles.forgotPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿No tienes una cuenta? <a href="#">Regístrate</a></p>
        </div>
      </div>

      <div className={styles.decoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
}
