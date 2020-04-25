let myURL = "http://localhost:8080/";

window.onload=function(){
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
        const newURL = myURL + "rate/";
        const resp = await fetch(newURL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'rating': rating,
                    'type': 'seller',
                    'email': username,
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
        const resp = await fetch(newURL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'rating': rating,
                    'type': 'buyer',
                    'email': username,
                }
            )
        }); 
        //const responseJson = await resp.json();

        // GET RID OF AFTER
        const responseJson = {
            'result': 'success'
        }
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