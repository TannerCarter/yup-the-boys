//
//
//search with city name
function searchCity(cityname) {
  var propertyAPI =
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=" +
    cityname;

  $.ajax({
    url: propertyAPI,
    method: "GET",
    headers: {
      apikey: "e8c90852cbe636f996963a3efd80ae52",
    },
  }).then(function (response) {
    console.log(response);
    console.log(propertyAPI);

    var lon = response.property[0].location.latitude;
    var lat = response.property[0].location.longitude;

    var walkAPI =
      "https://api.walkscore.com/score?&lon=" +
      lon +
      "&lat=" +
      lat +
      "&wsapikey=c30f63511f7a9e21b45c7935bb0e6014";

    $.ajax({
      url: walkAPI,
      method: "GET",
      crossOrigin: "null",
      mode: "no-cors",
    }).then(function (response) {
      console.log(response);
      console.log(walkAPI);
    });
  });
  var storearr = JSON.parse(localStorage.getItem("cityName"));
  if (storearr == +cityname) {
    storearr = [];
  }
  var cityInput = $("#searchCityInput").val().trim();
  if (!storearr.includes(cityInput)) {
    console.log("saving city");
    console.log(cityInput);
    storearr.push(cityInput);
  }
  localStorage.setItem("cityName", JSON.stringify(storearr));
}

//On button click store input
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityInput = $("#searchCityInput").val().trim();
  if (cityInput.length === 0) return;
  searchCity(cityInput);
});
