var filterState = false

function switchFilterState(event){

    if(event !== undefined && event.target.id !== "filter_popup"){
        return
    }

    if(filterState){
        unSelectFilters()
        closeFilter()
        filterState = !filterState
        return
    }

    openFilter()

    //switch
    filterState = !filterState

}