// frontend/pages/index.js
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
        {/* Background Particles/Shape - Tailwind classes only, no <style jsx> */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-[blob_7s_infinite] transform translate-x-0 translate-y-0"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-[blob_7s_infinite_2s] transform translate-x-0 translate-y-0"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-[blob_7s_infinite_4s] transform translate-x-0 translate-y-0"></div>
        
        {/* OBS: A animação 'blob' e 'animation-delay' via `styled-jsx` foi removida.
            Para reativar com Tailwind CSS, precisaríamos definir @keyframes diretamente no globals.css
            ou usar uma biblioteca de animação JS/CSS mais robusta.
            Por enquanto, os blobs ficarão estáticos.
        */}

        <div className="text-center relative z-10 p-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl border border-gray-700 backdrop-filter backdrop-blur-sm">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 leading-tight drop-shadow-lg">
            Bem-vindo à Pixel8bitSocial!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Sua jornada retrô começa aqui.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <Link href="/login" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xl tracking-wide">
              Entrar
            </Link>
            <Link href="/cadastro" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xl tracking-wide">
              Cadastrar
            </Link>
          </div>
        </div>

        {/* Console Image Placeholder (Tailwind classes only) */}
        <div className="absolute bottom-10 right-10 z-0">
          {/* Substitua esta div por uma imagem real de um console, se tiver uma */}
          <div className="w-64 h-40 bg-gray-700 rounded-lg shadow-xl border-2 border-gray-600 flex items-center justify-center opacity-70">
            <span className="text-gray-400 text-sm">Console Placeholder</span>
          </div>
          {/* OBS: A animação 'float' via `styled-jsx` foi removida. */}
        </div>
      </div>
    </>
  );
}