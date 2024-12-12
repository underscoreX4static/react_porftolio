(function () {
    console.log("test-script.js chargé et exécuté");
    window.initializeApp = function (container) {
      console.log("App intégrée montée sur :", container);
      container.innerHTML = "<h1>App React intégrée avec succès !</h1>";
    };
  })();