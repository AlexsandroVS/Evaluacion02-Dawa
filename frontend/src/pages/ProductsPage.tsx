import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import ModalEdit from '../components/modals/ModalEdit';
import ModalDelete from '../components/modals/ModalDelete';
import type  { Product } from '../types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const loadProducts = async () => {
    const res = await api.getProducts();
    setProducts(res.data);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteProductId(id);
    setIsDeleteOpen(true);
  };
  const confirmDelete = async () => {
    if (deleteProductId !== null) {
      await api.deleteProduct(deleteProductId);
      setDeleteProductId(null);
      setIsDeleteOpen(false);
      loadProducts();
    }
  };

  const closeEdit = () => {
    setSelectedProduct(null);
    setIsEditOpen(false);
    loadProducts();
  };



  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <ProductForm productToEdit={null} onSuccess={loadProducts} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal Editar */}
      <ModalEdit isOpen={isEditOpen} onClose={closeEdit} title="Editar Producto">
        {selectedProduct && (
          <ProductForm productToEdit={selectedProduct} onSuccess={closeEdit} />
        )}
      </ModalEdit>

      {/* Modal Eliminar */}
      <ModalDelete
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar producto"
        message="¿Estás seguro de que deseas eliminar este producto?"
      />
    </div>
  );
}
