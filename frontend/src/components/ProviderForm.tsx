import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Provider } from '../types';

interface Props {
  provider: Provider | null;
  onSuccess: () => void;
}

export default function ProviderForm({ provider, onSuccess }: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(provider?.name || '');
  }, [provider]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (provider) {
      await api.updateProvider(provider.id, { name });
    } else {
      await api.createProvider({ name });
    }
    setName('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 flex gap-4 items-end">
      <div className="flex-1">
        <label className="block mb-1 text-sm font-medium">Nombre del proveedor</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {provider ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}
