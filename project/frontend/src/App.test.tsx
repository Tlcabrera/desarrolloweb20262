import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import type { Tarea } from './types/tarea'

/**
 * Un backend falso en memoria: responde a fetch como lo haría la API de tareas.
 * Así probamos la app completa sin encender Express.
 */
function simularBackend(iniciales: Tarea[]) {
  let tareas = [...iniciales]
  let siguienteId = 100
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (entrada, opciones) => {
    const url = String(entrada)
    const metodo = opciones?.method ?? 'GET'
    const cuerpo = opciones?.body ? JSON.parse(String(opciones.body)) : null
    const id = Number(url.split('/').pop())
    const json = (status: number, datos?: unknown) =>
      new Response(datos === undefined ? null : JSON.stringify(datos), { status })

    if (metodo === 'GET') return json(200, tareas)
    if (metodo === 'POST') {
      const nueva = { id: siguienteId++, titulo: cuerpo.titulo, completada: false }
      tareas.push(nueva)
      return json(201, nueva)
    }
    if (metodo === 'PATCH') {
      tareas = tareas.map((t) => (t.id === id ? { ...t, ...cuerpo } : t))
      return json(200, tareas.find((t) => t.id === id))
    }
    tareas = tareas.filter((t) => t.id !== id)
    return json(204)
  })
}

const iniciales: Tarea[] = [
  { id: 1, titulo: 'Repasar HTTP', completada: true },
  { id: 2, titulo: 'Instalar Express', completada: false },
]

describe('App (integración)', () => {
  it('muestra "Cargando" y luego las tareas del servidor', async () => {
    simularBackend(iniciales)
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Cargando tareas…')
    expect(await screen.findByText('Instalar Express')).toBeInTheDocument()
    expect(screen.getByText('1 pendiente de 2')).toBeInTheDocument()
  })

  it('crea, completa, filtra y elimina una tarea', async () => {
    simularBackend(iniciales)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const usuario = userEvent.setup()
    render(<App />)
    await screen.findByText('Instalar Express')

    // Crear
    await usuario.type(screen.getByLabelText('Nueva tarea'), 'Probar el frontend{Enter}')
    expect(await screen.findByText('Probar el frontend')).toBeInTheDocument()
    expect(screen.getByText('2 pendientes de 3')).toBeInTheDocument()

    // Completar
    await usuario.click(screen.getByRole('checkbox', { name: 'Probar el frontend' }))
    expect(await screen.findByText('1 pendiente de 3')).toBeInTheDocument()

    // Filtrar: solo pendientes
    await usuario.click(screen.getByRole('button', { name: 'Pendientes' }))
    const lista = screen.getByRole('list', { name: 'Lista de tareas' })
    expect(within(lista).getAllByRole('listitem')).toHaveLength(1)

    // Eliminar
    await usuario.click(screen.getByRole('button', { name: 'Eliminar "Instalar Express"' }))
    expect(await screen.findByText('No hay tareas para mostrar.')).toBeInTheDocument()
  })

  it('muestra el error y permite reintentar cuando el servidor no responde', async () => {
    const fetchSimulado = vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'))
    const usuario = userEvent.setup()
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo conectar con el servidor')

    fetchSimulado.mockResolvedValue(new Response(JSON.stringify(iniciales), { status: 200 }))
    await usuario.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(await screen.findByText('Repasar HTTP')).toBeInTheDocument()
  })
})
