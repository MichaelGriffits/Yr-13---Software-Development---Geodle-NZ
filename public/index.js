window.onload = function () {
  const button = document.getElementById("settings");
  button.addEventListener("click", () => {
    document.getElementById("settingsMenu").style.display = "block";
  });

  const buttonCancel = document.getElementById("CancelButton");
  buttonCancel.addEventListener("click", () => {
    document.getElementById("settingsMenu").style.display = "none";
  });

  function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  function lightMode() {
    var element = document.body;
    element.classList.toggle("light-mode");
  }

  const entry = document.getElementById("inputField");
  const dropdown = document.getElementById("dropdownbuttons");
  const selectedRegions = document.getElementById("selectedRegions");
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

  for (let i = 0; i < regions.length; i++) {
    let button = document.createElement("button");
    button.textContent = regions[i];
    button.addEventListener("click", function () {
      entry.value = button.textContent;
      dropdown.style.display = "none";
    });
    dropdown.appendChild(button);
  }

  entry.addEventListener("keyup", function (event) {
    let entryLength = entry.value.length;

    if (entryLength > 0) {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
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
  });

  entry.addEventListener("blur", function () {
    setTimeout(function () {
      dropdown.style.display = "none";
    }, 100);
  });

  document
    .getElementById("regionForm")
    .addEventListener("submit", function (event) {
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
        // Change the color to #9cc5a1 for the correctly entered region
        if (regionSVGMap[region]) {
          regionSVGMap[region].style.fill = "#9cc5a1";
        }

        // Mark the region as correctly answered
        correctlyAnsweredRegions.add(region);

        // Clear the input and trigger the dropdown update
        entry.value = "";
        entry.dispatchEvent(new Event("keyup"));

        // Update the score text
        document.getElementById(
          "Score"
        ).textContent = `${correctlyAnsweredRegions.size}/16`;

        // Highlight a new random region
        highlightRandomRegion();
      }
    });

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

      // Highlight the new random region
      if (regionSVGMap[randomRegion]) {
        regionSVGMap[randomRegion].style.fill = "#f07d7d";
        lastHighlightedRegion = randomRegion;
      }
    } else {
      console.log("All regions have been highlighted.");
    }
  }

  document.addEventListener("keydown", function (event) {
    if (
      event.key === " " &&
      !spacebarUsed &&
      document.activeElement !== entry
    ) {
      event.preventDefault();
      highlightRandomRegion();
      document.getElementById("initialRegion").textContent = `Name That Region`;
      spacebarUsed = true; // Disable spacebar after the first use
    }
  });
};
