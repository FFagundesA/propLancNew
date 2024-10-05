document.getElementById("calculateBtn").addEventListener("click", function () {
  const initialVelocity = parseFloat(document.getElementById("initialVelocity").value);
  const launchAngle = parseFloat(document.getElementById("launchAngle").value);
  const gravity = parseFloat(document.getElementById("gravity").value);

  const launchAngleRad = launchAngle * Math.PI / 180;
  // Transforms degrees in radians

  const flightTime = ((2 * initialVelocity * Math.sin(launchAngleRad)) / gravity);
  // Calculates the Flight Time

  const horizontalVelocity = Math.cos(launchAngleRad) * initialVelocity;
  const initialVerticalVelocity = Math.sin(launchAngleRad) * initialVelocity;
  // Horizonatl velocity and Initial vertical velocity

  document.getElementById("result").innerText = `Flight Time: ${flightTime.toFixed(2)} seconds`;

  let character = document.getElementById("character");
  // Sprite of the blue ball

  let posX = 0;
  let posY = 0;
  let t = 0;
  // Initial positions and time

  const time = setInterval(function () {
    t += 0.1;
  }, 10);
  // Time

  function updateX() {
    posX = horizontalVelocity * t;
    character.style.left = posX + "px";
  };
  // Function to update the horizontal position

  function updateY() {
    posY = (initialVerticalVelocity * t) - ((gravity * (t ** 2)) / 2);
    character.style.bottom = posY + "px";
  };
  // Function to update the vertical position

  const posUpdater = setInterval(function () {
    updateX();
    updateY();
  });
  /* Calls the function to update the positions, notice that it can call them reapetedly regardless of the time passed,
  due to the fact that the position will only change according to the time passed, and the time function has its own update time*/

  setInterval(function () {
    if (t >= flightTime) {
      clearInterval(time);
      clearInterval(posUpdater);
    };
  });

  /* It verifies the progress of time and compares it to its final value (tempoVoo means Duration of Flight */
  
  let rstBtn = document.getElementById("rstBtn");

  rstBtn.addEventListener("click", function () {
    clearInterval(time);
    clearInterval(posUpdater);
    clearInterval(posAMDupdater);
    character.style.bottom = 0 + "px";
    character.style.left = 0 + "px";
    maxAltDot.style.bottom = 0 + "px";
    maxAltDot.style.left = 0 + "px";
    t = 0;
    document.getElementById("result").innerText = `Flight Time: 0.00 seconds`;
    document.getElementById("dist").innerText = `Distance Traveled: 0.00 Km`;
    document.getElementById("alt").innerText = `Maximum Height Reached: 0.00 Km or 0.00 m`;
  });
  // Reset Button
  
  const distMaxKm = (((((initialVelocity ** 2) * (Math.sin(2 * launchAngleRad))) / gravity)) / 1000);
  const altMaxKm = (((initialVerticalVelocity ** 2) / (2 * gravity)) / 1000);
  const altMaxM = ((initialVerticalVelocity ** 2) / (2 * gravity));
  // Max Height and Distance

  document.getElementById("dist").innerText =
    `Distance Traveled ${distMaxKm.toFixed(2)} Km`;
  
  document.getElementById("alt").innerText = `Maximum Height Reached ${altMaxKm.toFixed(2)} Km or ${altMaxM.toFixed(2)} m`;

  let maxAltDot = document.getElementById("maxAltDot");
  let posYAMD = 0;
  let posXAMD = 0;
  const ascendTime = ((initialVelocity * Math.sin(launchAngleRad)) / gravity);

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
    if (t >= ascendTime) {
      clearInterval(posAMDupdater);
    };
  });
});

/* The rest of the code uses another sprite of a blue ball that behaves exactly as the previous one,
except that this time it ceases to update its position when it reaches maximum height*/
