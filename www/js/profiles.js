$(function () {
    $("#btn").on("click", getList);
    $(".profile").on("click", getProfile);
});

function getList() {
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
            $("label").remove();
            $(".ui-select").remove();
            $(".ui-btn").remove();
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
        }
    });
}

function getProfile(e) {
    /*
    $(".loader-container").show();
    $.ajax({
        url: 'http://www.rejicast.com/oyuncu.json',
        type: 'get',
        dataType: 'json',
        data: {
            uid: e.nid,
        },
        success: function(data) {
            $(".profile").hide();
        },
    })
    */
    alert('Clicked!');
}
