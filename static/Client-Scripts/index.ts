const myURL = "http://localhost:8080/";
window.onload = function () {
    document.getElementById("createAccount").addEventListener("click", loadCreateAccount, false);
    document.getElementById("loadLogin").addEventListener("click", loadLogin, false);
}
async function loadLogin() : Promise<void> {
    (async () => {
        const newURL = myURL + "loadLogin/";
        window.open(newURL, "_self");
    })();
}
async function loadCreateAccount() : Promise<void> {
    (async () => {
        const newURL = myURL + "createAccount/";
        window.open(newURL, "_self");
    })();
}

