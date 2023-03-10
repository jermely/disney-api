const myAppElement = document.querySelector("#myApp");
let myPage = 1;

loadingScreen();
setUpShowAllButton();
setupSearchForm();
fetchOneCharacter(4703);

function loadingScreen() {
  myAppElement.innerHTML = "<h2>Loading...</h2>";
}

function fetchOneCharacter(charId) {
  let disneyAPI = `https://api.disneyapi.dev/characters/${charId}`;

  fetch(disneyAPI)
    .then((apiResponse) => {
      if (apiResponse.ok) {
        return apiResponse.json();
      } else {
        alert("Error - here's Mickey");
        fetchOneCharacter(4703);
      }
    })
    .then((disneyJSON) => {
      showCharacter(disneyJSON);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function showCharacter(jsonData) {
  let filmHistory = "<h3>Films:</h3>";
  jsonData.films.map((film) => {
    filmHistory += `${film}, `;
  });

  let tvHistory = "<h3>TV Shows:</h3>";
  jsonData.tvShows.map((show) => {
    tvHistory += `${show}, `;
  });
  let htmlOutput = `<h2>${jsonData.name}</h2><img src="${jsonData.imageUrl}"><p>${filmHistory}</p><p>${tvHistory}</p>`;
  myAppElement.innerHTML = htmlOutput;
}

function setUpShowAllButton() {
  let showAllBtn = document.querySelector("#showAllButton");
  showAllBtn.addEventListener("click", () => {
    myPage = 1;
    fetchAllCharacters();
  });
}

function setupSearchForm() {
  let searchBtn = document.querySelector("#searchButton");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let searchInput = document.querySelector("#searchInput");
    let searchValue = searchInput.value;

    if (searchValue) {
      fetchSearch(searchValue);
    } else {
      alert("Fill out the search field");
    }
  });
}

function fetchSearch(searchQuery) {
  let disneyAPI = `https://api.disneyapi.dev/character?name=${searchQuery}`;

  fetch(disneyAPI)
    .then((apiResponse) => {
      if (apiResponse.ok) {
        return apiResponse.json();
      } else {
        alert("Error - here's Mickey");
        fetchOneCharacter(4703);
      }
    })
    .then((disneyJSON) => {
      showSearch(disneyJSON.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function showSearch(queriedData) {
  let htmlOutput = "";

  queriedData.map((queriedChar) => {
    htmlOutput += `<h3>${queriedChar.name}</h3><img src="${queriedChar.imageUrl}"></br>`;
  });

  myAppElement.innerHTML = htmlOutput;
}

function fetchAllCharacters() {
  let disneyAPI = `https://api.disneyapi.dev/characters?page=${myPage}`;

  fetch(disneyAPI)
    .then((apiResponse) => {
      if (apiResponse.ok) {
        return apiResponse.json();
      } else {
        alert("Error - here's Mickey");
        fetchOneCharacter(4703);
      }
    })
    .then((disneyJSON) => {
      showAll(disneyJSON.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function showAll(disneyJSON) {
  myAppElement.innerHTML = "";

  let htmlOutput = "";

  disneyJSON.map((character) => {
    htmlOutput += `<h3>${character.name}</h3><img src="${character.imageUrl}"></br>`;
  });
  myAppElement.innerHTML += htmlOutput;
  makePageButtons();
}

function makePageButtons() {
  let myNav = document.createElement("nav");

  let prevBtn = document.createElement("button");
  prevBtn.innerText = "Previous";

  prevBtn.addEventListener("click", () => {
    myPage--;

    if (myPage < 1) {
      myPage = 1;
    } else {
      fetchAllCharacters();
    }
  });

  let nxtBtn = document.createElement("button");
  nxtBtn.innerText = "Next";

  nxtBtn.addEventListener("click", () => {
    myPage++;

    if (myPage > 149) {
      myPage = 149;
    } else {
      fetchAllCharacters();
    }
  });

  myNav.appendChild(prevBtn);
  myNav.appendChild(nxtBtn);

  myAppElement.appendChild(myNav);
}

//! Prev/Nxt not showing up
//? HTML-nav conflicting?
//* Utilize existing nav for buttons
//TODO Style it all (in cards)
