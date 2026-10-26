import './Hero.css';

interface HeroProps {
  titulo: string;
  subtitulo: string;
  textoBoton?: string;
}

// textoBoton tiene un VALOR POR DEFECTO: si el padre no lo envía, vale 'Ver el menú'.
export function Hero({ titulo, subtitulo, textoBoton = 'Ver el menú' }: HeroProps) {
  return (
    <section className="hero" id="inicio">
      <h2 className="hero__titulo">{titulo}</h2>
      <p className="hero__subtitulo">{subtitulo}</p>
      <a href="#menu" className="boton boton--acento">
        {textoBoton}
      </a>
    </section>
  );
}
