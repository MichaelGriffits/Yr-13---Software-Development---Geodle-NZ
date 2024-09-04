window.onload = function () {
  // Show settings menu
  const button = document.getElementById("settings");
  button.addEventListener("click", () => {
    document.getElementById("settingsMenu").style.display = "block";
  });

  // Hide settings menu
  const buttonCancel = document.getElementById("CancelButton");
  buttonCancel.addEventListener("click", () => {
    document.getElementById("settingsMenu").style.display = "none";
  });

  // Dark mode function
  function darkMode() {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  }

  // Light mode function
  function lightMode() {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }

  // Initialize variables
  const entry = document.getElementById("inputField");
  const dropdown = document.getElementById("dropdownbuttons");
  const guessedRegionsContainer = document.getElementById("guessedRegionsContainer"); // Container for guessed regions
  const regions = [
    "Auckland",
    "Bay of Plenty",
    "Canterbury",
    "Gisborne",
    "Hawke's Bay",
    "Manawatu",
    "Marlborough",
    "Nelson",
    "Northland",
    "Otago",
    "Southland",
    "Taranaki",
    "Tasman",
    "Waikato",
    "Wellington",
    "Westland",
  ];

  let lastHighlightedRegion = null;
  let spacebarUsed = false;
  const correctlyAnsweredRegions = new Set();
  let expertMode = false;

  // Initialize dropdown
  function initializeDropdown() {
    dropdown.innerHTML = ''; // Clear existing buttons
    for (let i = 0; i < regions.length; i++) {
      let button = document.createElement("button");
      button.textContent = regions[i];
      button.addEventListener("click", function () {
        entry.value = button.textContent;
        dropdown.style.display = "none";
      });
      dropdown.appendChild(button);
    }
  }

  initializeDropdown();

  // Update dropdown based on input
  function updateDropdown() {
    if (expertMode) {
      dropdown.style.display = "none";
      return;
    }

    let entryValue = entry.value.toLowerCase();
    let buttons = dropdown.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
      let buttonValue = buttons[i].textContent.toLowerCase();
      if (buttonValue.includes(entryValue)) {
        buttons[i].style.display = "block";

        let originalText = buttons[i].textContent;
        let highlightedText = originalText.replace(
          new RegExp(entryValue, "gi"),
          (match) => `<span class="highlight">${match}</span>`
        );

        buttons[i].innerHTML = highlightedText;
      } else {
        buttons[i].style.display = "none";
      }
    }

    dropdown.style.display = entryValue.length > 0 ? "block" : "none";
  }

  entry.addEventListener("keyup", function () {
    if (!expertMode) {
      updateDropdown();
    }
  });

  entry.addEventListener("blur", function () {
    setTimeout(function () {
      dropdown.style.display = "none";
    }, 100);
  });

  document.getElementById("regionForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let region = entry.value.trim();

    const regionSVGMap = {
      Auckland: document.getElementById("Auckland"),
      "Bay of Plenty": document.getElementById("BoP"),
      Canterbury: document.getElementById("Canterbury"),
      Gisborne: document.getElementById("Gisborne"),
      "Hawke's Bay": document.getElementById("Hawkes-Bay"),
      Marlborough: document.getElementById("Marlborough"),
      Manawatu: document.getElementById("Manawatu"),
      Nelson: document.getElementById("Nelson"),
      Northland: document.getElementById("Northland"),
      Otago: document.getElementById("Otago"),
      Southland: document.getElementById("Southland"),
      Taranaki: document.getElementById("Taranaki"),
      Tasman: document.getElementById("Tasman"),
      Waikato: document.getElementById("Waikato"),
      Wellington: document.getElementById("Wellington"),
      Westland: document.getElementById("Westland"),
    };

    if (region !== "" && region === lastHighlightedRegion) {
      if (regionSVGMap[region]) {
        regionSVGMap[region].style.fill = "#9cc5a1";
      }

      correctlyAnsweredRegions.add(region);

      // Display the guessed regions
      displayGuessedRegions();

      entry.value = "";
      entry.dispatchEvent(new Event("keyup"));

      document.getElementById("Score").textContent = `Score: ${correctlyAnsweredRegions.size}/16`;

      highlightRandomRegion();

      checkIfAllRegionsCorrect();
    } else {
      shakeScreen();
    }
  });

  // Display guessed regions
  function displayGuessedRegions() {
    guessedRegionsContainer.innerHTML = ''; // Clear previous entries

    correctlyAnsweredRegions.forEach(region => {
      const regionElement = document.createElement('div'); // Create a new div for each guessed region
      regionElement.textContent = region; // Set the text content
      regionElement.classList.add('guessed-region'); // Add a class for styling
      guessedRegionsContainer.appendChild(regionElement); // Append the new div to the container
    });
  }

  document.getElementById("expertMode").addEventListener("change", function () {
    expertMode = this.checked;
    if (expertMode) {
      dropdown.style.display = "none";
    }
  });
  
  document.getElementById("hardMode").addEventListener("change", function () {
    hardMode = this.checked;
    if (hardMode) {
      guessedRegionsContainer.style.display = "none"; // Hide guessed regions container in expert mode
    }
  });

  // Ensure these IDs exist in your HTML
  const darkModeRadio = document.getElementById("darkModeRadio");
  const lightModeRadio = document.getElementById("lightModeRadio");

  if (darkModeRadio) {
    darkModeRadio.addEventListener("change", darkMode);
  }

  if (lightModeRadio) {
    lightModeRadio.addEventListener("change", lightMode);
  }

  function highlightRandomRegion() {
    const remainingRegions = regions.filter(
      (region) =>
        region !== lastHighlightedRegion &&
        !correctlyAnsweredRegions.has(region)
    );

    if (remainingRegions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingRegions.length);
      const randomRegion = remainingRegions[randomIndex];

      const regionSVGMap = {
        Auckland: document.getElementById("Auckland"),
        "Bay of Plenty": document.getElementById("BoP"),
        Canterbury: document.getElementById("Canterbury"),
        Gisborne: document.getElementById("Gisborne"),
        "Hawke's Bay": document.getElementById("Hawkes-Bay"),
        Marlborough: document.getElementById("Marlborough"),
        Manawatu: document.getElementById("Manawatu"),
        Nelson: document.getElementById("Nelson"),
        Northland: document.getElementById("Northland"),
        Otago: document.getElementById("Otago"),
        Southland: document.getElementById("Southland"),
        Taranaki: document.getElementById("Taranaki"),
        Tasman: document.getElementById("Tasman"),
        Waikato: document.getElementById("Waikato"),
        Wellington: document.getElementById("Wellington"),
        Westland: document.getElementById("Westland"),
      };

      if (regionSVGMap[randomRegion]) {
        regionSVGMap[randomRegion].style.fill = "#f07d7d";
        lastHighlightedRegion = randomRegion;
      }
    } else {
      console.log("All regions have been highlighted.");
    }
  }

  function shakeScreen() {
    const body = document.body;
    body.classList.add("shake");
    setTimeout(() => body.classList.remove("shake"), 1000); // Remove class after 1 second
  }

  function checkIfAllRegionsCorrect() {
    if (correctlyAnsweredRegions.size === regions.length) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
      document.getElementById("initialRegion").textContent = "16 out of 16! Well done!";
    }
  }

  function startGame(){
    document.getElementById("initialOverlay").style.display = "none";
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === " " && !spacebarUsed) {
      event.preventDefault();
      highlightRandomRegion();
      document.getElementById("initialRegion").textContent = `Name That Region`;
      startGame();
      spacebarUsed = true; // Disable spacebar after the first use
    }
  });

  // Add CSS for the guessed regions dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .guessed-region {
    color: #637579;
    padding: 0.5rem 2rem;
    padding-left: 0rem;
    font-family: Lexend;
    font-size: 18px;
    }
  `;
  document.head.appendChild(style);
};
