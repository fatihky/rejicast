document.addEventListener("deviceready", startUp, false);
document.addEventListener("resume", startUp, false);

function startUp() {
  $("#navHolder #homeBtn").on("click", function(){
    $.mobile.changePage("index.html", "slide");
  });
  $("#navHolder #notificationBtn").on("click", function(){
    $.mobile.changePage("notifications.html", "slide");
    $.ajax({
      url: 'http://www.rejicast.com/genel-duyurular.json',
      type: 'get',
      dataType: 'json',
      success: function (data) {
        $.each(data.nodes, function (key,value) {
          var announcement = $('<div class="generalNotification  ' + value.node.field_ozel_duyuru +' '+ value.node.field_kime +'"><h3>' + value.node.title + '</h3><p>' + value.node.field_icerik + '</div>');
          $('#contentHolder.notifications').append(announcement);
        });
      }
    })
  });
  $.ajax({
    url: 'http://www.rejicast.com/services/system/connect',
    type: 'post',
    dataType: 'json',
    success: function(data) {
      console.log(JSON.stringify(data));
    }
  });
}
