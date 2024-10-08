var category = {
    switch: function(element){

        //Se o elemento clicado já estiver selecionado
        if(element.classList.contains("category__option--active")){
            return;
        }

        let parent = element.parentNode;
        let childrens = parent.children;

        //Remove a classe de destaque dos elementos da lista de filhos
        for(let children of childrens){
            if(children.classList.contains("category__option--active")){
                children.classList.remove("category__option--active")
            }
        }

        //Adiciona destaque no elemento clicado
        element.classList.add("category__option--active")

        category.cache.value = element.innerText;
        category.cache.save()

        filters.callNewCards()
    },

    cache: {
        save: function(){
            localStorage.setItem("category_selected", JSON.stringify(category.cache.value));
        },

        get: function(){
            let cache = JSON.parse(localStorage.getItem("category_selected")); 
            if(cache === null){
                document.getElementById("category").children[0].classList.add("category__option--active")
                return "F2L"
            }
            return cache;
        },

        restore: function(){
            let parent = document.getElementById("category")
            let childr = parent.children
            let cache  = this.get()

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
    }
}
category.cache.value = category.cache.get()

document.body.addEventListener("htmx:configRequest", function(e){
    category.cache.restore()

    //If the object is empty
    if(e.detail.parameters.category == ""){
        e.detail.parameters = {case_id: formula_index, size: 6, filters: filters.cache.getString(), category: category.cache.get()}
    }
}, {once: true});