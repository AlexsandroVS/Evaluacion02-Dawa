import axios from 'axios';

const API = 'https://evaluacion02-dawa.onrender.com/api';

export const api = {
  // Productos
  getProducts: () => axios.get(`${API}/products`),
  createProduct: (data: FormData) =>
    axios.post(`${API}/products`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateProduct: (id: number, data: FormData) =>
    axios.put(`${API}/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteProduct: (id: number) => axios.delete(`${API}/products/${id}`),

  // Proveedores
  getProviders: () => axios.get(`${API}/providers`),
  getProviderById: (id: number) => axios.get(`${API}/providers/${id}`),
  createProvider: (data: { name: string }) =>
    axios.post(`${API}/providers`, data),
  updateProvider: (id: number, data: { name: string }) =>
    axios.put(`${API}/providers/${id}`, data),
  deleteProvider: (id: number) =>
    axios.delete(`${API}/providers/${id}`),
  patchProduct: (id: number, data: FormData) =>
    axios.patch(`${API}/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
};
