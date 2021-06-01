window.onload = function () {
    
    const getAllBtn = document.getElementById("getAllBtn");
    const getUserByIdBtn = document.getElementById("getUserByIdBtn");
    const getAllOutput = document.getElementById("getAllOutput");

    const createUserInput = document.getElementById("createUserInput");
    const createUserOutput = document.getElementById("createUserOutput");
    const createUserBtn = document.getElementById("createUserBtn");

    const deleteUserInput = document.getElementById("deleteUserInput"); 
    const deleteUserBtn = document.getElementById("deleteUserBtn"); 
    const deleteUserOutput  = document.getElementById("deleteUserOutput"); 

    const updateUserIDInput = document.getElementById("updateUserIDInput"); 
    const updateUserBodyInput  = document.getElementById("updateUserBodyInput"); 
    const updateUserBtn  = document.getElementById("updateUserBtn"); 
    const updateuSerOutput  = document.getElementById("updateuSerOutput"); 

    function getAllUsers() {
        fetch("/users").then(responce => responce.json()).then(data => {
            getAllOutput.innerText = JSON.stringify(data);
        });
    }

    function createUsers() {
        const getAllOutput = document.getElementById("getAllOutput");
        const body = createUserInput.value;
        const options = {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch("/users", options).then(responce => responce.text()).then(data =>  {
            createUserOutput.innerText = data;
        });
    }

    function getUserByIdOnClick() {
        const getUserByIdInput = document.getElementById("getUserByIdInput");
        const id = getUserByIdInput.value;

        getAllOutput.innerText = `/users/${id}`;
        fetch(`/users/${id}`).then(responce => responce.json()).then(data => {
            getAllOutput.innerText = JSON.stringify(data);
        });
    }

    function deleteUsetByIdOnClick() {
        const id = deleteUserInput.value
        const options = {
            method: "DELETE",
            body: id,
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(`/users/${id}`, options).then(responce => responce.text()).then(data =>  {
            createUserOutput.innerText = data;
        });
    }

    function updateUserByIdOnClick() { 
        const id = updateUserIDInput.value
        const body = updateUserBodyInput.value;
        console.log(updateUserBodyInput.value)
        const options = {
            method: "PUT",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(`/users/${id}`, options).then(responce => responce.text()).then(data =>  {
            updateuSerOutput.innerText = data;
        });
    }

    getAllBtn.addEventListener("click", getAllUsers);
    createUserBtn.addEventListener("click", createUsers);
    getUserByIdBtn.addEventListener("click", getUserByIdOnClick);
    deleteUserBtn.addEventListener("click", deleteUsetByIdOnClick);
    updateUserBtn.addEventListener("click", updateUserByIdOnClick);
}