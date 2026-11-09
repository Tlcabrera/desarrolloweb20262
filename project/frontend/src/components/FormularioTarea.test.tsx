import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FormularioTarea } from './FormularioTarea'

describe('FormularioTarea', () => {
  it('no envía un título de menos de 3 caracteres y muestra el error', async () => {
    const usuario = userEvent.setup()
    const onCrear = vi.fn()
    render(<FormularioTarea onCrear={onCrear} />)

    await usuario.type(screen.getByLabelText('Nueva tarea'), 'ab')
    await usuario.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(screen.getByText('Escribe al menos 3 caracteres')).toBeInTheDocument()
    expect(screen.getByLabelText('Nueva tarea')).toHaveAttribute('aria-invalid', 'true')
    expect(onCrear).not.toHaveBeenCalled()
  })

  it('envía el título sin espacios sobrantes y limpia el campo', async () => {
    const usuario = userEvent.setup()
    const onCrear = vi.fn().mockResolvedValue(true)
    render(<FormularioTarea onCrear={onCrear} />)

    const campo = screen.getByLabelText('Nueva tarea')
    await usuario.type(campo, '  Estudiar React  {Enter}')

    expect(onCrear).toHaveBeenCalledWith('Estudiar React')
    expect(campo).toHaveValue('')
  })

  it('conserva el texto si el servidor no pudo guardar', async () => {
    const usuario = userEvent.setup()
    const onCrear = vi.fn().mockResolvedValue(false)
    render(<FormularioTarea onCrear={onCrear} />)

    const campo = screen.getByLabelText('Nueva tarea')
    await usuario.type(campo, 'Estudiar React{Enter}')

    expect(campo).toHaveValue('Estudiar React')
  })
})
