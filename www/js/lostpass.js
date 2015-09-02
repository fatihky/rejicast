$("#lostpassbtn").on("click", function(){
  if (!$("#lostpass").val()) {
    alert("Lütfen geçerli bir e-posta adresi giriniz")
  } else {
    $.ajax({
      url: "http://www.rejicast.com/services/user/password_reset.json",
      type: "post",
      data: {
        mail: encodeURIComponent($("#lostpass").val())
      },
      dataType: "json",
    })
  }
})
