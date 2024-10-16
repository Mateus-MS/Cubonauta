var pass = {
    element : document.getElementById("passField"),
    erros   : new Map([
        [
            "tooShort", 
            `
            How bigger, the better! 😏 <br> 
            <u>At least 8 characters long</u>.
            `
        ],
        [
            "noSpecialCharacter", 
            `
            I know what is missing... <br> 
            something especial! 😍 <br>
            Try use some <u>especial character</u>.
            `
        ],
        [
            "noNumber", 
            `
            Numbers can be scarier 👻. <br>
            But here they just help to keep you more secure.
            `
        ],
        [
            "noCaptalized", 
            `
            Try use at least <u>capitalized letter</u>. 💸
            `
        ]
    ]),

    validate: function(data){
        if(data.length < 8){
            return this.erros.get("tooShort");
        }

        if(!/[!@#\$%\^\&*\)\(+=._-]+/.test(data)){
            return this.erros.get("noSpecialCharacter");
        }

        if(!/\d+/.test(data)){
            return this.erros.get("noNumber");
        }

        if(!/[A-Z]/.test(data)){
            return this.erros.get("noCaptalized");
        }


        if(conf.element.children[1].value !== "" && conf.element.children[1].value !== data){
            return conf.erros.get("passChanged");   
        }


        return true;
    },

    getBalloonPosition: function(){
        return this.element.getBoundingClientRect().bottom + "px";
    },

    focus   : {
        in : function(){
            balloon.hide();
        },

        out: function(){
            let passTyped = pass.element.children[1].value;

            let isValid   = pass.validate(passTyped);

            if(isValid === true){
                conf.show()
                balloon.hide()
            } else {
                balloon.open(isValid, user.getBalloonPosition());
            }
        }
    },

    onType  : function(text){
        let isValid = pass.validate(text);

        if(isValid === true){
            conf.show()
            balloon.hide()
        } else {
            next.disable()
            control.complete[1] = false;
        }
    },

    moveTo  : {
        left  : function(){
            pass.element.classList.add("left")
            pass.element.classList.remove("right")
        },
        center: function(){
            pass.element.classList.remove("left")
            pass.element.classList.remove("right")
        },
        right : function(){
            pass.element.classList.remove("left")
            pass.element.classList.add("right")
        }
    }
}



pass.element.addEventListener("focusin",  ()=>{
    pass.focus.in();
})

pass.element.addEventListener("focusout", ()=>{
    pass.focus.out();
})

pass.element.addEventListener("input", (e)=>{
    pass.onType(e.target.value)
})

pass.element.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        let error = pass.validate(e.target.value); 
        if(error === true){
            pass.element.children[1].blur();
            setTimeout(()=>{
                conf.element.children[1].focus();
            }, 300)
            return
        }
        balloon.open(error, pass.getBalloonPosition())
    }
})

pass.element.children[1].value = ""