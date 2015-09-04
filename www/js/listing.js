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
        /*
        $(".ui-select").remove();
        $("label").remove();
        $("#btn").remove();
        */
        $("div[data-role='page']").css("z-index", -1);
        var content = $("<div id='content'>");
        /*
            cihaz = $("<div id='cihaz'>"),
            headerHolder = $("<div id='headerHolder'>");
        $("body").append(cihaz);
        cihaz.append(headerHolder);
        cihaz.append(content);
        */
        if (data.nodes.length === 0) {
            $(".container").fadeOut(50);
            $(".loader-container").hide();
            alert("Oyuncu bulunamadı");
        }
        $(".loader-container").fadeOut(500);
        $.each(data.nodes, function (key, value) {
            var profile = $('<div class="profile"><img class="profile-image" src="' + value.node.field_oyuncu_fotografi.src + '" data-nid="'+value.node.nid+'"><div class="oyuncu-adi">' + value.node.field_gosterilecek_ad + '</div><hr></div>');
            content.append(profile);
        });
    });
}
