document.getElementById("calculateBtn").addEventListener("click", function () {
  const initialVelocity = parseFloat(document.getElementById("initialVelocity").value);
  const launchAngle = parseFloat(document.getElementById("launchAngle").value);
  const gravity = parseFloat(document.getElementById("gravity").value);

  const launchAngleRad = launchAngle * Math.PI / 180;
  // Transform graus em rad

  const tempoVoo = ((2 * initialVelocity * Math.sin(launchAngleRad)) / gravity);
  // Calcula o tempo de voo

  const horizontalVelocity = Math.cos(launchAngleRad) * initialVelocity;
  const initialVerticalVelocity = Math.sin(launchAngleRad) * initialVelocity;
  // Velocidade horizontal e velocidade inicial vertical

  document.getElementById("result").innerText = `Tempo de voo: ${tempoVoo.toFixed(2)} segundos`;

  let character = document.getElementById("character");
  // Variável da parábola

  let posX = 0;
  let posY = 0;
  let t = 0;
  // Posição e tempo iniciais

  const tempo = setInterval(function () {
    t += 0.1;
  }, 10);
  // Contador do tempo

  function updateX() {
    posX = horizontalVelocity * t;
    character.style.left = posX + "px";
  };
  // Função horária da posição MRU

  function updateY() {
    posY = (initialVerticalVelocity * t) - ((gravity * (t ** 2)) / 2);
    character.style.bottom = posY + "px";
  };
  // Função horária da posição MRUV

  const posUpdater = setInterval(function () {
    updateX();
    updateY();
  });
  // Chama as funções de atualização de posição quando o tempo (t) é atualizado pelo setInterval

  setInterval(function () {
    if (t >= tempoVoo) {
      clearInterval(tempo);
      clearInterval(posUpdater);
    };
  });

  /* Vai verificando a progressão do t até ele chegar no tempo de voo, ou seja, quando o objeto toca no chão,
   e então para o movimento, cessando as atualizações das funções horárias */
  
  let rstBtn = document.getElementById("rstBtn");

  rstBtn.addEventListener("click", function () {
    clearInterval(tempo);
    clearInterval(posUpdater);
    clearInterval(posAMDupdater);
    character.style.bottom = 0 + "px";
    character.style.left = 0 + "px";
    maxAltDot.style.bottom = 0 + "px";
    maxAltDot.style.left = 0 + "px";
    t = 0;
    document.getElementById("result").innerText = `Tempo de voo: 0.00 segundos`;
    document.getElementById("dist").innerText = `Distância percorrida: 0.00 km`;
    document.getElementById("alt").innerText = `Altura máxima: 0.00 km ou 0.00 m`;
  });
  // Boão de Resetar
  
  const distMaxKm = (((((initialVelocity ** 2) * (Math.sin(2 * launchAngleRad))) / gravity)) / 1000);
  const altMaxKm = (((initialVerticalVelocity ** 2) / (2 * gravity)) / 1000);
  const altMaxM = ((initialVerticalVelocity ** 2) / (2 * gravity));
  // Altura e distância máximas

  document.getElementById("dist").innerText =
    `Distância percorrida: ${distMaxKm.toFixed(2)} km`;
  
  document.getElementById("alt").innerText = `Altura máxima: ${altMaxKm.toFixed(2)} km ou ${altMaxM.toFixed(2)} m`;

  let maxAltDot = document.getElementById("maxAltDot");
  let posYAMD = 0;
  let posXAMD = 0;
  const tSubida = ((initialVelocity * Math.sin(launchAngleRad)) / gravity);

  function updatePosYAMD() {
    posYAMD = (initialVerticalVelocity * t) - ((gravity * (t ** 2)) / 2);
    maxAltDot.style.bottom = posYAMD + "px";
  };

  function updatePosXAMD() {
    posXAMD = horizontalVelocity * t;
    maxAltDot.style.left = posXAMD + "px";
  };

  const posAMDupdater = setInterval(function () {
    updatePosYAMD();
    updatePosXAMD();
  });

  setInterval(function () {
    if (t >= tSubida) {
      clearInterval(posAMDupdater);
    };
  });
});
