import db from '../config/db.js';

export const getAllProviders = async () => {
  const result = await db.query('SELECT * FROM providers ORDER BY id ASC');
  return result.rows;
};

export const getProviderById = async (id) => {
  const result = await db.query('SELECT * FROM providers WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProvider = async (name) => {
  const result = await db.query('INSERT INTO providers (name) VALUES ($1) RETURNING *', [name]);
  return result.rows[0];
};

export const updateProvider = async (id, name) => {
  const result = await db.query('UPDATE providers SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
  return result.rows[0];
};

export const deleteProvider = async (id) => {
  await db.query('DELETE FROM providers WHERE id = $1', [id]);
};
