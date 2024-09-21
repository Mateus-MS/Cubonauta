function changeCategory(element){

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

    console.log("Trocando a categoria")

}