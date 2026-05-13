export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p
      style={{
        color: '#b42318',
        fontSize: '14px',
        marginTop: '6px'
      }}
    >
      {message}
    </p>
  );
};
