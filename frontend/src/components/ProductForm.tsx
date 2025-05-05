import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Provider, Product } from '../types';

interface Props {
  productToEdit?: Product | null;
  onSuccess: () => void;
}

export default function ProductForm({ productToEdit, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    provider_id: '',
    image: null as File | null,
  });
  const [initialData, setInitialData] = useState(formData);

  useEffect(() => {
    if (productToEdit) {
      const data = {
        name: productToEdit.name,
        price: productToEdit.price,
        provider_id: String(productToEdit.provider_id),
        image: null,
      };
      setFormData(data);
      setInitialData(data);
    }
  }, [productToEdit]);

  const hasChanges = () => {
    return (
      formData.name !== initialData.name ||
      formData.price !== initialData.price ||
      formData.provider_id !== initialData.provider_id ||
      formData.image !== null
    );
  };

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.getProviders().then(res => setProviders(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'file' && target.files) {
      setFormData((prev) => ({ ...prev, image: target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    if (productToEdit) {
      if (formData.name !== initialData.name) data.append('name', formData.name);
      if (formData.price !== initialData.price) data.append('price', formData.price);
      if (formData.provider_id !== initialData.provider_id) data.append('provider_id', formData.provider_id);
      if (formData.image) data.append('image', formData.image);

      if (!hasChanges()) {
        onSuccess();
        return;
      }

      await api.patchProduct(productToEdit.id, data);
    } else {
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('provider_id', formData.provider_id);
      if (formData.image) data.append('image', formData.image);
      await api.createProduct(data);
    }

    setFormData({ name: '', price: '', provider_id: '', image: null });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 space-y-4">
      <h2 className="text-lg font-semibold">{productToEdit ? 'Editar' : 'Nuevo'} Producto</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border rounded px-3 py-2"
        required={!productToEdit}
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full border rounded px-3 py-2"
        required={!productToEdit}
      />
      <select
        name="provider_id"
        value={formData.provider_id}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required={!productToEdit}
      >
        <option value="">Seleccione proveedor</option>
        {providers.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {productToEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}