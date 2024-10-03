function saveFilterStateInCache(){
    localStorage.setItem("filters_selected", JSON.stringify(save_filters));
}

function getFilterStateInCache(){
    return JSON.parse(localStorage.getItem("filters_selected"));
}

function createFilterStringFromCache(){
    let str = "";
    let state = getFilterStateInCache();

    for(let i = 0; i < state.filters.length; i++){
        str += state.filters[i];
        if(i < state.filters.length - 1){
            str += ":";
        }
    }

    return str

}

function restoreFilterStateInCache(){
    
    let state = getFilterStateInCache();
    let eleme = getFiltersElements();

    if(state.filters.length === 0){
        return
    }

    for(let i = 0; i < state.filters.length; i++){
        strg_filters += state.filters[i];
        if(i < state.filters.length - 1){
            strg_filters += ":";
        }
    }

    for(let i = 0; i < state.filters.length; i++){
        for(let j = 0; j < eleme.length; j++){
            if(state.filters[i] === eleme[j].textContent.replaceAll(" ", "")){
                eleme[j].classList.add("filter_popup__holder__filters__filter--selected")
            }
        }
    }

    return strg_filters
}

document.body.addEventListener("htmx:configRequest", function(e){

    //If the object is empty
    if(e.detail.parameters.filters == ""){
        e.detail.parameters = {case_id: formula_index, size: 6, filters: createFilterStringFromCache()}
    }

});