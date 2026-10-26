funcion declarativa 
function Saludo() {
    return <h1>Hola, StockFácil</h1>;
  }
  DOM (elemento) Diffing
TypeScript
Undefined

 function calcularTotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }
  calcularTotal(1000, '3');

  .js .jsx
  .ts .tsx

  vite build tool(HMR) npm run build react+typescript
  npm create vite@latest frontend -- --template react-ts
  npm run dev
  http://localhost:5173

  componentes funcion que devuelve una parte de la interfaz
  <Header />
  <ProductoTabla />
  <ProductoFila />
  App
  ------Header
  -----------Resumen
  ---------------ProductoTabla
  --------------------ProductoFila

  class= 
  className=
  for=
  htmlFor=
  <input></input>
  <input />
  onclick=
  onClick={funcion}

  Props parametros de los componentes. los datos que los componentes padre le pasan a sus hijos
   interface SaludoProps { nombre: string }
  
  function Saludo({ nombre }: SaludoProps) {
    return <p>Hola, {nombre}</p>;
  }
  <Saludo nombre="Ana" />
  Estados
  son datos que pertenecen a un componente y que en teoria pueden cambiar
  let x
  x=1
  x=5
  useState
  const [contador, setContador] = useState(0);
  <button onClick={() => setContador(contador + 1)}>{contador}</button>
