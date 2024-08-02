import axios from 'axios';

const API_URL = 'https://localhost:4200/api/Order';

export const fetchOrders = async () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch orders');
    });
};

export const createOrder = async (order: any) => {
  await axios.post(API_URL, order);
};

export const deleteOrder = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
