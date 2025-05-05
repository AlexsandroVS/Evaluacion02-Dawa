import {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
} from '../models/providerModel.js';

export const listProviders = async (req, res) => {
  try {
    const data = await getAllProviders();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

export const getProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await getProviderById(id);
    if (!provider) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(provider);
  } catch {
    res.status(500).json({ error: 'Error al buscar proveedor' });
  }
};

export const createProviderController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nombre requerido' });
    const nuevo = await createProvider(name);
    res.status(201).json(nuevo);
  } catch {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

export const updateProviderController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const actualizado = await updateProvider(id, name);
    res.json(actualizado);
  } catch {
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
};

export const deleteProviderController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProvider(id);
    res.json({ message: 'Proveedor eliminado' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
};
