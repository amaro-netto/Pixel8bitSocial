import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('http://192.168.89.130:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      router.push('/perfil');
    } else {
      alert('Login inválido');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
