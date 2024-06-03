import { setCase, setPlayFormula, reset, setPlayState, incrementSpeed, getSpeed, callNextMovement, callPreviousMovement, refresh } from "../cube/cube.js"
import { putOnCenter, initiateMovements } from "./slider.js"

var wrapper = document.getElementsByClassName("form_animation")[0]
var playElement = document.getElementById("form_animation__holder__controls__play")
var playState = false
var speedElement = document.getElementById("form_animation__holder__controls__speed__number")
        
function openFormPopUp(e){

    //Reseta o icone
    playState = false
    changePlayIcon("pause")
    //Reseta a posição das peças
    reset()
    //Seta a formula para a do card clicado
    setCase(e.target.dataset.setCase)
    //Seta a formula que sera animada
    setPlayFormula(e.target.dataset.playForm)
    //Deixa o POP UP visível
    wrapper.classList.add("form_animation--active")
    initiateMovements(e.target.dataset.playForm.split(' '))
    putOnCenter(0)
    
}

function closeFormPopUp(e){
    //Esconde o POP UP
    if(e.target.classList[0] === "form_animation"){
        wrapper.classList.remove("form_animation--active")
    }

}

//Function called when click at play button
export function togglePlayButton(reload){
    //If reload === true, set the icon as reload icon
    if(reload){
        playState = true
        changePlayIcon("reload")
        return
    }

    playState = !playState
    
    if(playState){
        changePlayIcon("play")
        setPlayState(false)
    } else {
        changePlayIcon("pause")
        setPlayState(true)
    }
}

//called when click at speed button
function changeSpeed(){
    incrementSpeed()
    speedElement.innerText = getSpeed()
}

//Called when click at next button
function nextMovement(){
    //If is not paused, pause!
    if(!playState){
        togglePlayButton()
    }
    
    callNextMovement()
}

//Called when click at previous button
function previousMovement(){
    //If is not paused, pause!
    if(!playState){
        togglePlayButton()
    }

    callPreviousMovement()
}

//Called when click at refresh button
function onRefresh(){
    playState = true
    changePlayIcon("pause")
    refresh()
}

//Deixa as funções acessíveis ao DOM 
window.closeFormPopUp = closeFormPopUp
window.openFormPopUp = openFormPopUp
window.togglePlayButton = togglePlayButton
window.changeSpeed = changeSpeed
window.nextMovement = nextMovement
window.previousMovement = previousMovement
window.onRefresh = onRefresh

export function changePlayIcon(iconName){
    playElement.src = `./icons/${iconName}.svg`
}