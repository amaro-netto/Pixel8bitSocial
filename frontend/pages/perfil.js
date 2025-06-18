import { useEffect, useState } from 'react';

export default function Perfil() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    setUsername(payload.username);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo, {username}</h1>
      <p>Futuro perfil com conquistas e prints!</p>
    </div>
  );
}
