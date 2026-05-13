export const TaskList = ({ items, email, loading, error }) => {
  return (
    <section className="card">
      <h2>Mis soluciones</h2>

      {email && (
        <p className="list-subtitle">
          Mostrando resultados para: <strong>{email}</strong>
        </p>
      )}

      {loading && <p>Cargando soluciones...</p>}

      {!loading && error && <div className="alert error">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <p>No hay soluciones para este email todavía.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="task-list">
          {items.map((item) => (
            <article key={item.id} className="task-item">
              <div className="task-item-header">
                <h3>{item.titulo}</h3>
                <span className="priority-badge">Prioridad: {item.prioridad}</span>
              </div>

              <p>{item.descripcion}</p>

              <div className="task-meta">
                <span>Categoría: {item.categoria}</span>
                <span>Email: {item.email}</span>
                <span>Fecha: {new Date(item.created_at).toLocaleString()}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
