$('#login').on('click', function () {
    var name = $('#username').val();
    if (!name) {
        alert("Lütfen kullanıcı adınızı girin.");
        return false;
    }
    var pass = $('#password').val();
    if (!pass) {
        alert("Lütfen şifrenizi girin.");
        return false;
    }
    $.ajax({
        url: "http://www.rejicast.com/services/user/login.json",
        type: "post",
        data: "username=" + encodeURIComponent(name) + "&password=" + encodeURIComponent(pass),
        dataType: "json",
        statusCode: {
            401:function() {
                alert('Kullanıcı adı ya da şifre yanlış, tekrar deneyiniz.');
            }
        },
        success: function (data) {
            var duser=data.user;
            $("#submit").remove();
            $("#drupal-username").text(duser.name);
            $(".loader-container").show();
            $.mobile.changePage("applications.html", "slide");
            $.ajax({
                url: "http://www.rejicast.com/oyuncularim.json",
                type: "post",
                data: {
                    uid: duser.uid
                },
                dataType: "json",
                success: function(gelen) {
                    $.each(gelen.nodes), function(key, value) {
                        var cnt = $('<div class="profilesr"><img class="profileimage" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profilename">' + value.node.field_gosterilecek_ad + '</div><hr></div>');
                        cnt.hide().appendTo($('body')).fadeIn(500);
                    }
                }
            })
        }
    });
    return false;
});
