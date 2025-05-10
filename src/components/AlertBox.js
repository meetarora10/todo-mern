// AlertBox.jsx
function AlertBox({ message, type, onClose }) {
    return (
      <div style={{
        padding: '10px 20px',
        margin: '10px',
        color: '#fff',
        backgroundColor: type === 'error' ? '#f44336' : '#4CAF50',
        borderRadius: '5px',
        position: 'relative'
      }}>
        {message}
        <button onClick={onClose} style={{
          position: 'absolute', top: '5px', right: '10px', border: 'none',
          background: 'transparent', color: '#fff', fontSize: '16px'
        }}>×</button>
      </div>
    );
  }
  
  export default AlertBox;
  