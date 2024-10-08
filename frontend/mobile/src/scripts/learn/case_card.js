var caseCard = {
    swipe: function(element){
        if(element.nextElementSibling == null){
            return
        }
    
        let dotIndex = Math.round(element.scrollLeft / element.children[0].clientWidth)
        let dots     = element.nextElementSibling.children 
        let dot      = dots[dotIndex]
    
        if(dot.classList.contains("case_card__case_container__holder__carrossel_holder__dot--active")){
            return
        }
    
        //Iterate over all dots
        for(let d of dots){
            d.classList.remove("case_card__case_container__holder__carrossel_holder__dot--active")
        }
    
        dot.classList.add("case_card__case_container__holder__carrossel_holder__dot--active")
    },

    actions: {
        favorite: function(){
            console.log("Marcando como favorita")
        },

        learn: function(){
            console.log("Marcando como aprendida")
        }
    }
}