out("i post teams");

let team = {};

team = {
    "team_id": "10",
    "team_name": "Team DK",
}

const postTeamRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: body
}

let getTeamsAPIRequest = {
    method: "GET",
    headers: {
        "content-type": "application/json"
    },
    redirect: "follow"
}


const pbPostTeams = document.getElementById('pbPostTeams');

let getTeamsAPIUrl = "https://localhost:8080/teams";
const postTeamsUrl = "http://localhost:8080/teams";

function postAllTeams(btn){
    out("post all kaldt teams");
    fetch(getTeamsAPIUrl, getTeamsAPIRequest)
        .then(response => response.json())
        .then(data => data.forEach(obj => {
            team.team_id = obj.id;
            team.team_name = obj.name;
            body = JSON.stringify(team);
            postTeamRequest.body = body;
            fetch(postTeamUrl, postTeamRequest)
                .catch((error) => console.log(error));
        }))
        .catch((error) => console.log(error));
}

pbPostTeams.addEventListener('click', postAllTeams);
out(pbPostTeams);
