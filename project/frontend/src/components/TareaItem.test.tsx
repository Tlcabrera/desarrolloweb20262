import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TareaItem } from './TareaItem'

const tarea = { id: 1, titulo: 'Repasar HTTP', completada: false }

describe('TareaItem', () => {
  it('muestra el título y una casilla sin marcar', () => {
    render(<TareaItem tarea={tarea} onAlternar={vi.fn()} onEliminar={vi.fn()} />)

    // Buscamos como lo haría una persona: por el texto de la etiqueta
    expect(screen.getByRole('checkbox', { name: 'Repasar HTTP' })).not.toBeChecked()
  })

  it('avisa al padre al marcar la casilla y al pulsar eliminar', async () => {
    const usuario = userEvent.setup()
    const onAlternar = vi.fn()
    const onEliminar = vi.fn()
    render(<TareaItem tarea={tarea} onAlternar={onAlternar} onEliminar={onEliminar} />)

    await usuario.click(screen.getByRole('checkbox', { name: 'Repasar HTTP' }))
    await usuario.click(screen.getByRole('button', { name: 'Eliminar "Repasar HTTP"' }))

    expect(onAlternar).toHaveBeenCalledWith(tarea)
    expect(onEliminar).toHaveBeenCalledWith(tarea)
  })
})
