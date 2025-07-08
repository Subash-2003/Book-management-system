var popoverlay = document.querySelector(".overlay");
var popdisplay = document.querySelector(".popbox");
var buttonclick = document.getElementById("buttontouch");

var container = document.querySelector(".container");
var addbook = document.getElementById("added");
var tt = document.getElementById("booktitle");
var ttt = document.getElementById("author");
var tttt = document.getElementById("dis");
var canceled = document.getElementById("canceled");

// Show form
buttonclick.addEventListener("click", function () {
  popoverlay.style.display = "block";
  popdisplay.style.display = "block";
});

// Cancel form
canceled.addEventListener("click", function (event) {
  event.preventDefault();
  popoverlay.style.display = "none";
  popdisplay.style.display = "none";
});

// Save to local storage
function saveToLocal() {
  localStorage.setItem("books", container.innerHTML);
}

// Load from local storage
window.onload = function () {
  if (localStorage.getItem("books")) {
    container.innerHTML = localStorage.getItem("books");
  }
};

// Delete function
function deleteitem(event) {
  event.preventDefault();
  event.target.parentElement.remove();
  saveToLocal();
}

// Add book
addbook.addEventListener("click", function (event) {
  event.preventDefault();

  if (tt.value.trim() === "" || ttt.value.trim() === "" || tttt.value.trim() === "") {
    alert("Please fill in all fields.");
    return;
  }

  var div = document.createElement("div");
  div.setAttribute("class", "bookcontainer");
  div.innerHTML = `
    <h2>${tt.value}</h2>
    <h5>${ttt.value}</h5>
    <p>${tttt.value}</p>
    <button onclick="deleteitem(event)">Delete</button>
  `;
  container.append(div);

  saveToLocal();

  popoverlay.style.display = "none";
  popdisplay.style.display = "none";

  tt.value = "";
  ttt.value = "";
  tttt.value = "";
});

// Search functionality
document.getElementById("searchBox").addEventListener("input", function () {
  var searchValue = this.value.toLowerCase();
  var books = document.querySelectorAll(".bookcontainer");

  books.forEach(function (book) {
    var title = book.querySelector("h2").innerText.toLowerCase();
    var author = book.querySelector("h5").innerText.toLowerCase();

    if (title.includes(searchValue) || author.includes(searchValue)) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
});
