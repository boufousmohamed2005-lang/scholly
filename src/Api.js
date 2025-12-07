import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:8001/api',
});

// Ajouter automatiquement Authorization: Bearer token  

 Api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;

export function logout(setUser) {
  Api.post("/logout")
    .then(() => {
      sessionStorage.removeItem("token");
      setUser(null);
    })
    .catch(() => {
      sessionStorage.removeItem("token");
      setUser(null);
    });

}

