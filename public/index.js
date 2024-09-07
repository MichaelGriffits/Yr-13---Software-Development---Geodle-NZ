// Wait for the DOM to fully load before running the script
window.onload = function () {
  // Show settings menu when the settings button is clicked
  const buttonSettings = document.getElementById("settings");
  buttonSettings.addEventListener("click", () => {
    document.getElementById("settingsMenu").style.display = "block";
  });

  // Show help menu when the help button is clicked
  const buttonHelp = document.getElementById("help");
  buttonHelp.addEventListener("click", () => {
    document.getElementById("helpMenu").style.display = "block";
  });

  // Hide settings menu when the cancel button in settings menu is clicked
  const settingsCancel = document.getElementById("settingsCancelButton");
  settingsCancel.addEventListener("click", () => {
    document.getElementById("settingsMenu").style.display = "none";
  });

  // Hide help menu when the cancel button in help menu is clicked
  const helpCancel = document.getElementById("helpCancelButton");
  helpCancel.addEventListener("click", () => {
    document.getElementById("helpMenu").style.display = "none";
  });

  // Function to enable dark mode
  function darkMode() {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  }

  // Function to enable light mode
  function lightMode() {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }

  // Initialize variables
  const entry = document.getElementById("inputField");
  const dropdown = document.getElementById("dropdownbuttons");
  const guessedRegionsContainer = document.getElementById("guessedRegionsContainer");

  // List of regions for the game
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

  let lastHighlightedRegion = null; // Keeps track of the last highlighted region
  let spacebarUsed = false; // Prevents repeated use of spacebar to restart the game
  const correctlyAnsweredRegions = new Set(); // Tracks correctly guessed regions
  let expertMode = false; // Flag for expert mode

  // Initialize the dropdown with region buttons
  function initializeDropdown() {
    dropdown.innerHTML = ""; // Clear existing dropdown content
    regions.forEach(region => {
      let button = document.createElement("button");
      button.textContent = region;
      button.addEventListener("click", function () {
        entry.value = button.textContent; // Set input field value to the button text
        dropdown.style.display = "none"; // Hide dropdown after selection
      });
      dropdown.appendChild(button); // Add button to dropdown
    });
  }

  // Call the function to populate the dropdown
  initializeDropdown();

  // Prevent the blur event when clicking on the dropdown
  dropdown.addEventListener("mousedown", (event) => {
    event.preventDefault(); // Prevents dropdown from closing when clicked on
  });

  // Update dropdown based on user input
  function updateDropdown() {
    if (expertMode) {
      dropdown.style.display = "none"; // Hide dropdown in expert mode
      return;
    }

    let entryValue = entry.value.toLowerCase(); // Get user input in lowercase
    let buttons = dropdown.getElementsByTagName("button");

    // Filter dropdown buttons based on input
    Array.from(buttons).forEach(button => {
      let buttonValue = button.textContent.toLowerCase();
      if (buttonValue.includes(entryValue)) {
        button.style.display = "block"; // Show matching buttons

        // Highlight matching text in dropdown buttons
        let originalText = button.textContent;
        let highlightedText = originalText.replace(
          new RegExp(entryValue, "gi"),
          (match) => `<span class="highlight">${match}</span>`
        );

        button.innerHTML = highlightedText;
      } else {
        button.style.display = "none"; // Hide non-matching buttons
      }
    });

    // Show dropdown only if there's user input
    dropdown.style.display = entryValue.length > 0 ? "block" : "none";
  }

  // Event listener for input field keyup to update dropdown
  entry.addEventListener("keyup", function () {
    if (!expertMode) {
      updateDropdown();
    }
  });

  // Hide dropdown when input field loses focus, with a slight delay
  entry.addEventListener("blur", function () {
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 150);
  });

  // Form submission event handler
  document.getElementById("regionForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    let region = entry.value.trim(); // Get trimmed user input

    // Map of region names to corresponding SVG elements
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

    // Check if the entered region is correct and matches the highlighted region
    if (region && region === lastHighlightedRegion) {
      if (regionSVGMap[region]) {
        regionSVGMap[region].style.fill = "#9cc5a1"; // Highlight the region in green
      }

      correctlyAnsweredRegions.add(region); // Add to correctly guessed regions
      displayGuessedRegions(); // Update guessed regions display

      entry.value = ""; // Clear input field
      entry.dispatchEvent(new Event("keyup")); // Trigger dropdown update

      // Update score display
      document.getElementById("Score").textContent = `Score: ${correctlyAnsweredRegions.size}/16`;

      highlightRandomRegion(); // Highlight a new random region
      checkIfAllRegionsCorrect(); // Check if all regions are guessed
    } else {
      shakeScreen(); // Shake the screen if the guess is wrong
    }
  });

  // Display the list of guessed regions
  function displayGuessedRegions() {
    guessedRegionsContainer.innerHTML = ""; // Clear existing list

    // Add each guessed region to the display
    correctlyAnsweredRegions.forEach(region => {
      const regionElement = document.createElement("div");
      regionElement.textContent = region;
      regionElement.classList.add("guessed-region");
      guessedRegionsContainer.appendChild(regionElement);
    });
  }

  // Toggle expert mode based on checkbox state
  document.getElementById("expertMode").addEventListener("change", function () {
    expertMode = this.checked;
    if (expertMode) {
      dropdown.style.display = "none"; // Hide dropdown in expert mode
    }
  });

  // Toggle hard mode based on checkbox state
  document.getElementById("hardMode").addEventListener("change", function () {
    hardMode = this.checked;
    if (hardMode) {
      guessedRegionsContainer.style.display = "none"; // Hide guessed regions in hard mode
    }
  });

  // Dark mode radio button event listener
  const darkModeRadio = document.getElementById("darkModeRadio");
  if (darkModeRadio) {
    darkModeRadio.addEventListener("change", darkMode);
  }

  // Light mode radio button event listener
  const lightModeRadio = document.getElementById("lightModeRadio");
  if (lightModeRadio) {
    lightModeRadio.addEventListener("change", lightMode);
  }

  // Function to highlight a random region that hasn't been guessed yet
  function highlightRandomRegion() {
    const remainingRegions = regions.filter(
      region =>
        region !== lastHighlightedRegion && // Exclude the last highlighted region
        !correctlyAnsweredRegions.has(region) // Exclude already guessed regions
    );

    if (remainingRegions.length > 0) {
      // Select a random region from the remaining regions
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
        regionSVGMap[randomRegion].style.fill = "#f07d7d"; // Highlight the region in red
        lastHighlightedRegion = randomRegion; // Update last highlighted region
      }
    } else {
      console.log("All regions have been highlighted.");
    }
  }

  // Function to shake the screen to indicate a wrong answer
  function shakeScreen() {
    const body = document.body;
    body.classList.add("shake");
    setTimeout(() => body.classList.remove("shake"), 1000); // Remove shake effect after 1 second
  }

  // Check if all regions have been correctly guessed
  function checkIfAllRegionsCorrect() {
    if (correctlyAnsweredRegions.size === regions.length) {
      // Trigger confetti effect on completion
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      document.getElementById("initialRegion").textContent =
        "16 out of 16 Great Job, Press SPACE to Play Again";
      spacebarUsed = false; // Allow space bar to restart the game
    }
  }

  // Start or restart the game
  function startGame() {
    document.getElementById("initialOverlay").style.display = "none"; // Hide the initial overlay
    document.getElementById("initialRegion").textContent = "Name That Region"; // Reset text
    correctlyAnsweredRegions.clear(); // Clear guessed regions
    guessedRegionsContainer.innerHTML = ""; // Clear displayed guessed regions
    document.getElementById("Score").textContent = `Score: ${correctlyAnsweredRegions.size}/16`; // Reset score display
    lastHighlightedRegion = null; // Reset highlighted region
    highlightRandomRegion(); // Highlight a new random region
  }

  // Event listener for the spacebar to start or restart the game
  document.addEventListener("keydown", function (event) {
    if (
      event.key === " " &&
      (correctlyAnsweredRegions.size === regions.length || !spacebarUsed)
    ) {
      event.preventDefault(); // Prevent default spacebar action (scrolling)
      startGame(); // Start or restart the game
      spacebarUsed = true; // Disable spacebar after the first use
    }
  });

  // Add CSS for the guessed regions dynamically
  const style = document.createElement("style");
  style.innerHTML = `
    .guessed-region {
      color: #637579;
      padding: 0.5rem 2rem;
      padding-left: 0rem;
      font-family: Lexend;
      font-size: 18px;
    }
  `;
  document.head.appendChild(style); // Add styles to the document

  // Sliding side menu functionality
  const menuButton = document.getElementById("menu");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenuButton = document.getElementById("closeMenu");

  // Open side menu when menu button is clicked
  menuButton.addEventListener("click", () => {
    sideMenu.style.width = "250px"; // Adjust width as needed
  });

  // Close side menu when close button is clicked
  closeMenuButton.addEventListener("click", () => {
    sideMenu.style.width = "0"; // Close menu by setting width to 0
  });

  // Close side menu when clicking outside of it
  document.addEventListener("click", (event) => {
    // Check if the click was outside the sideMenu and the menu button
    if (
      !sideMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      sideMenu.style.width = "0"; // Close the menu
    }
  });

  // Prevent clicks inside the side menu from closing it
  sideMenu.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop event from bubbling up to the document
  });
};
