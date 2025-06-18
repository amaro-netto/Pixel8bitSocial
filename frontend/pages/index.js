import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  async function login() {
    const res = await fetch('http://192.168.89.130:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setUser(data.user);
  }

  if (user) {
    return (
      <div>
        <h1>Bem vindo, {user.username}!</h1>
        <p>Esta é a rede social de emuladores 2D.</p>
        <a href="/emulator">Jogar!</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Digite seu usuário"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={login}>Entrar</button>
    </div>
  );
}
