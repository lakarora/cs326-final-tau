// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

window.onload=function(){

    // Check if user is logged in
    (async () => {
        validateUser();

        // The information about the searched user is set in sessionStorage.
        // Retrieve that and populate the corresponding elements
        const userInfo = JSON.parse(sessionStorage.getItem('rateUserInfo'));
        populateElements(userInfo);

    })();


    document.getElementById("giveSellerRating").addEventListener("click", sellerRate);
    document.getElementById("giveBuyerRating").addEventListener("click", buyerRate);
}

async function validateUser(): Promise<void> {
    (async () => {
        var username = sessionStorage.getItem('currentUser');
        if(username == null){
            alert("Please Log In!");
            location.replace(myURL);
         }
    })(); 
 }
async function populateElements(userInfo): Promise<void> {

    // Dictionary for mapping uni codes to full names

    const uni_to_fullname = {
        'umass': 'University of Massachusetts Amherst',
        'smith': 'Smith College',
        'mtholyoke': 'Mount Holyoke College',
        'amherstcol': 'Amherst College',
        'hampshire': 'Hampshire College'
    };
    document.getElementById("username").innerHTML = userInfo["username"];
    document.getElementById("userInstitute").innerHTML = uni_to_fullname[userInfo.institution];
    document.getElementById("sellerRating").innerHTML = userInfo.sellerRating;
    document.getElementById("buyerRating").innerHTML = userInfo.buyerRating;
}
async function sellerRate() {
    let rate = document.getElementById("addRating");
    rate.addEventListener("click", async function () {
        var rating = (<HTMLInputElement>document.getElementById("sellerRating")).value;
        var username = (<HTMLInputElement>document.getElementById("username")).value;
        const newURL = myURL + "userRating";
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
                    'ratedUser': username                }
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
                    "ratedUser": username                }
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