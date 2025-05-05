import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import providerRoutes from './routes/providerRoutes.js';

dotenv.config();
const app = express();
import pool from './config/db.js';

pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL (Docker)'))
  .catch(err => console.error('❌ Error al conectar a PostgreSQL:', err));

  
async function connectWithRetry(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log('✅ Conectado a PostgreSQL');
      break;
    } catch (err) {
      console.error(`❌ Intento ${i + 1} fallido. Reintentando en ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

connectWithRetry();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
