var filterElement = document.getElementById("filter_holder");

function showFilters(){
    filterElement.children[0].classList.add('filter--active')
    filterElement.children[1].style.animationName = "filter_blur_appearing"
}

function hideFilters(){
    filterElement.children[0].classList.remove('filter--active')
    filterElement.children[1].style.animationName = ""
}