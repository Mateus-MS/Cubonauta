var control = {
    index : 0,
    complete: [
        false,
        false,
        false
    ],

    select: function(){
        balloon.hide()
        if(control.complete[control.index]){
            next.enable()
        } else {
            next.disable()
        }

        switch(this.index){
            case 0:
                user.moveTo.center()
                pass.moveTo.right()
                conf.moveTo.right()
                question.moveTo.right()
                prev.disable()

                next.changeText("Next step");
                break
            case 1:
                user.moveTo.left()
                pass.moveTo.center()
                conf.moveTo.center()
                question.moveTo.right()
                prev.enable()

                next.changeText("Next step");
                break
            case 2:
                user.moveTo.left()
                pass.moveTo.left()
                conf.moveTo.left()
                question.moveTo.center()
                prev.enable()

                next.changeText("Register!");
                break
        }

        increaseBar(control.index);
    }
};

var next = {
    element: document.getElementById("nextButton"),
    state  : false,
    onClick: function(){
        if (control.index === 2){
            if(control.complete.some((element) => element === false)){
                return;
            }     
            register();
        }

        if (control.index < 2){
            changeFocus(control.index + 1, control.index)
            control.index += 1
            control.select(control.index)
        }
    },

    changeText(newText){
        this.element.innerText = newText;
    },

    enable : function(){
        this.element.disabled = false;
    },
    disable: function(){
        this.element.disabled = true;
    }
}

next.element.addEventListener("click", ()=>{
    next.onClick();
})

var prev = {
    element: document.getElementById("prevButton"),
    state  : false,
    onClick: function(){
        if (control.index > 0){
            changeFocus(control.index - 1, control.index)
            control.index -= 1
            control.select(control.index)
        }
    },

    enable : function(){
        this.element.disabled = false;
    },
    disable: function(){
        this.element.disabled = true;
    }
}


prev.element.addEventListener("click", ()=>{
    prev.onClick();
})

next.element.disabled = true
prev.element.disabled = true