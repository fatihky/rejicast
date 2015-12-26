$('#login').on('click', function () {
    navigator.notification.activityStart("Face in Cast","Giriş yapılıyor");
    var name = $('#username').val();
    if (!name) {
        navigator.notification.alert("Lütfen kullanıcı adınızı girin.", function(){return;}, "Hata", "Tamam");
        return false;
    }
    var pass = $('#password').val();
    if (!pass) {
        navigator.notification.alert("Lütfen şifrenizi girin.", function(){return;}, "Hata", "Tamam");
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
                        navigator.notification.alert("Kullanıcı adı ya da şifreniz yanlış", function(){return;}, "Hata", "Tamam");
                    }
                },
                success: function (data) {
                    var uid=data.user.uid;
                    localStorage.setItem("user", uid);
                    navigator.notification.alert("Başarıyla giriş yapıldı. Hoşgeldin "+data.user.name, function(){return;},"Face in Cast","Hoşbulduk");
                    $("#loginBtn").hide();
                    $("#logoutBtn").show();
                    $("#loginHolder").text(data.user.name);
                    window.location.href = "index.html";
                },
                error: function(xhr, status, message) {
                    console.log(xhr);
                    console.log(status);
                    console.log(message);
                }
            });
            return false;
        },
    });
});
