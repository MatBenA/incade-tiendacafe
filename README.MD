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

**En Windows:**
1. Descargar desde [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Instalar el paquete
3. Iniciar el servicio: `net start MongoDB`

**En Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**En Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

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

**Si usas MongoDB Atlas (cloud):**
```bash
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/tiendacafe
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

### Acceder desde móvil (red local)
```bash
npm run dev -- --host
```

## 🌐 URLs de acceso

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Documentación de la API:** Ver endpoints abajo

## 📡 Endpoints de la API

### GET /api/subscribers
Obtiene todos los suscriptores.

**Respuesta:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "fechaSuscripcion": "2024-11-06T10:30:00.000Z"
  }
]
```

### GET /api/subscribers/:id
Obtiene un suscriptor específico por ID.

### POST /api/subscribers
Crea un nuevo suscriptor.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com"
}
```

**Respuesta:**
```json
{
  "message": "Suscriptor creado exitosamente",
  "subscriber": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "fechaSuscripcion": "2024-11-06T10:30:00.000Z"
  }
}
```

### PUT /api/subscribers/:id
Actualiza un suscriptor existente.

**Body:**
```json
{
  "nombre": "Juan Carlos Pérez",
  "email": "juanc@example.com"
}
```

### DELETE /api/subscribers/:id
Elimina un suscriptor.

**Respuesta:**
```json
{
  "message": "Suscriptor eliminado exitosamente",
  "subscriber": { ... }
}
```

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

## 🛠️ Tecnologías utilizadas

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## 🔒 Validaciones

- Email único (no permite duplicados)
- Campos nombre y email requeridos
- Formato de email válido
- Confirmación antes de eliminar

## 🐛 Solución de problemas

### Error: No se puede conectar a MongoDB
```bash
# Verificar que MongoDB esté corriendo
mongod --version

# En Windows
net start MongoDB

# En Mac/Linux
sudo systemctl status mongodb
```

### Error: Puerto 3000 en uso
Cambiar el puerto en el archivo `.env`:
```
PORT=3001
```

Y actualizar la URL en `scripts/subscribers.js`:
```javascript
const API_URL = 'http://localhost:3001/api/subscribers';
```

### Error: CORS
Verificar que el servidor Express esté usando el middleware CORS correctamente.

## 📝 Notas

- La base de datos se crea automáticamente al iniciar el servidor
- Los datos persisten en MongoDB
- Todos los estilos respetan el diseño original

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📄 Licencia

Este proyecto es de uso educativo.