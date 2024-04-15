document.getElementById('form').addEventListener('submit', function(event) {

    event.preventDefault();
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const patronymicName = document.getElementById('patronymicName').value;

    clearResults();

    const minNumOfPeople = 1;
    const maxNumOfPeople = 5;

    const numOfPeople = minNumOfPeople + Math.floor(Math.random() * (maxNumOfPeople - minNumOfPeople + 1));
    for (let i = 0; i < numOfPeople; i++){
        displayPerson(lastName, firstName, patronymicName);
    }
});

document.getElementById('form').addEventListener('reset', clearResults);

function clearResults() {
    const results = document.querySelectorAll(`.result`);
    results.forEach(div => {
        div.parentNode.removeChild(div);
    });
}

function generateDateOfBirth() {

    const minAge = 25;
    const maxAge = 80;

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxAge);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - minAge);

    const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()))

    return `${randomDate.getDate()}.${randomDate.getMonth()+1}.${randomDate.getFullYear()}`;
}

function generatePlaceOfWork() {

    const placesOfWork = [
        'Міністерство внутрішніх справ України',
        'Адміністрація Президента України',
        'Кабінет Міністрів України',
        'Верховна Рада України',
        'Міністерство освіти і науки України',
        'Міністерство економічного розвитку та торгівлі України',
        'Національний банк України',
        'Міністерство закордонних справ України',
        'Генеральна прокуратура України',
        'Міністерство оборони України'
    ];

    return placesOfWork[Math.floor(Math.random() * placesOfWork.length)];
}

function generateRisksMessage() {

    const minNum = 0;
    const maxNum = 5;

    return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

function displayPerson(lastName, firstName, patronymicName) {

    const result = document.createElement('div');
    result.classList.add('result')

    const h4 = document.createElement('h4');
    h4.innerText = lastName + ' ' + firstName + ' ' + patronymicName;
    result.appendChild(h4);

    const dob = document.createElement('p');
    dob.innerText = `Дата народження: ${String(generateDateOfBirth())}`;
    result.appendChild(dob);

    const placeOfWork = document.createElement('p');
    placeOfWork.innerText = String(generatePlaceOfWork());
    result.appendChild(placeOfWork);

    const declaration = document.createElement('a');
    declaration.innerText = `Декларація за ${(new Date().getFullYear()) - 1} рік`;
    declaration.href = '#';
    result.appendChild(declaration);

    const risks = document.createElement('p');
    const risksNum = generateRisksMessage();
    if (risksNum){
        risks.innerText = `Знайдено корупційних ризиків: ${risksNum}.`;
        result.style.backgroundColor = 'lightpink'
    } else {
        risks.innerText = 'Корупційних ризиків не знайдено.';
        result.style.backgroundColor = 'palegreen';
    }
    result.appendChild(risks);

    document.getElementById('container').appendChild(result);
}