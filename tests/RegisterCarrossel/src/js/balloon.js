var balloon = {
    element: document.getElementById("balloon"),

    setErrorMessage: function(errorMessage){
        this.element.innerHTML = DOMPurify.sanitize(errorMessage)
    },

    setHeightPosition: function(height){
        this.element.style.top = height;
    },

    open: function(newMessage, newHeight){
        this.setErrorMessage(newMessage);
        this.setHeightPosition(newHeight);
        this.show();
    },

    show: function(){
        this.element.style.animationName = "none"
        
        //Delay the start of the animation to broswer re-trigger the animation
        setTimeout(()=>{
            this.element.style.animationName = "pop-in"
        }, 5)
    },
    hide: function(){
        this.element.style.animationName = "pop-out";
    }
}

balloon.element.addEventListener("click", ()=>{
    balloon.hide();
})