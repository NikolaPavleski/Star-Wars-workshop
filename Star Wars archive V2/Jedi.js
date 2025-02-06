const peopleBtn = document.getElementById("peopleBtn");
const shipsBtn = document.getElementById("shipsBtn");
const planetsBtn = document.getElementById("planetsBtn");
const peopleTable = document.getElementById("peopleTable");
const shipsTable = document.getElementById("shipsTable");
const planetsTable = document.getElementById("planetsTable");
const peopleList = document.getElementById("peopleList");
const shipsList = document.getElementById("shipsList");
const planetsList = document.getElementById("planetsList");
const prevPeopleBtn = document.getElementById("prevPeopleBtn");
const nextPeopleBtn = document.getElementById("nextPeopleBtn");
const prevShipsBtn = document.getElementById("prevShipsBtn");
const nextShipsBtn = document.getElementById("nextShipsBtn");
const prevPlanetsBtn = document.getElementById("prevPlanetsBtn");
const nextPlanetsBtn = document.getElementById("nextPlanetsBtn");
let peoplePage = 1;
let shipsPage = 1;
let planetsPage = 1;

peopleBtn.addEventListener("click", async () => {
  peopleTable.style.display = "block";
  shipsTable.style.display = "none";
  planetsTable.style.display = "none";
  await fetchPeopleData(peoplePage);
});
shipsBtn.addEventListener("click", async () => {
  shipsTable.style.display = "block";
  peopleTable.style.display = "none";
  planetsTable.style.display = "none";
  await fetchShipsData(shipsPage);
});
planetsBtn.addEventListener("click", async () => {
  planetsTable.style.display = "block";
  peopleTable.style.display = "none";
  shipsTable.style.display = "none";
  await fetchPlanetsData(planetsPage);
});

async function fetchPeopleData(page) {
  document.getElementById("spinner").style.display = "block";
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("error-message").style.display = "block";
    peopleTable.style.display = "none"; 
    return;
  }
  const data = await response.json();
  document.getElementById("spinner").style.display = "none";
  document.getElementById("error-message").style.display = "none";
  renderPeopleTable(data.results);
  managePaginationButtons(data.previous, data.next, 'people');
}
async function fetchShipsData(page) {
  document.getElementById("spinner").style.display = "block";
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  if (!response.ok) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("error-message").style.display = "block";
    shipsTable.style.display = "none";
    return;
  }
  const data = await response.json();
  document.getElementById("spinner").style.display = "none";
  document.getElementById("error-message").style.display = "none";
  renderShipsTable(data.results);
  managePaginationButtons(data.previous, data.next, 'ships');
}
async function fetchPlanetsData(page) {
  document.getElementById("spinner").style.display = "block";
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  if (!response.ok) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("error-message").style.display = "block";
    planetsTable.style.display = "none";
    return;
  }
  const data = await response.json();
  document.getElementById("spinner").style.display = "none";
  document.getElementById("error-message").style.display = "none"; 
  renderPlanetsTable(data.results);
  managePaginationButtons(data.previous, data.next, 'planets');
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
function renderPlanetsTable(planets) {
  planetsList.innerHTML = `
    <tr>
      <th>Planet Name</th>
      <th>Population</th>
      <th>Climate</th>
      <th>Gravity</th>
      <th>Terrain</th>
    </tr>
  `;
  planets.forEach(planet => {
    planetsList.innerHTML += `
      <tr>
        <td>${planet.name}</td>
        <td>${planet.population}</td>
        <td>${planet.climate}</td>
        <td>${planet.gravity}</td>
        <td>${planet.terrain}</td>
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
  } else if (type === 'planets') {
    prevPlanetsBtn.disabled = !previous;
    nextPlanetsBtn.disabled = !next;
  }
}

prevPeopleBtn.addEventListener("click", async () => {
  if (peoplePage > 1) {
    peoplePage--;
    await fetchPeopleData(peoplePage);
  }
});
nextPeopleBtn.addEventListener("click", async () => {
  peoplePage++;
  await fetchPeopleData(peoplePage);
});

prevShipsBtn.addEventListener("click", async () => {
  if (shipsPage > 1) {
    shipsPage--;
    await fetchShipsData(shipsPage);
  }
});
nextShipsBtn.addEventListener("click", async () => {
  shipsPage++;
  await fetchShipsData(shipsPage);
});

prevPlanetsBtn.addEventListener("click", async () => {
  if (planetsPage > 1) {
    planetsPage--;
    await fetchPlanetsData(planetsPage);
  }
});
nextPlanetsBtn.addEventListener("click", async () => {
  planetsPage++;
  await fetchPlanetsData(planetsPage);
});
