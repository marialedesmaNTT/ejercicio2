export const validators = {
  titulo: (value) => {
    if (!value || value.trim().length < 5) {
      return 'El título debe tener al menos 5 caracteres';
    }
    if (value.length > 60) {
      return 'El título no puede exceder 60 caracteres';
    }
    return null;
  },

  descripcion: (value) => {
    if (!value || value.trim().length < 20) {
      return 'La descripción debe tener al menos 20 caracteres';
    }
    if (value.length > 500) {
      return 'La descripción no puede exceder 500 caracteres';
    }
    return null;
  },

  categoria: (value) => {
    if (!value || value.trim() === '') {
      return 'Selecciona una categoría';
    }
    return null;
  },

  prioridad: (value) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > 5) {
      return 'La prioridad debe estar entre 1 y 5';
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) {
      return 'Ingresa un email válido';
    }
    return null;
  }
};

export const validateForm = (formData) => {
  const errors = {};

  Object.keys(validators).forEach((field) => {
    const error = validators[field](formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
