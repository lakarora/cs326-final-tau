const myURL = "http://localhost:8080/";

async function putUser(): Promise<void> {
   (async () => {
       var cookie = document.cookie;
       let i = cookie.indexOf("=");
       if( i === -1){
           alert("Please Log In!");
           location.replace(myURL);
       }
       var username = cookie.substring(i+1);
       var greeting = (<HTMLElement>document.getElementById("greetUser"));
       greeting.innerHTML = "Greetings " + username + "!";
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