var category = getCategoryInCache()

function saveCategoryInCache(){
    localStorage.setItem("category_selected", JSON.stringify(category));
}

function getCategoryInCache(){
    let cache = JSON.parse(localStorage.getItem("category_selected")); 
    return cache === null ? "F2L" : cache;
}

function restoreCategoryInCache(){
    let parent = document.getElementById("category")
    let childr = parent.children
    let cache = getCategoryInCache()

    for(let i = 0; i < childr.length; i++){
        if(childr[i].innerText === cache){
            if(childr[i].innerText === "F2L"){
                return
            }
            childr[0].classList.remove("category__option--active")
            childr[i].classList.add("category__option--active")
            return
        }
    }
}

document.body.addEventListener("htmx:configRequest", function(e){

    restoreCategoryInCache()

    //If the object is empty
    if(e.detail.parameters.category == ""){
        e.detail.parameters = {case_id: formula_index, size: 6, filters: createFilterStringFromCache(), category: getCategoryInCache()}
    }

});