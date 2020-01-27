var timmerId = null;

function IniciaJogo() {

    var nivel_jogo = window.location.search.replace('?', '');
    var tempo_segundos = 0
    switch(nivel_jogo){
        case '1':
            tempo_segundos = 120;
            break;
        case '2':
            tempo_segundos = 60;
            break;
        case '3':
            tempo_segundos = 30;
            break;
    }
    document.getElementById('cronometro').innerHTML = tempo_segundos;
    var qtda_baloes = 80
    CriaBaloes(qtda_baloes);
    document.getElementById('totalbaloes').innerHTML = qtda_baloes;
    document.getElementById('totalbaloesestourado').innerHTML = 0;
    contagem_tempo(tempo_segundos + 1)
}

function contagem_tempo(segundos) {
    segundos = segundos - 1
    if (segundos == -1) {
        clearTimeout(timerid);
        game_over();
        return false;
    }
    document.getElementById('cronometro').innerHTML = segundos 
    timerid = setTimeout("contagem_tempo(" + segundos + ")", 1000);

}

function CriaBaloes(qdt_baloes) {

    for (var i = 0; i < qdt_baloes; i++) {
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' + i;
        balao.onclick = function(){ estourar(this); };
        document.getElementById('cenario').appendChild(balao);

    }
   
}

function game_over() {
    removeeventobaloes();
    alert('Jogo encerrado! Você perdeu.');
}

 function estourar(e){
    balao = document.getElementById(e.id);
    balao.src = "imagens/balao_azul_pequeno_estourado.png";
    balao.setAttribute("onclick","");
    pontuaca(-1);  
}

function pontuaca(acao){
    baloes_inteiros = parseInt(document.getElementById('totalbaloes').innerHTML) + acao
    baloes_estourados = parseInt(document.getElementById('totalbaloesestourado').innerHTML) - acao
    document.getElementById('totalbaloes').innerHTML = baloes_inteiros
    document.getElementById('totalbaloesestourado').innerHTML = baloes_estourados

    fimdejogo(parseInt(baloes_inteiros))
}

function fimdejogo(bl_int){
    if(bl_int == "0" ){
        alert('Parabens! Você ganhou.')
        clearTimeout(timerid);
    }
}

function removeeventobaloes(){
    i = 0
    while (document.getElementById('b' + i))
    {
        document.getElementById('b' + i).onclick = '';
        i++;
    }

}

function removebaloes(){
    i = 0
    while (document.getElementById('b' + i))
    {
        document.getElementById('b' + i).remove();
        i++;
    }

}

function reiniciajogo(){
    clearTimeout(timerid);
    removebaloes()
    IniciaJogo();

}

