import { useState } from 'react';
import './App.css';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { getSolucionesByEmail, insertSolucion } from './services/soluciones';

function App() {
  const [items, setItems] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState('');

  const loadSoluciones = async (email) => {
    if (!email.trim()) {
      setItems([]);
      setCurrentEmail('');
      return;
    }

    try {
      setListLoading(true);
      setListError('');
      const data = await getSolucionesByEmail(email);
      setItems(data);
      setCurrentEmail(email.trim().toLowerCase());
    } catch (error) {
      setListError(error.message || 'No se pudo cargar el listado.');
    } finally {
      setListLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    const savedItem = await insertSolucion(formData);
    await loadSoluciones(savedItem.email);
    return savedItem;
  };

  return (
    <main className="app-container">
      <div className="layout">
        <TaskForm onSubmit={handleSubmit} />
        <TaskList
          items={items}
          email={currentEmail}
          loading={listLoading}
          error={listError}
        />
      </div>
    </main>
  );
}

export default App;
