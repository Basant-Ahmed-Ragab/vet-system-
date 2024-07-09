window.addEventListener("DOMContentLoaded", async function() {
    
    const visits = await getThis("visit", "getAll");

    let visitsTable = document.getElementById('visits-table').getElementsByTagName('tbody')[0];
    
    visits.data.forEach(visit => {
        let row = visitsTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = `<a href="profile.html?pet_id=${visit.pet._id}">` + visit.pet.name + `</a>`;
        cell2.innerHTML = visit.date.substring(0,10);
        cell3.innerHTML = visit.type;
        cell4.innerHTML = visit.description;
    });
});