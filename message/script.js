// Hide Pop-up
$('#cancel').bind('click', function(e){
    e.preventDefault();
    $('#overlay').addClass('hidden');
    $('#message-wrapper').addClass('hidden');
    cleanForm();
});

// display Pop-up
$('#newMessage').bind('click', function(e){
    $('#overlay').removeClass('hidden');
    $('#message-wrapper').removeClass('hidden');
});

// Submit
$('#submit').bind('click', function(e){
    e.preventDefault();
    let title = $('#titre').val();
    let message = $('#message').val();
    let dest = $('#destinataire').val();
    let isPriority = $('#prioritaire').prop('checked');

    if(title !== '' && title !== null && message !== '' && message !== null && dest !== '' && dest !== null){
        sendData(title,message,dest,isPriority);
        getMessage();
        cleanForm();
    }else{
        $('#error-message').removeClass('hidden');
        setTimeout(()=>{
            $('#error-message').addClass('hidden');
        },2*1000)
    }
});

// Update message
getMessage();
setInterval(() => getMessage(), 60*1000);

/*
* Envois un nouveau message
* */
function sendData(title, message, dest, isPriority) {
    $.ajax({
        type: 'post',
        url: 'traitement.php',
        data: {
            title:title,
            message:message,
            dest:dest,
            isPriority:isPriority,
        },
        success: function (response) {
            $('#overlay').addClass('hidden');
            $('#message-wrapper').addClass('hidden');
            $('#confirm-message').removeClass('hidden');
            setTimeout(()=>{
                $('#confirm-message').addClass('hidden');
            },5*1000);
        }
    });
    return false;
}

/*
* Recupere la liste des messages
* */
function getMessage(){
    $.ajax({
        type: 'get',
        url: 'traitement.php',
        success: function (response) {
            let messages = JSON.parse(response);
            updateMessages(messages);
        }
    });
    return false;
}

/*
* Met à jour la liste des messages
* */
function updateMessages(messages){
    $("#messages").text('')
    jQuery.each(messages, function(i, val) {
        let titleElt = $('<b></b>').text(messages[i]['title']);
        let destElt = $('<span></span>').text(' Pour ' + messages[i]['dest']);
        let messageElt = $('<p></p>').html(messages[i]['content'].replaceAll('&#10;', '<br/>'));
        let hrElt = $('<hr>');
        let priorityElt = $('<span class="priority"></span>').text('⚠️');

        let liElt = $('<li class="message"></li>')
            .append(titleElt)
            .append(destElt)
            .append(hrElt)
            .append(messageElt);
        if(messages[i]['is_prioritaire']){
            liElt.append(priorityElt);
        }
        $("#messages").append(liElt);
    });
}

function cleanForm(){
    $('#titre').val('');
    $('#message').val('');
}