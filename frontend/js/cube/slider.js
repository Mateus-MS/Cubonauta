var holder = document.getElementById("formPopUp__movements__holder")
var container = document.getElementById("formPopUp__movements")
var children = []
var padding = 10

export function initiateMoves(moves_){

    let moves = moves_.split(' ')

    for(let i = 0; i < moves.length; i++){

        let child = document.createElement("div")
        child.innerText = moves[i]
        child.classList.add("formPopUp__movements__holder__movement")
        holder.appendChild(child)
        
    }
    children = holder.children

}

export function removeMoves(){
    
    while(holder.firstChild){
        holder.removeChild(holder.firstChild)
    }

}

export function resetSlider(index){
    putOnTheCenter(0)
    passStyleToNext(0)
    children[index - 1].classList.remove("formPopUp__movements__holder__movement--active")
}

export function passStyleToNext(index){

    if(index >= children.length) return

    if(index >= 1){
        children[index - 1].classList.remove("formPopUp__movements__holder__movement--active")
    }
    children[index].classList.add("formPopUp__movements__holder__movement--active")

}

export function putOnTheCenter(index){
    let offset = container.offsetWidth / 2
    if(index === 0){
        offset -= children[0].offsetWidth / 2
        setTransform(offset)
    } 

    for(let i = 0; i < index; i++){
        let actChild = children[i].offsetWidth
        offset -= actChild + padding
    }
    let nextChild = children[index].offsetWidth / 2
    setTransform(offset - nextChild) 
}

function setTransform(size){
    holder.style.transform = `translateX(${size}px)`
}