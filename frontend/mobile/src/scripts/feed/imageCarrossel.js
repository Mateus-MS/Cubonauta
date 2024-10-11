var feed = {
    comment: {
        switch: function(element){
            let parent = element.parentNode.parentNode.nextElementSibling

            if(parent.classList.contains("compact")){
                parent.classList.remove("compact")
                parent.getElementsByClassName("text_post__comments__holder")[0].classList.remove("compact")    

                if(!this.hasMoreComments(parent.parentNode.children[2])){
                    parent.children[1].classList.add("invisible")
                }
                return
            }

            parent.classList.add("compact")
            parent.getElementsByClassName("text_post__comments__holder")[0].classList.add("compact")
            parent.children[1].classList.remove("invisible")
        },
        open: function(element){
            let parent = element.parentNode.parentNode 
            parent.classList.remove("compact")
            parent.getElementsByClassName("text_post__comments__holder")[0].classList.remove("compact")

            if(!this.hasMoreComments(parent.parentNode.children[2])){
                parent.children[1].classList.add("invisible")
            }
        },
        
        //Check if there is more comments on the server that is not showing on the page
        //It temporaly will:
        //  just get the number inside the comment button, since there show the ammount of comments when the post was loaded
        //  and compare with the ammount of comments loaded
        //Replace with:
        //  an request to an endpoint that respond with the ammount of comments
        //  and compare with the ammount of comments loaded
        hasMoreComments: function(footer){
            let totalComments  = footer.children[1].lastElementChild.children[1].innerText 
            let loadedComments = footer.nextElementSibling.children.length

            return totalComments - loadedComments > 0
        }
    },
    answer: {
        switch: function(element){
            let parent = element.parentNode.parentNode.parentNode.nextElementSibling;

            if(parent.classList.contains("hidden")){
                parent.classList.remove("hidden")

                if(!this.hasMoreAnswers(parent.parentNode.children[1].children[0])){
                    console.log(parent.lastElementChild.classList.add("hidden"))
                }
                return
            }

            parent.classList.add("hidden")
        },

        //Check if there is more answers on the server that is not showing on the page
        //It temporaly will:
        //  just get the number inside the comment button, since there show the ammount of answers when the comment was loaded
        //  and compare with the ammount of answers loaded
        //Replace with:
        //  an request to an endpoint that respond with the ammount of answers
        //  and compare with the ammount of answers loaded
        hasMoreAnswers: function(footer){
            let totalComments  = footer.children[1].lastElementChild.children[1].innerText 
            let loadedComments = footer.parentNode.nextElementSibling.children.length
            return totalComments - loadedComments > 0
        }
    },
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

function testeee(){
    console.log("aaadsadasdas")
}