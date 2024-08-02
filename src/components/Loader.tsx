import React from 'react';

const Loader: React.FC = () => {
  const loaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed' as 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  };

  const spinnerStyle = {
    borderTopColor: '#3498db',
    borderRadius: '50%',
    width: '64px',
    height: '64px',
    animation: 'spin 1.5s linear infinite',
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
  };

  return (
    <div style={loaderStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
