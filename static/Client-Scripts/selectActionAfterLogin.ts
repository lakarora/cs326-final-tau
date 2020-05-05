// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"
window.onload = function() {
    (async () => {
        validateUser();
    })();
}

async function validateUser(): Promise<void> {
   (async () => {
       var username = sessionStorage.getItem('currentUser');
       if(username == null){
           alert("Please Log In!");
           location.replace(myURL);
        }
       else{
        var greeting = (<HTMLElement>document.getElementById("greetUser"));
        greeting.innerHTML = "Greetings " + username + "!";
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