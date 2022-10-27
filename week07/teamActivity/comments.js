
export default class Comments {
    constructor(parentId, type) {
        this.type = type
        this.parent = document.getElementById(parentId);
        this.commentList = fromLS(this.type) || [];
    }

    getAllComments() {
        return this.commentList;
    }

    getOneComment(hikeName) {
        return this.getAllComments().find(hike => hike.name === hikeName);
    }
    
    addComment(hikeName, comment) {
        const newComment = {
            name: hikeName,
            date: new Date(),
            comment: comment
          };

        this.commentList.push(newComment);
        toLS(this.type, this.commentList)
    }

    filterComments(hikeName) {        
        return this.getAllComments().filter(comment => comment.name === hikeName);
    }

    showAllComments() {
        renderAllComments(this.parent, this.getAllComments());
    }
        
    showOneComment(hike) {
        
        renderAllComments(this.parent, this.filterComments(hike))

        const form = renderForm()
        this.parent.appendChild(form);

        this.formEvent(hike)
    }

    formEvent(hike) {

        document.querySelector("#commentButton").addEventListener ("touchend", () => {
            const content = document.querySelector("#content").value
            this.addComment(hike, content);
            this.showOneComment(hike);
        })
    }
}

function renderAllComments(parent, comments) {
    parent.innerHTML = "";
    comments.forEach(comment => {
      parent.appendChild(renderOneComment(comment.name, comment.comment));
    });
  }
  

function renderOneComment(hike, comment) {
    const test = document.createElement("div");
    test.innerHTML = 
        `<h3>${hike}</h3>
        <p>${comment}</p>`;

    return test;
}

function renderForm() {
    const commentForm = document.createElement("form");
    commentForm.innerHTML =
        `<label for="content">Add comment: </label>
        <textarea id="content" name="commentContent"></textarea>
        <button id="commentButton">Add Comment</button> `

    return commentForm
}

function toLS(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

function fromLS(key) {
    return JSON.parse(window.localStorage.getItem(key));
}