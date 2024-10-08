var filters = {
    temp_filters: [],
    save_filters: [],

    strg_filters: "",
    
    filter_state: false,

    open: function(){
        document.body.classList.add("no-scroll")
        let parent = document.getElementById("filter_popup");
        let holder = document.getElementById("filter_popup__holder")
        parent.classList.add("show");
        holder.classList.add("show");
    },

    close: function(){
        //Unlock the scroll
        document.body.classList.remove("no-scroll")

        //Hidden the filter popup
        let parent = document.getElementById("filter_popup");
        let holder = document.getElementById("filter_popup__holder");
        parent.classList.remove("show");
        holder.classList.remove("show");
    },

    switch: function(event){
        if(event !== undefined && event.target.id !== "filter_popup"){
            return
        }
    
        if(this.filter_state){
            filters.unSelectUnsavedFilters()
            filters.close()
            this.filter_state = !this.filter_state
            return
        }
    
        filters.open()
        this.filter_state = !this.filter_state
    },

    //#region LIST RELATED FUNCTIONS
    addToList: function(list, filter){
        for(let i = 0; i < list.length; i++){
            if(list[i] === filter){
                return
            }
        }
        list.push(filter);
    },

    removeFromList: function(list, filter){
        for(let i = 0; i < list.length; i++){
            if(list[i] === filter){
                list.splice(i, 1);
                break;
            }
        }
    },

    mergeLists: function(listA, listB){
        for(let i = 0; i < listA.length; i++){
            this.addToList(listB, listA[i]);
        }
    },
    //#endregion

    select: function(element){
        if(element.classList.contains("filter_popup__holder__filters__filter--selected")){
            element.classList.remove("filter_popup__holder__filters__filter--selected")
        } else {
            element.classList.add("filter_popup__holder__filters__filter--selected")
        }
    
        this.addIfAlreadyInRemove(this.temp_filters, element.innerText)
    },
    
    applyFilters: function(){
        let elements = this.getFiltersElement();

        this.save_filters = []

        for(let i = 0; i < elements.length; i++){
            if(elements[i].classList.contains("filter_popup__holder__filters__filter--selected")){
                this.addToList(this.save_filters, elements[i].innerText)
            }
        }

        this.temp_filters = [];

        this.updateFiltersString()
        this.callNewCards()
        this.cache.save()

        let after = document.getElementById("navbar__left__icon__filter")
        if(filters.save_filters.length > 0){
            after.setAttribute("data-filter-visible", "true")
        } else {
            after.setAttribute("data-filter-visible", "false")
        }
        after.setAttribute("data-filter-count", `${filters.save_filters.length}`)
    },

    callNewCards: function(){
        formula_index = 0;

        let url = `https://cubonauta.com/components/case_card?case_id=${encodeURIComponent(formula_index)}&size=${encodeURIComponent(3)}&filters=${encodeURIComponent(this.strg_filters)}&category=${encodeURIComponent(category.cache.value)}`

        htmx.ajax("GET", url, {
            target: "#case_holder__bag",
            swap  : "innerHTML" 
        })
    },

    unSelectUnsavedFilters: function(){
        let filters = document.getElementById("filter_popup__holder__filters").children;

        for(let i = 0; i < this.temp_filters.length; i++){
            for(let j = 0; j < filters.length; j++){
                if(this.temp_filters[i] === filters[j].innerText){
                    if(filters[j].classList.contains("filter_popup__holder__filters__filter--selected")){
                        filters[j].classList.remove("filter_popup__holder__filters__filter--selected")
                    } else {
                        filters[j].classList.add("filter_popup__holder__filters__filter--selected")
                    }
                    break;
                }
            }
        }

        this.temp_filters = [];
    },

    unSelectAllFilters: function(){
        let filters = document.getElementById("filter_popup__holder__filters").children;

        for(let i = 0; i < filters.length; i++){
            filters[i].classList.remove("filter_popup__holder__filters__filter--selected")
        }
    },

    addIfAlreadyInRemove: function(list, filter){
        for(let i = 0; i < list.length; i++){
            if(list[i] === filter){
                this.removeFromList(list, filter);
                return
            }
        }
    
        this.addToList(list, filter);
    },

    updateFiltersString: function(){
        this.strg_filters = ""

        for(let i = 0; i < this.save_filters.length; i++){
            this.strg_filters += this.save_filters[i];
            if(i < this.save_filters.length - 1){
                this.strg_filters += ":";
            }
        }
    },

    getFiltersElement: function(){
        return document.getElementById("filter_popup__holder__filters").children;
    },

    cache: {
        save: function(){
            localStorage.setItem("filters_selected", JSON.stringify(filters.save_filters));
        },

        getObject: function(){
            return JSON.parse(localStorage.getItem("filters_selected"));
        },

        getString: function(){
            let str = "";
            let state = filters.cache.get();

            for(let i = 0; i < state.length; i++){
                str += state[i];
                if(i < state.length - 1){
                    str += ":";
                }
            }

            return str
        },

        restore: function(){
            let state = this.getObject();
            let eleme = document.getElementById("filter_popup__holder__filters").children;

            if(state.length === 0){
                return
            }

            filters.strg_filters = ""
            for(let i = 0; i < state.length; i++){
                filters.strg_filters += state[i];
                if(i < state.length - 1){
                    filters.strg_filters += ":";
                }
            }

            for(let i = 0; i < state.length; i++){
                for(let j = 0; j < eleme.length; j++){
                    if(state[i] === eleme[j].textContent.replaceAll(" ", "")){
                        eleme[j].classList.add("filter_popup__holder__filters__filter--selected")
                    }
                }
            }

            return filters.strg_filters
        }
    }
}

document.body.addEventListener("htmx:configRequest", function(e){
    if(e.detail.parameters.filters == ""){
        e.detail.parameters = {case_id: formula_index, size: 6, filters: filters.cache.getString(), category: category.cache.get()}
    }
}, {once: true});