document.addEventListener("deviceready", function() {
  $("#uploadpicture").on("click", function() {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality:100,
      allowEdit:true,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
  $("#uploadotherpicture").on("click", function() { // TODO: Work on uploading multiple pictures.
    navigator.camera.getPicture(onSuccessOther, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  $("#uploadotherpicture-2").on("click", function() { // TODO: Work on uploading multiple pictures.
    navigator.camera.getPicture(onSuccessOther2, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  $("#uploadotherpicture-3").on("click", function() { // TODO: Work on uploading multiple pictures.
    navigator.camera.getPicture(onSuccessOther3, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  $("#uploadotherpicture-4").on("click", function() { // TODO: Work on uploading multiple pictures.
    navigator.camera.getPicture(onSuccessOther4, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  $("#uploadotherpicture-5").on("click", function() { // TODO: Work on uploading multiple pictures.
    navigator.camera.getPicture(onSuccessOther5, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
    /*
    window.imagePicker.getPictures(
      function(res) {
        for (var x = 0;x<res.length;x++) {
          var canvas = $("<canvas />");
          var ctx = canvas[0].getContext("2d");
          var img = new Image();
          img.src = res[x];
          img.onload = function() {
            ctx.drawImage(img, 0, 0);
          }
          $("#otherpicture").append(canvas);
          canvas.css("display", "block");
        }
      }
    );
    */
  });
});
function onSuccess(imageData) {
  var image = $("img#picture");
  image.attr("src", "data:image/jpeg;base64,"+imageData);
  image.css("display", "block");
  fileData = {
    "file":{
      "file":imageData,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageData.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
}
function onSuccessOther(imageDataOther) {
  var image = $("img#otherpicture");
  image.attr("src", "data:image/jpeg;base64,"+imageDataOther);
  image.css("display", "block");
  $("uploadotherpicture-2").css("display", "block");
  fileDataOther = {
    "file":{
      "file":imageDataOther,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
}
function onSuccessOther2(imageDataOther2) {
  var image = $("img#otherpicture-2");
  image.attr("src", "data:image/jpeg;base64,"+imageDataOther2);
  image.css("display", "block");
  $("uploadotherpicture-3").css("display", "block");
  fileDataOther2 = {
    "file":{
      "file":imageDataOther2,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther2.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
}
function onSuccessOther3(imageDataOther3) {
  var image = $("img#otherpicture-3");
  image.attr("src", "data:image/jpeg;base64,"+imageDataOther3);
  image.css("display", "block");
  $("uploadotherpicture-4").css("display", "block");
  fileDataOther3 = {
    "file":{
      "file":imageDataOther3,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther3.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
}
function onSuccessOther4(imageDataOther4) {
  var image = $("img#otherpicture-4");
  image.attr("src", "data:image/jpeg;base64,"+imageDataOther4);
  image.css("display", "block");
  $("uploadotherpicture-4").css("display", "block");
  fileDataOther4 = {
    "file":{
      "file":imageDataOther4,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther4.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
}
function onSuccessOther5(imageDataOther5) {
  var image = $("img#otherpicture");
  image.attr("src", "data:image/jpeg;base64,"+imageDataOther5);
  image.css("display", "block");
  $("id^='uploadotherpicture'").css("display", "none");
  fileDataOther5 = {
    "file":{
      "file":imageDataOther5,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther5.replace(/\//g,"").replace(/\+/g,"").substr(0,10)+".jpg"
    }
  };
}
function onFail() {
  setTimeout(function() { //iOS quirk for camera plugin
    navigator.notification.alert("Bir hata oluştu", function(){return;}, "Hata", "Tamam");
  }, 0);
}

/*
   $("#addmorevideos").on("click", function () {
   var tr = $(".videos").first().clone();
   tr.find('input').val('');
   $("#videos").append(tr);
   });
   */
$("#category").on("change", function() {
  if ($(this).val() == "stand_hostesi") {
    $(".stand_hostesi").css("display", "block");
  }
});
$("#tel").mask("999 999-9999");
$("#tel2").mask("999 999-9999");
$("#apply").on("click", function() {
  $(".loader-container > p").text("Kaydınız yapılıyor, lütfen bekleyin");
  $(".loader-container").show();
  monthNames = [
    "Oca", "Şub", "Mar",
    "Nis", "May", "Haz", "Tem",
    "Ağu", "Eyl", "Eki",
    "Kas", "Ara"
  ];
  date = new Date($("#dob").val());
  day = date.getDate();
  monthIndex = date.getMonth();
  year = date.getFullYear();
  finalDate = day+' '+monthNames[monthIndex]+' '+year;
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileData,
    success:function(res) {
      $.ajax({
        url:'http://www.rejicast.com/services/file.json',
        type:'post',
        dataType:'json',
        data:fileDataOther,
        success:function(resOther) {
          $.ajax({
            url:'http://www.rejicast.com/services/node.json',
            type:'post',
            dataType:'json',
            data:'node[type]=oyuncu&node[field_oyuncu_fotografi][und][0][fid]='+res.fid+'&node[field_oyuncu_fotografi][und][0][cropbox_x]=0&node[field_oyuncu_fotografi][und][0][cropbox_y]=0&node[field_oyuncu_fotografi][und][0][cropbox_height]=800&node[field_oyuncu_fotografi][und][0][cropbox_width]=600&node[title]='+encodeURIComponent($("#name").val())+'&node[language]=und&node[field_tc_kimlik_no][und][0][value]='+encodeURIComponent($("#tckn").val())+'&node[field_sgk_durumu][und][value]='+encodeURIComponent($("#sgk option:selected").val())+'&node[field_telefon][und][0][value]='+encodeURIComponent($("#tel").val())+'&node[field_telefon_2][und][0][value]='+encodeURIComponent($("#tel2").val())+'&node[field_adres][und][0][value]='+encodeURIComponent($("#address").val())+'&node[field_yasadigi_sehir][und][value]='+encodeURIComponent($("#city option:selected").val())+'&node[field_e_posta][und][0][value]='+encodeURIComponent($("#email").val())+'&node[field_cinsiyet][und][value]='+encodeURIComponent($("#gender option:selected").val())+'&node[field_kategorisi][und][value]='+$("#category option:checked").val()+'&node[field_gogus][und][value]='+$("#chest option:selected").val()+'&node[field_bel][und][value]='+$("#waist option:selected").val()+'&node[field_kalca][und][value]='+$("#thigh option:selected").val()+'&node[field_dogum_tarihi][und][0][value][date]='+finalDate+'&node[field_boy][und][value]='+encodeURIComponent($("#height option:checked").val())+'&node[field_kilo][und][value]='+encodeURIComponent($("#weight option:selected").val())+'&node[field_goz_rengi][und][value]='+encodeURIComponent($("#eyecolour option:selected").val())+'&node[field_ten_rengi][und][value]='+encodeURIComponent($("#skincolour option:selected").val())+'&node[field_ayak_no][und][value]='+encodeURIComponent($("#shoesize option:selected").val())+'&node[field_egitim_duzeyi][und][value]='+encodeURIComponent($("#education option:selected").val())+'&node[field_oyunculuk_egitimleri][und][0][value]='+encodeURIComponent($("#training").val())+'&node[field_diller][und][0][value]='+encodeURIComponent($("#languages").val())+'&node[field_beceriler][und][0][value]='+encodeURIComponent($("#skills").val())+'&node[field_kisisel][und][0][value]='+encodeURIComponent($("#personal").val())+'&node[field_fotograflar][und][0][fid]='+resOther.fid+'&node[field_videolar][und][0][video_url]='+encodeURIComponent($(".videolink").val())+'&node[field_videolar][und][0][description]='+encodeURIComponent($(".videodesc").val())+'&node[field_okudum_anladim][und][value]='+encodeURIComponent($(".privacy").is(':selected')?1:0),
            success:function(data) {
              $(".loader-container").text("Kaydınız başarıyla yapıldı");
              setTimeout(function() {
                $(".loader-container").fadeOut(500);
              },1000);
              console.log(JSON.stringify(data));
              window.location.href = "received.html";
            },
            error:function(xhr,status,message) {
              console.log(xhr);
              console.log(status);
              console.log(message);
              navigator.notification.alert("Eksik bırakılan alan var, lütfen doldurup tekrar deneyin.", function(){return;}, "Hata", "Tamam");
            }
          });
        },
        error:function(xhr,status,message) {
          console.log(xhr);
          console.log(status);
          console.log(message);
        }
      });
    }
  });
});
