handlers.home = function (context) {
    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
    context.username = sessionStorage.getItem('username');

    if (context.loggedIn) {
        context.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            menu: '../templates/common/menu.hbs',
            post: '../templates/catalog/post.hbs'
        }).then(function () {
            this.partial('../templates/catalog/catalog.hbs')
        })
    } else {
        context.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            loginForm: '../templates/welcome/loginForm.hbs',
            registerForm: '../templates/welcome/registerForm.hbs'
            
        }).then(function () {
            this.partial('../templates/welcome/welcome.hbs')
        })
    }
};
