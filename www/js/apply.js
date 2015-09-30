document.addEventListener("deviceready", function() {
  $("#uploadimage").on("click", function() {
    console.log("Clicked");
    navigator.camera.getPicture(onSuccess, onFail, {
      quality:50,
      allowEdit:true,
      targetWidth:200,
      targetHeight:200,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
});
function onSuccess(imageData) {
  var image = $("img#image");
  image.attr("src", "data:image/jpeg;base64," + imageData);
}
function onFail() {
  setTimeout(function() { //iOS quirk for camera plugin
    navigator.notification.alert("Bir hata oluştu", function(){return;}, "Hata", "Tamam");
  }, 0);
}
$(function() {
  $('#profilepicture #image').cropper();
});
$('#profilepicture #image').cropper({
  aspectRatio: 16 / 9,
  crop: function(e) {
    console.log(e.x);
    console.log(e.y);
    console.log(e.width);
    console.log(e.height);
    console.log(e.rotate);
    console.log(e.scaleX);
    console.log(e.scaleY);
  }
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
    data:'node[type]=oyuncu&node[title]='+encodeURIComponent($("#name").val())+'&node[language]=und&node[field_tc_kimlik_no][und][0][value]='+encodeURIComponent($("#tckn").val())+'&node[field_sgk_durumu][und][0][value]='+encodeURIComponent($("#sgk option:selected").val())+'&node[field_telefon][und][0][value]='+encodeURIComponent($("#tel").val())+'&node[field_telefon_2][und][0][value]='+encodeURIComponent($("#tel2").val())+'&node[field_adres][und][0][value]='+encodeURIComponent($("#address").val())+'&node[field_yasadigi_sehir][und][0][value]='+encodeURIComponent($("#city option:selected").val())+'&node[field_kategorisi][und][0][value]='+encodeURIComponent($("input[name='kategori']:checked").val())+'&node[field_dogum_tarihi][und][0][value]='+encodeURIComponent($("#dob").val())+'&node[field_boy][und][0][value]='+encodeURIComponent($("select#height option:checked").val())+'&node[field_kilo][und][0][value]='+encodeURIComponent($("select#weight option:checked").val())+'&node[field_goz_rengi][und][0][value]='+encodeURIComponent($("select#eyecolour option:checked").val())+'&node[field_ten_rengi][und][0][value]='+encodeURIComponent($("select#skincolour option:checked").val())+'&node[field_ayak_no][und][0][value]='+encodeURIComponent($("select#shoesize option:checked").val())+'&node[field_egitim_duzeyi][und][0][value]='+encodeURIComponent($("select#education option:checked").val())+'&node[field_oyunculuk_egitimleri][und][0][value]='+encodeURIComponent($("#training").val())+'&node[field_diller][und][0][value]='+encodeURIComponent($("#languages").val())+'&node[field_beceriler][und][0][value]='+encodeURIComponent($("#skills").val())+'&node[field_kisisel][und][0][value]='+encodeURIComponent($("#personal").val())+'&node[field_videolar[und][0][video_url]='+encodeURIComponent($(".videolink").val())+'&node[field_videolar][und][0][description]='+encodeURIComponent($(".videodesc").val())+'&node[field_okudum_anladim][und][0][value]='+encodeURIComponent($(".privacy").is(':checked')?1:0),
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
