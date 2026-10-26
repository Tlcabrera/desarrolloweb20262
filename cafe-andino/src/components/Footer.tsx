import './Footer.css';

interface FooterProps {
  nombreSitio: string;
  direccion: string;
  anio: number; // las props pueden ser de cualquier tipo, no solo texto
}

export function Footer({ nombreSitio, direccion, anio }: FooterProps) {
  return (
    <footer className="footer" id="contacto">
      <p>📍 {direccion}</p>
      <p>
        © {anio} {nombreSitio} · Hecho con React + TypeScript + Vite
      </p>
    </footer>
  );
}
