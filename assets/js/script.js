var searchButton = document.getElementById("submitBtn");
var input = document.getElementById("searchCityInput");
searchButton.onclick = (event) => {
  var searchInput = input.value;
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?city=" +
      searchInput +
      "&apikey=SKeYU5QgdjyEFDczzoAYWmzg3UKfZ0bh",
    {
      method: "GET",
    }
  )
    .then(function (response) {
      if (response.ok) {
      }
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};
