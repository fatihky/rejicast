$("#btn").on("click", function() {
    $(".loader-container > p").text("Lütfen bekleyin, liste yükleniyor");
    $(".loader-container").show();
    $.ajax({
        url: 'http://www.rejicast.com/oyuncular.json',
        type: 'get',
        dataType: 'json',
        data: {
            "field_yasadigi_sehir_value": $("#city").val(),
            "field_cinsiyet_value": $("#gender").val(),
            "field_boy_value": $("#height").val(),
            "field_goz_rengi_value": $("#eyecolour").val(),
            "field_ten_rengi_value": $("#skincolour").val(),
            "field_kilo_value": $("#weight").val(),
            "field_egitim_duzeyi_value": $("#education").val(),
            "field_kategorisi_value": $("#category").val()
        },
        success: function (data) {
            $("#contentHolder.profiles label").remove();
            $("#contentHolder.profiles select").remove();
            $("#contentHolder.profiles #btn").remove();
            if (data.nodes.length === 0) {
                $(".container").fadeOut(50);
                $(".loader-container").hide();
                navigator.notification.alert("Oyuncu bulunamadı", function() {return;}, "Hata", "Tamam");
            }
            $(".loader-container").fadeOut(500);
            $.each(data.nodes, function (key, value) {
                var profile = $('<div class="profile"><img class="profileImage" data-nid="' + value.node.nid + '" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profileName">' + value.node.field_gosterilecek_ad + '</div></div>');
                $("#contentHolder.profiles").append(profile);
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
                        nid: nid
                    },
                    success: function(data) {
                        $(".loader-container").hide();
                        $("#contentHolder.profiles > .profile").hide();
                        var share = $('<div id="shareViaEmail"><img id="email" src="img/email.png"/></div><div id="shareViaWhatsApp"><img id="whatsapp" src="img/whatsapp.png"/></div>');
                        var profile = $('<img class="singleProfileImage" src="' + data.nodes[0].node.field_oyuncu_fotografi.src + '"><div class="singleProfileName">' + data.nodes[0].node.field_gosterilecek_ad + '</div><div class="singleProfileLabel">Cinsiyet:</div><div class="singleProfileContent">' + data.nodes[0].node.field_cinsiyet + '</div><div class="singleProfileLabel">Doğum tarihi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_dogum_tarihi + '</div><div class="singleProfileLabel">Şehir:</div><div class="singleProfileContent">' + data.nodes[0].node.field_yasadigi_sehir + '</div><div class="singleProfileLabel">Kategorisi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kategorisi + '</div><div class="singleProfileLabel">Eğitim düzeyi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_egitim_duzeyi + '</div><div class="singleProfileLabel">Diller:</div><div class="singleProfileContent">' + data.nodes[0].node.field_diller + '</div><div class="singleProfileLabel">Kişisel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kisisel + '</div><div class="singleProfileLabel">Boy:</div><div class="singleProfileContent">' + data.nodes[0].node.field_boy + '</div><div class="singleProfileLabel">Kilo:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kilo + '</div><div class="singleProfileLabel">Ten Rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ten_rengi + '</div><div class="singleProfileLabel">Göğüs:</div><div class="singleProfileContent">' + data.nodes[0].node.field_gogus + '</div><div class="singleProfileLabel">Bel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_bel + '</div><div class="singleProfileLabel">Kalça:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kalca + '</div><div class="singleProfileLabel">Ayak no:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ayak_no + '</div><div class="singleProfileLabel">Göz rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_goz_rengi + '</div><div class="singleProfileLabel">Beceriler:</div><div class="singleProfileContent">' + data.nodes[0].node.field_beceriler + '</div>');
                        $("#contentHolder.profiles").append(profile);
                        if ((Object.keys(data.nodes[0].node.field_fotograflar).length) === 2) {
                            $("#contentHolder.profiles").append('<img class="singleProfileOtherPics" src="' + data.nodes[0].node.field_fotograflar.src + '"/>'); 
                        } else {
                            $.each(data.nodes[0].node.field_fotograflar, function () {
                                $("#contentHolder.profiles").append('<img class="singleProfileOtherPics" src="' + this.src + '"/>');
                            });
                        }
                        console.log(JSON.stringify(data));
                        $("#contentHolder.profiles").append('<object width="475" height="381"><param value="http://www.youtube.com/v/rz6BFrgmRig&showsearch=0&rel=0&fs=1&autoplay=0&amp;ap=%2526fmt%3D18" name="movie" /><param value="window" name="wmode" /><param value="true" name="allowFullScreen" /><embed width="475" height="381" wmode="window" allowfullscreen="true" type="application/x-shockwave-flash" src="http://www.youtube.com/v/rz6BFrgmRig&showsearch=0&fs=1&rel=0&autoplay=0&amp;ap=%2526fmt%3D18"></embed></object><br /><a href="http://www.youtube.com/watch?v=rz6BFrgmRig" target="_blank">View on YouTube</a>');
                        /*
                         $.each(data.nodes[0].node.field_videolar, function(k,v) {
                            $("#contentHolder.profiles").append('<a href='+v.video_url+'>');
                        });
                        */
                        $("#contentHolder.profiles").append(share);
                        $("#shareViaEmail").on("click", function() {
                            window.plugins.socialsharing.shareViaEmail('http://www.rejicast.com/node/'+nid);
                        });
                        $("#shareViaWhatsApp").on("click", function() {
                            window.plugins.socialsharing.shareViaWhatsApp('http://www.rejicast.com/node/'+nid);
                        });
                    }
                });
            });
        }
    });
});
