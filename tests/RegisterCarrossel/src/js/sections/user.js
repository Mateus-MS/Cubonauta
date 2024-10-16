var user = {
    element : document.getElementById("userField"),
    erros   : new Map([
        [
            "tooShort", 
            `
            I swear that is for your safety. ✨✨<br>
            Your username <u>shold be atleast 8 characters long</u>. 🤨
            `
        ],
        [
            "whiteSpace", 
            `
            I know this is anoying, but you <u>can't put white spaces</u>. 🏳️
            `
        ],
        [
            "alreadyRegistered", 
            `
            Oops, seems like you late. ⏰ <br>
            This <strong>user</strong> has <u>already been taken</u>.
            `
        ],
        [
            "empty", 
            `
            Chose wisely, this is how every one will know you. <u>But can be changed later</u>. 🤠
            `
        ]
    ]),

    validate: function(data){
        if(data === ""){
            return this.erros.get("empty");
        }
        
        if(data.length < 8){
            return this.erros.get("tooShort");
        }

        if(/ /.test(data)){
            return this.erros.get("whiteSpace");
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
            let userTyped = user.element.children[1].value;
            
            let isValid = user.validate(userTyped);

            if(isValid === true){
                balloon.hide();
            } else {
                balloon.open(isValid, user.getBalloonPosition()); 
            }
        }
    },

    onType  : function(text){
        let isValid = user.validate(text);

        if(isValid === true){
            next.enable()
            control.complete[0] = true;
        } else {
            next.disable()
            control.complete[0] = false;
        }
    },

    moveTo  : {
        left  : function(){
            user.element.classList.add("left")
            user.element.classList.remove("right")
        },
        center: function(){
            user.element.classList.remove("left")
            user.element.classList.remove("right")
        },
        right : function(){
            user.element.classList.remove("left")
            user.element.classList.add("right")
        }
    }
}

balloon.setHeightPosition(user.getBalloonPosition());

user.element.addEventListener("focusin",  ()=>{
    user.focus.in();
})

user.element.addEventListener("focusout", ()=>{
    user.focus.out();
})

user.element.addEventListener("input", (e)=>{
    user.onType(e.target.value)
})

user.element.addEventListener("keydown", (e)=>{
    if (e.key === "Tab") {
        e.preventDefault();
      }

    if(e.key === "Enter"){
        let error = user.validate(e.target.value) 
        if(error === true){
            next.onClick();
            user.element.children[1].blur();
            setTimeout(()=>{
                pass.element.children[1].focus();
            }, 500)
            return
        }
        balloon.open(error, user.getBalloonPosition());
    }
})

user.element.children[1].value = ""