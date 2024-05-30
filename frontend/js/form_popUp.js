import { reset, setCase, setPlayFormula } from "./cube/cube.js"
import { initiateMoves, putOnTheCenter, passStyleToNext, removeMoves } from "./cube/slider.js";

var wrapper = document.getElementsByClassName("formPopUp")[0]
        
function openFormPopUp(e){

    //A posição das peças
    reset()
    //Remove os Movimentos
    removeMoves()
    //Seta a formula para a do card clicado
    setCase(e.target.dataset.setCase)
    //Seta a formula que sera animada
    setPlayFormula(e.target.dataset.playForm)
    //Inicia os Movimentos
    initiateMoves(e.target.dataset.playForm);
    
    //Deixa o POP UP visível
    wrapper.classList.add("formPopUp--show")
    //Seleciona o primeiro Movimento
    putOnTheCenter(0)
    passStyleToNext(0)
    
}

function closeFormPopUp(){
    //Esconde o POP UP
    wrapper.classList.remove("formPopUp--show")

}

//Deixa as funções acessíveis ao DOM 
window.closeFormPopUp = closeFormPopUp
window.openFormPopUp = openFormPopUp