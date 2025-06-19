// frontend/pages/cadastro.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleCadastro = async () => {
    const res = await fetch('http://192.168.89.130:4000/register', { // Ajuste o IP se necessário
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.status === 201) {
      alert('Usuário cadastrado com sucesso! Agora faça login.');
      router.push('/login'); // Redireciona para a página de login
    } else {
      // Tenta pegar a mensagem de erro do backend, se disponível
      const data = await res.json();
      const errorMessage = data.error || 'Erro ao cadastrar (verifique se o usuário já existe).';
      alert(errorMessage);
    }
  };

  return (
    <>
      <Navbar /> {/* Inclui a barra de navegação */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400">Cadastro</h1>
          <input
            className="w-full p-4 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nome de Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full p-4 mb-6 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white p-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            onClick={handleCadastro}
          >
            Cadastrar
          </button>
          <p className="mt-8 text-center text-gray-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-blue-400 hover:underline font-semibold">
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}