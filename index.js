function iniciarJogo () {
    setSpeed();
    location.assign('../stages/game');
}

function setSpeed () {
    let select = document.getElementById("nivel");
    let nivel = select.options[select.selectedIndex].value;

    sessionStorage.setItem("@Mata_Mosca_nivel", nivel);
}