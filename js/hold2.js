const out = function (str) {
    console.log(str);
}

out('vi er igang med fetch kommuner');

const ridersUrl = 'https://localhost:8080/riders';

function getAllRiders() {
    out("get all riders kaldt");
    //call fetch, when fetch returns, call then()
    return fetch(ridersUrl).then(response => response.json());
}

function callGetAllRiders() {
    const promise = getAllRiders();
    out(promise);
}

async function showAllRiders() {
    out("show all riders");
    const riderList = await getAllRiders();
    riderList.forEach((rider, index) => {
        out(rider.navn + "ix=" + index);
    })
}

//callGetAllKommuner();
showAllRiders();


out("vi er færdige her");