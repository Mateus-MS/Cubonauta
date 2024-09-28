function swipeCarrossel(element){
    let dotIndex = Math.round(element.scrollLeft / element.children[0].clientWidth)
    let dots     = element.nextElementSibling.children 
    let dot      = dots[dotIndex]

    if(dot.classList.contains("case_card__case_container__holder__carrossel_holder__dot--active")){
        return
    }

    //Iterate over all dots
    for(let d of dots){
        if(d.classList.contains("case_card__case_container__holder__carrossel_holder__dot--active")){
            d.classList.remove("case_card__case_container__holder__carrossel_holder__dot--active")
            break;
        }
    }

    dot.classList.add("case_card__case_container__holder__carrossel_holder__dot--active")

}