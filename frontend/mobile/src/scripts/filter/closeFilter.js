function closeFilter(){
    //Unlock the scroll
    document.body.classList.remove("no-scroll")

    //Hidden the filter popup
    let parent = document.getElementById("filter_popup");
    let holder = document.getElementById("filter_popup__holder");
    parent.classList.remove("show");
    holder.classList.remove("show");
}