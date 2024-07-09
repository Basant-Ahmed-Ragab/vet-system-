window.addEventListener("DOMContentLoaded", async function() {
    const pets = await getThis("pet", "petOwner");
    
    var petSelection = document.getElementById("pet_id");
    pets.data.forEach(pet => {
        var option = document.createElement("option");
        option.text = pet.ownerName + " | " + pet.petName;
        option.value = pet.petID;
        petSelection.appendChild(option);
    });

    // add new visit
    document.getElementById("add-visit").onclick = async () => {
        
        var examineData = getExamineData();
        examineData["staff_id"] = "663898c3ddd358c6f21ca03c";
        const newVisitAdded = await postThis(examineData, "visit", "addVisit");;
        if(newVisitAdded.wasItASuccess){
            document.getElementsByClassName("success")[0].style.display = "block";
            window.location = "visits.html";
        } else {
            document.getElementsByClassName("error")[0].style.display = "block";
        }

    };
});

function getExamineData(){
    const inputs = ["pet_id", "date", "cost", "description", "type"];
    let examineData = {};
    for(let i=0; i < inputs.length; i++){
        const input = document.getElementById(inputs[i]);
        if(inputs[i] == "pet_id") {
            examineData[inputs[i]] = input.options[input.selectedIndex].value;
        } else {
            examineData[inputs[i]] = input.value;
        }
    }
    return examineData;
}