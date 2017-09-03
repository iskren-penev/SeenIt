handlers.catalog = function(context) {
    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
    context.username = sessionStorage.getItem('username');

    postService.loadPosts().then(function(postsData) {
        let rankCounter = 1;
        postsData.forEach(p => {
            if (p.author === context.username) {
                p.isAuthor = true;
            }
            p.rank = rankCounter;
            rankCounter++;
            p.date = postService.calcTime(p._kmd.ect)
        })
        context.posts = postsData
        context.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            menu: '../templates/common/menu.hbs',
            post: '../templates/catalog/post.hbs'
        }).then(function() {
            this.partial('../templates/catalog/catalog.hbs')
        })
    }).catch(authenticationService.handleError)
}

handlers.myPosts = function(context) {
    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
    context.username = sessionStorage.getItem('username');

    postService.loadPosts(context.username).then(function(postsData) {
        let rankCounter = 1;
        postsData.forEach(p => {
            if (p.author === context.username) {
                p.isAuthor = true;
            }
            p.rank = rankCounter;
            rankCounter++;
            p.date = postService.calcTime(p._kmd.ect)
        })
        context.posts = postsData
        context.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            menu: '../templates/common/menu.hbs',
            post: '../templates/catalog/post.hbs'
        }).then(function() {
            this.partial('../templates/myposts/mypostsPage.hbs')
        })
    }).catch(authenticationService.handleError)
}

handlers.createPostGet = function(context) {
    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        menu: '../templates/common/menu.hbs',
        submitForm: '../templates/submit/submitForm.hbs'
    }).then(function() {
        this.partial('../templates/submit/submitPage.hbs')
    })
}

handlers.createPostPost = function(context) {
    let url = context.params.url;
    if (url === '') {
        notificationService.showError('The url cannot be empty');
        return;
    } else if (!url.startsWith('http')) {
        notificationService.showError('The url must start with http');
        return;
    }

    let title = context.params.title;
    if (title === '') {
        notificationService.showError('The title cannot be empty');
        return;
    }
    let author = sessionStorage.getItem('username');
    let description = context.params.comment;
    let imageUrl = context.params.image;

    postService.createPost(url, title, author, imageUrl, description)
        .then(function() {
            context.redirect('#/catalog')
        })
        .catch(authenticationService.handleError)
}

handlers.editPostGet = function(context) {
    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
    context.username = sessionStorage.getItem('username');
    let id = context.params.id.substr(1);

    postService.getPost(id).then(function(postInfo) {
        context.postId = postInfo._id;
        context.title = postInfo.title;
        context.url = postInfo.url;
        context.imageUrl = postInfo.imageUrl;
        context.description = postInfo.description;

        context.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            menu: '../templates/common/menu.hbs',
            editForm: '../templates/edit/editForm.hbs'
        }).then(function() {
            notificationService.showInfo(`Post deleted.`)
            this.partial('../templates/edit/editPage.hbs')
        })
    }).catch(authenticationService.handleError)
}

handlers.editPostPost = function(context) {
    let id = context.params.id.substr(1);
    let url = context.params.url;
    if (url === '') {
        notificationService.showError('The url cannot be empty');
        return;
    } else if (!url.startsWith('http')) {
        notificationService.showError('The url must start with http');
        return;
    }

    let title = context.params.title;
    if (title === '') {
        notificationService.showError('The title cannot be empty');
        return;
    }
    let author = sessionStorage.getItem('username');
    let description = context.params.comment;
    let imageUrl = context.params.image;

    postService.editPost(id, url, title, author, imageUrl, description)
        .then(function() {
            notificationService.showInfo(`Post ${context.title} updated.`)
            context.redirect('#/catalog')
        }).catch(authenticationService.handleError)
}

handlers.deletePost = function(context) {
    let id = context.params.id.substr(1);
    console.log(id);
    postService.deletePost(id)
        .then(function() {
            notificationService.showInfo(`Post deleted.`)
            context.redirect('#/catalog')
        }).catch(authenticationService.handleError)
};

handlers.details = function(context) {
    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
    context.username = sessionStorage.getItem('username');
    let id = context.params.id.substr(1);
    sessionStorage.setItem('lastPost', id)
    postService.getPost(id)
        .then(function(postInfo) {
            if (postInfo.author === context.username) {
                postInfo.isAuthor = true;
            }
            postService.loadComments(id).then(function(commentsData) {
                commentsData.forEach(c => {
                    if (c.author === context.username) {
                        c.isAuthor = true;
                    }
                    c.time = postService.calcTime(c._kmd.ect)
                })
                context.comments = commentsData
            }).catch(authenticationService.handleError)
            sessionStorage.setItem('lastPost', id)
            postInfo.posted = postService.calcTime(postInfo._kmd.ect)
            console.log(postInfo);
            for (let prop of Object.keys(postInfo)) {
                context[`${prop}`] = postInfo[`${prop}`];
            };
            console.log(context);



        }).catch(authenticationService.handleError)
    context.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        menu: '../templates/common/menu.hbs',
        postDetails: '../templates/comments/postDetails.hbs',
        comment: '../templates/comments/comment.hbs',
        addComment: '../templates/comments/addComment.hbs'
    }).then(function() {
        this.partial('../templates/comments/commentsPage.hbs')
    })
}

handlers.addComment = function(context) {
    let postId = sessionStorage.getItem('lastPost');
    let content = content.params.content;
    let author = sessionStorage.getItem('username')

    postService.addComment(postId, content, author)
        .then(function() {
            notificationService.showInfo('Comment created.')
            content.redirect(`#/comments/:${postId}`)
        }).catch(authenticationService.handleError);
}

handlers.deleteComment = function(content) {
    let postId = sessionStorage.getItem('lastPost');
    let id = context.params.id.substr(1);

    postService.deleteComment(id)
        .then(function() {
            notificationService.showInfo('Comment deleted.')
            content.redirect(`#/comments/:${postId}`)
        }).catch(authenticationService.handleError)
}