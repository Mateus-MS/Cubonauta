import {reset, setCase, setPlayFormula, getFormulaIndex} from "./cube/cube.js"

var wrapper = document.getElementsByClassName("formPopUp")[0]
var container = document.getElementById("formPopUp__movements")
var holder = document.getElementById("formPopUp__movements__holder");

let padding = 10
        
function openFormPopUp(e){

    //Reseta e Seta a formula para a mesma do CARD clicado
    reset()
    setCase(e.target.dataset.setCase)
    setPlayFormula(e.target.dataset.playForm)

    //Create the html spans to show the formula
    let formArray = e.target.dataset.playForm.split(" ")

    for(let i = 0; i < formArray.length; i++){
        let span = document.createElement("span")
        span.innerText = formArray[i]
        if(i === 0){
            span.classList.add("formPopUp__movements__holder__movement", "formPopUp__movements__holder__movement--active")
        } else {
            span.classList.add("formPopUp__movements__holder__movement")
        }
        holder.appendChild(span)
    }
    
    //Deixa o POP UP visível
    wrapper.classList.add("formPopUp--show")

    //Calcula o margin-left do holder
    holder.style.marginLeft = container.getClientRects()[0].width / 2 - holder.firstChild.getClientRects()[0].width / 2 + "px"
    
}

function closeFormPopUp(){
    //Esconde o POP UP
    
    holder.style.marginLeft = "0px"
    wrapper.classList.remove("formPopUp--show")
}

export function deleteHolderChildren(){

    while (holder.firstChild) {
        holder.removeChild(holder.firstChild);
    }
    holder.style.marginLeft = "0"

}

//BUG!, there is some offset
export function setNewLeftMargin(){

    let leftMargin = parseInt(holder.style.marginLeft) 
    let actualChildSize = holder.children[getFormulaIndex()].getClientRects()[0].width
    let nextChildSize = holder.children[getFormulaIndex() + 1].getClientRects()[0].width
    holder.style.marginLeft = (leftMargin - (nextChildSize / 2 + actualChildSize / 2 + padding)) + "px"

}

export function setNewMoveOnFocus(index){
    holder.children[index].classList.remove("formPopUp__movements__holder__movement--active")
    holder.children[index + 1].classList.add("formPopUp__movements__holder__movement--active")
}

//Deixa as funções acessíveis ao DOM 
window.closeFormPopUp = closeFormPopUp
window.openFormPopUp = openFormPopUp