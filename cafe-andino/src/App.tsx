import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuPage } from './pages/MenuPage';

const NOMBRE_SITIO = 'Café Andino';
const ANIO_ACTUAL = new Date().getFullYear(); // se calcula una vez, fuera del componente

/**
 * COMPONENTE RAÍZ: define el layout general (encabezado, página y pie)
 * y envía a cada componente sus datos por props.
 */
function App() {
  return (
    // Fragmento <> </>: agrupa varios elementos sin agregar un <div> extra
    <>
      <Header
        nombreSitio={NOMBRE_SITIO}
        version="2.0"
        enlaces={[
          { texto: 'Inicio', href: '#inicio' },
          { texto: 'Menú', href: '#menu' },
          { texto: 'Contacto', href: '#contacto' },
        ]}
      />
   
      <Hero titulo="El mejor café de la montaña" subtitulo="Administra el menú del día: productos, precios y unidades." />
      <MenuPage />
      <Footer nombreSitio={NOMBRE_SITIO} direccion="Calle 10 # 5-20, Bogotá" anio={ANIO_ACTUAL} />
    </>
  );
}

export default App;
