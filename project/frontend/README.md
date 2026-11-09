# Mis tareas · frontend del mini CRUD

React 19 + TypeScript + Vite. Consume la API de tareas (`mini-crud-swagger` o `mini-crud-mongo`).

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:5173 (el backend debe estar en http://localhost:3000)
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga instantánea |
| `npm run test` | Pruebas en modo vigilancia (se repiten al guardar) |
| `npm run test:run` | Pruebas una sola vez |
| `npm run lint` | Revisa el código con oxlint |
| `npm run build` | Revisa los tipos y genera la versión de producción en `dist/` |

## Estructura

```
src/
├── types/tarea.ts          tipos compartidos
├── services/tareasApi.ts   única capa que habla con la API (fetch)
├── hooks/useTareas.ts      estado y lógica
├── components/             piezas de la interfaz (+ sus pruebas)
├── styles/tokens.css       colores y medidas del prototipo
├── styles/app.css          estilos que usan los tokens
└── App.tsx                 une el hook con los componentes
```
