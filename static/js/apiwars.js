function generateTable(data) {
    let table = document.getElementById('tbody');
    table.remove();
    let body = document.createElement('tbody');
    body.setAttribute('id', 'tbody');
    document.getElementById('table').appendChild(body);
    for (let i = 0; i < 10; i++) {
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
        surface.innerHTML = data.results[i].surface_water;
        document.getElementById(i).appendChild(surface);
        let population = document.createElement('td');
        population.innerHTML = data.results[i].population;
        document.getElementById(i).appendChild(population);
        let residents = document.createElement('td');
        residents.setAttribute('id', i + 'residents');
        document.getElementById(i).appendChild(residents);
        if (data.results[i].residents.length > 0) {
            let modalButton = document.createElement('button');
            modalButton.setAttribute('class', 'btn btn-light');
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
    
}


function pageNavClick(event) {
    let link = this.dataset.link;
    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            //console.log(JSON.stringify(myJson));
            generateTable(myJson);
        });
    // TODO: link save to buttons dataset

}


function addEventListenerNavigationPages() {
    let buttons = document.querySelectorAll('.nav-button');
    for (let button of buttons) {
        button.addEventListener('click', pageNavClick);
    }
}

function generateTable2(data) {
    for (i = 0; i < 8; i++) {
        let row = document.createElement('td');
        row.innerHTML = data.results[i].name;
        document.getElementById('table').appendChild(row);
    }
}


function init() {
    /*
    let data = $.getJSON('https://swapi.co/api/planets', function (response) {
        console.log(response).done
    }).done(function(ezajsonobject){
    });
    */
    addEventListenerNavigationPages()
}

init();