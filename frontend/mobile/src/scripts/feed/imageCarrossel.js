var feed = {
    comment: {
        switch: function(element){
            feed.commentInput.switch();

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
            feed.commentInput.switch();

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

                feed.commentInput.show();
                feed.commentInput.mention(element.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("comment__header__body__name")[0].innerText.trim());
                feed.commentInput.input.classList.add("empty")

                if(!this.hasMoreAnswers(parent.parentNode.children[1].children[0])){
                    console.log(parent.lastElementChild.classList.add("hidden"))
                }
                return
            }

            feed.commentInput.unMention()
            parent.classList.add("hidden")
            feed.commentInput.input.classList.remove("empty")
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
        },

        mention: function(element){
            let name = element.parentNode.parentNode.getElementsByClassName("answer__body__name")[0].innerText
            feed.commentInput.mention(name)
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
    },
    commentInput: {
        visible: false,

        parent: document.getElementById("comment_input"),
        input  : document.getElementById("comment_input").children[0],
        button : document.getElementById("comment_input").children[1],

        switch: function(){
            if(this.visible){
                document.getElementById("actionbar").classList.remove("hidden")
                this.hidden();
                return
            }
            document.getElementById("actionbar").classList.add("hidden")
            this.show();
        },
        
        show: function(){
            this.parent.classList.add("show")
            this.visible = true
        },
        
        hidden: function(){
            this.parent.classList.remove("show")
            this.visible = false
        },

        mention: function(user){
            let mentions = this.input.getElementsByClassName("comment__mention");
            if(mentions.length > 0){
                mentions[0].innerText = "@"+user
                return
            }

            let tag = document.createElement("span")
            tag.classList.add("comment__mention")
            tag.innerText = "@"+user

            this.input.appendChild(tag)
        },

        unMention: function(){
            let mentions = this.input.getElementsByClassName("comment__mention");
            for(let mention of mentions){
                this.input.removeChild(mention);
            }
        }
    }
}

feed.commentInput.parent.addEventListener('input', (e)=>{

    // e.data === "@"

    let element = feed.commentInput.input
    
    if(element.innerText.trim() === ""){
        element.classList.remove('empty')
    } else {
        element.classList.add('empty')
    }
})