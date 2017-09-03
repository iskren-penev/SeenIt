const handlers = {};

$(() => {

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.home);

        this.post('#/login', handlers.loginPost);

        this.get('#/logout', handlers.logout);

        this.post('#/register', handlers.registerPost);

        this.get('#/catalog', handlers.catalog)

        this.get('#/myposts', handlers.myPosts)

        this.get('#/create', handlers.createPostGet)

        this.post('#/create', handlers.createPostPost)

        this.get('#/edit/:id', handlers.editPostGet)

        this.post('#/edit/:id', handlers.editPostPost)

        this.get('#/delete/:id', handlers.deletePost)

        this.get('#/comments/:id', handlers.details)

        this.post('#/addComment', handlers.addComment)

        this.get('#/delComment/:id', handlers.deleteComment)

    })
    app.run();
});