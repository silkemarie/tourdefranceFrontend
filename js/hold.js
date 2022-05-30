const out = function (str) {
    console.log(str);
}

out("vi er i create table");

createTeamMap();

function addRow(rider) {
    const rowCount = riderTable.rows.length;
    let row = riderTable.insertRow(rowCount);
    let colCount = 0;

    let cell = row.insertCell(colCount++);
    cell.innerText = rider.countyCode;

    cell = row.insertCell(colCount++);
    const inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute("value", rider.name);
    cell.appendChild(inp);

    //ATag with county href
    cell = row.insertCell(colCount++);
    const atag = document.createElement('a');
    atag.setAttribute("href", rider.href);
    atag.innerText = rider.name;
    cell.appendChild(atag);

    cell = row.insertCell(colCount++);
    cell.innerText = rider.team.teamId;

    //Create a dropdown
    cell = row.insertCell(colCount++);
    const ddRegion = document.createElement("select");
    let ix = 0;
    teamMap.forEach(team => {
        const el = document.createElement("option");
        el.textContent = region.name;
        el.value = team.teamId;
        ddRegion.appendChild(el);
        if (team.teamId == rider.team.teamId) {
            ddRegion.selectedIndex = ix;
        }
        ix++;
        ddRegion.addEventListener("change", (event) => {
            const selind = ddRegion.selectedIndex;
            const opt = ddRegion.options[selind];
            rider.team = teamMap.get(opt.value);
        })
    });
    cell.appendChild(ddRegion);

    //delete button
    cell = row.insertCell(colCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute('value', 'Slet rytter');
    pbDelete.onclick = function () {
        deleteRow(rider, rowCount, row);
    }
    cell.appendChild(pbDelete);

    //update button
    cell = row.insertCell(colCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute('value', 'Update rytter');
    pbUpdate.onclick = function () {
        updateRow(rider, rowCount, row, inp);
    }
    cell.appendChild(pbUpdate);


} //addRow

async function updateRow(rider, rowNo, row, inputfield) {
    out(rider);
    rider.name = inputfield.value;
    const response = await restUpdateRider(county);
    out("nu har vi opdateret");
    out(response);
    //crazy rule, only change name once
    inputfield.setAttribute('readonly', 'readonly');
}

async function restUpdateRider(rider) {
    const url = "http://localhost:8080/rider/" + rider.riderId;

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    const jsonString = JSON.stringify(rider);
    fetchOptions.body = jsonString;

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    out(response);
    if (!response.ok) {
        out("Det gik ikke godt med update");
    };

    return response;
} //restDeleteConty



async function deleteRow(rider, rowNo, row) {
    out(rider);
    const response = await restDeleteRider(rider);
    out("nu har vi slettet");
    riderTable.deleteRow(row.rowIndex);
}

async function restDeleteCounty(county) {
    const url = "http://localhost:8080/rider/" + rider.riderId;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    out(response);
    if (!response.ok) {
        out("Det gik ikke godt");
    };

    return response;
} //restDeleteConty


function createTableFromMap() {
    out("create table");
    riderMap.forEach(rider => addRow(rider)
    )
}

const pbCreateTable = document.getElementById("pbCreateTable");
const riderTable = document.getElementById("riderTable");

pbCreateTable.addEventListener('click', createTableFromMap);