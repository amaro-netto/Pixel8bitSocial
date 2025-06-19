// frontend/pages/index.js
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col items-center justify-center p-4 text-white">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-400 animate-pulse">
            Bem-vindo à Pixel8bitSocial!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Sua rede social para jogos retrô 2D.
          </p>
          <div className="space-x-4">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 inline-block">
              Fazer Login
            </Link>
            <Link href="/cadastro" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 inline-block">
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}