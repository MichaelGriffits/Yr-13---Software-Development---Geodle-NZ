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

    var regions = ["Ashburton","Auckland", "Buller","Carterton","Central Hawks Bay","Central Otago","Christchurch","Clutha","Coromandel","Dunedin","Far North","Gisborne","Gore","Grey","Hamilton","Hastings","Hauraki","Horowhenua","Hurunio","Kaikoura","Kaipara","Kapiti Coast","Lower Hutt","Mackenzie","Manawatu","Marlborough","Masterton","Matamata-Piako","Nelson","New Plymouth","Opotiki","Palmerston North","Porirua","Queenstown","Rangitikei","Rotorua","Ruapehu","Selwyn","South Taranaki","South Waikato","South Wairarapa","Southland","Stratford","Tararua","Taupo","Upperhutt","Waikato","Waimakariri","Waimate","Waipa","Wairoa","Waitaki","Waitomo","Wellington","Western Bay of Plenty","Westland","Whaketane","Whananui","Whangarei"];
}

function selectedRegion(){
    var regionInput = document.getElementById('region').value;
    print(regionInput);
}