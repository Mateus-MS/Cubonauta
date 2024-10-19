class UserInput extends InputValidation {
    constructor(id){
        super(id);

        this.isValid = "Does not make any sense in a username beign empty don't you agree? 🤯";
    }

    validate(data){
        if(data === ""){
            this.isValid = "Usernames <u>can't have white spaces</u> 👩🏻‍🚀. Check for any typo ✍️.";
            return
        }

        if(data.length < 8){
            this.isValid = "Usernames <u>can't have less than 8 characters</u> 🤏. Don't you forget something?👀.";
            return
        }

        if(/[!@#\$%\^\&*\)\(+=]+/.test(data)){
            this.isValid = "Not everything is special 🥲. Usernames <u>Can't have some special characters</u> 😮‍💨.";
            return
        }

        this.isValid = true;
    }

    onEnterPress(e){
        if(e.key === "Enter"){
            if(this.isValid === true){
                passInput.element.children[1].focus()
            }
        }
    }
}

const userInput = new UserInput("userField")