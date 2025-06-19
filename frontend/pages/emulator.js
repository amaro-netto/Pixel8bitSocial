// frontend/pages/emulator.js
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Emulator() {
  const [consoleType, setConsoleType] = useState('nes');
  const [romFile, setRomFile] = useState(null);

  function handleFile(e) {
    // Cria uma URL temporária para o arquivo selecionado
    setRomFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <Navbar /> {/* Inclui a barra de navegação */}
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4">
        <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-blue-400">Emulador 2D Multi-Console</h1>

          <div className="mb-6">
            <label htmlFor="console-select" className="block text-gray-300 text-lg font-medium mb-2">Selecione um Console:</label>
            <select
              id="console-select"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setConsoleType(e.target.value)}
              value={consoleType}
            >
              <option value="nes">Nintendinho (NES)</option>
              <option value="snes">Super Nintendo (SNES)</option>
              <option value="gb">Game Boy / Color</option>
              <option value="gba">Game Boy Advance</option>
              <option value="md">Mega Drive / Master System</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="rom-upload" className="block text-gray-300 text-lg font-medium mb-2">Carregar ROM (local):</label>
            <input
              id="rom-upload"
              type="file"
              accept=".nes,.sfc,.smc,.gb,.gbc,.gba,.gen,.sms"
              onChange={handleFile}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="text-gray-500 text-sm mt-1">
              *Para demonstração, este emulador carrega a ROM do seu computador. Futuramente, as ROMs virão do servidor.
            </p>
          </div>

          {/* Área onde o emulador será exibido */}
          <div className="mt-8 bg-gray-900 rounded-lg overflow-hidden flex justify-center items-center" style={{ minHeight: '480px' }}>
            {consoleType === 'nes' && romFile && (
              // Exemplo de integração de emulador externo via iframe.
              // Para emulação real, você integraria uma biblioteca JS/WASM aqui.
              <iframe
                src={`https://jsnes.app/?rom=${romFile}`} // JSnes é um emulador NES em JS, aqui é um placeholder
                width="640"
                height="480"
                title="NES Emulator"
                className="border-none w-full h-full"
                allowFullScreen // Permite fullscreen
              />
            )}
            {consoleType !== 'nes' && (
              <p className="text-xl text-gray-400">
                Emulador para **{consoleType.toUpperCase()}** em breve...<br/>
                Selecione NES e carregue uma ROM para testar.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}