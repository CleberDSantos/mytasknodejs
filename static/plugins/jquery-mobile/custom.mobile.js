// custom.mobile.js aqui está a mágica desabilitar o ajax do JQM
$(document).bind("mobileinit", function(){
  $.mobile.ajaxEnabled = false;
});