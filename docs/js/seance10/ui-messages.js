function getMessage(title,content,type,icon,closeable) {
    const close=closeable?'<i class="close icon"></i>':'';
    return `<div class="ui icon ${type} message">
                                    ${close}
                                  <i class="${icon} icon"></i>
                                  <div class="content">
                                    <div class="header">
                                      ${title}
                                    </div>
                                    <p>${content}</p>
                                  </div>
                                </div>`;
}
$(document).ready(function () {
    $('#modalMessage').modal();

    $('#btnOpenModal').on('click', function () {
        $('#modalMessage').modal('show');
    });

    // Effacer tous les messages quand le bouton est cliqué
    $('#btnClearAll').on('click', function () {
        if($('#messagesContainer').children().length>0){
            defaultMessage();
            $.toast({
                class: 'success',
                title: 'Suppression de tous les messages',
                message: 'Tous les messages ont été supprimés avec succès',
            })
        }

    });

    // Ajouter le message quand le bouton addMessage est cliqué
    $('#btnAddMessage').on('click', function () {
        // Récupérer les valeurs des champs
        $('.default.message').remove();
        const messageType = $('#selectMessageType').val();
        const messageIcon = $('#selectMessageIcon').val();
        const messageTitle = $('#inputMessageTitle').val();
        const messageContent = $('#textareaMessageContent').val();
        const closeable = $('#modalMessage .ui.checkbox').checkbox('is checked');

        let messageHtml = getMessage(messageTitle,messageContent,messageType,messageIcon,closeable);
        $('#messagesContainer').append(messageHtml);

        $('#modalMessage').modal('hide');

        // Réinitialiser les valeurs des champs
        $('#selectMessageType').dropdown('clear');
        $('#selectMessageIcon').dropdown('clear');
        $('#inputMessageTitle').val('');
        $('#textareaMessageContent').val('');
        $.toast({
            class: 'success',
            title: 'Ajout de message',
            message: 'Le message a été ajouté avec succès',
        })
        ;
    });
});
$('body')
    .on('click','.message .close', function() {
        $(this)
            .closest('.message')
            .transition('fade',500,
                function() {
                    $(this).remove();
                    if($('#messagesContainer').children().length==0){
                        defaultMessage();
                    }
                }
            )
        ;
        $.toast({
            class: 'success',
            title: 'Suppression de message',
            message: 'Le message a été supprimé avec succès',
        });
    })
;
function defaultMessage(){
    let messageHtml=getMessage('Message par défaut', 'Aucun message','default','comment alternate outline',false);
    $('#messagesContainer').empty().append(messageHtml);
}
defaultMessage();
$('.ui.dropdown')
    .dropdown({
        allowAdditions: true,
        hideAdditions: false,
        className: {
            addition: 'stuck addition'
        }
    })
;