const myURL = "https://fathomless-sea-16239.herokuapp.com/";

let searchQuery = "";

window.onload=function(){
    let sp= document.getElementById("max-price-filter");
    (<HTMLInputElement>sp).value = '600';
    sp.addEventListener("change", adjustMaxPrice);
    let sr= document.getElementById("seller-rating-filter");
    (<HTMLInputElement>sr).value = '0';
    sr.addEventListener("change", adjustSellerRating);
    let fr = document.getElementById("filter-apply");
    fr.addEventListener('click', filterResults);
    displayBooks(sessionStorage.getItem('searchResults'));
}

function adjustSellerRating() {
    let sellerRating = (<HTMLInputElement>document.getElementById("seller-rating-filter")).value;
    document.getElementById("seller-rating-title").innerHTML = "Seller Rating: "+sellerRating;
}

function adjustMaxPrice() {
    let maxPrice = (<HTMLInputElement>document.getElementById("max-price-filter")).value;
    document.getElementById("max-price-title").innerHTML = "Max Price: $"+maxPrice;
}

async function filterResults() {
    let order = "";
    let maxPrice = (<HTMLInputElement>document.getElementById("max-price-filter")).value;
    let sellerRating = (<HTMLInputElement>document.getElementById("seller-rating-filter")).value;
    let cond = [];
    let searchQuery = (<HTMLInputElement>document.getElementById("search-bar-main")).value;
    if ((<HTMLInputElement>document.getElementById("customRadio1")).checked) {
        order = 'price desc';
    } else if ((<HTMLInputElement>document.getElementById("customRadio2")).checked){
        order = "price asc";
    } else if ((<HTMLInputElement>document.getElementById("customRadio3")).checked){
        order = "condition desc";
    } else if ((<HTMLInputElement>document.getElementById("customRadio4")).checked){
        order = "rating desc";
    } else {
        order = "None";
    }
    if ((<HTMLInputElement>document.getElementById("customCheck1")).checked) {
        cond.push('poor');
    }
    if ((<HTMLInputElement>document.getElementById("customCheck2")).checked) {
        cond.push("worn");
    } 
    if ((<HTMLInputElement>document.getElementById("customCheck3")).checked) {
        cond.push("good");
    } 
    if ((<HTMLInputElement>document.getElementById("customCheck4")).checked) {
        cond.push("great");
    } 
    if ((<HTMLInputElement>document.getElementById("customCheck5")).checked) {
        cond.push("new");
    } 
    const newURL = myURL + "/search/";
    const resp = await fetch(newURL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'query': searchQuery,
                    'order': order,
                    'maxPrice': maxPrice,
                    'sellerRating': sellerRating,
                    'condition': cond
                }
            )
        });
    const responseJson = await resp.json(); 

    if(responseJson['result'] != 'success')
        alert("Error while sorting");
     else {
        let r = responseJson['searchResults'];
        /*
            Each search result will have a json object with:
                Title
                Picture url
                Description
                Price
                Condition
                Seller Name
                Link to their page
                Seller Rating

        */

        displayBooks(r);
    }
}

function messageUser(num) {

}

function displayBooks(r){
    let view = document.getElementById('result-view');
    view.innerHTML ="";
    for (let i = 0; i < r.length; i++){
        const toInsert = " \
        <div class='card flex-row flex-wrap'> \
            <div class='col'> \
                <div class='card-header border-0'> \
                    <img src='"+r[i]['picture'] + "' alt='' height='100px'width='100px'> \
                </div> \
            </div> \
            <div class='col-9'> \
                <div class='card-block px-2' style='padding-left: 3%;'> \
                    <a href='#' rel='Posting'><h4 class='card-title'>"+r[i]['title']+ "</h4></a> \
                    <h5>Desctiption:</h5> \
                    <p class='card-text'>"+r[i]['description']+ " \
                    </p> \
                    <h5>Condition:</h5> \
                    <p>"+ r[i]['condition'] + "</p> \
                    <h5>Seller Name: <a href='"+r[i]['account-link']+"' rel='Account Popup' style='padding-right:10%;'>"+r[i]['account-name']+"</a>  \
                    Rating: "+r[i]['seller-rating']+  "\
                    <img src='resources/star.png' alt='star' height='16px' width='16px'></img></h5> \
                </div> </div> <div class='col'> \
                <h5 style='padding-top:75%;'>$" + r[i]['price'] + "</h5> \
                <h5 style='padding-top:5%;'>Amazon Price: $"+r[i]['amazonPrice']+"140</h5> \
                <button id='message-button' type='button' class='btn btn-primary' onclick='messageUser("+i+")'>Message</button> \
            </div>  \
        </div>";

        view.insertAdjacentHTML('beforeend', toInsert);
    }
}

