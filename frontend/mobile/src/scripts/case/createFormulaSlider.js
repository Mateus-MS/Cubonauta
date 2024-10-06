function createFormulaSlider(formula){
    let holder = document.getElementById("case_popup__holder__display__slider");
    
    //If already has movements
    if(holder.children.length !== 0){
        //Remove all children from holder
        for(let i = holder.children.length - 1; i >= 0; i--){
            holder.removeChild(holder.children[i])
        }
    }

    let movements = formula.split(" ")
    //Create all new childrens
    for(let i = 0; i < movements.length; i++){
        holder.appendChild(createMovementElement(movements[i]))
    }
    holder.children[0].classList.add("selected")

    let rightMargin = 10;
    let letterSum   = 0;
    for(let i = 0; i < holder.children.length; i++){
        letterSum += getLetterSize(holder.children[i]);
    }
    letterSum += (holder.children.length - 1) * rightMargin
    // letterSum += holder.children[0].getBoundingClientRect().width / 2

    holder.style.left = `${centerLetter(0)}px`
}

function createMovementElement(movement){
    let ele = document.createElement("span");
    ele.classList.add("case_popup__holder__display__slider__movement")
    ele.innerText = movement
    
    return ele
}

function getLetterSize(letter){
     return letter.getBoundingClientRect().width
}

function centerLetter(letterIndex){
    let container      = document.getElementById("case_popup__holder__display")
    let containerWidth = container.getBoundingClientRect().width

    let letter      = document.getElementById("case_popup__holder__display__slider").children[letterIndex]
    let letterWidth = letter.getBoundingClientRect().width

    if(letterIndex === 0){
        return containerWidth / 2 - letterWidth / 2
    }

    let sum = containerWidth / 2
    for(let i = 0; i < letterIndex; i++){
        sum -= container.children[0].children[i].getBoundingClientRect().width
        sum -= 10
    }
    
    return sum -= letterWidth / 2
}