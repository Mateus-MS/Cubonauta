var sign = {
    nextButton: {
        element: document.getElementById("next_step"),
        select: function(){
            this.element.classList.remove("disabled")
        },
        unSelect: function(){
            this.element.classList.add("disabled")
        },

        next: function(){
            if(!sign.userSection.validated){
                return
            } 
            sign.userSection.userInput.parentNode.scrollTo({ left: 200 })
            sign.nextButton.unSelect()
            sign.prevButton.show()
        }
    },
    prevButton: {
        element: document.getElementById("prev_step"),
        show: function(){
            this.element.classList.remove("hidden")
        },
        hidden: function(){
            this.element.classList.add("hidden")
        },
        prev: function(){
            if(!sign.userSection.validated){
                return
            } 
            sign.userSection.userInput.parentNode.scrollTo({ left: 0 })
            sign.nextButton.select()
        } 
    },
    userSection: {
        userInput: document.getElementById("field__user"),
        erros    : new Map(),
        validated: false,
    },
    passSection: {
        passInput: document.getElementById("field__pass"),
        confInput: document.getElementById("field__pass--confirm"),

        erros    : new Map(),
        validated: false,
    },
    balloon: {
        element: document.getElementById("text_balloon"),
        open :      function(target){
            this.element.style.animationName = "none"
            void this.element.offsetWidth
            this.element.style.animationName = "pop-up"
            
            this.aim(target)
        },
        close:      function(){
            this.element.style.animationName = "pop-out"
        },
        changeText: function(message){
            //FATAL CRITIC, NOT ALLOWED IN PRODUCTION
            this.element.innerHTML = message;
        },
        aim:     function(target){
            target.appendChild(this.element)
        }
    },

    utils: {
        createElementWithText: function(elementType, text){
            let element = document.createElement(elementType);
            element.innerText = text;
            return element;
        }
    }
}

sign.userSection.erros.set("alreadyTaken", "Oops, seems like you late. ⏰ <br> This <u>user has already been taken</u>.");
sign.userSection.erros.set("whiteSpaces" , "I know this is anoying, but you <u>can't put white spaces</u>. 🏳️");
sign.userSection.erros.set("tooShort"    , "I swear that is for your safety. ✨✨ <br> Your username <u>shold be atleast 8 letters long</u>. 🤨");

sign.passSection.erros.set("noSpecialCharacter", "I know what is missing... something especial. 😍😍 <br> <u>Try use some especial caracter</u>.")
sign.passSection.erros.set("noNumber", "Numbers can be scarier 👻. <br> But here they just help to keep you more secure.")
sign.passSection.erros.set("tooShort", "How bigger, the better! 😏 <u>At least 8 characters long</u>.")

sign.passSection.erros.set("noMatch", "So strange... your user isn't dori and you already forgot your pass? 🤔")

//The first time when the user start typing the username
//Close the balloon
sign.userSection.userInput.addEventListener("focusin", ()=>{
    sign.balloon.close()
}, {once: true})

sign.userSection.userInput.addEventListener("focusout", (e)=>{
    let userTyped = sign.userSection.userInput.children[1].value;

    //Temporaly:
    //   To simulate when the user is already been taken
    //   It will simply randomnly decide if it is taken or not
    //   Of course it will be changed
    let res = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1) + Math.ceil(1));
    if(res === 1){
        sign.balloon.open(sign.userSection.userInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.userSection.erros.get("alreadyTaken"))
        sign.userSection.validated = false
        return
    }
    
    if(userTyped.includes(" ")){
        sign.balloon.open(sign.userSection.userInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.userSection.erros.get("whiteSpaces"))
        sign.userSection.validated = false
        return
    }
    
    if(userTyped.length < 8){
        sign.balloon.open(sign.userSection.userInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.userSection.erros.get("tooShort"))
        sign.userSection.validated = false
        return
    }
    
    sign.balloon.close();
    sign.nextButton.select()
    sign.userSection.validated = true
})

//Override anyscroll saved in cache
sign.userSection.userInput.parentNode.scrollTo({left: 0, behavior: "instant"})
//Override any text saved in cache
sign.userSection.userInput.children[1].value = "";

//#region PASSWORD
sign.passSection.passInput.addEventListener("focusout", (e)=>{
    let passTyped = sign.passSection.passInput.children[1].value;

    if(passTyped.length < 8){
        sign.balloon.open(sign.passSection.passInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.passSection.erros.get("tooShort"))
        sign.passSection.validated = false
        return
    }

    if(!/[!@#\$%\^\&*\)\(+=._-]+/.test(passTyped)){
        sign.balloon.open(sign.passSection.passInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.passSection.erros.get("noSpecialCharacter"))
        sign.passSection.validated = false
        return
    }

    if(!/\d+/.test(passTyped)){
        sign.balloon.open(sign.passSection.passInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.passSection.erros.get("noNumber"))
        sign.passSection.validated = false
        return
    }

    sign.passSection.confInput.classList.remove("hidden")
})

//Override any text saved in cache
sign.passSection.passInput.children[1].value = "";
//#endregion



//#region CONFIRM
sign.passSection.confInput.addEventListener("focusout", (e)=>{
    let passTyped = sign.passSection.passInput.children[1].value;
    let confTyped = sign.passSection.confInput.children[1].value;

    console.log(passTyped, confTyped)

    if(confTyped !== passTyped){
        sign.balloon.open(sign.passSection.confInput)
        sign.nextButton.unSelect()
        sign.balloon.changeText(sign.passSection.erros.get("noMatch"))
        sign.passSection.validated = false
        return
    }

    sign.passSection.validated = true;
})

//Override any text saved in cache
sign.passSection.confInput.children[1].value = "";
//#endregion