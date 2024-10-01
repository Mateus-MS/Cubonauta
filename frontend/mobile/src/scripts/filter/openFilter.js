function openFilter(){
    document.body.classList.add("no-scroll")

    //Show the filter popup
    let parent = document.getElementById("filter_popup");
    let holder = document.getElementById("filter_popup__holder")
    parent.classList.add("show");
    holder.classList.add("show");
}