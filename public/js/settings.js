const submit = document.getElementById("input-username"); 

function setUsername()
{
    const input = $("#input-text").val(); 
    localStorage.setItem("user-settings", input); 
}