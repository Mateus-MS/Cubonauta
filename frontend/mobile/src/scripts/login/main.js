function hidePass(input, icon){
    if(input.getAttribute("type") === "text"){
        input.setAttribute("type", "password")
        icon.classList.add("hidden")
    } else {
        input.setAttribute("type", "text")
        icon.classList.remove("hidden")
    }
}

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

function login(){
    console.log("Logando em cubonauta.com")
    console.log("User: " + userInput.element.children[1].value)
    console.log("Pass: " + passInput.element.children[1].value)

    let formData = new FormData();

    formData.append('user', userInput.element.children[1].value);
    formData.append('pass', passInput.element.children[1].value);

    fetch('https://cubonauta.com/user/login', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if(response.status === 200) {
            window.location.href = 'https://cubonauta.com'
        } else {
            alert("Error ao logar")
        }
    })
}