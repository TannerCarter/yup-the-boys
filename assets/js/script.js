var i = 0;

//search with city zip code
function searchCity(cityname) {
  var propertyAPI =
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=" +
    cityname;
  //pull data from first api
  $.ajax({
    url: propertyAPI,
    method: "GET",
    headers: {
      apikey: "55eeabe2829a77c4429574799957c922",
    },
  }).then(function (response) {
    console.log(response);
    console.log(propertyAPI);

    var searchDiv = document.querySelector("#fillAddy");
    var pElem = document.createElement("p");
    var foundAddress = "Address: " + response.property[i].address.oneLine;
    pElem.className = "styleforP";
    pElem.innerHTML = foundAddress;
    searchDiv.appendChild(pElem);
    //Pull address from first api, plug into second api url
    var addressPart1 = response.property[i].address.line1;
    var addressPart2 = response.property[i].address.line2;
    var propertyDetails =
      "https://api.gateway.attomdata.com/propertyapi/v1.0.0/sale/detail?address1=" +
      addressPart1 +
      "&address2=" +
      addressPart2;
    $.ajax({
      url: propertyDetails,
      method: "GET",
      headers: {
        apikey: "55eeabe2829a77c4429574799957c922",
      },
    }).then(function (response) {
      console.log(response);
      console.log(propertyDetails);
      //Estimated sales price
      var searchDiv = document.querySelector("#fillAddy");
      var pElem = document.createElement("p");
      var estimatedSale =
        "Estimated Sales Price: " + response.property[0].sale.amount.saleamt;
      pElem.className = "salesPrice";
      pElem.innerHTML = estimatedSale;
      searchDiv.appendChild(pElem);
      //Bedrooms
      var searchDiv = document.querySelector("#fillAddy");
      var pElem = document.createElement("p");
      var bedrooms =
        "Amount of Bedrooms: " + response.property[0].building.rooms.beds;
      pElem.className = "bedrooms";
      pElem.innerHTML = bedrooms;
      searchDiv.appendChild(pElem);
      //Bathrooms
      var searchDiv = document.querySelector("#fillAddy");
      var pElem = document.createElement("p");
      var bathrooms =
        "Amount of Bathrooms: " +
        response.property[0].building.rooms.bathstotal;
      pElem.className = "bathrooms";
      pElem.innerHTML = bathrooms;
      searchDiv.appendChild(pElem);

      //Pull data from first api, plug into 3rd api to pull image
      var lon = response.property[0].location.latitude;
      var lat = response.property[0].location.longitude;

      var walkAPI =
        "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" +
        lon +
        "," +
        lat +
        "&key=AIzaSyC8HIJdWQvEw0hgqmcQwWqT4vKnuKgchfw";

      $.ajax({
        url: walkAPI,
        method: "GET",
        crossOrigin: "null",
        mode: "no-cors",
      }).then(function (response) {
        console.log(walkAPI);
        //append image
        var imgSearch = document.querySelector("#fillImg");
        var imgElem = document.createElement("img");
        imgElem.className = "searchedImg";
        imgElem.src = walkAPI;
        imgSearch.appendChild(imgElem);
      });
    });
  });
  //clear apis data
  $("#fillAddy").empty();
  $("#fillImg").empty();

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
  if (cityInput.length === i) return;
  searchCity(cityInput);
});
$("#postBtn").on("click", function () {
  i = i + 1;
  var cityInput = $("#searchCityInput").val().trim();
  if (cityInput.length === 0) return;
  searchCity(cityInput);
});
$("#priorBtn").on("click", function () {
  i = i - 1;
  var cityInput = $("#searchCityInput").val().trim();
  if (cityInput.length === i) return;
  searchCity(cityInput);
});
