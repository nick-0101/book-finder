// Hides loader
window.onload = () => {loader.classList.remove("loading");}

// Global variables
const loader = document.getElementById("loader");
const bookRepsonse = document.getElementById("bookRepsonse");
const inputSearch = document.getElementById("searchTerm");
const searchButton = document.getElementById('searchButton');
let result = '';

// Creates and formats the api query
function createUrl() {
	const queryFieldValue = inputSearch.value.split(" ").join("+");
	const API_KEY = config.API_KEY; // ADD YOUR API KEY FROM GOOGLE
	return `https://www.googleapis.com/books/v1/volumes?q=${queryFieldValue}&maxResults=10&keyes&key=${API_KEY}`;
}

//Fetches the book data and creates html
function getBooks() {
// If above is true display the loader and clear html
loader.classList.add("loading");
bookRepsonse.innerHTML = '';

// Fetches the formated query
 fetch(createUrl())
   .then(res => res.json())
     .then(data => {

// Loops through book items
			 for (var i = 0; i < data.items.length; i++) {

				 // saves book data to be accessible below
				 let url =  data.items[i].volumeInfo.infoLink;
				 let title = data.items[i].volumeInfo.title;
				 let author = data.items[i].volumeInfo.authors;
				 let img = data.items[i].volumeInfo.imageLinks.thumbnail;

// Creates html result
				result = `
				 <div class="book">
						 <div class="book_img-block">
							 <img src="${img}">
						 </div>
						 <div class="book_info">
							 <h4>
								 <a href="${url}">${title}</a>
							 </h4>
							 <h5>Author: ${author}</h5>
						 </div>
					 </div>
				 `;
				 // adds result to inner html
				 bookRepsonse.innerHTML += result;
				 // removes loader
				 loader.classList.remove("loading");
			 }
     })
     .catch(err => {console.error();})
}
// allows for user to click enter and seach
inputSearch.addEventListener("keydown",({ keyCode }) => keyCode === 13 && getBooks());
