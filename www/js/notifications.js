  $.ajax({
    url: 'http://www.rejicast.com/duyurular.json',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      console.log(JSON.stringify(data));
      $.each(data.nodes, function (key,value) {
        var announcement = $('<div class="generalNotification  ' + value.node.field_ozel_duyuru +' '+ value.node.field_kime +'"><h3>' + value.node.title + '</h3><p>' + value.node.field_icerik + '</div>');
        $('#contentHolder.notifications').append(announcement);
      });
    },
    error: function(xhr,status,message) {
      console.log(message);
    }
  });
