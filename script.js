const container = document.querySelector(".container");
const searchIcons = document.querySelectorAll(".search-bar i");

searchIcons.forEach((searchIcon) => {
  searchIcon.addEventListener("click", () => {
    container.classList.toggle("change");
  });
});

function getUserInput() {
  let inputValue = document
    .querySelector(".search_input").value;
  return inputValue;
}

document.querySelector(".search_input")
  .addEventListener("keyup", function (e) {

  // If the Key Enter is Pressed 
  if (e.which === 13) { 
    let userInput = getUserInput();
    document.getElementById("searchbarContainer").style.height = "0";
    searchGiphy(userInput);
  }

  
});

function searchGiphy(searchQuery) {
  let url =
"//api.giphy.com/v1/gifs/search?q=" + searchQuery  + "&api_key=IWKk2Wpw2UykdqhxK1QoRnxyWMnAK59O";
    
  // AJAX Request
  
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open("GET", url);
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener("load", function (data) {
    var actualData = data.target.response;
    pushToDOM(actualData);
    console.log(actualData);
    
  });
}

function pushToDOM(response) {

  // Turn response into real JavaScript object
  response = JSON.parse(response);
  
  // Drill down to the data array
  let images = response.data;

  // Find the container to hold the response in DOM
  let container = document.querySelector(".search_container");
  
  // Clear the old content since this function 
  // will be used on every search that we want
  // to reset the div
  container.innerHTML = "";

  // Loop through data array and add IMG html
  images.forEach(function (image) {

    // Find image src
    let src = image.images.fixed_height.url;

    // Concatenate a new IMG tag
    container.innerHTML += "<img src='" 
      + src + "' class='container-image' />";
  });
}
