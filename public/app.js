function consultar() {
  const tarjeta = document.getElementById('tarjeta').value.trim();
  const resultado = document.getElementById('resultado');

  if (!tarjeta) {
    resultado.innerHTML = '<span class="error">Ingresa una tarjeta</span>';
    return;
  }

  resultado.innerHTML = 'Consultando...';

  fetch('/saldo', { // 🔥 BONUS: ruta relativa
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'fsi-2026-saldo-x9K2mL'
    },
    body: JSON.stringify({ tarjeta })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error');
    }

    return data;
  })
  .then(data => {
    resultado.innerHTML = `<span class="ok">Saldo: ${data.saldo} puntos</span>`;
  })
  .catch(err => {
    resultado.innerHTML = `<span class="error">${err.message}</span>`;
  });
}