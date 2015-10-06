document.addEventListener("deviceready", function() {
  $("#uploadimage").on("click", function() {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality:100,
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
  image.css("display", "block");
  fileData = {
    "file":{
      "file":imageData,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageData.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
  imagedata=imageData;
}
function onFail() {
  setTimeout(function() { //iOS quirk for camera plugin
    navigator.notification.alert("Bir hata oluştu", function(){return;}, "Hata", "Tamam");
  }, 0);
}
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
  console.log(imagedata);
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileData,
    success:function(res) {
      console.log('result: '+JSON.stringify(res));
      $.ajax({
        url:'http://www.rejicast.com/services/create.json',
        type:'get',
        dataType:'json',
        data:'node[type]=oyuncu&node[field_oyuncu_fotografi][und][0][fid]='+res.fid+'&node[title]='+encodeURIComponent($("#name").val())+'&node[language]=und&node[field_tc_kimlik_no][und][0][value]='+encodeURIComponent($("#tckn").val())+'&node[field_sgk_durumu][und][value]='+encodeURIComponent($("#sgk option:selected").val())+'&node[field_telefon][und][0][value]='+encodeURIComponent($("#tel").val())+'&node[field_telefon_2][und][0][value]='+encodeURIComponent($("#tel2").val())+'&node[field_adres][und][0][value]='+encodeURIComponent($("#address").val())+'&node[field_yasadigi_sehir][und][value]='+encodeURIComponent($("#city option:selected").val())+'&node[field_e_posta][und][0][value]='+encodeURIComponent($("#email").val())+'&node[field_cinsiyet][und][value]='+encodeURIComponent($("#gender option:selected").val())+'&node[field_kategorisi][und][value]='+encodeURIComponent($("input[name='kategori']:checked").val())+'&node[field_dogum_tarihi][und][value]='+encodeURIComponent($("#dob").val())+'&node[field_boy][und][value]='+encodeURIComponent($("select#height option:checked").val())+'&node[field_kilo][und][value]='+encodeURIComponent($("select#weight option:selected").val())+'&node[field_goz_rengi][und][value]='+encodeURIComponent($("select#eyecolour option:selected").val())+'&node[field_ten_rengi][und][value]='+encodeURIComponent($("select#skincolour option:selected").val())+'&node[field_ayak_no][und][value]='+encodeURIComponent($("select#shoesize option:selected").val())+'&node[field_egitim_duzeyi][und][value]='+encodeURIComponent($("select#education option:selected").val())+'&node[field_oyunculuk_egitimleri][und][0][value]='+encodeURIComponent($("#training").val())+'&node[field_diller][und][0][value]='+encodeURIComponent($("#languages").val())+'&node[field_beceriler][und][0][value]='+encodeURIComponent($("#skills").val())+'&node[field_kisisel][und][0][value]='+encodeURIComponent($("#personal").val())+'&node[field_videolar[und][0][video_url]='+encodeURIComponent($(".videolink").val())+'&node[field_videolar][und][0][description]='+encodeURIComponent($(".videodesc").val())+'&node[field_okudum_anladim][und][value]='+encodeURIComponent($(".privacy").is(':selected')?1:0),
        success:function(data) {
          console.log(JSON.stringify(data));
          alert('Tamam');
          window.location.href = "thanks.html";
        },
        error:function(xhr,status,message) {
          console.log(xhr);
          console.log(status);
          console.log(message);
          navigator.notification.alert("Kaydınızı oluşturamadık, daha sonra tekrar deneyin.", function(){return;}, "Hata", "Tamam");
        }
      });
    },
    error:function(xhr,status,message) {
      console.log(xhr);
      console.log(status);
      console.log(message);
    }
  });
});
/*
$(document).ready(function() {
  $('#profilepicture #image').cropper();
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
});
*/
