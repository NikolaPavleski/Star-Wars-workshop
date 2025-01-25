const peopleBtn = document.getElementById("peopleBtn");
const shipsBtn = document.getElementById("shipsBtn");
const peopleTable = document.getElementById("peopleTable");
const shipsTable = document.getElementById("shipsTable");
const peopleList = document.getElementById("peopleList");
const shipsList = document.getElementById("shipsList");
const prevPeopleBtn = document.getElementById("prevPeopleBtn");
const nextPeopleBtn = document.getElementById("nextPeopleBtn");
const prevShipsBtn = document.getElementById("prevShipsBtn");
const nextShipsBtn = document.getElementById("nextShipsBtn");
let peoplePage = 1;
let shipsPage = 1;
peopleBtn.addEventListener("click", () => {
    peopleTable.style.display = "block";
    shipsTable.style.display = "none";
    fetchPeopleData(peoplePage);
});
  shipsBtn.addEventListener("click", () => {
    shipsTable.style.display = "block";
    peopleTable.style.display = "none";
    fetchShipsData(shipsPage);
});
function fetchPeopleData(page) {
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then(response => response.json())
      .then(data => {
        renderPeopleTable(data.results);
        managePaginationButtons(data.previous, data.next, 'people');
      });
}
  function fetchShipsData(page) {
    fetch(`https://swapi.dev/api/starships/?page=${page}`)
      .then(response => response.json())
      .then(data => {
        renderShipsTable(data.results);
        managePaginationButtons(data.previous, data.next, 'ships');
      });
}
function renderPeopleTable(people) {
    peopleList.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Gender</th>
        <th>Birth Year</th>
        <th>Appearances</th>
      </tr>
    `;
    people.forEach(person => {
      peopleList.innerHTML += `
        <tr>
          <td>${person.name}</td>
          <td>${person.height}</td>
          <td>${person.mass}</td>
          <td>${person.gender}</td>
          <td>${person.birth_year}</td>
          <td>${person.films.length}</td>
        </tr>
      `;
    });
}
  function renderShipsTable(ships) {
    shipsList.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Model</th>
        <th>Manufacturer</th>
        <th>Cost</th>
        <th>Crew</th>
        <th>Passengers</th>
        <th>Class</th>
      </tr>
    `;
    ships.forEach(ship => {
      shipsList.innerHTML += `
        <tr>
          <td>${ship.name}</td>
          <td>${ship.model}</td>
          <td>${ship.manufacturer}</td>
          <td>${ship.cost_in_credits}</td>
          <td>${ship.crew}</td>
          <td>${ship.passengers}</td>
          <td>${ship.starship_class}</td>
        </tr>
      `;
});
}
  function managePaginationButtons(previous, next, type) {
    if (type === 'people') {
      prevPeopleBtn.disabled = !previous;
      nextPeopleBtn.disabled = !next;
    } else if (type === 'ships') {
      prevShipsBtn.disabled = !previous;
      nextShipsBtn.disabled = !next;
    }
}
prevPeopleBtn.addEventListener("click", () => {
    if (peoplePage > 1) {
      peoplePage--;
      fetchPeopleData(peoplePage);
    }
});
  
nextPeopleBtn.addEventListener("click", () => {
    peoplePage++;
    fetchPeopleData(peoplePage);
});
prevShipsBtn.addEventListener("click", () => {
    if (shipsPage > 1) {
      shipsPage--;
      fetchShipsData(shipsPage);
    }
});
  
nextShipsBtn.addEventListener("click", () => {
    shipsPage++;
    fetchShipsData(shipsPage);
});  