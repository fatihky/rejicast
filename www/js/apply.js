$(function() {
  $("#profilepicture").on("change", function(e) {
    var ctx = $("#canvas")[0].getContext('2d');
    var img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function() {
      ctx.drawImage(img,10,10,300,300);
      $("img").attr("src",img.src);
    }
  });
  $('#image > #canvas').cropper({
    aspectRatio: 16 / 9,
    autoCropArea: 0.65,
    strict: false,
    guides: false,
    highlight: false,
    dragCrop: false,
    cropBoxMovable: false,
    cropBoxResizable: false
  });
  $("#addmoreprods").on("click", function () {
    var tr = $(".prods").first().clone();
    tr.find('input').val('');
    $("#prods").append(tr);
  });
  $("#addmorevideos").on("click", function () {
    var tr = $(".videos").first().clone();
    tr.find('input').val('');
    $("#videos").append(tr);
  });
  $("#tel").mask("999 999-9999");
  $("#tel2").mask("999 999-9999");
  $("#privacy").on("change", function() {
    $("#submit").toggleClass("hidden");
  });
  $("#submit").on("click", function() {
    $.ajax({
      url:'http://www.rejicast.com/services/create.json',
      type:'post',
      dataType:'json',
      data:'node[type]=oyuncu&node[title]='+encodeURIComponent($("#name").val())+'&node[language]=und&node[field_tc_kimlik_no][und][value]='+encodeURIComponent($("#tckn").val())+'&node[field_sgk_durumu][und][value]='+encodeURIComponent($("#sgk option:selected").val())+'&node[field_telefon][und][value]='+encodeURIComponent($("#tel").val())+'&node[field_telefon_2][und][value]='+encodeURIComponent($("#tel2").val())+'&node[field_adres][und][value]='+encodeURIComponent($("#address").val())+'&node[field_yasadigi_sehir][und][value]='+encodeURIComponent($("#city option:selected").val())+'&node[field_kategorisi][und][value]='+encodeURIComponent($("input[name='kategori']:checked").val())+'&node[field_dogum_tarihi][und][value]='+encodeURIComponent($("#dob").val())+'&node[field_boy][und][value]='+encodeURIComponent($("select#height option:checked").val())+'&node[field_kilo][und][value]='+encodeURIComponent($("select#weight option:checked").val())+'&node[field_goz_rengi][und][value]='+encodeURIComponent($("select#eyecolour option:checked").val())+'&node[field_ten_rengi][und][value]='+encodeURIComponent($("select#skincolour option:checked").val())+'&node[field_ayak_no][und][value]='+encodeURIComponent($("select#shoesize option:checked").val())+'&node[field_egitim_duzeyi][und][value]='+encodeURIComponent($("select#education option:checked").val())+'&node[field_oyunculuk_egitimleri][und][value]='+encodeURIComponent($("#training").val())+'&node[field_diller][und][value]='+encodeURIComponent($("#languages").val())+'&node[field_beceriler][und][value]='+encodeURIComponent($("#skills").val())+'&node[field_kisisel][und][value]='+encodeURIComponent($("#personal").val())+'&node[field_videolar[und][video_url]='+encodeURIComponent($(".videolink").val())+'&node[field_videolar][und][description]='+encodeURIComponent($(".videodesc").val())+'&node[field_okudum_anladim][und][value]='+encodeURIComponent($(".privacy").is(':checked')?1:0),
      success:function() {
        window.location.href = "thanks.html";
      },
      error:function(xhr,status,message) {
        console.log(xhr);
        console.log(status);
        console.log(message);
        navigator.notification.alert("Kaydınızı oluşturamadık, daha sonra tekrar deneyin.", function(){return;}, "Hata", "Tamam");
      }
    });
  });
})
