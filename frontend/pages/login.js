// frontend/pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('http://192.168.89.130:4000/login', { // Ajuste o IP se necessário
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) { // Verifica se a resposta foi bem-sucedida (status 2xx) e se há token
      localStorage.setItem('token', data.token); // Armazena o token para manter o usuário logado
      router.push('/perfil'); // Redireciona para a página de perfil
    } else {
      // Exibe uma mensagem de erro mais específica, se disponível no backend
      const errorMessage = data.error || 'Login inválido ou erro no servidor';
      alert(errorMessage);
    }
  };

  return (
    <>
      <Navbar /> {/* Inclui a barra de navegação */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400">Login</h1>
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
            onClick={handleLogin}
          >
            Entrar
          </button>
          <p className="mt-8 text-center text-gray-400">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-blue-400 hover:underline font-semibold">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}