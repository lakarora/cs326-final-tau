const myURL = "https://fathomless-sea-16239.herokuapp.com/";


let parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

async function putUser(): Promise<void> {
   (async () => {
       var cookie = document.cookie;
       if(cookie == ""){
           alert("Please Log In!");
           location.replace(myURL);
        }
       var cookieObj = parseCookie(cookie);
       if(cookieObj.username == null ){
           alert("Please Log In!");
           location.replace(myURL);
       }
       else{
        var username = cookieObj.username;
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