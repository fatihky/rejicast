$(function() {
  $("#profilepicture").on("change", function(e) {
    var ctx = $("#canvas")[0].getContext('2d');
    var img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function() {
      ctx.drawImage(img, 100,100);
    }
  });
  $("#tel").mask("999 999-9999");
  $("#tel2").mask("999 999-9999");
  $("#tckn").mask("99999999999");
  $("#privacy").on("change", function() {
    $("#submit").toggleClass("hidden");
  });
  $("a#inst").on('tap', function(event) {
    window.open('inst.html');
    event.stopPropagation();
  });
  $("#submit").on("click", function() {
    $.ajax({
      url:'http://www.rejicast.com/services/create.json',
      type:'post',
      data:'node[type]=oyuncu&node[title]='+encodeURIComponent($("#name").val())+'&node[language]=und&node[field_tc_kimlik_no][und][0][value]='+encodeURIComponent($("#tckn").val())+'&node[field_sgk_durumu][und][0][value]='+encodeURIComponent($("#sgk option:selected").val())+'&node[field_telefon][und][0][value]='+encodeURIComponent($("#tel").val())+'&node[field_telefon_2][und][0][value]='+encodeURIComponent($("#tel2").val())+'&node[field_adres][und][0][value]='+encodeURIComponent($("#address").val())+'&node[field_yasadigi_sehir][und][0][value]='+encodeURIComponent($("#city option:selected").val())+'&node[field_kategorisi][und][0][value]='+encodeURIComponent($("input[name='kategori']:checked").val())+'&node[field_dogum_tarihi][und][0][value]='+encodeURIComponent($("#dob").val())+'&node[field_boy][und][0][value]='+encodeURIComponent($("select#height option:checked").val())+'&node[field_kilo][und][0][value]='+encodeURIComponent($("select#weight option:checked").val())+'&node[field_goz_rengi][und][0][value]='+encodeURIComponent($("select#eyecolour option:checked").val())+'&node[field_ten_rengi][und][0][value]='+encodeURIComponent($("select#skincolour option:checked").val())+'&node[field_ayak_no][und][0][value]='+encodeURIComponent($("select#shoesize option:checked").val())+'&node[field_egitim_duzeyi][und][0][value]='+encodeURIComponent($("select#education option:checked").val())+'&node[field_oyunculuk_egitimleri][und][0][value]='+encodeURIComponent($("#training").val())+'&node[field_diller][und][0][value]='+encodeURIComponent($("#languages").val())+'&node[field_beceriler][und][0][value]='+encodeURIComponent($("#skills").val())+'&node[field_kisisel][und][0][value]='+encodeURIComponent($("#personal").val())+'&node[field_videolar[und][0][video_url]]='+encodeURIComponent($(".videolink").val())+'&node[field_videolar][und][0][description]='+encodeURIComponent($(".videodesc").val())+'&node[field_okudum_anladim][und][0][value]='+encodeURIComponent($(".privacy").is(':checked')?1:0),
      /* node[field_diskografi][und][0][]node[field_fotograflar][und][0][value]='+encodeURIComponent($("#images").val()), Bunun üzerinde çalış */ 
      success:function() {
        $mobile.changePage("thanks.html", "slideup");
      },
      error:function() {
        alert("Bir sorun oluştu, sonra tekrar deneyiniz");
      }
    });
  });
});
