document.addEventListener("deviceready",function() {
    checkNotifications();
});
function checkNotifications() {
    navigator.notification.activityStart("Face in Cast","Duyurular alınıyor, lütfen bekleyin.")
    $.ajax({
        url: 'http://www.rejicast.com/services/user/token.json',
        type: 'post',
        dataType: 'json',
        success: function(token) {
            $.ajax({
                url: 'http://www.rejicast.com/services/system/connect.json',
                type: 'post',
                dataType: 'json',
                beforeSend: function(r) {
                    r.setRequestHeader("X-CSRF-Token", token.token)
                },
                success: function(connect) {
                    $("#loginHolder").text(connect.user.name);
                    $.ajax({
                        url: 'http://www.rejicast.com/duyurular.json',
                        type: 'get',
                        dataType: 'json',
                        success: function (data) {
                            var num = data.nodes.reduce(function(currNum, node) {
                                if (node.node.field_kime.indexOf(connect.user.uid) !== -1) {
                                    currNum++;
                                }
                                return currNum;
                            }, 0);
                            if (connect.user.uid > 0) {
                                $("#notification").text(num);
                                if (num === 0) {
                                    $("#notification").css("display","none");
                                } else {
                                    $("#notification").css("display","block");
                                }
                            }
                            navigator.notification.activityStop();
                            $.each(data.nodes, function (key,value) {
                                var announcement = $('<div class="generalNotification ' + value.node.field_ozel_duyuru +' '+ value.node.field_kime +'"><h3>' + value.node.title + '</h3><p>' + value.node.field_icerik + '</div>');
                                $('#contentHolder.notifications').append(announcement);
                            });
                            $('.evet:not(.'+connect.user.uid+')').remove();
                        }
                    });
                }
            });
        }
    });
}
$('#genNot').addClass('notificationActive');
$('#selfNot').click(function() {
    $('.hayir').hide();
    $('#genNot').removeClass('notificationActive');
    $('#selfNot').addClass('notificationActive');
});
$('#genNot').click(function() {
    $('.hayir').show();
    $('#genNot').addClass('notificationActive');
    $('#selfNot').removeClass('notificationActive');
});
