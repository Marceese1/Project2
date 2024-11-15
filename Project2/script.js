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

  if (e.which === 13) { 
    let userInput = getUserInput();
    document.getElementById("searchbarContainer").style.height = "0";
    searchGiphy(userInput);
  }
});

function searchGiphy(searchQuery) {
  let url =
"//api.giphy.com/v1/gifs/search?q=" + searchQuery  + "&api_key=IWKk2Wpw2UykdqhxK1QoRnxyWMnAK59O";
  
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

  response = JSON.parse(response);
  
  let images = response.data;
  let container = document.querySelector(".search_container");
  
  container.innerHTML = "";

  images.forEach(function (image) {

    let src = image.images.fixed_height.url;

    container.innerHTML += "<img src='" 
      + src + "' class='container-image' />";
  });
}
