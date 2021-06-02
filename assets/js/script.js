var searchButton = document.getElementById("submitBtn");
var input = document.getElementById("searchCityInput");
searchButton.onclick = (event) => {
  var searchInput = input.value;
  fetch(
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=" +
      searchInput,
    {
      method: "GET",
      headers: {
        apikey: "e8c90852cbe636f996963a3efd80ae52",
      },
    }
  ).then(async (response) => {
    if (response.ok) {
      var property = await response.json();
      console.log(response);
      var pic = $(property[0].address.oneLine);
    }
    fetch(
      "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" +
        pic +
        "&key=AIzaSyC8HIJdWQvEw0hgqmcQwWqT4vKnuKgchfw",
      {
        method: "GET",
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
