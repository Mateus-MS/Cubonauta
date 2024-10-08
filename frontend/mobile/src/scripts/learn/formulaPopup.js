var formulaPopup = {
    open: function(element){
        let formHolder = element.children[1].children[1].children[0];
        let carrossel  = element.children[1].children[1].children[1];

        let selectedFormulaIndex;
        if(carrossel !== undefined){
            for(let i = 0; i < carrossel.children.length; i++){
                if(carrossel.children[i].classList.contains("case_card__case_container__holder__carrossel_holder__dot--active")){
                    selectedFormulaIndex = i;
                    break;
                }
            }
        } else {
            selectedFormulaIndex = 0
        }

        let selectedFormulaElement = formHolder.children[selectedFormulaIndex] 
        let formula = selectedFormulaElement.children[0].innerText

        let popup = document.getElementById("case_popup");

        this.slider.create(formula)

        popup.classList.add("show")
        document.body.classList.add("no-scroll")
    },

    close: function(event){
        if(event.target.id !== "case_popup"){
            return
        }
    
        let popup = document.getElementById("case_popup");
    
        popup.classList.remove("show")
        document.body.classList.remove("no-scroll")
    },
    
    slider: {
        create: function(formula){
            let holder = document.getElementById("case_popup__holder__display__slider");

            //If already has movements
            if(holder.children.length !== 0){
                //Remove all children from holder
                for(let i = holder.children.length - 1; i >= 0; i--){
                    holder.removeChild(holder.children[i])
                }
            }

            let movements = formula.split(" ")
            //Create all new childrens
            for(let i = 0; i < movements.length; i++){
                holder.appendChild(this.createMove(movements[i]))
            }
            holder.children[0].classList.add("selected")

            let letterSum   = 0;
            for(let i = 0; i < holder.children.length; i++){
                letterSum += this.getLetterSize(holder.children[i]);
            }
            letterSum += (holder.children.length - 1) * 10

            holder.style.left = `${this.getLetterOffSet(0)}px`
        },

        createMove: function(movement){
            let ele = document.createElement("span");
            ele.classList.add("case_popup__holder__display__slider__movement")
            ele.innerText = movement
            
            return ele
        },

        getLetterSize: function(letter){
            return letter.getBoundingClientRect().width
        },

        getLetterOffSet: function(index){
            let container      = document.getElementById("case_popup__holder__display")
            let containerWidth = this.getLetterSize(container)
        
            let letter      = document.getElementById("case_popup__holder__display__slider").children[index]
            let letterWidth = this.getLetterSize(letter)
        
            if(index === 0){
                return containerWidth / 2 - letterWidth / 2
            }
        
            let sum = containerWidth / 2
            for(let i = 0; i < index; i++){
                sum -= this.getLetterSize(container.children[0].children[i])
                sum -= 10
            }
            
            return sum -= letterWidth / 2
        }
    },
}