console.log(localStorage.getItem("nid"));
$.ajax({
    url: 'http://www.rejicast.com/oyuncu.json',
    type: 'get',
    dataType: 'json',
    data: {
        nid: localStorage.getItem("nid")
    },
    success: function(data) {
        if ($("#profiles").is(":hidden")) {
            $("#profiles").show();
        }
        var stand_hostesi = data.nodes[0].node.field_kategorisi.indexOf("Stand hostesi") != -1;
        $(".loader-container").hide();
        var share = $('<div id="shareViaEmail"><img id="email" src="img/email.png"/></div><div id="shareViaWhatsApp"><img id="whatsapp" src="img/whatsapp.png"/></div>');
        var profile = $('<img class="singleProfileImage" src="' + data.nodes[0].node.field_oyuncu_fotografi.src + '"><div class="singleProfileName">' + data.nodes[0].node.field_gosterilecek_ad + '</div><div class="singleHolder"><div class="singleProfileLabel">Cinsiyet:</div><div class="singleProfileContent">' + data.nodes[0].node.field_cinsiyet + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Doğum tarihi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_dogum_tarihi + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Şehir:</div><div class="singleProfileContent">' + data.nodes[0].node.field_yasadigi_sehir + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Kategorisi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kategorisi + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Eğitim düzeyi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_egitim_duzeyi + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Diller:</div><div class="singleProfileContent">' + data.nodes[0].node.field_diller + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Kişisel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kisisel + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Boy:</div><div class="singleProfileContent">' + data.nodes[0].node.field_boy + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Kilo:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kilo + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Ten Rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ten_rengi + '</div>');
        $("#contentHolder.profile").append(profile);
        if (stand_hostesi) {
            $("#contentHolder.profile").append('</div></div><div class="singleHolder"><div class="singleProfileLabel">Göğüs:</div><div class="singleProfileContent">' + data.nodes[0].node.field_gogus + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Bel:</div><div class="singleProfileContent">' + data.nodes[0].node.field_bel + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Kalça:</div><div class="singleProfileContent">' + data.nodes[0].node.field_kalca);
        }
        $("#contentHolder.profile").append('</div><div class="singleHolder"><div class="singleProfileLabel">Ayak no:</div><div class="singleProfileContent">' + data.nodes[0].node.field_ayak_no + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Göz rengi:</div><div class="singleProfileContent">' + data.nodes[0].node.field_goz_rengi + '</div></div><div class="singleHolder"><div class="singleProfileLabel">Beceriler:</div><div class="singleProfileContent">' + data.nodes[0].node.field_beceriler + '</div></div>');
        if (data.nodes[0].node.field_fotograflar.src !== undefined) {
            $("#contentHolder.profile").append('<img class="singleProfileOtherPics" src="' + data.nodes[0].node.field_fotograflar.src + '"/>'); 
        } else {
            $.each(data.nodes[0].node.field_fotograflar, function () {
                $("#contentHolder.profile").append('<img class="singleProfileOtherPics" src="' + this.src + '"/>');
            });
        }
        if (data.nodes[0].node.field_videolar) {
            $("#contentHolder.profile").append('Videolar');
            $.each(data.nodes, function() {
                $("#contentHolder.profile").append('<a href='+this.node.field_videolar+'><img class="videotn" src='+this.node.field_videolar_thumbnail_path+'/>');
            });
        }
        $("#contentHolder.profile").append(share);
        $("#shareViaEmail").on("click", function() {
            window.plugins.socialsharing.shareViaEmail('http://www.rejicast.com/node/'+nid);
        });
        $("#shareViaWhatsApp").on("click", function() {
            window.plugins.socialsharing.shareViaWhatsApp('http://www.rejicast.com/node/'+nid);
        });
    }
});
