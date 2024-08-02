import { useEffect, useState } from 'react';
import OrderList from '../components/OrderList';
import { fetchOrders } from '../service/orderService';
import Notification from '../components/Notification';
import Loader from '../components/Loader';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState<{ message: string, types: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    fetchOrders()
    .then((orders) =>{
      setLoading(false);
      setOrders(orders);
    })
    .catch(() => {
      setLoading(false);
      setNotification({ message: 'Something went wrong', types: 'error' });
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {notification && (
      <Notification
        message={notification.message}
        types={notification.types}
        onClose={() => setNotification(null)}
      />
    )}
     {loading ? (
        <Loader />
      ) : (<>
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <OrderList orders={orders} setOrders={setOrders} /></>)}
    </div>
  );
};

export default Home;
