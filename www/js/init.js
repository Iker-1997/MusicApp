(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.tabs').tabs({ "swipeable": true });

  });
})(jQuery);


$("button").click(function() {
  banda = $('#buscador').val();
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query="+banda,
    dataType: "json",
  }).done(function(msg){
    showResults(msg);
  }).fail(function(){
    alert("Ajax Error");
  });
});

function showResults(result) {
  $('.collection:first-of-type').empty();
  var bandas = result["artists"];
  for (const banda of bandas) {
    $('.collection:first-of-type').append('<li artistid="'+banda["id"]+'" class="collection-item" style="background-color: aqua;">'+banda["name"]+' - '+banda["type"]+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></li>');
  }

  $('.secondary-content').click(function() {

    varParent = $(this).parent();
    parentText = varParent.clone().children().remove().end().text();

    var tabs = document.getElementById("tabs-swipe-demo");
    var tabsInstance = M.Tabs.getInstance(tabs);
    tabsInstance.select("test-swipe-2");
    
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+varParent.attr("artistid"),
      dataType: "json",
    }).done(function(msg){
      showDetails(msg);
    }).fail(function(){
      alert("Ajax Error");
    });
  });
}

function showDetails(info) {
  $('.details').empty();
  console.log(info);
  console.log(info["name"]);
  $('<h3>'+info["name"]+'</h3>').appendTo('.details');
  $('<p><b>Type:</b> '+info["type"]+'</p>').appendTo('.details');
  $('<p><b>Country:</b> '+info["area"]["sort-name"]+'</p>').appendTo('.details');
  $('<p><b>Birth day / Group fomation:</b> '+info["life-span"]["begin"]+'</p>').appendTo('.details');
  if(info["life-span"]["ended"] ==  true){
    $('<p><b>Death:</b> '+info["life-span"]["end"]+'</p>').appendTo('.details');
  }
  
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}
