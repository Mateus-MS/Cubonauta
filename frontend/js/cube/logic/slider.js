let container = document.getElementById("form_animation__holder__slider")
let holder = document.getElementById("form_animation__holder__slider__holder")

let children = holder.children

function setTranslate(value){
    holder.style.transform = `translateX(${value}px)`
}

export function putOnCenter(index){

    let offset = container.offsetWidth / 2

    for(let i = 0; i < index; i++){
        offset -= children[i].offsetWidth + 10
    }

    offset -= children[index].offsetWidth / 2
    //Muda a cor dele para em evidencia
    children[index].classList.add("form_animation__holder__slider__holder__movement--active")
    //Remove a evidencia de ambos os vizinhos
    if(index > 0){
        removeEvidence(index - 1)
    }
    if(index < children.length - 1){
        removeEvidence(index + 1)
    }

    setTranslate(offset)

}

//DaFuck is this name
export function removeEvidence(index){
    if(index === children.length){
        index -= 1
    }
    children[index].classList.remove("form_animation__holder__slider__holder__movement--active")
}

export function initiateMovements(formula){

    for(let i = 0; i < formula.length; i++){
        let move = document.createElement("span")
        move.classList.add("form_animation__holder__slider__holder__movement")
        move.innerText = formula[i]
        holder.appendChild(move)
    }

}

export function removeMovements(){
    
    while(holder.firstChild){
        holder.removeChild(holder.firstChild)
    }

}