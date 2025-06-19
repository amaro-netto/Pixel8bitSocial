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
    const res = await fetch('http://192.168.89.130:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      router.push('/perfil');
    } else {
      const errorMessage = data.error || 'Login inválido ou erro no servidor';
      alert(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
        {/* Formulário de Login */}
        <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700 backdrop-filter backdrop-blur-sm relative z-10">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
            Entrar na Pixel8bitSocial
          </h1>
          <input
            className="w-full p-4 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
            placeholder="Nome de Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full p-4 mb-6 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-pink-600 text-white p-4 rounded-md font-bold text-lg hover:bg-pink-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <p className="mt-8 text-center text-gray-400 text-lg">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-cyan-400 hover:underline font-semibold">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}