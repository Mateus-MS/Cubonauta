function selectFilter(element){
    if(element.classList.contains("filter_popup__holder__filters__filter--selected")){
        element.classList.remove("filter_popup__holder__filters__filter--selected")
    } else {
        element.classList.add("filter_popup__holder__filters__filter--selected")
    }
}