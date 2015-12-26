document.addEventListener("deviceready", function() {
  fids = [];
  $("#uploadpicture").on("click", function() {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
  $("#uploadotherpicture").on("click", function() {
    navigator.camera.getPicture(onSuccessOther, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
  $("#uploadotherpicture-2").on("click", function() {
    navigator.camera.getPicture(onSuccessOther2, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
  $("#uploadotherpicture-3").on("click", function() {
    navigator.camera.getPicture(onSuccessOther3, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
  $("#uploadotherpicture-4").on("click", function() {
    navigator.camera.getPicture(onSuccessOther4, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
  $("#uploadotherpicture-5").on("click", function() {
    navigator.camera.getPicture(onSuccessOther5, onFail, {
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    });
  });
});
function onSuccess(imageData) {
  var image = $("img#picture");
  image.attr("src", "data:image/jpeg;base64,"+imageData);
  image.show();
  fileData = {
    "file":{
      "file": imageData,
      "filename": "rejicast.jpg",
      "filepath": "public://"+imageData.replace(/\//g,"").replace(/\+/g,"").slice(-10)+".jpg"
    }
  };
  $("#uploadpicture").hide();
  imagedata = imageData;
  var cropper = null;
  var cropper_loaded = false;
  var $p = image;
  createCropper();
  getCroppedProfileImage = function () {
    var data = getDataURL();
    var str = data.replace(/data:image\/\w+;base64,/, '');
    return str;
  }
  function getDataURL() {
    var _self = cropper;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.drawImage(_self.$image.get(0),
                  _self.result.cropX, _self.result.cropY,
                  _self.result.cropW, _self.result.cropH,
                  0, 0,
                  600, 800);
                  return canvas.toDataURL('image/jpeg');
  }
  function destroyCropper() {
    if (cropper !== null)
      cropper.remove();
    cropper = null;
    cropper_loaded = false;
  }
  function createCropper() {
    destroyCropper();
    var w = (screen.width * 60) / 100;
    var h = (w * 4) / 3;
    cropper = $p.cropbox({
      width: w, // 300,
      height: h, // 400,
      setCrop: {
        cropX: 0,
        cropY: 0,
        cropW: 600,
        cropH: 800
      }
    }, function() {
      cropper = this;
      cropper_loaded = true;
    });
    cropper.on('cropbox', function(e, data) {
      var ratio = data.cropW / data.cropH;
    });
  }
}
function onSuccessOther(imageDataOther) {
  var imageOther = $("img#otherpicture");
  imageOther.attr("src", "data:image/jpeg;base64,"+imageDataOther);
  imageOther.show();
  $("#uploadotherpicture").hide();
  $("#uploadotherpicture-2").show();
  fileDataOther = {
    "file":{
      "file":imageDataOther,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther.replace(/\//g,"").replace(/\+/g,"").slice(-10)+Date.now()+".jpg"
    }
  };
  navigator.notification.activityStart('Face in Cast','Fotoğraf yükleniyor, lütfen bekleyin');
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileDataOther,
    success:function(resOther) {
      navigator.notification.activityStop();
      fids.push(resOther.fid);
    }
  });
}
function onSuccessOther2(imageDataOther2) {
  var imageOther2 = $("img#otherpicture-2");
  imageOther2.attr("src", "data:image/jpeg;base64,"+imageDataOther2);
  imageOther2.show();
  $("#uploadotherpicture-2").hide();
  $("#uploadotherpicture-3").show();
  fileDataOther2 = {
    "file":{
      "file":imageDataOther2,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther2.replace(/\//g,"").replace(/\+/g,"").slice(-10)+Date.now()+".jpg"
    }
  };
  navigator.notification.activityStart('Face in Cast','Fotoğraf yükleniyor, lütfen bekleyin');
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileDataOther2,
    success:function(resOther2) {
      navigator.notification.activityStop();
      fids.push(resOther2.fid);
    }
  });
}
function onSuccessOther3(imageDataOther3) {
  var imageOther3 = $("img#otherpicture-3");
  imageOther3.attr("src", "data:image/jpeg;base64,"+imageDataOther3);
  imageOther3.show();
  $("#uploadotherpicture-3").hide();
  $("#uploadotherpicture-4").show();
  fileDataOther3 = {
    "file":{
      "file":imageDataOther3,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther3.replace(/\//g,"").replace(/\+/g,"").slice(-10)+Date.now()+".jpg"
    }
  };
  navigator.notification.activityStart('Face in Cast','Fotoğraf yükleniyor, lütfen bekleyin');
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileDataOther3,
    success:function(resOther3) {
      navigator.notification.activityStop();
      fids.push(resOther3.fid);
    }
  });
}
function onSuccessOther4(imageDataOther4) {
  var imageOther4 = $("img#otherpicture-4");
  imageOther4.attr("src", "data:image/jpeg;base64,"+imageDataOther4);
  imageOther4.show();
  $("#uploadotherpicture-4").hide();
  $("#uploadotherpicture-5").show();
  fileDataOther4 = {
    "file":{
      "file":imageDataOther4,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther4.replace(/\//g,"").replace(/\+/g,"").slice(-10)+Date.now()+".jpg"
    }
  };
  navigator.notification.activityStart('Face in Cast','Fotoğraf yükleniyor, lütfen bekleyin');
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileDataOther4,
    success:function(resOther4) {
      navigator.notification.activityStop();
      fids.push(resOther4.fid);
    }
  });
}
function onSuccessOther5(imageDataOther5) {
  var imageOther5 = $("img#otherpicture-5");
  imageOther5.attr("src", "data:image/jpeg;base64,"+imageDataOther5);
  imageOther5.show();
  $("#uploadotherpicture-5").hide();
  fileDataOther5 = {
    "file":{
      "file":imageDataOther5,
      "filename":"rejicast.jpg",
      "filepath":"public://"+imageDataOther5.replace(/\//g,"").replace(/\+/g,"").slice(-10)+Date.now()+".jpg"
    }
  };
  navigator.notification.activityStart('Face in Cast','Fotoğraf yükleniyor, lütfen bekleyin');
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileDataOther5,
    success:function(resOther5) {
      navigator.notification.activityStop();
      fids.push(resOther5.fid);
    }
  });
}
function onFail() {
  setTimeout(function() {
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
$("input[type='checkbox']").on("change", function() {
  if ($(this).val() == "stand_hostesi") {
    $(".stand_hostesi").toggleClass("hidden");
  }
});
$("#tel").mask("999 999-9999");
$("#tel2").mask("999 999-9999");
$("#apply").on("click", function() {
  navigator.notification.activityStart("Face in Cast", "Kaydınız yapılıyor, lütfen bekleyin");
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
  fileData.file = {
    "filename": "rejicast.jpg",
    "file": getCroppedProfileImage(),
    "filepath": "public://"+getCroppedProfileImage().replace(/\//g,"").replace(/\+/g,"").slice(-10)+Date.now()+".jpg"
  };
  $.ajax({
    url:'http://www.rejicast.com/services/file.json',
    type:'post',
    dataType:'json',
    data:fileData,
    success:function(res) {
      var fid = '';
      $.each(fids, function(k,v) {
        fid += '&node[field_fotograflar][und]['+k+'][fid]='+v;
      });
      var cat = '';
      $('#oyuncuKategori input:checked').each(function(k,v) {
        cat += '&node[field_kategorisi][und]['+k+']='+$(this).attr('id');
      });
      $.ajax({
        url:'http://www.rejicast.com/services/create.json',
        type:'post',
        dataType:'json',
        data:'node[type]=oyuncu&node[field_oyuncu_fotografi][und][0][fid]='+res.fid+'&node[field_oyuncu_fotografi][und][0][cropbox_x]=0&node[field_oyuncu_fotografi][und][0][cropbox_y]=0&node[field_oyuncu_fotografi][und][0][cropbox_height]=800&node[field_oyuncu_fotografi][und][0][cropbox_width]=600&node[title]='+encodeURIComponent($("#name").val())+'&node[language]=und&node[field_tc_kimlik_no][und][0][value]='+encodeURIComponent($("#tckn").val())+'&node[field_sgk_durumu][und][value]='+encodeURIComponent($("#sgk option:selected").val())+'&node[field_telefon][und][0][value]='+encodeURIComponent($("#tel").val())+'&node[field_telefon_2][und][0][value]='+encodeURIComponent($("#tel2").val())+'&node[field_adres][und][0][value]='+encodeURIComponent($("#address").val())+'&node[field_yasadigi_sehir][und][value]='+encodeURIComponent($("#city option:selected").val())+'&node[field_e_posta][und][0][value]='+encodeURIComponent($("#email").val())+'&node[field_cinsiyet][und][value]='+encodeURIComponent($("#gender option:selected").val())+cat+'&node[field_gogus][und][value]='+$("#chest option:selected").val()+'&node[field_bel][und][value]='+$("#waist option:selected").val()+'&node[field_kalca][und][value]='+$("#thigh option:selected").val()+'&node[field_dogum_tarihi][und][0][value][date]='+finalDate+'&node[field_boy][und][value]='+encodeURIComponent($("#height option:checked").val())+'&node[field_kilo][und][value]='+encodeURIComponent($("#weight option:selected").val())+'&node[field_goz_rengi][und][value]='+encodeURIComponent($("#eyecolour option:selected").val())+'&node[field_ten_rengi][und][value]='+encodeURIComponent($("#skincolour option:selected").val())+'&node[field_ayak_no][und][value]='+encodeURIComponent($("#shoesize option:selected").val())+'&node[field_egitim_duzeyi][und][value]='+encodeURIComponent($("#education option:selected").val())+'&node[field_oyunculuk_egitimleri][und][0][value]='+encodeURIComponent($("#training").val())+'&node[field_diller][und][0][value]='+encodeURIComponent($("#languages").val())+'&node[field_beceriler][und][0][value]='+encodeURIComponent($("#skills").val())+'&node[field_kisisel][und][0][value]='+encodeURIComponent($("#personal").val())+fid+'&node[field_videolar][und][0][video_url]='+encodeURIComponent($(".videolink").val())+'&node[field_videolar][und][0][description]='+encodeURIComponent($(".videodesc").val())+'&node[field_okudum_anladim][und][value]='+encodeURIComponent($(".privacy").is(':selected')?1:0),
        success:function(data) {
          navigator.notification.activityStop();
          navigator.notification.alert("Kaydınız başarıyla yapıldı", function() {return;}, "Face in Cast", "Tamam");
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
});
