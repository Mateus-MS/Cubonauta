var feed = {
    post: {
        swipe: function(element){
            if(element.nextElementSibling == null){
                return
            }
        
            let dotIndex = Math.round(element.scrollLeft / element.children[0].clientWidth)
            let dots     = element.nextElementSibling.children 
            let dot      = dots[dotIndex]
        
            if(dot.classList.contains("--selected")){
                return
            }
        
            //Iterate over all dots
            for(let d of dots){
                d.classList.remove("--selected")
            }
        
            dot.classList.add("--selected")
        }
    }
}