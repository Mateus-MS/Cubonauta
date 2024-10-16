var question = {
    element : document.getElementById("question"),

    onClick: function(){
        next.enable()
        control.complete[2] = true;
        setAsComplete(2)
    },

    moveTo  : {
        left  : function(){
            question.element.classList.add("left")
            question.element.classList.remove("right")
        },
        center: function(){
            question.element.classList.remove("left")
            question.element.classList.remove("right")
        },
        right : function(){
            question.element.classList.remove("left")
            question.element.classList.add("right")
        }
    },
}

let radios = document.getElementById("holder").getElementsByTagName("input")

for(let rad of radios){
    rad.checked = false;
}