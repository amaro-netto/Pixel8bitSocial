/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Adicione todos os caminhos onde você usa classes Tailwind
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Se tiver pastas para layouts ou outros, adicione aqui também
  ],
  theme: {
    extend: {
      // Cores personalizadas ou outras extensões de tema podem vir aqui
    },
  },
  plugins: [],
}