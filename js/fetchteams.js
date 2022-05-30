const out = function (str) {
    console.log(str);
}

out('jeg er i fetch teams')

const teamsUrl = 'http://localhost:8080/teams'

const errorOutput = function (err) {
    out('Der var en fejl');
}

function fetchAllTeams() {
    out('teams kaldt')
    return fetch(teamsUrl).then(response => response.json().catch(err => errorOutput(err)));
}

addTableOverview(teamsUrl)
    .catch(err => console.error(err));

async function addTableOverview() {
    const teams = await fetchAllTeams();
    out(teams)

    for (let team of teams) {

        const bview = document.getElementById('teamsTable');
        out(team.team_id)
        const tableRow = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = team.team_id;
        const td2 = document.createElement('td');
        out(team.team_name)
        td2.textContent = team.team_name;
        const td3 = document.createElement('td');
        console.log(team);
        bview.append(tableRow);
        tableRow.append(td1);
        tableRow.append(td2);
        tableRow.append(td3);

    }
}

out('slut i fetchTeams')