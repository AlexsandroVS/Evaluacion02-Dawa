import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import type  { Provider } from '../types';

interface Props {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (id: number) => void;
  onSuccess?: () => void;
}

export default function ProviderTable({ providers, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3 space-x-3">
                <button onClick={() => onEdit(p)} className="text-yellow-500">
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={() => onDelete(p.id)} className="text-red-600">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
