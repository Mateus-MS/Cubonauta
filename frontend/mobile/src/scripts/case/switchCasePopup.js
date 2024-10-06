function switchCasePopup(element){
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

    createFormulaSlider(formula)

    popup.classList.add("show")
    document.body.classList.add("no-scroll")
}