$(function() {
    $("#btn").on("click", getList);
});

function getList() {
    $(".loader-container").show();
    $.get('http://www.rejicast.com/oyuncular.json', {
        "field_yasadigi_sehir_value": $("#city option:selected").val(),
        "field_cinsiyet_value": $("#gender option:selected").val(),
        "field_boy_value": $("#height option:selected").val(),
        "field_goz_rengi_value": $("#eyecolour option:selected").val(),
        "field_ten_rengi_value": $("#skincolour option:selected").val(),
        "field_kilo_value": $("#weight option:selected").val(),
        "field_egitim_duzeyi_value": $("#education option:selected").val(),
        "field_kategorisi_value": $("#category option:selected").val(),
    },
    function (data) {
        $("#content").hide();
        $("div.ui-page").hide();
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
