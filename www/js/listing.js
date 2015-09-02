document.addEventListener('deviceready', clickButton, false);
document.addEventListener('resume', clickButton, false);

function clickButton() {
    $("#btn").on("click", getList);
}

function getList() {
    $(".loader-container").show();
    $.get('http://www.rejicast.com/oyuncular.json', {
        "field_yasadigi_sehir_value": $("#sehir").val(),
        "field_cinsiyet_value": $("#sex").val(),
        "field_boy_value": $("#height").val(),
        "field_goz_rengi_value": $("#eyecolour").val(),
        "field_ten_rengi_value": $("#skincolour").val(),
        "field_kilo_value": $("#weight").val(),
        "field_egitim_duzeyi_value": $("#education").val(),
        "field_kategorisi_value": $("#category").val(),

    },

    function (data) {
        $(".container").fadeOut(50);
        if (data.nodes.length === 0) {
            $(".container").fadeOut(50);
            $(".loader-container").hide();
            alert($("select option:selected").html() + " için kayıt bulunamadı");
        }
        $(".loader-container").fadeOut(500);
        $.each(data.nodes, function (key, value) {
            var cnt = $('<div class="container"><img class="foto" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="oyuncu-adi">' + value.node.field_gosterilecek_ad + '</div><hr></div>');
            cnt.hide().appendTo($('body')).fadeIn(500);
        });
    });
}
