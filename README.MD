# Tienda de Café - CRUD de Suscriptores

Proyecto web para Tienda de Café con sistema de gestión de suscriptores (CRUD completo) usando Express.js y MongoDB.

## 🚀 Características

- ✅ Sistema CRUD completo de suscriptores
- ✅ Backend con Express.js
- ✅ Base de datos MongoDB
- ✅ Interfaz responsive
- ✅ Validaciones de datos
- ✅ Notificaciones de usuario

## 📋 Requisitos

* Node.js (v14 o superior)
* npm o bun instalado como gestor de paquetes
* git instalado
* **MongoDB instalado y corriendo localmente** (o una URI de MongoDB Atlas)

### Instalar MongoDB localmente


## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/MatBenA/incade-tiendacafe.git
cd incade-tiendacafe
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tiendacafe
```

## 🎮 Ejecución

### Opción 1: Ejecutar todo simultáneamente (Recomendado)
```bash
npm start
```
Esto iniciará tanto el servidor backend (puerto 3000) como el frontend (Vite).

### Opción 2: Ejecutar por separado

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📡 Endpoints de la API

### GET /api/subscribers
Obtiene todos los suscriptores.

## 🎨 Funcionalidades del Frontend

1. **Suscribirse:** Completar el formulario con nombre y email
2. **Ver suscriptores:** Lista actualizada debajo del formulario
3. **Editar:** Click en "Editar" para modificar datos
4. **Eliminar:** Click en "Eliminar" con confirmación
5. **Notificaciones:** Mensajes de éxito/error en tiempo real

## 🗂️ Estructura del proyecto

```
incade-tiendacafe/
├── server.js              # Servidor Express y API REST
├── package.json           # Dependencias del proyecto
├── .env                   # Variables de entorno (crear)
├── .env.example           # Ejemplo de variables de entorno
├── index.html             # HTML principal (actualizado)
├── scripts/
│   ├── hamburger.js       # Menú hamburguesa
│   └── subscribers.js     # Lógica del CRUD frontend
└── styles/
    ├── normalize.css
    ├── navbar.css
    ├── hero.css
    ├── products.css
    ├── showcase.css
    ├── variants.css
    ├── action.css
    ├── footer.css
    ├── hamburger.css
    └── subscribers.css    # Estilos del CRUD (nuevo)
```