import { useState } from 'react';

export default function Emulator() {
  const [consoleType, setConsoleType] = useState('nes');
  const [romFile, setRomFile] = useState(null);

  function handleFile(e) {
    setRomFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <h1>Emulador 2D Multi Console</h1>
      <select onChange={e => setConsoleType(e.target.value)} value={consoleType}>
        <option value="nes">Nintendinho (NES)</option>
        <option value="snes">Super Nintendo (SNES)</option>
        <option value="gb">Game Boy / Color</option>
        <option value="gba">Game Boy Advance</option>
        <option value="md">Mega Drive / Master System</option>
      </select>

      <input type="file" accept=".nes,.sfc,.smc,.gb,.gbc,.gba,.gen,.sms" onChange={handleFile} />

      <div style={{ marginTop: 20 }}>
        {consoleType === 'nes' && romFile && (
          <iframe
            src={`https://jsnes.app/?rom=${romFile}`}
            width="640"
            height="480"
            title="NES Emulator"
          />
        )}
        {consoleType !== 'nes' && <p>Emulador para {consoleType} em breve...</p>}
      </div>
    </div>
  );
}
