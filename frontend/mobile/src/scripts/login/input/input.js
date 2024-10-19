class InputValidation{
    constructor(id){
        this.element = document.getElementById(id);
        this.#initiateListeners()
        this.#cleanCache();
    }

    get ballonHeight(){
        return this.element.getBoundingClientRect().bottom + "px";
    }

    #initiateListeners(){
        this.element.addEventListener("input", (e)=>{
            this.onType(e)
        })

        this.element.addEventListener("keydown", (e)=>{
            this.onEnterPress(e);
        })

        this.element.addEventListener("focusin", (e)=>{
            this.focusIn();
        })
    }

    #cleanCache(){
        this.element.getElementsByTagName("input")[0].value = ""
    }

    onType(data){
        this.validate(data.target.value);
    }

    validate(){
        throw new Error("Must implement validate method.");
    }
    
    onEnterPress(){
        throw new Error("Must implement onEnterPress method.");
    }

    focusIn(){
        if(balloon.element.style.animationName !== ""){
            balloon.hide();
        }
    }
}