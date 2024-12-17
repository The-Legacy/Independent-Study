//values for log in screen
const adminButton = document.querySelector(".admin");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const adminLogin = document.querySelector(".adminLogin");

//values for try again screen
const wrongLogin = document.querySelector(".wrongLogin");
const tryAgain = document.querySelector(".tryAgain");

//values for editing
const editing = document.querySelector(".editing");
const positionSelect = document.querySelector(".positionSelect");
const leave = document.querySelector(".leave");
const commit = document.querySelector(".commit");

//Buttons for the first password screen
adminButton.addEventListener("click", () => {
  adminLogin.style.display = "flex";
});

cancel.addEventListener("click", () => {
  adminLogin.style.display = "none";
});

submit.addEventListener("click", () => {
    validate();
});

//Button for the try again screen
tryAgain.addEventListener("click", ()=> {
    wrongLogin.style.display = "none";
    adminLogin.style.display = "flex";
});

//buttons for editing screen
leave.addEventListener("click", ()=> {
    editing.style.display = "none";
});

commit.addEventListener("click", ()=> {
    document.getElementById(document.getElementById("positions").value + "Name").textContent = document.getElementById("name").value;
    document.getElementById(document.getElementById("positions").value + "Title").textContent = document.getElementById("title").value;
    document.getElementById(document.getElementById("positions").value + "Bio").textContent = document.getElementById("bioPara").value;
});


//functions
//checks username and password values
function validate() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(username == "admin" && password == "password"){
        adminLogin.style.display = "none";
        editing.style.display = "flex";
        displayBioText();
    } else {
        adminLogin.style.display = "none";
        wrongLogin.style.display = "flex";
    }
}

//gets information from page and turns it into editable material
function displayBioText(){
    let names = document.getElementById(document.getElementById("positions").value + "Name").textContent;
    let titles = document.getElementById(document.getElementById("positions").value + "Title").textContent;
    let biography = document.getElementById(document.getElementById("positions").value + "Bio").textContent;

    document.getElementById("name").value = names;
    document.getElementById("title").value = titles;
    document.getElementById("bioPara").value = biography;
}


//changes available information 
positionSelect.addEventListener("change", ()=>{
    displayBioText();
});
