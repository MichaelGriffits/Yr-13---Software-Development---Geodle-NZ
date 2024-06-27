window.onload = function( ) {
    const button = document.getElementById('settings');
    button.addEventListener('click', () => {
        document.getElementById("settingsMenu").style.display= "block"
    });

    const buttonCancel = document.getElementById('CancelButton');
    buttonCancel.addEventListener('click', () => {
        document.getElementById("settingsMenu").style.display= "none"
    });

    function darkMode() {
        var element = document.body;
        element.classList.toggle("dark-mode");
    };

    function lightMode() {
        var element = document.body;
        element.classList.toggle("light-mode");
    }

    let entry = document.getElementById("inputField");
    let dropdown = document.getElementById("dropdownbuttons");
    let regions = ["Ashburton","Auckland", "Buller","Carterton","Central Hawks Bay","Central Otago","Christchurch","Clutha","Coromandel","Dunedin","Far North","Gisborne","Gore","Grey","Hamilton","Hastings","Hauraki","Horowhenua","Hurunio","Kaikoura","Kaipara","Kapiti Coast","Lower Hutt","Mackenzie","Manawatu","Marlborough","Masterton","Matamata-Piako","Nelson","New Plymouth","Opotiki","Palmerston North","Porirua","Queenstown","Rangitikei","Rotorua","Ruapehu","Selwyn","South Taranaki","South Waikato","South Wairarapa","Southland","Stratford","Tararua","Taupo","Upperhutt","Waikato","Waimakariri","Waimate","Waipa","Wairoa","Waitaki","Waitomo","Wellington","Western Bay of Plenty","Westland","Whaketane","Whananui","Whangarei"];
    for (let i = 0; i < regions.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = regions[i];
        button.addEventListener("click", function() {
            entry.value = button.innerHTML;
            dropdown.style.display = "none";
        });
        dropdown.appendChild(button);
}

function selectedRegion(){
    var regionInput = document.getElementById('region').value;
    console.log(regionInput);
    document.getElementById('inputField').value=regionInput ; 

}

entry.addEventListener("keyup", function() {
    // check # of keys in the input field
    let entryLength = entry.value.length;
    // if it's greater than 0, display the dropdown
    if (entryLength > 0) {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
    let entryValue = entry.value.toLowerCase();
    let buttons = dropdown.getElementsByTagName("button");
    for (let i = 0;i< buttons.length;i++) {
        let buttonValue = buttons[i].innerHTML.toLowerCase();
        if (buttonValue.includes(entryValue)) {
            buttons[i].style.display = "block";
        } else {
            buttons[i].style.display = "none";
        }
    }
    
});
}