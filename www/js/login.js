$('#login').on('click', function () {
    $(".loader-container > p").text("Giriş yapılıyor");
    $(".loader-container").show();
    var name = $('#username').val();
    if (!name) {
        navigator.notification.alert("Lütfen kullanıcı adınızı girin.");
        return false;
    }
    var pass = $('#password').val();
    if (!pass) {
        navigator.notification.alert("Lütfen şifrenizi girin.");
        return false;
    }
    $.ajax({
        url: 'http://www.rejicast.com/services/user/token.json',
        type: 'post',
        dataType: 'json',
        success: function(token) {
            $.ajax({
                url: 'http://www.rejicast.com/services/user/login.json',
                type: 'post',
                dataType: 'json',
                data: 'username='+name.trim()+'&password='+pass,
                beforeSend: function(request) {
                    request.setRequestHeader("X-CSRF-Token", token.token);
                },
                statusCode: {
                    401: function() {
                        navigator.notification.alert("Kullanıcı adı ya da şifreniz yanlış");
                    }
                },
                success: function (data) {
                    var uid=data.user.uid;
                    $(".loader-container > p").text("Hoşgeldin "+data.user.name);
                    setTimeout(function() {
                        $(".loader-container").fadeOut(500);
                    }, 1000);
                    checkNumberofNot();
                    $("#loginBtn").css("display","none");
                    $("#logoutBtn").css("display","block");
                    $("#loginHolder").text(data.user.name);
                    window.location.href = "index.html";
                    /*
                    $.mobile.changePage("index.html", {reloadPage:true},{allowSamePageTransition:true},{transition:'slide'});
                    */
                    checkStatus();
                }
            });
            return false;
        },
    });
});
