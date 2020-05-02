// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"


let parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

window.onload=function(){
    const userInfo = JSON.parse(sessionStorage.getItem("findUser"));
    var username = (<HTMLElement>document.getElementById("username"));
    username.innerHTML = userInfo.username;
    var userInst = (<HTMLElement>document.getElementById("userInstitute"));
    userInst.innerHTML = userInfo.institute;
    var sRating = userInfo.sRating;
    var bRating = userInfo.bRating;

    let sr = document.getElementById("giveSellerRating");
    sr.addEventListener("click", sellerRate);
    let br = document.getElementById("giveBuyerRating");
    br.addEventListener("click", buyerRate);
}

async function sellerRate() {
    let rate = document.getElementById("addRating");
    rate.addEventListener("click", async function () {
        var rating = (<HTMLInputElement>document.getElementById("sellerRating")).value;
        var username = (<HTMLInputElement>document.getElementById("username")).value;
        const newURL = myURL + "userRating";
        if(document.cookie == ""){
            alert("Please Log In!");
            location.replace(myURL);
        }
        var cookieObj = parseCookie(document.cookie);
        if(cookieObj.username == null ){
            alert("Please Log In!");
            location.replace(myURL);
        }
        var currUser = cookieObj.username;
        const resp = await fetch(newURL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "rating": rating,
                    'rType': 'seller',
                    'ratedUser': username,
                    'rater': currUser
                }
            )
        }); 
        const responseJson = await resp.json();
        if(responseJson['result'] != 'success')
            alert("Error while logging in")
        else {
            alert("User Has Been Rated");

            // Now load the next page --> Options to buy, sell, rate users, and view user profile
            //const newURL = myURL + "static/selectAfterLogin.html";
            const newURL = "./selectActionAfterLogin.html";
            window.open(newURL, "_self");
        }
    });
}

async function buyerRate() {
    let rate = document.getElementById("addRating");
    rate.addEventListener("click", async function () {
        var rating = (<HTMLInputElement>document.getElementById("sellerRating")).value;
        var username = (<HTMLInputElement>document.getElementById("username")).value;
        const newURL = myURL + "userRating/";
        if(document.cookie == ""){
            alert("Please Log In!");
            location.replace(myURL);
        }
        var cookieObj = parseCookie(document.cookie);
        if(cookieObj.username == null ){
            alert("Please Log In!");
            location.replace(myURL);
        }
        var currUser = cookieObj.username;
        const resp = await fetch(newURL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "rating": rating,
                    "rType": "buyer",
                    "ratedUser": username,
                    "rater": currUser
                }
            )
        }); 
        const responseJson = await resp.json();

        if(responseJson['result'] != 'success'){
            alert("Error while logging in");
            location.replace(myURL);
        }
        else {
            alert("User Has Been Rated");

            // Now load the next page --> Options to buy, sell, rate users, and view user profile
            //const newURL = myURL + "static/selectAfterLogin.html";
            const newURL = myURL + 'rate/';
            window.open(newURL, "_self");
        }
    });
}