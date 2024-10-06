function closeCasePopup(event){
    if(event.target.id !== "case_popup"){
        return
    }

    let popup = document.getElementById("case_popup");

    popup.classList.remove("show")
    document.body.classList.remove("no-scroll")
}