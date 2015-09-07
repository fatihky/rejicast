$(function() {
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
            dataType: "json",
            data: {
                username: name.trim(),
                password: pass
            },
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
                $.ajax({
                    url: "http://www.rejicast.com/oyuncularim.json",
                    type: "get",
                    dataType: "json",
                    data: {
                        uid: duser.uid
                    },
                    success: function(gelen) {
                        $.each(gelen.nodes), function(key, value) {
                            var profile = $('<div class="profile"><img class="profileImage" data-nid="' + value.node.nid + '" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profileName">' + value.node.field_gosterilecek_ad + '</div></div>');
                            $("#contentHolder.login").append(profile);
                        }
                    }
                })
            }
        });
        return false;
    });
});
