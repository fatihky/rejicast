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
        url: 'http://www.rejicast.com/services/user/login.json',
        type: 'post',
        dataType: 'json',
        data: 'username='+name.trim()+'&password='+pass,
        success: function (data) {
            $.ajax({
                url: 'http://www.rejicast.com/oyuncularim.json',
                type: 'get',
                dataType: 'json',
                data: {
                    uid: data.user.uid
                },
                statusCode: {
                    401: function () {
                        alert('Kullanıcı adı ya da şifre hatalı.');
                    }
                },
                success: function (data) {
                    $(".loader-container").text("Giriş yapılıyor");
                    $(".loader-container").show();
                    $("#contentHolder.login > #username").remove();
                    $("#contentHolder.login > #password").remove();
                    $("#contentHolder.login > #submit").remove();
                    setTimeout(function () {
                        $(".loader-container").fadeOut(500);
                    }, 1000);
                    $.each(data.nodes, function (key, value) {
                        var profile = $('<div class="profile"><img class="profileImage" data-nid="' + value.node.nid + '" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profileName">' + value.node.title+ '</div></div>');
                        $("#contentHolder.login").append(profile);
                    });
                    $(".profileImage").on("click", function(ev) {
                        $(".loader-container > p").text('Oyuncu bilgileri alınıyor');
                        $(".loader-container").show();
                        var nid=$(ev.target).attr("data-nid");
                        $.ajax({
                            url: 'http://www.rejicast.com/oyuncu.json',
                            type: 'get',
                            dataType: 'json',
                            data: {
                                nid: nid,
                            },
                            success: function(data) {
                                $(".loader-container").remove();
                                $("#contentHolder.login > .profile").remove();
                                var profile = $('<img class="singleProfileImage" src="' + data.nodes[0].node.field_oyuncu_fotografi.src + '"><div class="singleProfileName">' + data.nodes[0].node.title+ '</div><div class="singleProfileSkin"><div class="singleProfileLabel">Ten Rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ten_rengi + '</div></div>');
                                $("#contentHolder.login").append(profile);
                            },
                        });
                    });
                },
            });
        }
    });
    return false;
});
