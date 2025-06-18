import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleCadastro = async () => {
    const res = await fetch('http://192.168.89.130:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.status === 201) {
      alert('Usuário cadastrado com sucesso!');
      router.push('/login');
    } else {
      alert('Erro ao cadastrar (usuário pode já existir)');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro</h1>
      <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
}
