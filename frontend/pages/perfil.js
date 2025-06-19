// frontend/pages/perfil.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importar useRouter para redirecionamento
import Navbar from '../components/Navbar';

export default function Perfil() {
  const [username, setUsername] = useState('');
  const router = useRouter(); // Inicializa o roteador

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redireciona para login se não houver token
      return;
    }

    try {
      // Decodifica o token JWT para pegar o username (parte visível do token)
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      // Se o token estiver corrompido, limpa e redireciona para login
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]); // Adiciona router como dependência do useEffect

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    router.push('/login'); // Redireciona para a página de login
  };

  return (
    <>
      <Navbar /> {/* Inclui a barra de navegação */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-white text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-blue-400">Bem-vindo, {username}!</h1>
          <p className="text-lg text-gray-300">Este é o seu perfil na Pixel8bitSocial.</p>
          <p className="text-md text-gray-400 mt-2">Aqui você verá suas conquistas, jogos jogados e poderá compartilhar seus prints!</p>
          <button
            className="mt-6 bg-red-600 text-white p-3 rounded-md font-bold hover:bg-red-700 transition-colors duration-300 shadow-lg"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  );
}