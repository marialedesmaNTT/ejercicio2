import { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { ErrorMessage } from './ErrorMessage';

const CATEGORIAS = ['Trabajo', 'Personal', 'Urgente', 'Proyecto', 'Otro'];

const initialFormState = {
  titulo: '',
  descripcion: '',
  categoria: '',
  prioridad: '',
  email: ''
};

export const TaskForm = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    markAllTouched,
    resetForm
  } = useFormValidation(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!isValid) {
      markAllTouched();
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setSubmitSuccess('Formulario enviado correctamente');
      resetForm();
    } catch (error) {
      setSubmitError(error.message || 'Ha ocurrido un error al enviar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Crear solución</h2>

      {submitSuccess && <div className="alert success">{submitSuccess}</div>}
      {submitError && <div className="alert error">{submitError}</div>}

      <div className="field">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={formData.titulo}
          onChange={(e) => handleChange('titulo', e.target.value)}
          onBlur={() => handleBlur('titulo')}
          placeholder="Entre 5 y 60 caracteres"
        />
        <div className="hint">{formData.titulo.length}/60</div>
        {touched.titulo && <ErrorMessage message={errors.titulo} />}
      </div>

      <div className="field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          rows="5"
          value={formData.descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          onBlur={() => handleBlur('descripcion')}
          placeholder="Entre 20 y 500 caracteres"
        />
        <div className="hint">{formData.descripcion.length}/500</div>
        {touched.descripcion && <ErrorMessage message={errors.descripcion} />}
      </div>

      <div className="field">
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          value={formData.categoria}
          onChange={(e) => handleChange('categoria', e.target.value)}
          onBlur={() => handleBlur('categoria')}
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        {touched.categoria && <ErrorMessage message={errors.categoria} />}
      </div>

      <div className="field">
        <label htmlFor="prioridad">Prioridad</label>
        <input
          id="prioridad"
          type="number"
          min="1"
          max="5"
          value={formData.prioridad}
          onChange={(e) => handleChange('prioridad', e.target.value)}
          onBlur={() => handleBlur('prioridad')}
          placeholder="1 a 5"
        />
        {touched.prioridad && <ErrorMessage message={errors.prioridad} />}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="ejemplo@email.com"
        />
        {touched.email && <ErrorMessage message={errors.email} />}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};
