function hidePass(input, icon){
    if(input.getAttribute("type") === "text"){
        input.setAttribute("type", "password")
        icon.classList.add("hidden")
    } else {
        input.setAttribute("type", "text")
        icon.classList.remove("hidden")
    }
}

function register(){
    console.log("Registering in cubonauta.com")
    console.log("Username : " + user.element.children[1].value);
    console.log("Password : " + pass.element.children[1].value);
    console.log("Expertise: " + document.querySelector('input[name="options"]:checked').value);
}