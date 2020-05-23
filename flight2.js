//flight info API

  $("#submit").on("click", function(){

    event.preventDefault();
    ajax();

    $("#home").val("");
    $("#destination").val("");
   $("#startdate").val("");
    $("#returndate").val("");

});

function ajax(){

    var origin = $("#home").val().trim();
    var destination = $("#destination").val().trim();
    var outbound = $("#startdate").val().trim();
    var inbound = $("#returndate").val().trim();

    console.log(origin);
    console.log(destination);
    console.log(outbound);
    console.log(inbound);

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" + origin + "/" + destination + "/" + outbound + "?inboundpartialdate= "+ inbound,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "80210217ddmsh14e31a87a18c557p17d964jsnd687cd2bb387"
	}
};

$.ajax(settings).done(function (response) {
    console.log(response);

    $("#origin").text("Origin: " + response.Places[0].Name);
    $("#destinationDiv").text("Destination:" + response.Places[1].Name);

    var carrier = response.Carriers;
    var quote = response.Quotes;

    //function for airline quotes available

    for (var i=0; i<quote.length; i++){
        console.log(quote[i].MinPrice);
        console.log(quote[i].OutboundLeg.DepartureDate);
        var tBody = $("tbody");
        var tRow = $("<tr>");
        var flightPrice = $("<td>");
        var flightDate = $("<td>");
        var carrierId = $("<td>");
        var carrierName = $("<td>");
       for(c of carrier){
         if (c.CarrierId == quote[i].OutboundLeg.CarrierIds[0]){
           carrierName.text(c.Name);
           console.log(carrierName);
         }
       }
        carrierId.text(quote[i].OutboundLeg.CarrierIds);
        flightPrice.text("$" + quote[i].MinPrice);
       var newDate = moment(quote[i].OutboundLeg.DepartureDate).format('MMMM Do YYYY');
        flightDate.text(newDate);

        tRow.append(carrierName,carrierId, flightPrice, flightDate);
        tBody.append(tRow);
    }


  });

};







