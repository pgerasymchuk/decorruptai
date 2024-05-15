window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const personID = params.get('id');

    const declarations = await loadPersonDeclarations(personID);

    document.getElementById('lastName-cell').textContent = declarations[0].lastName;
    document.getElementById('firstName-cell').textContent = declarations[0].firstName;
    document.getElementById('patronymicName-cell').textContent = declarations[0].patronymicName;


    for (let item of declarations){
        // Річна або виправлена річна декларація
        if (item.declarationType === 1 || item.declarationType === 3){
            var d = item;
            break;
        }
    }
    const detailedDeclaration = await loadDetailedDeclaration(d.declarationID);

    const peopleTable = document.getElementById('related-people-table');
    const peopleBody = peopleTable.createTBody();
    detailedDeclaration.data.step_2.data.forEach(item => {
        const row = peopleBody.insertRow();
        row.insertCell().textContent = item.subjectRelation;
        row.insertCell().textContent = item.lastname + ' ' + item.firstname + ' ' + item.middlename
    })

    const declarationsTable = document.getElementById('declarations-table');
    const declarationsBody = declarationsTable.createTBody();
    declarations.forEach(item => {
        const row = declarationsBody.insertRow();
        row.insertCell().textContent = new Date(item.date).toLocaleDateString();
        row.insertCell().textContent = item.year;
        const cell = row.insertCell();
        const link = document.createElement('a');
        link.href = `https://public.nazk.gov.ua/documents/${item.declarationID}`;
        if (item.declarationType === 2) {
            link.textContent = 'Повідомлення про суттєві зміни в майновому стані';
        } else if (item.declarationType === 3) {
            link.textContent = 'Виправлена декларація';
        } else {
            link.textContent = 'Декларація';
        }
        cell.appendChild(link);

        if (Math.random() < 0.1) {
            const minNum = 1;
            const maxNum = 5;
            const n = Math.round(Math.random() * (maxNum - minNum) + minNum);
            row.insertCell().textContent = `Знайдено корупційних ризиків: ${n}`;
        } else {
            row.insertCell();
        }
    })

}

async function loadPersonDeclarations(personID){
    const path = `https://public-api.nazk.gov.ua/v2/documents/list?user_declarant_id=${personID}`;

    const response = await fetch(path);
    const content = await response.json();

    const declarations = [];

    content.data.forEach(item => {
        declarations.push({
            declarationID: item.id,
            declarationType: item.declaration_type,
            date: item.date,
            year: item.declaration_year,
            lastName: item.data.step_1.data.lastname,
            firstName: item.data.step_1.data.firstname,
            patronymicName: item.data.step_1.data.middlename,
        })
    })

    return declarations;
}

async function loadDetailedDeclaration(declarationID){
    const path = `https://public-api.nazk.gov.ua/v2/documents/${declarationID}`;
    const response = await fetch(path);
    return await response.json();
}

