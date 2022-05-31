const out = function (str) {
    console.log(str);
}

out('jeg er i fetch teams')

const ridersUrl = 'http://localhost:8080/riders'

function fetchAllRiders() {
    out('riders kaldt')
    return fetch(ridersUrl).then(response => response.json().catch(err => errorOutput(err)));
}

addTableOverview(ridersUrl)
    .catch(err => console.error(err));


async function addTableOverview() {
    const riders = await fetchAllRiders();
    out(riders)

    for (let rider of riders) {

        const bview = document.getElementById('teamsTable');
        out(rider.rider_id)
        out(rider.rider_name)
        const tableRow = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.textContent = rider.rider_id;

        const td2 = document.createElement('td');
        out(rider.rider_id)
        td2.textContent = rider.rider_name;

        const td3 = document.createElement('td');
        td3.textContent = rider.sprint_points;

        const td4 = document.createElement('td');
        td4.textContent = rider.mountain_points;

        const td5 = document.createElement('td');
        td5.textContent = rider.total_points;

        const td6 = document.createElement('td');
        td6.textContent = rider.rider_time;

        const td7 = document.createElement('td');
        td7.textContent = rider.rider_age;

        console.log(rider);
        bview.append(tableRow);
        tableRow.append(td1);
        tableRow.append(td2);
        tableRow.append(td3);
        tableRow.append(td4);
        tableRow.append(td5);
        tableRow.append(td6);
        tableRow.append(td7);
    }
}

out('slut i fetchTeams')