// DOCUMENTACIÓN DE LA API en formato OpenAPI 3 (el "manual de instrucciones" que lee Swagger).
module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API de tareas',
    version: '2.0.0',
    description: 'Mini CRUD de tareas con Express y MongoDB, organizado en rutas, controladores y servicios.',
  },
  servers: [{ url: 'http://localhost:3000/api', description: 'Servidor local' }],
  tags: [{ name: 'Tareas', description: 'Crear, consultar, modificar y eliminar tareas' }],

  // Piezas reutilizables: la forma de una tarea y la forma de un error
  components: {
    schemas: {
      Tarea: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '6728f1a2b3c4d5e6f7a8b9c0' },
          titulo: { type: 'string', example: 'Repasar HTTP' },
          completada: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      NuevaTarea: {
        type: 'object',
        required: ['titulo'],
        properties: {
          titulo: { type: 'string', minLength: 3, example: 'Explicar middlewares' },
        },
      },
      CambiosTarea: {
        type: 'object',
        properties: {
          titulo: { type: 'string', minLength: 3, example: 'Explicar Swagger' },
          completada: { type: 'boolean', example: true },
        },
      },
      Error: {
        type: 'object',
        properties: {
          mensaje: { type: 'string', example: 'No existe la tarea 6728f1a2b3c4d5e6f7a8b9c0' },
        },
      },
    },
    parameters: {
      IdTarea: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Id de la tarea en MongoDB (24 caracteres hexadecimales)',
        schema: { type: 'string', example: '6728f1a2b3c4d5e6f7a8b9c0' },
      },
    },
  },

  // Cada ruta de la API, con lo que recibe y lo que responde
  paths: {
    '/tareas': {
      get: {
        tags: ['Tareas'],
        summary: 'Listar todas las tareas',
        responses: {
          200: {
            description: 'Lista de tareas',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Tarea' } } } },
          },
        },
      },
      post: {
        tags: ['Tareas'],
        summary: 'Crear una tarea',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/NuevaTarea' } } },
        },
        responses: {
          201: { description: 'Tarea creada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tarea' } } } },
          400: { description: 'Datos inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/tareas/{id}': {
      parameters: [{ $ref: '#/components/parameters/IdTarea' }],
      get: {
        tags: ['Tareas'],
        summary: 'Consultar una tarea',
        responses: {
          200: { description: 'La tarea', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tarea' } } } },
          400: { description: 'Id con formato inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'No existe', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      patch: {
        tags: ['Tareas'],
        summary: 'Modificar el título o marcar como completada',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CambiosTarea' } } },
        },
        responses: {
          200: { description: 'Tarea modificada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tarea' } } } },
          400: { description: 'Datos o id inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'No existe', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        tags: ['Tareas'],
        summary: 'Eliminar una tarea',
        responses: {
          204: { description: 'Eliminada (sin cuerpo)' },
          400: { description: 'Id con formato inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'No existe', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
  },
};
