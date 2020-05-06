// const myURL = "http://localhost:8080/";
const myURL = "https://protected-island-78699.herokuapp.com/";

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
    document.getElementById("addRating").addEventListener("click", rateUser);
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

 async function postData(url : string, data: any) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
 
}

async function rateUser(userInfo): Promise<void> {
    // Passes in the new rating to be set to the server
    (async () => {
        const userInfo = JSON.parse(sessionStorage.getItem('rateUserInfo'));
        var rating = parseInt((<HTMLSelectElement>document.getElementById("rating")).value);
        var ratingType = 'sellerRating', numBuyerRatings = parseInt(userInfo.numBuyerRatings), 
        numSellerRatings = parseInt(userInfo.numSellerRatings), buyerRating = parseFloat(userInfo.buyerRating),
        sellerRating = parseFloat(userInfo.sellerRating);

        if(sessionStorage.getItem('buyerRating?')) {
            ratingType = 'buyerRating';
            // Calculate new user rating
            var newTotalRating : number = rating + buyerRating * numBuyerRatings;
            numBuyerRatings = numBuyerRatings + 1;
            var newRating =  newTotalRating / numBuyerRatings;
        }
        else {
            var newTotalRating : number = rating + sellerRating * numSellerRatings;
            numSellerRatings = numSellerRatings + 1;
            var newRating =  newTotalRating / numSellerRatings;
        }
        // Now we send the request to the server and update the database.
        const newURL = myURL + "addNewRating/";
        const resp = await postData(newURL, {
            'ratingType': ratingType,
            'userToBeRated': userInfo.username,
            'newRating': newRating,
            'numSellerRatings': numSellerRatings,
            'numBuyerRatings': numBuyerRatings,
            'oldBuyerRating': buyerRating,
            'oldSellerRating': sellerRating
        });
        const respJSON = await resp.json();
        if(respJSON['result'] != 'success') {
            alert("There was en error. Please try again");

            // Clear both buyerRating, sellerRating, userInfo for future use
            sessionStorage.removeItem('sellerRating?');
            sessionStorage.removeItem('buyerRating?');
            sessionStorage.removeItem('rateUserInfo');
            location.reload();
        }
        else {
            alert("Rating has been updated");
            window.open(myURL + "options/", "_self")
            
            // Clear both buyerRating, sellerRating, userInfo for future use
            sessionStorage.removeItem('sellerRating?');
            sessionStorage.removeItem('buyerRating?');
            sessionStorage.removeItem('rateUserInfo');
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
    document.getElementById("username").innerHTML = userInfo.username;
    document.getElementById("userInstitute").innerHTML = uni_to_fullname[userInfo.institution];

    // show only one decimals of the ratings
    document.getElementById("sellerRating").innerHTML = userInfo.sellerRating.toFixed(1);
    document.getElementById("buyerRating").innerHTML = userInfo.buyerRating.toFixed(1);
}
async function sellerRate() {
    sessionStorage.setItem('sellerRating?', '1');
}

async function buyerRate() {
    sessionStorage.setItem("buyerRating?", '1');
}