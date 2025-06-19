import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Pixel8bitSocial
        </Link>
        <div className="space-x-4">
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link href="/cadastro" className="hover:text-gray-300">
            Cadastro
          </Link>
          <Link href="/perfil" className="hover:text-gray-300">
            Perfil
          </Link>
        </div>
      </div>
    </nav>
  );
}
