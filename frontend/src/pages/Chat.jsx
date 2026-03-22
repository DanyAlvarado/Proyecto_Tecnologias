// frontend/src/pages/Chat.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Chat() {
  const navigate = useNavigate();

  // NUEVO: Extraemos el usuario que inició sesión desde el localStorage
  // Si por alguna razón no hay usuario (ej. entró directo a la URL), ponemos 'Estudiante' por defecto
  const datosUsuario = JSON.parse(localStorage.getItem('usuarioTutorIA')) || { username: 'Estudiante' };

  // --- MEMORIA DEL COMPONENTE ---
  const [mensajes, setMensajes] = useState([
    // NUEVO: Inyectamos el nombre del usuario en el saludo de la IA
    { rol: 'ia', texto: `¡Hola, ${datosUsuario.username}! Soy TutorIA. ¿En qué concepto de Pensamiento Computacional o Programación te puedo ayudar hoy?` }
  ]);
  const [textoInput, setTextoInput] = useState('');
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [cargando, setCargando] = useState(false);

  const [historialChats] = useState([
    "Dudas sobre ciclos For",
    "Explicación de Matrices"
  ]);

  // --- FUNCIONES ---
  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (textoInput.trim() === '') return;

    const nuevoMensajeUsuario = { rol: 'user', texto: textoInput };
    const historialActualizado = [...mensajes, nuevoMensajeUsuario];
    setMensajes(historialActualizado);
    
    setTextoInput('');
    setCargando(true);

    try {
      const respuestaServidor = await axios.post('http://127.0.0.1:5000/api/ia/chat', {
        historial: historialActualizado 
      });

      setMensajes([...historialActualizado, { rol: 'ia', texto: respuestaServidor.data.respuesta }]);

    } catch (error) {
      setMensajes([...historialActualizado, { rol: 'ia', texto: "Error: No me pude conectar con el servidor de TutorIA." }]);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    // Limpiamos la memoria del navegador al salir
    localStorage.removeItem('usuarioTutorIA');
    navigate('/');
  };

  // --- DISEÑO VISUAL ---
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#333' }}>
      
      {/* PANEL LATERAL */}
      <div style={{ width: sidebarAbierto ? '260px' : '0px', transition: 'width 0.3s ease', overflow: 'hidden', backgroundColor: '#f9f9f9', borderRight: sidebarAbierto ? '1px solid #e5e5e5' : 'none', display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}>
        <div style={{ padding: '20px' }}>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <span>+</span> Nuevo Chat
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          <p style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', marginBottom: '10px' }}>Historial (Simulado)</p>
          {historialChats.map((chat, index) => (
            <div key={index} style={{ padding: '10px', fontSize: '14px', color: '#444', cursor: 'pointer', borderRadius: '6px', marginBottom: '5px' }}>
              💬 {chat}
            </div>
          ))}
        </div>
        
        {/* NUEVO: Mostramos el nombre real del usuario en la parte inferior del Sidebar */}
        <div style={{ padding: '20px', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>👤 {datosUsuario.username}</span>
          <button onClick={cerrarSesion} style={{ background: 'none', border: 'none', color: '#ff4c4c', cursor: 'pointer', fontSize: '12px' }}>Salir</button>
        </div>
      </div>

      {/* ÁREA PRINCIPAL DEL CHAT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <button onClick={() => setSidebarAbierto(!sidebarAbierto)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666', marginRight: '15px' }}>
            ☰
          </button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#222' }}>TutorIA</h2>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {mensajes.map((msg, index) => (
            <div key={index} style={{ width: '100%', backgroundColor: msg.rol === 'ia' ? '#f9fafb' : '#ffffff', borderBottom: msg.rol === 'ia' ? '1px solid #f0f0f0' : 'none', display: 'flex', justifyContent: 'center', padding: '24px 20px' }}>
              <div style={{ width: '100%', maxWidth: '750px', display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '24px' }}>{msg.rol === 'user' ? '🧑‍💻' : '🤖'}</div>
                <div style={{ flex: 1, fontSize: '16px', lineHeight: '1.6', color: '#374151', paddingTop: '4px' }}>
                  {msg.texto}
                </div>
              </div>
            </div>
          ))}

          {cargando && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '24px 20px', backgroundColor: '#f9fafb' }}>
              <div style={{ width: '100%', maxWidth: '750px', display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '24px' }}>🤖</div>
                <div style={{ flex: 1, fontSize: '16px', color: '#6b7280', fontStyle: 'italic', paddingTop: '4px' }}>
                  TutorIA está analizando tu duda...
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' }}>
          <form onSubmit={manejarEnvio} style={{ width: '100%', maxWidth: '750px', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Escribe tu mensaje a TutorIA..." 
              value={textoInput}
              onChange={(e) => setTextoInput(e.target.value)}
              disabled={cargando} 
              style={{ width: '100%', padding: '16px 50px 16px 20px', borderRadius: '12px', border: '1px solid #d1d5db', backgroundColor: '#ffffff', fontSize: '16px', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' }}
            />
            <button type="submit" disabled={cargando} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: '#e5e7eb', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: cargando ? 'not-allowed' : 'pointer', color: '#4b5563', fontWeight: 'bold' }}>
              ➤
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}