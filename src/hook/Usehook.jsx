import { useState, useEffect } from 'react';
import api from '../Api';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = sessionStorage.getItem('token');
  
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/me'); // Axios ajoute Authorization automatiquement
        setUser(res.data);
      } catch (err) {
        console.log('Erreur auth /me:', err.response?.data || err.message);
        setUser(null);
        sessionStorage.removeItem('token'); // supprime token invalide
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, setUser };
}
