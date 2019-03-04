function generateTable(data) {
    let table = document.getElementById('tbody');
    table.remove();
    let body = document.createElement('tbody');
    body.setAttribute('id', 'tbody');
    document.getElementById('table').appendChild(body);
    for (let i = 0; i < data.results.length; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute('id', i);
        document.getElementById('tbody').appendChild(tr);
        // for (let j = 0; j < 8; j++) {
        // let information = ['name', 'diameter', 'climate', 'terrain', 'surface_water', 'population', 'residents'];
        // .information[j]; // TODO solve this object issue
        let name = document.createElement('td');
        name.innerHTML = data.results[i].name;
        document.getElementById(i).appendChild(name);
        let diameter = document.createElement('td');
        diameter.innerHTML = data.results[i].diameter;
        document.getElementById(i).appendChild(diameter);
        let climate = document.createElement('td');
        climate.innerHTML = data.results[i].climate;
        document.getElementById(i).appendChild(climate);
        let terrain = document.createElement('td');
        terrain.innerHTML = data.results[i].terrain;
        document.getElementById(i).appendChild(terrain);
        let surface = document.createElement('td');
        // if (data.results[i].surface_water == 'unknown') { // TODO befejezni ezt!
        surface.innerHTML = data.results[i].surface_water + '%';
        document.getElementById(i).appendChild(surface);
        // }
        let population = document.createElement('td');
        population.innerHTML = data.results[i].population;
        document.getElementById(i).appendChild(population);
        let residents = document.createElement('td');
        residents.setAttribute('id', i + 'residents');
        document.getElementById(i).appendChild(residents);
        if (data.results[i].residents.length > 0) {
            let modalButton = document.createElement('button');
            modalButton.setAttribute('data-residents', data.results[i].residents);
            modalButton.setAttribute('class', 'btn btn-light resident-button');
            modalButton.setAttribute('data-toggle', 'modal');
            modalButton.setAttribute('data-target', '.residents-modal');
            modalButton.innerHTML = data.results[i].residents.length + ' resident(s)';
            document.getElementById(i + 'residents').appendChild(modalButton);
        } else {
            residents.innerHTML = 'No known residents';
        }
        let vote = document.createElement('td');
        vote.setAttribute('id', i + 'vote');
        document.getElementById(i).appendChild(vote);
        let voteButton = document.createElement('button');
        voteButton.setAttribute('class', 'btn btn-light');
        voteButton.innerHTML = 'Vote';
        document.getElementById(i + 'vote').appendChild(voteButton);
        // }
    }
}


function updateApiLink(data) {
    let nextButton = document.getElementById('next');
    console.log(data);
    nextButton.dataset.link = data.next;
    let previousButton = document.getElementById('previous');
    previousButton.dataset.link = data.previous;
    // console.log(nextButton.dataset.link);
    if (data.previous == null) {
        previousButton.classList.add('disabled');
    } else {
        previousButton.classList.remove('disabled');
    }
    if (data.next == null) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}


function pageNavClick() {
    let link = this.dataset.link;
    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            generateTable(myJson);
            updateApiLink(myJson);
            addEventListenerResidents();
        });
}


function addEventListenerNavigationPages() {
    let buttons = document.querySelectorAll('.nav-button');
    for (let button of buttons) {
        button.addEventListener('click', pageNavClick);
    }
}


function showResidents(data) {
    let modalRow = document.createElement('tr');
    document.getElementById('modalTbody').appendChild(modalRow);
    modalRow.innerHTML = `<td>${data.name}</td><td>${data.height}</td><td>${data.mass}</td>
                       <td>${data.hair_color}</td><td>${data.skin_color}</td><td>${data.eye_color}</td>
                       <td>${data.birth_year}</td><td>${data.gender}</td>`;
}

function clickResidents() {
    let modalTableBody = document.getElementById('modalTbody');
    console.log(modalTableBody);
    modalTableBody.remove();
    let modalTable = document.createElement('tbody');
    modalTable.setAttribute('id', 'modalTbody');
    document.getElementById('modal-table').appendChild(modalTable);
    let modalRow = document.createElement('tr');
    document.getElementById('modalTbody').appendChild(modalRow);
    let residentsString = this.dataset.residents; // needed to be splitted to receive an iterable list
    let residents = residentsString.split(',');
    for (let i = 0; i < residents.length; i++) {
        let actualRes = residents[i].split('/');
        let url = "https://swapi.co/api/people/" + `${actualRes[5]}`;
        fetch(`${url}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                showResidents(myJson)
            });
    }
}

function addEventListenerResidents() {
    let buttons = document.querySelectorAll('.resident-button');
    for (let button of buttons) {
        button.addEventListener('click', clickResidents);
    }
}


function init() {
    addEventListenerNavigationPages();
    addEventListenerResidents();
}

init();