// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"
window.onload = function() {
    (async () => {
        putUser();
    })();
}

async function putUser(): Promise<void> {
   (async () => {
       var username = sessionStorage.getItem('username');
       if(username == null){
           alert("Please Log In!");
           location.replace(myURL);
        }
       else{
        var greeting = (<HTMLElement>document.getElementById("greetUser"));
        greeting.innerHTML = "Greetings " + username + "!";
        // Set cookie here, code after this page uses cookie instead of sessionStorage
        document.cookie = "username=" + username;
        sessionStorage.clear()
       }
   })(); 
}

async function searchPage(): Promise<void> {
    const newURL = myURL + "search/";
    window.open(newURL, "_self");
}

async function sellPage(): Promise<void> {
    const newURL = myURL + "sell/";
    window.open(newURL, "_self");
}

async function ratePage(): Promise<void> {
    const newURL = myURL + "rate/";
    window.open(newURL, "_self");
}

async function myProfile(): Promise<void> {
    const newURL = myURL + "accountInfo/";
    window.open(newURL, "_self");
}