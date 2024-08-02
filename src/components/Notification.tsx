import React from 'react';

interface NotificationProps {
  message: string;
  types: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, types, onClose }) => {
  return (
    <div className={`fixed top-5 right-5 p-4 rounded shadow-md z-50 ${types === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
