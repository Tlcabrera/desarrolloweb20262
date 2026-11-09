import { describe, expect, it, vi } from 'vitest'
import { ErrorApi, tareasApi } from './tareasApi'

/** Reemplaza fetch por una respuesta inventada. */
function simularRespuesta(status: number, cuerpo?: unknown) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(cuerpo === undefined ? null : JSON.stringify(cuerpo), { status }),
  )
}

describe('tareasApi', () => {
  it('crear envía POST con el título en JSON', async () => {
    const fetchSimulado = simularRespuesta(201, { id: 3, titulo: 'Nueva', completada: false })

    const creada = await tareasApi.crear('Nueva')

    expect(creada.id).toBe(3)
    const [url, opciones] = fetchSimulado.mock.calls[0]
    expect(url).toBe('/api/tareas')
    expect(opciones?.method).toBe('POST')
    expect(opciones?.body).toBe(JSON.stringify({ titulo: 'Nueva' }))
  })

  it('lanza ErrorApi con el mensaje del servidor cuando la respuesta es 404', async () => {
    simularRespuesta(404, { mensaje: 'No existe la tarea 99' })

    await expect(tareasApi.actualizar(99, { completada: true })).rejects.toEqual(
      new ErrorApi(404, 'No existe la tarea 99'),
    )
  })

  it('eliminar acepta un 204 sin cuerpo', async () => {
    simularRespuesta(204)
    await expect(tareasApi.eliminar(1)).resolves.toBeUndefined()
  })

  it('avisa cuando no hay conexión con el servidor', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(tareasApi.listar()).rejects.toThrow('No se pudo conectar con el servidor')
  })
})
