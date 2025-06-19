// frontend/pages/perfil.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Perfil() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redireciona para login se não houver token
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
        {/* Background Particles (similar to index.js) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>


        {/* Conteúdo do Perfil */}
        <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-700 text-white text-center relative z-10 backdrop-filter backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">Bem-vindo, {username}!</h1>
          <p className="text-lg text-gray-300 mb-6">Este é o seu painel de controle na Pixel8bitSocial.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md">
              <h2 className="text-2xl font-bold text-pink-400 mb-3">Seus Jogos</h2>
              <p className="text-gray-300">Nenhum jogo registrado ainda.</p>
              <Link href="/emulator" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Começar a Jogar!
              </Link>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md">
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">Conquistas</h2>
              <p className="text-gray-300">Nenhuma conquista desbloqueada.</p>
              {/* Futuramente: Listar conquistas aqui */}
            </div>
          </div>

          <button
            className="mt-6 bg-red-600 text-white p-3 rounded-md font-bold hover:bg-red-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            onClick={handleLogout}
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </>
  );
}