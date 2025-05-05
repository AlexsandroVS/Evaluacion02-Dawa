import db from '../config/db.js';

export const getAllProducts = async () => {
  const result = await db.query(`
    SELECT p.*, pr.name AS provider_name 
    FROM products p 
    JOIN providers pr ON p.provider_id = pr.id
  `);
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProduct = async ({ name, price, provider_id, image_path }) => {
  const result = await db.query(
    `INSERT INTO products (name, price, provider_id, image_path) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, price, provider_id, image_path]
  );
  return result.rows[0];
};

export const updateProduct = async (id, { name, price, provider_id, image_path }) => {
  const result = await db.query(
    `UPDATE products SET name=$1, price=$2, provider_id=$3, image_path=$4 WHERE id=$5 RETURNING *`,
    [name, price, provider_id, image_path, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE id = $1', [id]);
};
