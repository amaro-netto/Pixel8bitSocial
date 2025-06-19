import { useState } from 'react';
import { useRouter } from 'next/router';

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
    if (data.token) {
      localStorage.setItem('token', data.token);
      router.push('/perfil');
    } else {
      alert('Login inválido');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'; // Import Navbar
import Link from 'next/link'; // Import Link for navigation

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('http://192.168.89.130:4000/login', { // Adjust IP if different
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) { // Check if response is OK and token exists
      localStorage.setItem('token', data.token);
      router.push('/perfil');
    } else {
      alert('Login inválido ou erro no servidor');
    }
  };

  return (
    <>
      <Navbar /> {/* Use Navbar */}
      <div className="container mx-auto p-4 max-w-md mt-10 bg-white shadow-lg rounded-lg"> {/* Added Tailwind classes */}
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login to Pixel8bitSocial</h1>
        <input
          className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-3 w-full rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? {' '}
          <Link href="/cadastro" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </>
  );
}
