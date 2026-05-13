import { useEffect, useState } from 'react';
import { validateForm } from '../utils/validators';

export const useFormValidation = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const result = validateForm(formData);
    setErrors(result.errors);
    setIsValid(result.isValid);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const markAllTouched = () => {
    setTouched({
      titulo: true,
      descripcion: true,
      categoria: true,
      prioridad: true,
      email: true
    });
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
    setIsValid(false);
  };

  return {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    markAllTouched,
    resetForm
  };
};
