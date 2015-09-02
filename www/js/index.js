$(document).on("deviceready resume", function(){
  $("#homeBtn").on("click", function(){
    $mobile.changePage("index.html", "slide");
  });
});
