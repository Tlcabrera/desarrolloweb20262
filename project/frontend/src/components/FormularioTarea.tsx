import { useState, type FormEvent } from 'react'

interface FormularioTareaProps {
  /** Devuelve true si la tarea se guardó. */
  onCrear: (titulo: string) => Promise<boolean>
}

const MINIMO = 3

/** Campo y botón para agregar una tarea, con validación antes de enviar. */
export function FormularioTarea({ onCrear }: FormularioTareaProps) {
  const [titulo, setTitulo] = useState('') // input controlado: el valor vive en el estado
  const [error, setError] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault() // evita que el navegador recargue la página
    const limpio = titulo.trim()
    if (limpio.length < MINIMO) {
      setError(`Escribe al menos ${MINIMO} caracteres`)
      return
    }
    setError(null)
    setGuardando(true)
    const guardada = await onCrear(limpio)
    setGuardando(false)
    if (guardada) setTitulo('')
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <label htmlFor="titulo-tarea" className="formulario__etiqueta">
        Nueva tarea
      </label>
      <div className="formulario__fila">
        <input
          id="titulo-tarea"
          className="campo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej.: Repasar useEffect"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'error-titulo' : undefined}
          disabled={guardando}
        />
        <button type="submit" className="boton boton--primario" disabled={guardando}>
          {guardando ? 'Agregando…' : 'Agregar'}
        </button>
      </div>
      {error && (
        <p id="error-titulo" className="formulario__error">
          {error}
        </p>
      )}
    </form>
  )
}
