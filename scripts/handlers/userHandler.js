handlers.loginPost = function (context) {
    let username = context.params.username;
    let password = context.params.password;
    let passRegex = /^[a-zA-Z0-9]{6,}$/;
    let nameRegex = /^[a-zA-Z]{3,}$/;

    if (!nameRegex.exec(username)) {
        notificationService.showError('Username must be at least 3 symbols long and contain only latin letters.');
        return;
    } else if (!passRegex.exec(password)) {
        notificationService.showError('Password must be at least 6 symbols long and contain only latin letters and digits.');
        return;
    }
    authenticationService.login(username, password)
        .then(function (userInfo) {
            authenticationService.saveSession(userInfo);
            notificationService.showInfo('Login successful.');
            context.redirect('#/catalog')
        })
        .catch(authenticationService.handleError)
};




handlers.registerPost = function (context) {
    let username = context.params.username;
    let password = context.params.password;
    let repeatPassword = context.params.repeatPass;
    let passRegex = /^[a-zA-Z0-9]{6,}$/;
    let nameRegex = /^[a-zA-Z]{3,}$/;
    console.log(username);
    console.log(password);
    if (!nameRegex.exec(username)) {
        notificationService.showError('Username must be at least 3 symbols long and contain only latin letters.');
        return;
    } else if (!passRegex.exec(password)) {
        notificationService.showError('Password must be at least 6 symbols long and contain only latin letters and digits.');
        return;
    } else if (password !== repeatPassword) {
        notificationService.showError('Passwords do not match.');
        return;
    }
    authenticationService.register(username, password)
        .then(function (userInfo) {
            authenticationService.saveSession(userInfo);
            notificationService.showInfo('User registration successful.');
            context.redirect('#/catalog')
        });
};

handlers.logout = function (context) {
    authenticationService.logout()
        .then(function () {
            sessionStorage.clear();
            notificationService.showInfo('Logout successful');
            handlers.home(context);
        })
        .catch(authenticationService.handleError);
};