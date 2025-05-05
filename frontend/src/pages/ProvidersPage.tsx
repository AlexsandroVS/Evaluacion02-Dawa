import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type  { Provider } from '../types';
import ProviderForm from '../components/ProviderForm';
import ProviderTable from '../components/ProviderTable';
import Tabs from '../components/Tabs';

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [editProvider, setEditProvider] = useState<Provider | null>(null);

  const loadProviders = async () => {
    const res = await api.getProviders();
    setProviders(res.data);
  };

  const handleDelete = async (id: number) => {
    await api.deleteProvider(id);
    loadProviders();
  };

  useEffect(() => {
    loadProviders();
  }, []);

  return (
    <>
      <Tabs />
      <ProviderForm provider={editProvider}  onSuccess={() => {
    loadProviders();
    setEditProvider(null); // 👈 aquí es donde debe ir
  }} />
      <ProviderTable
        providers={providers}
        onEdit={setEditProvider}
        onDelete={handleDelete}
      />
    </>
  );
}