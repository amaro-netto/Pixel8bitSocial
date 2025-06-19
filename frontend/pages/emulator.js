// frontend/pages/emulator.js
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Emulator() {
  const [consoleType, setConsoleType] = useState('nes');
  const [romFile, setRomFile] = useState(null);

  function handleFile(e) {
    setRomFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-4">
        <div className="container mx-auto p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl border border-gray-700 backdrop-filter backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
            Emulador 2D Multi-Console
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="console-select" className="block text-gray-300 text-lg font-medium mb-2">Selecione um Console:</label>
              <select
                id="console-select"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
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

            <div>
              <label htmlFor="rom-upload" className="block text-gray-300 text-lg font-medium mb-2">Carregar ROM (local para teste):</label>
              <input
                id="rom-upload"
                type="file"
                accept=".nes,.sfc,.smc,.gb,.gbc,.gba,.gen,.sms"
                onChange={handleFile}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-pink-700
                  hover:file:bg-pink-100 transition-colors duration-300"
              />
              <p className="text-gray-500 text-sm mt-1">
                *Para demonstração, este emulador carrega a ROM do seu computador. Futuramente, as ROMs virão do servidor.
              </p>
            </div>
          </div>

          {/* Área onde o emulador será exibido */}
          <div className="mt-8 bg-gray-900 rounded-lg overflow-hidden flex justify-center items-center relative z-10" style={{ minHeight: '480px' }}>
            {consoleType === 'nes' && romFile ? (
              <iframe
                src={`https://jsnes.app/?rom=${romFile}`}
                width="640"
                height="480"
                title="NES Emulator"
                className="border-none w-full h-full"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-8">
                <p className="text-xl text-gray-400 mb-4">
                  Selecione um console e carregue uma ROM para começar!
                </p>
                {consoleType !== 'nes' && (
                  <p className="text-lg text-gray-500">
                    O emulador para **{consoleType.toUpperCase()}** será integrado em breve.<br/>
                    Por enquanto, experimente com um ROM de NES.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}