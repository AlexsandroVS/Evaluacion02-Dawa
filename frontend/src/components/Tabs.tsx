import { useLocation, useNavigate } from 'react-router-dom';

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <div className="flex gap-4 mb-6 border-b">
      <button
        onClick={() => navigate('/')}
        className={`px-4 py-2 ${
          activeTab === '/' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'
        }`}
      >
        Productos
      </button>
      <button
        onClick={() => navigate('/proveedores')}
        className={`px-4 py-2 ${
          activeTab === '/proveedores' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'
        }`}
      >
        Proveedores
      </button>
    </div>
  );
}
