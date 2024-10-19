let button = document.getElementById("loginButton");

button.addEventListener("click", (e)=>{
    if(userInput.isValid !== true){
        balloon.open(userInput.isValid, userInput.ballonHeight)
        return
    } else {
        balloon.hide()
    }

    if(passInput.isValid !== true){
        balloon.open(passInput.isValid, passInput.ballonHeight)
        return
    } else {
        balloon.hide()
    }

    login()
})