let bar = document.getElementById("formPopUp__progress_bar__bar")
let ball = document.getElementById("formPopUp__progress_bar__ball")
let children = document.getElementById("formPopUp__movements__holder").children

export function moveBall(index){
    let margin = bar.offsetWidth * (index / children.length)
    margin -= ball.offsetWidth / 2
    ball.style.marginLeft = margin + "px"
}

export function resetBall(){
    let margin = bar.offsetWidth * (0 / children.length)
    margin -= ball.offsetWidth / 2
    ball.style.marginLeft = margin + "px"
}

//Implement Later
function ballMover(){
    console.log("a")
}
window.ballMover = ballMover
