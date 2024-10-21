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
    let formData = new FormData();

    formData.append('user', user.element.children[1].value);
    formData.append('pass', pass.element.children[1].value);

    fetch('https://cubonauta.com/user/register', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if(response.status === 200) {

            fetch('https://cubonauta.com/user/login', {
                method: 'POST',
                body: formData,
            }).then( response => {
                if(response.status === 200){
                    window.location.href = 'https://cubonauta.com'
                }
            })

        } else {
            alert("Error ao registrar")
        }
    })
}