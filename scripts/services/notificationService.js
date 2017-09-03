const notificationService = {};

$(() => {
    $(document).on({
        ajaxStart: () => {
            $('#loadingBox').show()
        },
        ajaxStop: () => {
            $("#loadingBox").hide()
        }
    });
    let infoBox = $('#infoBox');
    let errorBox = $('#errorBox');
    
    $(infoBox).click(()=>{
        infoBox.hide()
    })
    $(errorBox).click(()=>{
        errorBox.hide()
    })

    notificationService.showInfo = function(message) {
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    notificationService.showError = function(message) {
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }
})