// frontend/pages/_app.js
import '../styles/globals.css' // Esta linha é crucial para o Tailwind!

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp