import type { ReactNode } from 'react'

interface AvisoProps {
  children: ReactNode
  /** Botón opcional, por ejemplo "Reintentar" o "Cerrar". */
  accion?: { texto: string; onClick: () => void }
}

/** Mensaje de error destacado. role="alert" hace que el lector de pantalla lo anuncie. */
export function Aviso({ children, accion }: AvisoProps) {
  return (
    <div className="aviso" role="alert">
      <span>{children}</span>
      {accion && (
        <button type="button" className="boton boton--secundario" onClick={accion.onClick}>
          {accion.texto}
        </button>
      )}
    </div>
  )
}
