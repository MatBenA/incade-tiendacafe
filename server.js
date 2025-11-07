import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tiendacafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Modelo de Suscriptor
const subscriberSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fechaSuscripcion: {
    type: Date,
    default: Date.now
  }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// ENDPOINTS

// GET - Obtener todos los suscriptores
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ fechaSuscripcion: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener suscriptores', error: error.message });
  }
});

// GET - Obtener un suscriptor por ID
app.get('/api/subscribers/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Suscriptor no encontrado' });
    }
    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener suscriptor', error: error.message });
  }
});

// POST - Crear nuevo suscriptor
app.post('/api/subscribers', async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Validaciones
    if (!nombre || !email) {
      return res.status(400).json({ message: 'Nombre y email son requeridos' });
    }

    // Verificar si el email ya existe
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Este email ya está suscrito' });
    }

    const newSubscriber = new Subscriber({ nombre, email });
    await newSubscriber.save();
    
    res.status(201).json({ 
      message: 'Suscriptor creado exitosamente', 
      subscriber: newSubscriber 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear suscriptor', error: error.message });
  }
});

// PUT - Actualizar suscriptor
app.put('/api/subscribers/:id', async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Validaciones
    if (!nombre || !email) {
      return res.status(400).json({ message: 'Nombre y email son requeridos' });
    }

    // Verificar si el email ya existe en otro suscriptor
    const existingSubscriber = await Subscriber.findOne({ 
      email, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Este email ya está en uso por otro suscriptor' });
    }

    const updatedSubscriber = await Subscriber.findByIdAndUpdate(
      req.params.id,
      { nombre, email },
      { new: true, runValidators: true }
    );

    if (!updatedSubscriber) {
      return res.status(404).json({ message: 'Suscriptor no encontrado' });
    }

    res.json({ 
      message: 'Suscriptor actualizado exitosamente', 
      subscriber: updatedSubscriber 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar suscriptor', error: error.message });
  }
});

// DELETE - Eliminar suscriptor
app.delete('/api/subscribers/:id', async (req, res) => {
  try {
    const deletedSubscriber = await Subscriber.findByIdAndDelete(req.params.id);
    
    if (!deletedSubscriber) {
      return res.status(404).json({ message: 'Suscriptor no encontrado' });
    }

    res.json({ 
      message: 'Suscriptor eliminado exitosamente', 
      subscriber: deletedSubscriber 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar suscriptor', error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});