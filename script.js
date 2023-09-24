document.getElementById("calculateBtn").addEventListener("click", function () {
  const initialVerticalVelocity = parseFloat(document.getElementById("initial-vertical-velocity").value);
  const initialHorizontalVelocity = parseFloat(document.getElementById("initial-horizontal-velocity").value);
  const launchAngle = parseFloat(document.getElementById("launch-angle").value);
  const gravity = parseFloat(document.getElementById("gravity").value);

  const launchAngleRad = launchAngle * (Math.PI / 180);
  // Transforma grau em rad pra poder fazer o sin() certinho

  const initialVelocity = (initialVerticalVelocity / Math.sin(launchAngleRad));
  // Velocidade inicial

  const timeOfFlight = ((2 * initialVelocity * Math.sin(launchAngleRad)) / gravity);
  // Calcular tempo de voo

  document.getElementById("result").innerText = `Tempo de queda: ${timeOfFlight.toFixed(2)} segundos`;

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
    posX = initialHorizontalVelocity * t;
    character.style.left = posX + "px";
  };
  // Função horária da posição MRU

  function updateY() {
    posY = (initialVerticalVelocity * t) - (((gravity) * (t ** 2)) / 2);
    character.style.bottom = posY + "px";
  };
  // Função horária da posição MRUV

  const posUpdater = setInterval(function () {
    updateX();
    updateY();
  });
  // Chama as funções de atualização de posição quando o tempo (t) é atualizado pelo setInterval

  setInterval(function () {
    if (t >= timeOfFlight) {
      clearInterval(tempo);
      clearInterval(posUpdater);
    };
  });

  /* Vai verificando a progressão do t até ele chegar no tempo de voo, ou seja, quando o objeto toca no chão,
   e então para o movimento, cessando as atualizações das funções horárias */
  
  let rstBtn = document.getElementById("rstBtn");

  rstBtn.addEventListener("click", function () {
    clearInterval(posUpdater);
    clearInterval(tempo);
    character.style.bottom = 0;
    character.style.left = 0;
    t = 0;
    document.getElementById("result").innerText = `Tempo de queda: 0.00 segundos`;
  });
});
