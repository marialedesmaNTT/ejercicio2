import './App.css';
import { TaskForm } from './components/TaskForm';
import { insertSolucion } from './services/soluciones';

function App() {
  const handleSubmit = async (formData) => {
    await insertSolucion(formData);
  };

  return (
    <main className="app-container">
      <TaskForm onSubmit={handleSubmit} />
    </main>
  );
}

export default App;
