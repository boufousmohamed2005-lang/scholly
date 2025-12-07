import { useState, useEffect } from 'react';
import api from '../Api';

export default function useAuthuser() {
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
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/me');
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
