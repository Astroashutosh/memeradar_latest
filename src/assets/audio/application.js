(function () {
  // Load the confetti library dynamically from CDN if not already loaded
  const loadConfetti = () =>
    new Promise((resolve, reject) => {
      if (window.confetti) return resolve(window.confetti);

      const script = document.createElement("script");
      script.onload = () => resolve(window.confetti);
      script.onerror = () => reject(new Error("confetti load failed"));
      document.head.appendChild(script);
    });

  // Trigger the confetti animation and optional appcheer
  const celebration = (volume = 0.11) => {
    const burst = () => {
      window.confetti({
        particleCount: 50,
        angle: 60,
        spread: 90,
        origin: { x: 0 },
      });
      window.confetti({
        particleCount: 50,
        angle: 120,
        spread: 90,
        origin: { x: 1 },
      });
    };

    const appcheer = document.getElementById("appcheer");
    if (appcheer) {
      appcheer.volume = volume;
      try {
        appcheer.play();
      } catch {
        // Ignore autoplay restrictions
      }
    }

    // Burst several times with slight delays
    setTimeout(burst, 100);
    setTimeout(burst, 200);
    setTimeout(burst, 400);
    setTimeout(burst, 500);
    setTimeout(burst, 700);
  };
  // Wait for DOM to be ready, then load confetti and run celebration
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      loadConfetti().then(() => {
        setupCelebrateButton();
        celebration(); // 👈 runs on page load
      })
    );
  } else {
    loadConfetti().then(() => {
      setupCelebrateButton();
      celebration(); // 👈 runs on page load
    });
  }

  // Wire up the button to trigger the celebration
  const setupCelebrateButton = () => {
    const button = document.getElementById("celebrateAction");
    if (button) {
      button.addEventListener("click", () => celebration(0.75));
    }
  };

  // Wait for DOM to be ready, then load confetti and set up the button
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      loadConfetti().then(setupCelebrateButton)
    );
  } else {
    loadConfetti().then(setupCelebrateButton);
  }
})();


