window.addEventListener("DOMContentLoaded", function() {
    // create pet's profile
    document.getElementById("register-new-pet").onclick = async () => {
        
        const petData = getPetData();
        petData["status"] = "active";
        
        const newPetAdded = await postThis(petData, "pet", "register");
        console.log(newPetAdded.errorMessage);
        if(newPetAdded.wasItASuccess){
            document.getElementsByClassName("success")[0].style.display = "block";
            window.location = `profile.html?pet_id=${newPetAdded.data._id}`;
        } else {
            document.getElementsByClassName("error")[0].style.display = "block";
        }

    };
});

function getPetData() {
    const inputs = ["owner_name", "owner_phone", "name", "age", "sex", "weight", "body_temperature", "species"];
    let petData = {};
    for(let i=0; i < inputs.length; i++){
        const inputValue = document.getElementById(inputs[i]).value;
        petData[inputs[i]] = inputValue;
    }
    return petData;
}