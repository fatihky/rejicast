document.addEventListener("deviceready", function() {
  $("#shareViaEmail #email").on("click", function() {
    console.log('Clicked the email icon');
    window.plugins.socialsharing.shareViaEmail('http://www.rejicast.com/node/'+nid);
  });
  $("#shareViaWhatsApp #whatsapp").on("click", function() {
    console.log('Clicked the whatsaap icon');
    window.plugins.socialsharing.shareViaWhatsApp('http://www.rejicast.com/node/'+nid);
  });
  checkStatus();
});

$("#navHolder #homeBtn").on("click", function() {
  window.location.href = "index.html";
});
$("#navHolder #notificationBtn").on("click", function() {
  window.location.href = "notifications.html";
});
//checkStatus();

function checkStatus() {
  $(".loader-container > p").text("Başlangıç kontrolleri yapılıyor, lütfen bekleyin");
  $(".loader-container").show();
  $.ajax({
    url: 'http://www.rejicast.com/services/user/token.json',
    type: 'post',
    dataType: 'json',
    success: function(token) {
      $.ajax({
        url: 'http://www.rejicast.com/services/system/connect.json',
        type: 'post',
        dataType: 'json',
        beforeSend: function(r) {
          r.setRequestHeader("X-CSRF-Token", token.token)
        },
        success: function(data) {
          $(".loader-container").fadeOut(500);
          var duser = data.user;
          if (duser.uid === 0) {
            $("#loginBtn").css("display","block");
            $("#logoutBtn").css("display","none");
            $("a[href='applications.html']").css("display","none");
          } 
          else {
            $("#loginBtn").css("display","none");
            $("#logoutBtn").css("display","block");
            $("a[href='applications.html']").css("display","block");
            $("#loginHolder").text(data.user.name);
          }
        }
      });
    }
  });
}

function checkNumberofNot() {
  $.ajax({
    url: 'http://www.rejicast.com/genel-duyurular.json',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      console.log(JSON.stringify(data));
    }
  });
}

function logout() {
  navigator.notification.confirm("Çıkış yapmak istiyor musunuz?", function(buttonIndex) {
    if (buttonIndex === 1) {
      $(".loader-container > p").text("Çıkış yapılıyor, lütfen bekleyin");
      $(".loader-container").show();
      setTimeout(function() {
        $(".loader-container").fadeOut(500);
      }, 1000);
      $.ajax({
        url: 'http://www.rejicast.com/services/user/token.json',
        type: 'post',
        dataType: 'json',
        success: function(token) {
          $.ajax({
            url: 'http://www.rejicast.com/services/user/logout.json',
            type: 'post',
            dataType: 'json',
            beforeSend: function(r) {
              r.setRequestHeader("X-CSRF-Token", token.token)
            },
            success: function() {
              $(".loader-container > p").text("Başarıyla çıkış yapıldı");
              $(".loader-container").show();
              setTimeout(function() {
                $(".loader-container").fadeOut(500);
              }, 1000);
              $("#loginBtn").css("display","block");
              $("#logoutBtn").css("display","none");
              $("a[href='applications.html']").css("display","none");
              $("#loginHolder").text("");
            }
          })
        }
      });
    }
  }, 'Onay', ['Evet', 'Hayır']);
}
