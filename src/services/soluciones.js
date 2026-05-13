import { supabase } from './supabase';

const getSupabaseErrorMessage = (error) => {
  const message = error?.message?.toLowerCase() || '';

  if (message.includes('failed to fetch')) {
    return 'Error de red. Revisa tu conexión e inténtalo de nuevo.';
  }

  if (message.includes('permission denied') || message.includes('row-level security')) {
    return 'No tienes permisos para realizar esta acción.';
  }

  return 'No se pudo completar la operación. Inténtalo de nuevo.';
};

export const insertSolucion = async (formData) => {
  const payload = {
    titulo: formData.titulo.trim(),
    descripcion: formData.descripcion.trim(),
    categoria: formData.categoria,
    prioridad: Number(formData.prioridad),
    email: formData.email.trim().toLowerCase()
  };

  const { data, error } = await supabase
    .from('soluciones')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(getSupabaseErrorMessage(error));
  }

  return data;
};

export const getSolucionesByEmail = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from('soluciones')
    .select('*')
    .eq('email', normalizedEmail)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(getSupabaseErrorMessage(error));
  }

  return data;
};
