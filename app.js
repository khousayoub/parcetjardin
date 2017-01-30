function LoadAdditionalData()
{
    //create the queryUrl to be used in the service call
    var query = "http://dataprovence.cloudapp.net:8080/v1/dataprovencetourisme/ParcsEtJardins?&format=json&callback=?";
    var filter = "";
    var queryUrl = query + filter;
    //make jquery call to service
    let a = $.getJSON(queryUrl, null, AdditionalData_Loaded);
}
function AdditionalData_Loaded(data)
{

  var container=document.getElementById("container");
  var menu = document.getElementById('menu');
  var ville = document.getElementById('ville');
// add data in the menu bar
  for (var i=0; i < data.d.length; i++)
  {
    var div = AddDivContents(data.d, i, "raisonsociale");
    div.className += "bloc btn-block btn btn-default list";
    div.setAttribute("id",i);
    menu.appendChild(div);
  }
// addeventlisteners
  $(".list").click(function(){
    $( "#infos" ).slideUp("fast");
    let id = $(this)[0].id;
    // get the informations from the tuple
    $("#ville").text(data.d[id]["ville"]);
    $("#type").text(data.d[id]["type"]);
    $("#voie").text(data.d[id]["voie"]);
    $("#typevoie").text(data.d[id]["typevoie"]);
    $("#codepostal").text(data.d[id]["codepostal"]);
    $("#raisonsociale").text( data.d[id]["raisonsociale"]);
    $("#telephone").text(data.d[id]["tlphone"]);
    $("#soustype").text(data.d[id]["soustype"]);
    $("#mail").text(data.d[id]["mail"]);
    $("#numro").text(data.d[id]["numro"]);
    let loc = { lat:parseFloat(data.d[id]["latitude"]) ,lng:parseFloat(data.d[id]["longitude"]) };
    initMap(loc.lat,loc.lng);
    $( "#infos" ).slideDown( "slow" );
  });
}
  function initMap(a,b) {
    var myLatLng = {lat: a, lng: b};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!',
    });
}
//add div titre
function AddDivContents(data, cell, id)
{
    var elem=document.createElement('DIV');
    var dataCell = data[cell][id];
    elem.appendChild(document.createTextNode(dataCell));

    return elem;
}
// GOogle API GOOGLE MAPS
$(document).ready(function() {
    initMap(-25.363,131.044);
    LoadAdditionalData();
    event.preventDefault();
});
