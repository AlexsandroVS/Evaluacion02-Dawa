import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProvidersPage from './pages/ProvidersPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proveedores" element={<ProvidersPage />} />
      </Routes>
    </Layout>
  );
}
