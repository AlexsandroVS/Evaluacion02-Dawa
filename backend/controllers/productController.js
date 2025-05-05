import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  } from '../models/productModel.js';
  import db from '../config/db.js';
  
  export const listProducts = async (req, res) => {
    try {
      const data = await getAllProducts();
      res.json(data);
    } catch {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  };
  
  export const createProductController = async (req, res) => {
    try {
      const { name, price, provider_id } = req.body;
      const image_path = req.file?.path || null;
  
      if (!name || !price || !provider_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
  
      const nuevo = await createProduct({ name, price, provider_id, image_path });
      res.status(201).json(nuevo);
    } catch {
      res.status(500).json({ error: 'Error al crear producto' });
    }
  };
  
  export const updateProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, provider_id } = req.body;
      const image_path = req.file?.path || req.body.existingImage;
  
      const actualizado = await updateProduct(id, { name, price, provider_id, image_path });
      res.json(actualizado);
    } catch {
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  };
  
  export const deleteProductController = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteProduct(id);
      res.json({ message: 'Producto eliminado' });
    } catch {
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  };
  export const patchProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      const file = req.file;
  
      const columns = [];
      const values = [];
      let i = 1;
  
      if (fields.name) {
        columns.push(`name = $${i++}`);
        values.push(fields.name);
      }
      if (fields.price) {
        columns.push(`price = $${i++}`);
        values.push(fields.price);
      }
      if (fields.provider_id) {
        columns.push(`provider_id = $${i++}`);
        values.push(fields.provider_id);
      }
      if (file) {
        columns.push(`image_path = $${i++}`);
        values.push(`uploads/${file.filename}`);
      }
  
      if (columns.length === 0) return res.status(400).json({ message: 'No hay campos para actualizar' });
  
      values.push(id);
      const query = `UPDATE products SET ${columns.join(', ')} WHERE id = $${i} RETURNING *`;
      const result = await db.query(query, values);
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  