import './Alerta.css';

/** Se exporta para que la página pueda usar este tipo en su estado. */
export interface MensajeAlerta {
  tipo: 'exito' | 'error';
  texto: string;
  detalles?: string[]; // opcional
}

interface AlertaProps {
  mensaje: MensajeAlerta;
  onCerrar: () => void; // CALLBACK: una función que el padre nos entrega
}

/** Componente REUTILIZABLE: el mismo sirve para éxito (verde) y error (rojo). */
export function Alerta({ mensaje, onCerrar }: AlertaProps) {
  return (
    <div className={`alerta alerta--${mensaje.tipo}`} role={mensaje.tipo === 'error' ? 'alert' : 'status'}>
      <div>
        <strong>{mensaje.texto}</strong>
        {mensaje.detalles && mensaje.detalles.length > 0 && (
          <ul className="alerta__detalles">
            {mensaje.detalles.map((detalle) => (
              <li key={detalle}>{detalle}</li>
            ))}
          </ul>
        )}
      </div>
      {/* Se ENTREGA la función (onCerrar), no se ejecuta (onCerrar()) */}
      <button type="button" className="alerta__cerrar" aria-label="Cerrar mensaje" onClick={onCerrar}>
        ×
      </button>
    </div>
  );
}
