class PassInput extends InputValidation {
    constructor(id){
        super(id);

        this.isValid = "Does not make any sense in a password beign empty don't you agree? 🤯"
    }

    validate(data){
        if(data === ""){
            this.isValid = "Does not make any sense in a password beign empty don't you agree? 🤯";
            return
        }

        if(data.length < 8){
            this.isValid = "A password should be at least <u>8 characters long</u>!🖐👌";
            return
        }

        if(!/[!@#\$%\^\&*\)\(+=._-]+/.test(data)){
            this.isValid = "Every password has at least one special character. 🫂";
            return
        }
        
        if(!/\d+/.test(data)){
            this.isValid = "Every pass contains <u>at least one number</u>. 1️⃣1️⃣0️⃣0️⃣1️⃣0️⃣";
            return
        }

        if(!/[A-Z]/.test(data)){
            this.isValid = "Every password contains <u>at least one capitalized letter</u>💸";
            return
        }

        this.isValid = true;
    }

    onEnterPress(e){
        if(e.key === "Enter"){
            if(this.isValid === true && userInput.isValid === true){
                login()
            }
        }
    }
}

const passInput = new PassInput("passField")