let record = parseInt(localStorage.getItem("@Mata_Mosca_record")) || 0;

document.getElementById("record").innerHTML = record;

function restart () {
    location.assign('../game');
}
