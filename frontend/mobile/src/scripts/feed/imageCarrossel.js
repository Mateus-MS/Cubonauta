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
    },
    comment: {
        switch: function(commentsHolder){
            feed.commentInput.switch();

            if(commentsHolder.classList.contains("compact")){
                this.openComments(commentsHolder);  
                this.hideShowMoreButton(commentsHolder);
                return
            }

            this.closeComments(commentsHolder);
            this.showShowMoreButton(commentsHolder);
        },
        openComments: function(holder){
            holder.classList.remove("compact")
            holder.parentNode.classList.remove("compact")    
        },
        closeComments: function(holder){
            holder.classList.add("compact")
            holder.parentNode.classList.add("compact")

            feed.commentInput.unMention()
        },
        hideShowMoreButton(holder){
            let hidden = holder.nextElementSibling
            let footer = holder.parentNode.previousElementSibling
            if(!this.hasMoreComments(footer)){
                hidden.classList.add("invisible")
            }
        },
        showShowMoreButton(holder){
            let hidden = holder.nextElementSibling
            hidden.classList.remove("invisible")
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
            let answersHolder = element.parentNode.parentNode.parentNode.nextElementSibling;

            if(answersHolder.classList.contains("hidden")){
                this.showAnswers(element, answersHolder);
                return
            }
            this.hideAnswers(answersHolder);
        },

        showAnswers: function(element, answersHolder){
            //Reveal all answers
            answersHolder.classList.remove("hidden")
            //Open the input
            feed.commentInput.show();

            //mention the comment
            let name = element.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("comment__header__body__name")[0].innerText.trim();
            feed.commentInput.mention(name);

            //remove the placeholder
            feed.commentInput.input.classList.add("empty")

            //When there is none answer left, hide the load more button
            if(!this.hasMoreAnswers(answersHolder.parentNode.children[1].children[0])){
                answersHolder.lastElementChild.classList.add("hidden")
            }
        },
        hideAnswers: function(answersHolder){
            feed.commentInput.unMention()
            answersHolder.classList.add("hidden")
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

        //Called when click at mention button
        mention: function(element){
            let name = element.parentNode.parentNode.getElementsByClassName("answer__body__name")[0].innerText
            feed.commentInput.mention(name)
            feed.commentInput.focus()
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
            
            this.input.classList.remove("empty")
        },

        focus: function(){
            this.input.focus()
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

//This is to fix:
//   When the browser show up in mobile, the screen scrolls down a little, this prevent it
let initialScrollY = window.scrollY;

window.addEventListener('focusin', () => {
    initialScrollY = window.scrollY;
});

window.addEventListener('focusout', () => {
    window.scrollTo(0, initialScrollY);
});