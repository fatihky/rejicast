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
                $(".loader-container").remove();
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
                        $(".loader-container").remove();
                        $("#contentHolder.profiles > .profile").remove();
                        var profile = $('<img class="singleProfileImage" src="' + data.nodes[0].node.field_oyuncu_fotografi.src + '"><div class="singleProfileName">' + data.nodes[0].node.field_gosterilecek_ad + '</div><div class="singleProfileSkin"><div class="singleProfileLabel">Ten Rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ten_rengi + '</div></div>');
                        $("#contentHolder.profiles").append(profile);
                    },
                })
            });
        }
    });
});
