document.addEventListener("deviceready", function() {
    myApplications();
});
function myApplications() {
    navigator.notification.activityStart("Face in Cast","Oyuncu listesi alınıyor");
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
                    $.ajax({
                        url: 'http://www.rejicast.com/oyuncularim.json',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            uid: data.user.uid
                        },
                        success: function (data) {
                            navigator.notification.activityStop();
                            $.each(data.nodes, function (key, value) {
                                var profile = $('<div class="profile"><img class="profileImage" data-nid="' + value.node.nid + '" src="' + value.node.field_oyuncu_fotografi.src + '"><div class="profileName">' + value.node.field_gosterilecek_ad+ '</div></div>');
                                $("#contentHolder.applications").append(profile);
                                window.scrollTo(0,0);
                            });
                            $(".profileImage").on("click", function(ev) {
                                localStorage.setItem("nid",$(ev.target).attr("data-nid"));
                                window.location.href = "profile.html";
                            });
                        }
                    });
                }
            });
        }
    });
}
