import React from 'react';
import OrderForm from '../components/OrderForm';

const NewOrder = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">New Order</h1>
      <OrderForm />
    </div>
  );
};

export default NewOrder;
