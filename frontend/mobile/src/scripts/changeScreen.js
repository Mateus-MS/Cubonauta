function changeScreen(element){

    //Se o elemento clicado já estiver selecionado
    if(element.classList.contains("actionbar__icons--active")){
        return;
    }

    let parent = element.parentNode;
    let childrens = parent.children;

    //Remove a classe de destaque dos elementos da lista de filhos
    for(let children of childrens){
        if(children.classList.contains("actionbar__icons--active")){
            children.classList.remove("actionbar__icons--active")
        }
    }

    //Adiciona destaque no elemento clicado
    element.classList.add("actionbar__icons--active")

    console.log("Trocando a tela")

}

function changeToScreen(screenName){

    let selectedElement = document.getElementById(screenName) 

    let parent = selectedElement.parentNode
    let childrens = parent.children

    for(let children of childrens){
        if(children.classList.contains("actionbar__icons--active")){
            children.classList.remove("actionbar__icons--active")
        }
    }

    selectedElement.classList.add("actionbar__icons--active")

}