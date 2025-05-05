import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 text-xl font-bold shadow-md"
      >
        <div className="max-w-6xl mx-auto">CRUD de Productos y Proveedores</div>
      </motion.header>
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-4 max-w-6xl mx-auto"
      >
        {children}
      </motion.main>
    </div>
  );
}