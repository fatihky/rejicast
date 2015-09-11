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
            $("#contentHolder.profiles .ui-select").remove();
            $("#contentHolder.profiles .ui-btn").remove();
            if (data.nodes.length === 0) {
                $(".container").fadeOut(50);
                $(".loader-container").hide();
                alert("Oyuncu bulunamadı");
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
                        nid: nid,
                    },
                    success: function(data) {
                        $(".loader-container").hide();
                        $("#contentHolder.profiles > .profile").remove();
                        var profile = $('<img class="singleProfileImage" src="' + data.nodes[0].node.field_oyuncu_fotografi.src + '"><div class="singleProfileName">' + data.nodes[0].node.field_gosterilecek_ad + '</div><div class="singleProfileLabel">Cinsiyet:</div><div class="singleProfileContent">' + data.nodes[0].node.field_cinsiyet + '</div><div class="singleProfileLabel">Doğum tarihi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_dogum_tarihi + '</div><div class="singleProfileLabel">Şehir:</div><div class="singleProfileContent">' + data.nodes[0].node.field_yasadigi_sehir + '</div><div class="singleProfileLabel">Kategorisi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kategorisi + '</div><div class="singleProfileLabel">Eğitim düzeyi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_egitim_duzeyi + '</div><div class="singleProfileLabel">Diller:</div><div class="singleProfileContent">' + data.nodes[0].node.field_diller + '</div><div class="singleProfileLabel">Kişisel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kisisel + '</div><div class="singleProfileLabel">Boy:</div><div class="singleProfileContent">' + data.nodes[0].node.field_boy + '</div><div class="singleProfileLabel">Kilo:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kilo + '</div><div class="singleProfileLabel">Ten Rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ten_rengi + '</div><div class="singleProfileLabel">Göğüs:</div><div class="singleProfileContent">' + data.nodes[0].node.field_gogus + '</div><div class="singleProfileLabel">Bel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_bel + '</div><div class="singleProfileLabel">Kalça:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kalca + '</div><div class="singleProfileLabel">Ayak no:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ayak_no + '</div><div class="singleProfileLabel">Göz rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_goz_rengi + '</div><div class="singleProfileLabel">Beceriler:</div><div class="singleProfileContent">' + data.nodes[0].node.field_beceriler + '</div><div class="singleProfileLabel">Fotoğraflar:</div>');
                        $("#contentHolder.profiles").append(profile);
                        $.each(data.nodes[0].node.field_fotograflar, function () {
                            $("#contentHolder.profiles").append('<img class="singleProfileOtherPics" src="' + this.src + '"/>');
                        }); 
                    },
                })
            });
        }
    });
});
