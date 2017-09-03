let messageService = (() => {
    function loadMessages() {
        return requestService.get('appdata', 'messages', 'kinvey');
    }



    return {
        loadMessages
    }
})()