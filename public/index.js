window.onload = function() {
    const button = document.getElementById('settings');
    button.addEventListener('click', () => {
        document.getElementById("settingsMenu").style.display = "block";
    });

    const buttonCancel = document.getElementById('CancelButton');
    buttonCancel.addEventListener('click', () => {
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
    const regions = ["Ashburton", "Auckland", "Buller", "Carterton", "Central Hawks Bay", "Central Otago", "Christchurch", "Clutha", "Coromandel", "Dunedin", "Far North", "Gisborne", "Gore", "Grey", "Hamilton", "Hastings", "Hauraki", "Horowhenua", "Hurunui", "Kaikoura", "Kaipara", "Kapiti Coast", "Lower Hutt", "Mackenzie", "Manawatu", "Marlborough", "Masterton", "Matamata-Piako", "Nelson", "New Plymouth", "Opotiki", "Palmerston North", "Porirua", "Queenstown", "Rangitikei", "Rotorua", "Ruapehu", "Selwyn", "South Taranaki", "South Waikato", "South Wairarapa", "Southland", "Stratford", "Tararua", "Taupo", "Upperhutt", "Waikato", "Waimakariri", "Waimate", "Waipa", "Wairoa", "Waitaki", "Waitomo", "Wellington", "Western Bay of Plenty", "Westland", "Whaketane", "Whanganui", "Whangarei"];
    
    const selectedRegionsList = [];

    for (let i = 0; i < regions.length; i++) {
        let button = document.createElement("button");
        button.textContent = regions[i];
        button.addEventListener("click", function() {
            entry.value = button.textContent;
            dropdown.style.display = "none";
        });
        dropdown.appendChild(button);
    }

    function selectedRegion() {
        var regionInput = document.getElementById('region').value;
        console.log(regionInput);
        document.getElementById('inputField').value = regionInput;
    }

    entry.addEventListener("keyup", function() {
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
            if (buttonValue.includes(entryValue) && !selectedRegionsList.includes(buttons[i].textContent)) {
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

    entry.addEventListener("blur", function() {
        setTimeout(function() {
            dropdown.style.display = "none";
        }, 100);
    });

    document.getElementById('regionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let region = entry.value.trim();
        
        // Mapping of regions to their corresponding SVG elements
        const regionSVGMap = {
            "Ashburton": document.getElementById("AshburtonSVG"),
            "Auckland": document.getElementById("AucklandSVG"),
            "Buller": document.getElementById("BullerSVG"),
            "Carterton": document.getElementById("CartertonSVG"),
            "Central Hawks Bay": document.getElementById("CentralHawksBaySVG"),
            "Central Otago": document.getElementById("CentralOtagoSVG"),
            "Christchurch" : document.getElementById("ChristchurchSVG"),
            "Clutha": document.getElementById("CluthaSVG"),
            "Coromandel": document.getElementById("CoromandelSVG"),
            "Dunedin": document.getElementById("DunedinSVG"),
            "Far North": document.getElementById("FarNorthSVG"),
            "Gisborne": document.getElementById("GisborneSVG"),
            "Grey": document.getElementById("GreySVG"),
            "Westland": document.getElementById("WestlandSVG"),

        };
    
        // Default filter style
        const filterStyle = "brightness(0) saturate(100%) invert(79%) sepia(15%) saturate(4066%) hue-rotate(324deg) brightness(105%) contrast(98%)";
    
        if (region !== "" && regions.includes(region) && !selectedRegionsList.includes(region)) {
            selectedRegionsList.push(region);
            let regionTag = document.createElement("div");
            regionTag.className = "region-tag";
            regionTag.innerText = region;
            selectedRegions.appendChild(regionTag);
    
            // Apply the filter and opacity if the region matches
            if (regionSVGMap[region]) {
                regionSVGMap[region].style.filter = filterStyle;
                regionSVGMap[region].style.opacity = 100;
            }
    
            entry.value = "";
            entry.dispatchEvent(new Event('keyup'));
        }
    });
};
