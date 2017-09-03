const authenticationService = {};
$(() => {
    authenticationService.saveSession = function(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
    }

    // user/login
    authenticationService.login = function(username, password) {
        let userData = {
            username,
            password
        };

        return requestService.post('user', 'login', 'basic', userData);
    }

    // user/register
    authenticationService.register = function(username, password, name) {
        let userData = {
            username,
            password
        };

        return requestService.post('user', '', 'basic', userData);
    }

    // user/logout
    authenticationService.logout = function() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requestService.post('user', '_logout', 'kinvey', logoutData);
    }

    authenticationService.handleError = function(reason) {
        notificationService.showError(reason.responseJSON.description);
    }
});