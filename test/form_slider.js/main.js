
let container = document.getElementById("container")
let holder = document.getElementById("holder")
let children = [];
let childrenText = [
    "w",
    "I",
    "Rw2'",
    "F",
    "L'",
    "B",
    "Bw",
    "L2",
    "x",
    "R2",
    "F'",
    "Lw",
    "y'",
    "R2'",
    "F2",
    "L'",
    "R",
    "Lw'",
    "Rw2'"
]

initiateChildren()

let padding = 10
let index = 0;

for(let i = 0; i < children.length; i++){
    setTimeout(()=>{
        passStyleToNext(i)
        putOnTheCenter(i)
        index ++
    }, (i + 1) * 750)
}

function initiateChildren(){

    for(let i = 0; i < childrenText.length; i++){
        let child = document.createElement("div")
        child.classList.add("item")
        child.innerText = childrenText[i]
        holder.appendChild(child)
        children.push(child)
    }

}

function passStyleToNext(index){

    if(index >= children.length) return

    if(index >= 1){
        children[index - 1].classList.remove('active')
    }
    children[index].classList.add('active')

}
  
function putOnTheCenter(index){
    
    let offset = container.offsetWidth / 2
    if(index === 0){
        offset -= children[0].offsetWidth / 2
        setTransform(offset)
        return
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

function getTransform(){
    return parseInt(holder.style.transform.split("(")[1])
}