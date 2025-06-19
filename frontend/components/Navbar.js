// frontend/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Nome da Aplicação */}
        <Link href="/" className="text-3xl font-extrabold text-pink-500 hover:text-cyan-400 transition-colors duration-300">
          Pixel8bitSocial
        </Link>

        {/* Barra de Pesquisa (sem funcionalidade ainda) */}
        <div className="relative flex-grow mx-8 max-w-lg hidden md:block">
            <input 
                type="text" 
                placeholder="Pesquisar jogos, perfis..." 
                className="w-full py-2 px-4 pl-10 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>


        {/* Links de Navegação */}
        <div className="space-x-6 text-lg font-semibold">
          <Link href="/login" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
            Login
          </Link>
          <Link href="/cadastro" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
            Cadastro
          </Link>
          <Link href="/perfil" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
            Perfil
          </Link>
          {/* Adicione outros links conforme o projeto avança, ex: /jogos, /feed */}
        </div>
      </div>
    </nav>
  );
}