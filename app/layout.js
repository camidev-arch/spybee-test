import '../styles/globals.css';

export const metadata = {
  title: 'Spybee - Gestión de Proyectos',
  description: 'Sistema de gestión de proyectos empresariales',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
