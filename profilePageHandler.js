window.addEventListener("DOMContentLoaded", async function() {
    const urlParams = getJsonFromUrl(window.location.search);
    const petID = urlParams.pet_id;
    if(petID == null) {
        window.location = "index.html";
    }

    const petData = await getThis("pet", `profile/${petID}`);
    fillProfile(petData.data[0]);

    let visitsTable = document.getElementById('pet-visits-table').getElementsByTagName('tbody')[0];
    
    petData.data[0].visits.forEach(visit => {
        let row = visitsTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = visit.date.substring(0,10);
        cell2.innerHTML = visit.type;
        cell3.innerHTML = visit.description;
    });

    document.getElementById("edit-profile").onclick = async () => {
        
        const petDataEdited = getProfileData();
        
        const editedProfile = await putThis(petDataEdited, "pet", `editProfile/${petID}`);
        if(editedProfile.wasItASuccess){
            document.getElementsByClassName("success")[0].style.display = "block";
            location.reload();
        } else {
            document.getElementsByClassName("error")[0].style.display = "block";
        }
    };

    document.getElementById("edit-status").onclick = async () => {
        petData.data[0].status = (petData.data[0].status == "active") ? "archived" : "active";
        const editStatus = await putThis(petData.data[0], "pet", `editStatus/${petID}`);
        if(editStatus.wasItASuccess){
            document.getElementsByClassName("success")[0].style.display = "block";
            location.reload();
        } else {
            document.getElementsByClassName("error")[0].style.display = "block";
        }
    };
});

function fillProfile(pet) {
    const archiveBtn = document.getElementById("edit-status");
    archiveBtn.innerText = "Set " + ((pet["status"] == "active") ? "archived" : "active");
    document.getElementById("status-label").style.display = (pet["status"] == "archived") ? "block" : "none";

    const inputs = ["name", "age", "weight", "body_temperature", "species"];
    for(let i=0; i < inputs.length; i++){
        document.getElementById(inputs[i]).value = pet[inputs[i]];
    }

    var select = document.getElementById('sex');
    var option;
    for (var i=0; i<select.options.length; i++) {
        option = select.options[i];
        if (option.value == pet.sex) {
            option.setAttribute('selected', true);
            break;
        }
    }

    if(pet["status"] == "archived") {
        for(let i=0; i < inputs.length; i++){
            document.getElementById(inputs[i]).disabled = true;
        }
        document.getElementById("sex").disabled = true;
        document.getElementById("edit-profile").disabled = true;
    }
}

function getProfileData() {
    const inputs = ["name", "age", "sex", "weight", "body_temperature", "species"];
    let petData = {};
    for(let i=0; i < inputs.length; i++){
        const inputValue = document.getElementById(inputs[i]).value;
        petData[inputs[i]] = inputValue;
    }
    return petData;
}