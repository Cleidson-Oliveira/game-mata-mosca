const fly = document.getElementById("moscaConteiner");
let nivel = sessionStorage.getItem("@Mata_Mosca_nivel");
let record = parseInt(localStorage.getItem("@Mata_Mosca_record")) || 0;
let flyAmount;
let vidas;

let screemXmax = fly.parentElement.offsetWidth - fly.offsetWidth;
let screemXmin = 0;
let screemYmax = fly.parentElement.offsetHeight - fly.offsetHeight;
let screemYmin = 0;


let gameSpeedByNivel = {
    kid: 2500,
    easy: 2000,
    medio: 1500,
    hard: 1100,
    chuck: 800,
    paranormal: 600,
}

const velocidade = gameSpeedByNivel[nivel];

let lifePanel = {
    heart1: document.getElementById("heart1"),
    heart2: document.getElementById("heart2"),
    heart3: document.getElementById("heart3"),
}

function createFly () {
    
    let flyImg = document.createElement("img");
    flyImg.id = "mosca";
    flyImg.addEventListener("click", () => { update(true) });
    flyImg.setAttribute("src", "../../imagens/mosca.png");

    fly.appendChild(flyImg)

    changeFlyPositionAndRotation();
}

function destroyFly () {
    fly.innerHTML = "";
}

function changeFlyPositionAndRotation () {
    let posx = parseInt(Math.random() * (screemXmax - screemXmin) + screemXmin);
    let posy = parseInt(Math.random() * (screemYmax - screemYmin) + screemYmin);
    fly.style.top = posy + 'px';
    fly.style.left = posx + 'px';
    
    let rotate = parseInt(Math.random() * 2)
    fly.style.transform = `rotateY(${180 * rotate}deg)`
}

function handleFlyCounter (updatedFlyCount) {
    flyAmount = updatedFlyCount;
    document.getElementById("contagem").innerHTML = "Número de moscas: " + flyAmount;
}

function diminuiVida () {

    if(vidas > 0){
        vidas--
    }

    switch(vidas) {
        case 2:
            lifePanel.heart1.src = "../../imagens/coracao_vazio.png"
            break
        case 1:
            lifePanel.heart2.src = "../../imagens/coracao_vazio.png"
            break
        case 0:
            lifePanel.heart3.src = "../../imagens/coracao_vazio.png"
            break
    }
}

function start () {
    handleFlyCounter(0);
    vidas = 3;
    createFly();
}

function update (kill = false) {

    destroyFly();

    let updatedSpeed = velocidade;
    let updatedFlyCount = flyAmount + 1;

    if (updatedFlyCount % 10 == 0 && velocidade - updatedFlyCount > 500) {
        updatedSpeed = velocidade - updatedFlyCount;
    }
    
    if ( kill ) {
        handleFlyCounter(updatedFlyCount);
        resetInterval(updatedSpeed);
    } else {
        diminuiVida();
    }

    if(vidas == 0) {
        record < flyAmount && setRecord()
        gameOver();
        return;
    }

    createFly();
}

function gameOver () {
    location.assign('../gameOver');
}

function setRecord () {
    localStorage.setItem("@Mata_Mosca_record", flyAmount);
}

let interval = setInterval(() => {
    update()
}, velocidade);

function resetInterval (updatedSpeed) {
    clearInterval(interval);

    interval = setInterval(() => {
        update()
    }, updatedSpeed);
}

start();
