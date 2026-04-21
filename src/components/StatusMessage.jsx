import React from 'react';

const StatusMessage = ({ type = 'error', message }) => {
  if (!message) return null;

  const styles = {
    error: {
      bg: '#fef2f2',
      border: '#fee2e2',
      text: '#991b1b',
    },
    success: {
      bg: '#f0fdf4',
      border: '#dcfce7',
      text: '#166534',
    },
  };

  const current = styles[type] || styles.error;

  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: current.text,
        padding: '1rem',
        borderRadius: '12px',
        margin: '1rem 0',
        fontSize: '0.9rem',
        textAlign: 'center',
      }}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
