// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

let searchResults = [];
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

let parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

window.onload=function(){
    let sp= document.getElementById("max-price-filter");
    (<HTMLInputElement>sp).value = '600';
    sp.addEventListener("change", adjustMaxPrice);
    let sr= document.getElementById("seller-rating-filter");
    (<HTMLInputElement>sr).value = '0';
    sr.addEventListener("change", adjustSellerRating);
    let fr = document.getElementById("filter-apply");
    fr.addEventListener('click', filterResults);
    searchResults = JSON.parse(sessionStorage.getItem('searchResults'))
    displayBooks(searchResults);
}

function adjustSellerRating() {
    let sellerRating = (<HTMLInputElement>document.getElementById("seller-rating-filter")).value;
    document.getElementById("seller-rating-title").innerHTML = "Seller Rating: "+sellerRating;
}

function adjustMaxPrice() {
    let maxPrice = (<HTMLInputElement>document.getElementById("max-price-filter")).value;
    document.getElementById("max-price-title").innerHTML = "Max Price: $"+maxPrice;
}

function asc(a,b) {
    if(a['price'] < b['price']) return 1;
    else return -1;
}
function desc(a,b) {
    if(a['price'] > b['price']) return 1;
    else return -1;
}
function csort(a,b) {
    if(a['condition'] > b['condition']) return 1;
    else return -1;
}
function rsort(a,b) {
    if(a['seller-rating'] > b['seller-rating']) return 1;
    else return -1;
}

async function filterResults() {
    let order = (<HTMLInputElement>document.getElementById("order")).value;
    let maxPrice = parseFloat((<HTMLInputElement>document.getElementById("max-price-filter")).value);
    let sellerRating = parseFloat((<HTMLInputElement>document.getElementById("seller-rating-filter")).value);
    let cond = [];
    if (isNaN(maxPrice)) {
        let maxPrice = 10000000000;
    }
    if (isNaN(sellerRating)){
        let sellerRating = '-1';
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
    if (cond.length == 0) {
        cond.push("new");
        cond.push("great");
        cond.push("good");
        cond.push("worn");
        cond.push('poor');
    }
    let toDisplay = [];
    for (let i = 0; i < searchResults.length; i++) {
        if (cond.includes(searchResults[i]['condition'].toLowerCase()) &&
            parseFloat(searchResults[i]['seller-rating']) > sellerRating &&
            parseFloat(searchResults[i]['price']) < maxPrice) {
            toDisplay.push(searchResults[i]);
        }
    }
    if (order == 'desc') {
        toDisplay = toDisplay.sort(desc);
    } else if (order == 'asc') {
        toDisplay = toDisplay.sort(asc);
    } else if (order == 'cond') {
        toDisplay = toDisplay.sort(csort);
    } else if (order == 'rate') {
        toDisplay = toDisplay.sort(rsort);
    } 
    displayBooks(toDisplay);
}

async function messageUser(num): Promise<void> {
    (async () => {
        var cookie = document.cookie;
        if(cookie == ""){
            alert("Please Log In!");
            location.replace(myURL);
        }
        var cookieObj = parseCookie(cookie);
        if( cookieObj.username == null){
            alert("Please Log In!");
            location.replace(myURL);
        } else {
            let newURL = myURL + "searchBook/";
            let bookData = searchResults[num];
            let message = prompt("What would you like to say?", "Hello, Im interested in your "+bookData['title']+ " posting.");
            if (message == "" || message == null) {

            } else {
                let data = {
                    'message': message,
                    'user': searchResults['account-name']
                }
                let newURL = myURL + "postMessage/"
                var resp = await postData(newURL, data);
                if (resp.status == 200) {
                    const responseJson = await resp.json();
                    if (responseJson['result'] == 'success') {
                        let newURL = myURL + 'messages/'
                        location.replace(newURL);
                    } else {
                        alert("Couldn't send message");
                    }
                }
            }
        }
    })();
}

function displayBooks(r){
    let view = document.getElementById('result-view');
    view.innerHTML ="";
    if (r.length == 0) {
        view.innerHTML ="<h3 align='center'style='padding-top:25%;'>no results...</h3>";
    }
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
                    <img src='../resources/star.png' alt='star' height='16px' width='16px'></img></h5> \
                </div> </div> <div class='col'> \
                <h5 style='padding-top:75%;'>$" + r[i]['price'] + "</h5> \
                <h5 style='padding-top:5%;'>Amazon Price: $"+r[i]['amazonPrice']+"</h5> \
                <button id='message-button' type='button' class='btn btn-primary' onclick='messageUser("+i+")'>Message</button> \
            </div>  \
        </div>";

        view.insertAdjacentHTML('beforeend', toInsert);
    }
}

