document.addEventListener("deviceready", function() {
  if (window.location.pathname.split("/")[3] == "index.html") {
    checkStatus();
    checkNotifications();
  }
});

$("#navHolder #homeBtn").on("click", function() {
  window.location.href = "index.html";
});
$("#navHolder #notificationBtn").on("click", function() {
  window.location.href = "notifications.html";
});

function checkStatus() {
  navigator.notification.activityStart("Face in Cast", "Başlangıç kontrolleri yapılıyor, lütfen bekleyin");
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
          navigator.notification.activityStop();
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
        },
        error: function(xhr,status,message) {
          console.log(xhr);
          console.log(status);
          console.log(message);
        }
      });
    }
  });
}

function logout() {
  navigator.notification.confirm("Çıkış yapmak istiyor musunuz?", function(buttonIndex) {
    if (buttonIndex === 1) {
      navigator.notification.activityStart("Face in Cast","Çıkış yapılıyor, lütfen bekleyin");
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
              navigator.notification.activityStop();
              window.localStorage.removeItem("name");
              navigator.notification.alert("Başarıyla çıkış yapıldı", function() {return;},"Face in Cast","Tamam");
              $("#loginBtn").css("display","block");
              $("#logoutBtn").css("display","none");
              $("a[href='applications.html']").css("display","none");
              $("#loginHolder").text("");
              $("#notification").text("");
              $("#notification").css("display","none");
            }
          });
        }
      });
    }
  }, 'Onay', ['Evet', 'Hayır']);
}
function checkNotifications() {
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
        success: function(connect) {
          $.ajax({
            url: 'http://www.rejicast.com/duyurular.json',
            type: 'get',
            dataType: 'json',
            success: function (data) {
              var num = data.nodes.reduce(function(currNum, node) {
                if (node.node.field_kime.indexOf(connect.user.uid) !== -1) {
                  currNum++;
                }
                return currNum;
              }, 0);
              if (connect.user.uid > 0) {
                $("#notification").text(num);
                if (num === 0) {
                  $("#notification").css("display","none");
                } else {
                  $("#notification").css("display","block");
                }
              }
            }
          });
        }
      });
    }
  });
}
