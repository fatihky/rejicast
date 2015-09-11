$('#login').on('click', function () {
    $(".loader-container > p").text("Giriş yapılıyor");
    $(".loader-container").show();
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
        url: 'http://www.rejicast.com/services/user/token.json',
        type: 'post',
        dataType: 'json',
        success: function(token) {
            $.ajax({
                url: 'http://www.rejicast.com/services/user/login.json',
                type: 'post',
                dataType: 'json',
                data: 'username='+name.trim()+'&password='+pass,
                beforeSend: function(request) {
                    request.setRequestHeader("X-CSRF-Token", token.token);
                },
                success: function (data) {
                    $(".loader-container > p").text("Hoşgeldin "+data.user.name);
                    setTimeout(function() {
                        $(".loader-container").fadeOut(500);
                    }, 1000);
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
                            $("#contentHolder.login > .ui-input-text").remove();
                            $("#contentHolder.login > .ui-link").remove();
                            $("#contentHolder.login > #login").remove();
                            $.each(data.nodes, function (key, value) {
                                var profile = $('<div class="profile"><img class="profileImage" data-nid="' + value.node.nid + '" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profileName">' + value.node.field_gosterilecek_ad+ '</div></div>');
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
                                        $(".loader-container").hide();
                                        $("#contentHolder.profiles > .profile").remove();
                                        var profile = $('<img class="singleProfileImage" src="' + data.nodes[0].node.field_oyuncu_fotografi.src + '"><div class="singleProfileName">' + data.nodes[0].node.field_gosterilecek_ad + '</div><div class="singleProfileLabel">Cinsiyet:</div><div class="singleProfileContent">' + data.nodes[0].node.field_cinsiyet + '</div><div class="singleProfileLabel">Doğum tarihi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_dogum_tarihi + '</div><div class="singleProfileLabel">Şehir:</div><div class="singleProfileContent">' + data.nodes[0].node.field_yasadigi_sehir + '</div><div class="singleProfileLabel">Kategorisi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kategorisi + '</div><div class="singleProfileLabel">Eğitim düzeyi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_egitim_duzeyi + '</div><div class="singleProfileLabel">Diller:</div><div class="singleProfileContent">' + data.nodes[0].node.field_diller + '</div><div class="singleProfileLabel">Kişisel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kisisel + '</div><div class="singleProfileLabel">Boy:</div><div class="singleProfileContent">' + data.nodes[0].node.field_boy + '</div><div class="singleProfileLabel">Kilo:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kilo + '</div><div class="singleProfileLabel">Ten Rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ten_rengi + '</div><div class="singleProfileLabel">Göğüs:</div><div class="singleProfileContent">' + data.nodes[0].node.field_gogus + '</div><div class="singleProfileLabel">Bel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_bel + '</div><div class="singleProfileLabel">Kalça:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kalca + '</div><div class="singleProfileLabel">Ayak no:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ayak_no + '</div><div class="singleProfileLabel">Göz rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_goz_rengi + '</div><div class="singleProfileLabel">Beceriler:</div><div class="singleProfileContent">' + data.nodes[0].node.field_beceriler + '</div><div class="singleProfileLabel">Fotoğraflar:</div>');
                                        $("#contentHolder.profiles").append(profile);
                                        $.each(data.nodes[0].node.field_fotograflar, function () {
                                            $("#contentHolder.profiles").append('<img class="singleProfileOtherPics" src="' + this.src + '">');
                                        }); 
                                    },
                                });
                            });
                        },
                    });
                }
            });
            return false;
        },
    });
});
