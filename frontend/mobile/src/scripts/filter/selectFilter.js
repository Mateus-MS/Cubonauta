class FilterList{

    constructor(){
        this.filters = [];
    }

    //Prevent to add duplicant filters
    add(filter){
        for(let i = 0; i < this.filters.length; i++){
            if(this.filters[i] === filter){
                return
            }
        }
        this.filters.push(filter);
    }

    remove(filter){
        for(let i = 0; i < this.filters.length; i++){
            if(this.filters[i] === filter){
                this.filters.splice(i, 1);
                break;
            }
        }
    }

    merge(list){
        for(let i = 0; i < list.length; i++){
            this.add(list[i]);
        }
    }

}

var temp_filters = new FilterList();
var save_filters = new FilterList();

var strg_filters = "";

function selectFilter(element){

    if(element.classList.contains("filter_popup__holder__filters__filter--selected")){
        element.classList.remove("filter_popup__holder__filters__filter--selected")
    } else {
        element.classList.add("filter_popup__holder__filters__filter--selected")
    }

    addIfAlreadyOnRemove(temp_filters, element.innerText)

}

//Called when closed without apply the filters
function unSelectFilters(){
    let filters = getFiltersElements();

    for(let i = 0; i < temp_filters.filters.length; i++){
        for(let j = 0; j < filters.length; j++){
            if(temp_filters.filters[i] === filters[j].innerText){
                if(filters[j].classList.contains("filter_popup__holder__filters__filter--selected")){
                    filters[j].classList.remove("filter_popup__holder__filters__filter--selected")
                } else {
                    filters[j].classList.add("filter_popup__holder__filters__filter--selected")
                }
                break;
            }
        }
    }

    temp_filters.filters = [];

}

function applyFilters(){
    let filters = getFiltersElements();

    save_filters.filters = []

    for(let i = 0; i < filters.length; i++){
        if(filters[i].classList.contains("filter_popup__holder__filters__filter--selected")){
            save_filters.add(filters[i].innerText)
        }
    }

    temp_filters = new FilterList();

    updateFilterString()

    //Att elements on screen
    callNewCards()
    
    saveFilterStateInCache()
}

function addIfAlreadyOnRemove(list, filter){
    for(let i = 0; i < list.filters.length; i++){
        if(list.filters[i] === filter){
            list.remove(filter)
            return
        }
    }

    list.add(filter)
}

function unSelectAllFilters(){
    let filters = getFiltersElements();

    for(let i = 0; i < filters.length; i++){
        filters[i].classList.remove("filter_popup__holder__filters__filter--selected")
    }
}

function getFiltersElements(){
    let parent = document.getElementById("filter_popup__holder__filters");
    return parent.children;
}

function callNewCards(){
    formula_index = 0;

    let url = `https://cubonauta.com/components/case_card?case_id=${encodeURIComponent(formula_index)}&size=${encodeURIComponent(3)}&filters=${encodeURIComponent(strg_filters)}&category=${encodeURIComponent(category)}`

    htmx.ajax("GET", url, {
        target: "#case_holder__bag",
        swap  : "innerHTML" 
    })
}

function updateFilterString(){

    strg_filters = ""

    for(let i = 0; i < save_filters.filters.length; i++){
        strg_filters += save_filters.filters[i];
        if(i < save_filters.filters.length - 1){
            strg_filters += ":";
        }
    }
}