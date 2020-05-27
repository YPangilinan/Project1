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

    $("#origin").html("<h3>" + "Origin: " + "</h3>" + response.Places[0].Name);
    $("#destinationDiv").html("<h3>" + "Destination: " + "</h3>" + response.Places[1].Name);

    var carrier = response.Carriers;
    var quote = response.Quotes;

    //function for airline quotes available

    for (var i=0; i<quote.length; i++){
        console.log(quote[i].MinPrice);
        console.log(quote[i].OutboundLeg.DepartureDate);
        var newDiv = $("<p>");
        var priceDiv = $("<p>");
        var flightPrice = $("<p>");
        var flightDate = $("<p>");
        var carrierId = $("<p>");
        var carrierName = $("<p>");
       for(c of carrier){
         if (c.CarrierId == quote[i].OutboundLeg.CarrierIds[0]){
           carrierName.html("<h5>" + c.Name + "</h5>");
           console.log(carrierName);
         }
       }
        carrierId.text("Carrier ID: " + quote[i].OutboundLeg.CarrierIds);
        flightPrice.html("<h5>$" + quote[i].MinPrice + "</h5>");
       var newDate = moment(quote[i].OutboundLeg.DepartureDate).format('MMMM DD YYYY');
        flightDate.text("Departure: " + newDate);
        var oneWay = $("<p>");
        oneWay.text("ONE WAY");
        var direction = $("<p>");
        direction.text(origin + " to " + destination);
        newDiv.append(carrierName, carrierId, direction);
        priceDiv.append(flightPrice, flightDate,oneWay);
        var fullCard = $("<div>").addClass("row");
        var wrapper = $("<div>").addClass("card w-100");
        var newRow = $("<div>").addClass("row mt-2 mb-0");
        newDiv.addClass("col-lg-7 mb-0");
        priceDiv.addClass("col-lg-5 mb-0");
        newRow.append(newDiv);
        newRow.append(priceDiv);
        wrapper.append(newRow);
        fullCard.append(wrapper);
        $(".flights").append(fullCard);
      //  $(".flights").append(newDiv);
      //  $(".prices").append(priceDiv);
    }
  });
};







