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

}