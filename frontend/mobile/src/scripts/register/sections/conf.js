var conf = {
    element : document.getElementById("confField"),
    erros   : new Map([
        [
            "noMatch", 
            `
            So strange... your user isn't dori and you already forgot your pass? 🤔
            `
        ],
        [
            "passChanged", 
            `
            You changed your password. but did'nt changed the confirmation.
            `
        ]
    ]),

    validate: function(data){
        if(data !== pass.element.children[1].value){
            return this.erros.get("noMatch");
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
            let passTyped = conf.element.children[1].value;
            
            let isValid   = conf.validate(passTyped);

            if(isValid === true){
                balloon.hide();
            } else {
                balloon.open(isValid, conf.getBalloonPosition());
            }
        
        }
    },

    onType  : function(text){
        let isValid = conf.validate(text);

        if(isValid === true){
            next.enable()
            control.complete[1] = true;
            setAsComplete(1);
        } else {
            next.disable()
            control.complete[1] = false;
            setAsUncomplete(1);
        }
    },

    moveTo  : {
        left  : function(){
            conf.element.classList.add("left")
            conf.element.classList.remove("right")
        },
        center: function(){
            conf.element.classList.remove("left")
            conf.element.classList.remove("right")
        },
        right : function(){
            conf.element.classList.remove("left")
            conf.element.classList.add("right")
        }
    },

    show: function(){
        this.element.classList.remove("hidden")
    },
    hide: function(){
        this.element.classList.add("hidden")
    }
}

conf.element.addEventListener("focusin",  ()=>{
    conf.focus.in();
})

conf.element.addEventListener("focusout", ()=>{
    conf.focus.out();
})

conf.element.addEventListener("input", (e)=>{
    conf.onType(e.target.value)
})

conf.element.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        let error = pass.validate(e.target.value); 
        if(error === true){
            conf.element.children[1].blur();
            next.onClick();
            return
        }
        balloon.open(error, conf.getBalloonPosition());
    }
})

conf.element.children[1].value = ""