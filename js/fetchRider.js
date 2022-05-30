const riderUrl = 'http://localhost:8080/rider';

const riderMap = new Map();


function fetchAllRiders(riderUrl) {
    out("fetchAllRider");
    return fetch(riderUrl).then(response => response.json());
}

async function createRiderMap(riderUrl) {
    riderMap.clear();
    out("createRiderMap");
    const riderList = await fetchAllRiders(riderUrl);
    riderList.forEach((rider) => {
        out(rider.rider_name);
        riderMap.set(rider.rider_name, rider);

    })
}

const pbFetchRider = document.getElementById('getRider');

//add event listeners
pbFetchRider.addEventListener('click', createRiderMap);