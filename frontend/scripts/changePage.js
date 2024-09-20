function switchPages(element){

    //Se o elemento clicado já estiver selecionado
    if(element.classList.contains("bolder")){
        return;
    }

    let parent = element.parentNode;
    let childrens = parent.children;

    //Remove a classe de destaque dos elementos da lista de filhos
    for(let children of childrens){
        if(children.classList.contains("bolder")){
            children.classList.remove("bolder")
        }
    }

    //Adiciona destaque no elemento clicado
    element.classList.add("bolder")

    console.log("Trocando a página")

}