document.getElementById('form').addEventListener('submit', async function(event) {

    event.preventDefault();
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const patronymicName = document.getElementById('patronymicName').value;

    clearResults();

    const declarations = await loadDeclarations(lastName + ' ' + firstName + ' ' + patronymicName);

    if (declarations.length === 0) {

        const h4 = document.createElement('h4');
        h4.innerText = 'За заданими параметрами осіб не знайдено!';
        h4.classList.add('result')
        document.getElementById('container').appendChild(h4);

    } else {

        const displayed_person_ids = [];

        declarations.forEach(item => {
            if (!displayed_person_ids.includes(item.personID)){
                displayed_person_ids.push(item.personID);
                displayPerson(item.lastName, item.firstName, item.patronymicName, item.personID)
            }
        })
    }

});

document.getElementById('form').addEventListener('reset', clearResults);


function clearResults() {
    const results = document.querySelectorAll(`.result`);
    results.forEach(div => {
        div.parentNode.removeChild(div);
    });
}

async function loadDeclarations(query){

    const path = `https://public-api.nazk.gov.ua/v2/documents/list?query=${query}`;

    const response = await fetch(path);
    const content = await response.json();

    const declarations = [];

    content.data?.forEach(item => {
        declarations.push({
            personID: item.user_declarant_id,
            declarationID: item.id,
            date: item.date,
            lastName: item.data.step_1.data.lastname,
            firstName: item.data.step_1.data.firstname,
            patronymicName: item.data.step_1.data.middlename
        })
    })

    return declarations;
}

function displayPerson(lastName, firstName, patronymicName, id) {

    const h4 = document.createElement('h4');
    h4.innerText = lastName + ' ' + firstName + ' ' + patronymicName;

    const link = document.createElement('a');
    link.href = `./person.html?id=${id}`;
    link.target = '_blank';

    const result = document.createElement('div');
    result.classList.add('result');
    result.classList.add('person');

    link.appendChild(h4);
    result.appendChild(link);
    document.getElementById('container').appendChild(result);
}

