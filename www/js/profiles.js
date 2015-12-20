$(".loader-container > p").text("Lütfen bekleyin, liste yükleniyor");
$(".loader-container").show();
$.ajax({
    url: 'http://www.rejicast.com/oyuncular.json',
    type: 'get',
    dataType: 'json',
    data: {
        "field_yasadigi_sehir_value": localStorage.getItem("city"),
        "field_cinsiyet_value": localStorage.getItem("gender"),
        "field_boy_value": localStorage.getItem("height"),
        "field_goz_rengi_value": localStorage.getItem("eyecolour"),
        "field_ten_rengi_value": localStorage.getItem("skincolour"),
        "field_kilo_value": localStorage.getItem("weight"),
        "field_kategorisi_value": localStorage.getItem("category")
    },
    success: function (data) {
        if (data.nodes.length === 0) {
            $(".container").fadeOut(50);
            $(".loader-container").hide();
            navigator.notification.alert("Oyuncu bulunamadı", function() {return;}, "Hata", "Tamam");
        }
        $(".loader-container").fadeOut(500);
        $.each(data.nodes, function (key, value) {
            profile = $('<div class="profile"><img class="profileImage" data-nid="' + value.node.nid + '" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profileName">' + value.node.field_gosterilecek_ad + '</div></div>');
            $("#profiles").append(profile);
        });
        scrollTo(0,432);
        $(".profileImage").on("click", function(ev) {
            $(".loader-container > p").text('Oyuncu bilgileri alınıyor');
            $(".loader-container").show();
            var nid=$(ev.target).attr("data-nid");
            localStorage.setItem("nid",nid);
            window.location.href = "profile.html";
        });
    }
});

