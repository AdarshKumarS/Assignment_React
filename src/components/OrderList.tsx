import { useState } from 'react';
import { deleteOrder, fetchOrders } from '../service/orderService';
import Dialog from './Dialog';
import Notification from './Notification';
import Loader from './Loader';

const OrderList = ({ orders, setOrders }: { orders: any[], setOrders: any }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string, types: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState<boolean>();

  const openDialog = (id: number) => {
    setSelectedOrderId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrderId(null);
  };

  const confirmDelete = async () => {
    setLoading(true);
    if (selectedOrderId !== null) {
      await deleteOrder(selectedOrderId)
      .then( () =>{
        setLoading(false);
        setNotification({ message: 'Successfully deleted order', types: 'success' });
      })
      .catch(() => {
        setLoading(false);
        setNotification({ message: 'Something went wrong', types: 'error' });
      });
      fetchOrders()
      .then((orders) => {
        setOrders(orders);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNotification({ message: 'Something went wrong', types: 'error' });
      });
      closeDialog();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {notification && (
      <Notification
        message={notification.message}
        types={notification.types}
        onClose={() => setNotification(null)}
      />
    )}
      <div className="bg-white p-4 rounded-lg shadow-md">
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-left text-sm">Full Name</th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-left text-sm">Order Description</th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {!orders.length && <tr><td colSpan={4} className="w-1/6 py-3 px-4 text-center">No Data Found</td></tr>}
              {orders.map(order => (
                <tr key={order.id} className="border border-gray-300">
                  <td className="w-1/3 py-3 px-4">{order.firstName} {order.lastName}</td>
                  <td className="w-1/3 py-3 px-4">{order.description}</td>
                  <td className="w-1/6 py-3 px-4 text-center">{order.quantity}</td>
                  <td className="w-1/6 py-3 px-4 text-center">
                    <button 
                      onClick={() => openDialog(order.id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this order?"
      />
    </div>
  );
};

export default OrderList;
