import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Product } from '../types';
import { motion } from 'framer-motion';

interface Props extends Product {
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export default function ProductCard({ id, name, price, provider_name, image_path, onDelete, onEdit }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-lg shadow-md p-4 w-full md:w-64 transition-all duration-200 hover:shadow-lg overflow-hidden"
    >
      <div className="overflow-hidden rounded-lg">
        <motion.img 
          src={`https://evaluacion02-dawa.onrender.com/${image_path}`}


          alt={name} 
          className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        />
      </div>
      <h3 className="text-lg font-semibold mt-2 text-gray-800">{name}</h3>
      <p className="text-gray-600 font-medium">Precio: <span className="text-blue-600">${price}</span></p>
      <p className="text-sm text-gray-500 mt-1">Proveedor: <span className="text-gray-700">{provider_name}</span></p>
      <div className="flex justify-end gap-3 mt-4">
        <motion.button 
          onClick={() => onEdit({ id, name, price, provider_name, image_path, provider_id: 0 })}
          className="text-yellow-500 hover:text-yellow-600 p-2 rounded-full hover:bg-yellow-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faPen} />
        </motion.button>
        <motion.button 
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </motion.button>
      </div>
    </motion.div>
  );
}