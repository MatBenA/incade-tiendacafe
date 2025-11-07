const API_URL = 'http://localhost:3000/api/subscribers';

let editingId = null;

// Cargar suscriptores al iniciar
document.addEventListener('DOMContentLoaded', () => {
  loadSubscribers();
  setupFormHandler();
});

// Configurar el manejador del formulario
function setupFormHandler() {
  const form = document.querySelector('footer form');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nombre || !email) {
      showMessage('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      if (editingId) {
        // Actualizar suscriptor existente
        await updateSubscriber(editingId, nombre, email);
        editingId = null;
        submitBtn.textContent = 'SUSCRIBIRME';
      } else {
        // Crear nuevo suscriptor
        await createSubscriber(nombre, email);
      }
      
      form.reset();
      await loadSubscribers();
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

// Cargar todos los suscriptores
async function loadSubscribers() {
  try {
    const response = await fetch(API_URL);
    const subscribers = await response.json();
    
    displaySubscribers(subscribers);
  } catch (error) {
    console.error('Error al cargar suscriptores:', error);
    showMessage('Error al cargar la lista de suscriptores', 'error');
  }
}

// Mostrar suscriptores en la lista
function displaySubscribers(subscribers) {
  const container = document.getElementById('subscribers-list');
  
  if (subscribers.length === 0) {
    container.innerHTML = '<p class="no-subscribers">No hay suscriptores aún</p>';
    return;
  }

  container.innerHTML = subscribers.map(sub => `
    <div class="subscriber-item" data-id="${sub._id}">
      <div class="subscriber-info">
        <span class="subscriber-name">${sub.nombre}</span>
        <span class="subscriber-email">${sub.email}</span>
      </div>
      <div class="subscriber-actions">
        <button class="btn-edit" onclick="editSubscriber('${sub._id}', '${sub.nombre}', '${sub.email}')">
          Editar
        </button>
        <button class="btn-delete" onclick="deleteSubscriber('${sub._id}')">
          Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

// Crear nuevo suscriptor
async function createSubscriber(nombre, email) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear suscriptor');
    }

    showMessage('¡Suscripción exitosa!', 'success');
  } catch (error) {
    showMessage(error.message, 'error');
    throw error;
  }
}

// Editar suscriptor con modal
function editSubscriber(id, nombre, email) {
  // Crear el modal
  const modal = document.createElement('div');
  modal.className = 'edit-modal-overlay';
  modal.innerHTML = `
    <div class="edit-modal">
      <div class="edit-modal-header">
        <h3>✏️ Editar Suscriptor</h3>
        <button class="close-modal" onclick="closeEditModal()">&times;</button>
      </div>
      <form id="edit-form" class="edit-modal-form">
        <div class="edit-input-group">
          <label for="edit-nombre">Nombre</label>
          <input 
            type="text" 
            id="edit-nombre" 
            value="${nombre}" 
            placeholder="Nombre completo"
            required 
          />
        </div>
        <div class="edit-input-group">
          <label for="edit-email">Email</label>
          <input 
            type="email" 
            id="edit-email" 
            value="${email}" 
            placeholder="correo@ejemplo.com"
            required 
          />
        </div>
        <div class="edit-modal-actions">
          <button type="button" class="btn-cancel" onclick="closeEditModal()">
            Cancelar
          </button>
          <button type="submit" class="btn-save">
            💾 Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animar la entrada del modal
  setTimeout(() => modal.classList.add('active'), 10);
  
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
  
  // Focus en el primer input
  setTimeout(() => document.getElementById('edit-nombre').focus(), 100);
  
  // Manejar el envío del formulario
  document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nuevoNombre = document.getElementById('edit-nombre').value.trim();
    const nuevoEmail = document.getElementById('edit-email').value.trim();
    
    if (!nuevoNombre || !nuevoEmail) {
      showMessage('Por favor completa todos los campos', 'error');
      return;
    }
    
    try {
      await updateSubscriber(id, nuevoNombre, nuevoEmail);
      closeEditModal();
      await loadSubscribers();
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Cerrar con ESC
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeEditModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
  
  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeEditModal();
    }
  });
}

// Cerrar modal de edición
function closeEditModal() {
  const modal = document.querySelector('.edit-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

// Actualizar suscriptor
async function updateSubscriber(id, nombre, email) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar suscriptor');
    }

    showMessage('Suscriptor actualizado exitosamente', 'success');
  } catch (error) {
    showMessage(error.message, 'error');
    throw error;
  }
}

// Eliminar suscriptor
async function deleteSubscriber(id) {
  if (!confirm('¿Estás seguro de eliminar este suscriptor?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar suscriptor');
    }

    showMessage('Suscriptor eliminado exitosamente', 'success');
    await loadSubscribers();
  } catch (error) {
    showMessage(error.message, 'error');
    console.error('Error al eliminar:', error);
  }
}

// Mostrar mensajes al usuario
function showMessage(message, type) {
  // Remover mensaje anterior si existe
  const existingMsg = document.querySelector('.message-notification');
  if (existingMsg) {
    existingMsg.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `message-notification ${type}`;
  messageDiv.textContent = message;
  
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.classList.add('show');
  }, 10);

  setTimeout(() => {
    messageDiv.classList.remove('show');
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}