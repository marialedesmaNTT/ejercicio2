import './App.css';
import { TaskForm } from './components/TaskForm';

function App() {
  const handleSubmit = async (formData) => {
    console.log('Datos enviados:', formData);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const randomError = Math.random() < 0.25;
    if (randomError) {
      throw new Error('Error simulado de red. Pulsa de nuevo para reintentar.');
    }
  };

  return (
    <main className="app-container">
      <TaskForm onSubmit={handleSubmit} />
    </main>
  );
}

export default App;
