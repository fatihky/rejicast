$(function() {
  $("#lostpassbtn").on("click", function(){
    if (!$("#lostpass").val()) {
      alert("Lütfen kullanıcı adınızı giriniz")
    } else {
      $.ajax({
        url: "http://www.rejicast.com/services/user/request_new_password.json",
        type: "post",
        dataType: "json",
        data: {
          name: encodeURIComponent($("#lostpass").val())
        },
        success: function() {
          alert("Şifre sıfırlama talimatları kayıtlı e-posta adresinize gönderildi, lütfen kontrol ediniz.");
          $.mobile.changePage("login.html", "slide");
        },
      })
    }
  });
});
