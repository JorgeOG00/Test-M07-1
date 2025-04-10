
import React, { useState } from 'react';
import preguntas from './data/preguntas.json';

function App() {
  const [indice, setIndice] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState({}); // id: { seleccion, correcta }

  const pregunta = preguntas[indice];
  const respuestaGuardada = respuestasUsuario[pregunta.id];

  const responder = (opcion) => {
    if (respuestaGuardada) return; // Ya respondida

    const esCorrecta = opcion === pregunta.respuesta;
    setRespuestasUsuario({
      ...respuestasUsuario,
      [pregunta.id]: { seleccion: opcion, correcta: esCorrecta }
    });
  };

  const cambiarPregunta = (paso) => {
    const nuevoIndice = indice + paso;
    if (nuevoIndice >= 0 && nuevoIndice < preguntas.length) {
      setIndice(nuevoIndice);
    }
  };

  const finalizar = Object.keys(respuestasUsuario).length === preguntas.length;

  if (finalizar) {
    const aciertos = Object.values(respuestasUsuario).filter(r => r.correcta).length;
    return (
      <div style={{ padding: 20 }}>
        <h2>Test finalizado</h2>
        <p>Has acertado {aciertos} de {preguntas.length} preguntas.</p>
        <ul>
          {preguntas.map((p) => {
            const r = respuestasUsuario[p.id];
            return (
              <li key={p.id}>
                Pregunta {p.id}: {r.correcta ? '✅ Correcta' : '❌ Incorrecta'}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Pregunta {pregunta.id}</h2>
      <p>{pregunta.pregunta}</p>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.entries(pregunta.opciones).map(([letra, texto]) => {
          const estaSeleccionada = respuestaGuardada?.seleccion === letra;
          const estaCorrecta = pregunta.respuesta === letra;
          const estaDesactivada = !!respuestaGuardada;

          return (
            <li key={letra} style={{ marginBottom: 10 }}>
              <button
                disabled={estaDesactivada}
                onClick={() => responder(letra)}
                style={{
                  backgroundColor: estaSeleccionada
                    ? estaCorrecta
                      ? '#d4edda'
                      : '#f8d7da'
                    : '',
                  padding: '8px 12px'
                }}
              >
                {letra.toUpperCase()}: {texto}
              </button>
            </li>
          );
        })}
      </ul>

      {respuestaGuardada && (
        <p>
          {respuestaGuardada.correcta ? '✅ ¡Correcto!' : '❌ Incorrecto.'}
        </p>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => cambiarPregunta(-1)} disabled={indice === 0}>⬅️ Anterior</button>
        <button onClick={() => cambiarPregunta(1)} disabled={indice === preguntas.length - 1} style={{ marginLeft: 10 }}>Siguiente ➡️</button>
      </div>
    </div>
  );
}

export default App;
