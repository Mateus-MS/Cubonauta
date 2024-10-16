var percentageMap = new Map();
percentageMap.set(0, "15%")
percentageMap.set(1, "50%")
percentageMap.set(2, "85%")

function increaseBar(index){
    document.getElementById("display").style.setProperty("--percentage", percentageMap.get(index));
}

var stepsElements = document.getElementsByClassName("step");

function changeFocus(focus, unfocus){
    stepsElements[unfocus].classList.remove("active")
    stepsElements[focus].classList.add("active")
}

function setAsComplete(index){
    stepsElements[index].classList.add("complete")
}

function setAsUncomplete(index){
    stepsElements[index].classList.remove("complete")
}