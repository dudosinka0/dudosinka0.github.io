let films = document.getElementById('films');
let btnSs = document.querySelector('.starships-show');
let starships = document.getElementById('starships');
let btnShowPers = document.getElementById('persons');

//event logic
document.addEventListener('DOMContentLoaded', initApp());

function initApp() {
    getAllFilms().then(function (values) {
        const resultFilms = values.results;
        resultFilms.forEach(film => printFilms(film));
    })
}

function starshipsShow() {
    getAllSs().then(function (values) {
        const resultStar = values.results;
        resultStar.forEach(film => printSs(film));
    })
}

btnSs.addEventListener('click', starshipsShow);


//async logic
async function getAllFilms() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    return data;
}
async function getAllSs() {
    const response = await fetch('https://swapi.dev/api/starships/');
    const data = await response.json();
    return data;
}
async function getFilm(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function getPersonsName(charactersUrl) {
    const response = await fetch(charactersUrl);
    const data = await response.json();
    return data;
}

//print logic
function printFilms({ title, episode_id, release_date, opening_crawl, url }) {
    let divfilms = document.createElement("div");
    divfilms.classList.add("film");
    divfilms.innerHTML = `<h4>${title}</h4>`;

    let spanEp = document.createElement('span');
    spanEp.innerHTML = "Number Episode: " + episode_id + '<br>';
    divfilms.append(spanEp);

    let dateEp = document.createElement('span');
    let yearEp = release_date.split('-')[0];
    dateEp.innerHTML = "Year of realise episode: " + yearEp + '<br>';
    divfilms.append(dateEp);

    let crawlEp = document.createElement('p');
    crawlEp.innerHTML = 'Crawl: ' + opening_crawl;
    divfilms.append(crawlEp);

    let btnPerson = document.createElement('div');
    btnPerson.innerHTML = `<span onclick="showPers('${url}', this)">show persons</span>`;
    divfilms.append(btnPerson);



    films.append(divfilms);
}


// print starships
function printSs({ name, length }) {
    let ship = document.createElement('p');
    ship.innerHTML = '<h5>' + name + '</h5>';
    let lengthShip = document.createElement('span');
    lengthShip.innerHTML = "length ship " + length;
    ship.append(lengthShip);
    starships.append(ship);
}

//print persons
function showPers(url, btnShowPers) {

    const btnParentDiv = btnShowPers.closest('.film');

    if (btnParentDiv.querySelector('.person')) {
        return;
    }

    getFilm(url).then(function (values) {
        const resultCharacters = values.characters;
        resultCharacters.forEach(charactersUrl => getPersonsName(charactersUrl)
            .then(function (person) {
                const name = person.name;
                let personDiv = document.createElement('div');
                personDiv.innerHTML = name;
                if (document.getElementById('persons').innerHTML == "")
                    btnParentDiv.append(personDiv);
            })
        );
    });

}