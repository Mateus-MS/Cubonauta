var sign = {
    actual: 0,
    steps : [
        false,
        false,
        false
    ],
    nextButton: {
        element: document.getElementById("next_step"),
        select: function(){
            this.element.classList.remove("disabled")
        },
        unSelect: function(){
            this.element.classList.add("disabled")
        },

        next: function(){
            if(sign.actual < 3){
                sign.actual += 1
            }
            sign.userSection.userInput.parentNode.scrollTo({ left: 300 * sign.actual - 2})
            if(!sign.steps[sign.actual]){
                sign.nextButton.unSelect()
            }
            
            if(sign.actual > 0){
                sign.prevButton.show()
            }

            sign.stepDisplay.select(sign.actual);
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
            if(sign.actual > 0){
                sign.actual -= 1
            }

            sign.userSection.userInput.parentNode.scrollTo({ left: 0 })
            
            if(sign.steps[sign.actual]){
                sign.nextButton.select()
            }

            if(sign.actual > 0){
                sign.prevButton.show()
            }
        } 
    },
    userSection: {
        userInput: document.getElementById("field__user"),
        erros    : new Map(),
        validated: false,

        getBottomPixel: function(){
            return this.userInput.getBoundingClientRect().bottom;
        }
    },
    passSection: {
        password: {
            element: document.getElementById("field__pass"),
            erros    : new Map(),

            getBottomPixel: function(){
                return this.element.getBoundingClientRect().bottom;
            }
        },
        confirmation: {
            element  : document.getElementById("field__pass--confirm"),
            erros    : new Map(),

            reveal   : function(){
                this.element.classList.remove("hidden");
            },
            getBottomPixel: function(){
                return this.element.getBoundingClientRect().bottom;
            }
        },
        validated: false,
    },
    balloon: {
        element: document.getElementById("text_balloon"),

        target: function(height, message){
            this.open();
            this.changeHeightPosition(height);
            this.changeMessage(message);

            sign.nextButton.unSelect()
        },

        open :      function(){
            this.element.style.animationName = "none"
            void this.element.offsetWidth
            this.element.style.animationName = "pop-up"
        },
        close:      function(){
            this.element.style.animationName = "pop-out"
        },
        changeHeightPosition: function(height){
            this.element.style.top = height + "px";
        },
        changeMessage: function(message){
            //FATAL CRITIC, NOT ALLOWED IN PRODUCTION
            this.element.innerHTML = message;
        }
    },
    stepDisplay: {
        element: document.getElementById("steps_display"),

        select: function(index){
            let value;

            switch(index){
                case 0: 
                    value = "15%";
                    break
                case 1:
                    value = "50%";
                    break
                case 2:
                    value = "85%";
                    break
                default:
                    console.log("INDEX INVALID")
            }

            this.element.style.setProperty("--percentage", value)
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

sign.passSection.password.erros.set("noSpecialCharacter", "I know what is missing... something especial. 😍😍 <br> <u>Try use some especial caracter</u>. <br> Like !@#$%¨&*,.")
sign.passSection.password.erros.set("noNumber", "Numbers can be scarier 👻. <br> But here they just help to keep you more secure.")
sign.passSection.password.erros.set("tooShort", "How bigger, the better! 😏 <u>At least 8 characters long</u>.")

sign.passSection.confirmation.erros.set("noMatch", "So strange... your user isn't dori and you already forgot your pass? 🤔")
sign.passSection.confirmation.erros.set("changeWithoutConf", "You changed your password. but did'nt changed the confirmation")

//Align the pre-leaded balloon
sign.balloon.changeHeightPosition(sign.userSection.userInput.getBoundingClientRect().bottom)
//Override anyscroll saved in cache
sign.userSection.userInput.parentNode.scrollTo({left: 0, behavior: "instant"})
//Override any text saved in cache
sign.userSection.userInput.children[1].value = "";
//Override any text saved in cache
sign.passSection.password.element.children[1].value = "";
//Override any text saved in cache
sign.passSection.confirmation.element.children[1].value = "";

//The first time when the user start typing the username
//Close the balloon
sign.userSection.userInput.addEventListener("focusin", ()=>{
    sign.balloon.close()
}, {once: true})

//#region USER

sign.userSection.userInput.addEventListener("focusout", (e)=>{
    let userTyped = sign.userSection.userInput.children[1].value;
    
    sign.steps[sign.actual] = false
    
    if(userTyped.includes(" ")){
        sign.balloon.target(sign.userSection.getBottomPixel(), sign.userSection.erros.get("whiteSpaces"))
        return
    }
    
    if(userTyped.length < 8){
        sign.balloon.target(sign.userSection.getBottomPixel(), sign.userSection.erros.get("tooShort"))
        return
    }

    //Temporaly:
    //   To simulate when the user is already been taken
    //   It will simply randomnly decide if it is taken or not
    //   Of course it will be changed
    let res = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1) + Math.ceil(1));
    if(res === 1){
        sign.balloon.target(sign.userSection.getBottomPixel(), sign.userSection.erros.get("alreadyTaken"))
        return
    }
    
    sign.nextButton.select();
    sign.steps[sign.actual] = true;
    sign.balloon.close();
})

//#endregion

//#region PASSWORD
sign.passSection.password.element.addEventListener("focusout", (e)=>{
    let passTyped = sign.passSection.password.element.children[1].value;

    sign.steps[sign.actual] = false;
    
    if(passTyped.length < 8){
        sign.balloon.target(sign.passSection.password.getBottomPixel(), sign.passSection.password.erros.get("tooShort"))
        return
    }
    
    if(!/[!@#\$%\^\&*\)\(+=._-]+/.test(passTyped)){
        sign.balloon.target(sign.passSection.password.getBottomPixel(), sign.passSection.password.erros.get("noSpecialCharacter"))
        return
    }
    
    if(!/\d+/.test(passTyped)){
        sign.balloon.target(sign.passSection.password.getBottomPixel(), sign.passSection.password.erros.get("noNumber"))
        return
    }
    
    sign.balloon.close();
    sign.passSection.confirmation.reveal();

    if(sign.passSection.confirmation.element.children[1].value !== ""){
        let passTyped = sign.passSection.password.element.children[1].value;
        let confTyped = sign.passSection.confirmation.element.children[1].value;
        
        sign.steps[sign.actual] = false;

        if(confTyped !== passTyped){
            sign.balloon.target(sign.passSection.confirmation.getBottomPixel(), sign.passSection.confirmation.erros.get("changeWithoutConf"))
            return
        }

        sign.steps[sign.actual] = true
        sign.nextButton.select()
        sign.balloon.close();
    }
})

//#endregion

//#region CONFIRM
sign.passSection.confirmation.element.addEventListener("focusout", (e)=>{
    let passTyped = sign.passSection.password.element.children[1].value;
    let confTyped = sign.passSection.confirmation.element.children[1].value;

    sign.balloon.changeHeightPosition(sign.passSection.confirmation.getBottomPixel())
    sign.nextButton.unSelect()
    sign.steps[sign.actual] = false;
    
    if(confTyped !== passTyped){
        sign.balloon.open()
        sign.balloon.changeMessage(sign.passSection.confirmation.erros.get("noMatch"))
        return
    }

    sign.steps[sign.actual] = true
    sign.nextButton.select()
    sign.balloon.close();
})

//#endregion
