import Notification from './Notification';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../service/orderService';
import Loader from './Loader';

// Define a type for the errors object
interface Errors {
  firstName?: string;
  lastName?: string;
  description?: string;
  quantity?: string;
}

const OrderForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>();
  const [notification, setNotification] = useState<{ message: string, types: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const validate = () => {
    const errors: Errors = {};
    if (!lastName) errors.lastName = 'Last name is required';
    if (!description) errors.description = 'Description is required';
    if (description.length > 100) errors.description = 'Order description too long';
    if (quantity < 1 || quantity > 20) errors.quantity = 'Quantity must be between 1 and 20';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await createOrder({ firstName, lastName, description, quantity })
    .then(() => {
      setLoading(false);
      setNotification({ message: 'Successfully created new order', types: 'success' });
      navigate('/');
    })
    .catch(() => {
      setLoading(false);
      setNotification({ message: 'Failed to create order', types: 'error' });
    });
  };

  useEffect(() => {
     validate();
  }, [lastName,description])

  return (<>
    {notification && (
      <Notification
        message={notification.message}
        types={notification.types}
        onClose={() => setNotification(null)}
      />
    )}
     {loading && (
        <Loader />
      )}
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white">
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          maxLength={20}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          maxLength={20}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Order Description</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={100}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.description && <span className="text-red-500">{errors.description}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          min={1}
          max={20}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.quantity && <span className="text-red-500">{errors.quantity}</span>}
      </div>
      <button 
      type="submit" 
      className="w-full px-3 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  </>);
};

export default OrderForm;
