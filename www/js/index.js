document.addEventListener("deviceready", deviceReady);
document.addEventListener("resume", resume);

function deviceReady() {
  $("#navHolder #homeBtn").on("click", returnHome);
  $("#navHolder #notificationBtn").on("click", checkNotification);
  checkStatus();
  share();
}

function checkStatus() {
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

function resume() {
  $("#navHolder #homeBtn").on("click", returnHome);
  $("#navHolder #notificationBtn").on("click", checkNotification);
}

function returnHome() {
  $.mobile.changePage("index.html", "slide");
}

function checkNotification() {
  $.mobile.changePage("notifications.html", "slide");
  $.ajax({
    url: 'http://www.rejicast.com/genel-duyurular.json',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      console.log(JSON.stringify(data));
      $.each(data.nodes, function (key,value) {
        var announcement = $('<div class="generalNotification  ' + value.node.field_ozel_duyuru +' '+ value.node.field_kime +'"><h3>' + value.node.title + '</h3><p>' + value.node.field_icerik + '</div>');
        $('#contentHolder.notifications').append(announcement);
      });
    }
  });
}

function logout() {
  if (confirm("Çıkış yapmak istiyor musunuz?")) {
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
            $("#loginHolder").text("");
          }
        })
      }
    });
  }
}

function share() {
    $(".share").on("mousedown", function() {
        console.log('Clicked the share div');
        //ndow.plugins.socialsharing.shareViaEmail('http://www.rejicast.com/node/'+nid);
    });
    $("#shareViaEmail").on("click", function() {
        console.log('Clicked the email icon');
        window.plugins.socialsharing.shareViaEmail('http://www.rejicast.com/node/'+nid);
    });
    $("#shareViaWhatsApp").on("click", function() {
        console.log('Clicked the whatsaap icon');
        window.plugins.socialsharing.shareViaWhatsApp('http://www.rejicast.com/node/'+nid);
    });
}
