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

window.onload = function() {
    document.getElementById("sellBookForm").addEventListener("submit", nextPrice, false);
}

async function nextPrice(event) : Promise<void> {
    (async () => {
        event.preventDefault();
        var inputs = (<HTMLFormElement>document.getElementById("sellBookForm")).elements;
        var title = inputs["title"].value;
        var author = inputs["author"].value;
        var isbn = inputs["isbn"].value;
        var condition = inputs["condition"].value;
        var inst = inputs["institution"].value;
        var subject = inputs["courseSubject"].value;
        var cNumber = inputs["courseNumber"].value;

        var bookData = {
            "title": title, 
            "author": author,
            "isbn": isbn,
            "condition": condition,
        }
        if( inst != "N/A"){
            bookData["college"] = inst;
            bookData["courseSubject"] = subject;
            bookData["courseNumber"] = cNumber;
        }
        
        var newURL = myURL + "setPrice/";
        const resp = await postData(newURL, bookData);
        const respJson = await resp.json();
        const amznPrice = respJson.price;
        bookData["amznPrice"] = amznPrice;

        sessionStorage.setItem("sellBookData", JSON.stringify(bookData));
        console.log("here");
        window.open(newURL, "_self");
    })();
}

async function putPrice(): Promise<void> {
    (async () => {
        var bookData = JSON.parse(sessionStorage.getItem("sellBookData"));
        var amznPrice = bookData.amznPrice;

        var usedPrice = (<HTMLElement>document.getElementById("amznPrice"));
        usedPrice.innerHTML = "<b> $" + amznPrice + "</b>";
    })();
}

async function postBook(): Promise<void> {
    (async () => {
        if(parseCookie(document.cookie).username == null){
            alert("Please log in");
            location.replace(myURL);
            return;
        }
        if(sessionStorage.getItem("sellBookData") == null){
           alert("Please Enter Book Information");
           location.replace(myURL + 'sell/');
           return;
        } 
        var username = parseCookie(document.cookie).username;
        var bookData = JSON.parse(sessionStorage.getItem("sellBookData"));
        var price = (<HTMLInputElement>document.getElementById("price")).value;
        if( price == ""){
            alert("Please enter a price");
        }
        bookData.username = username;
        bookData.price = price;
        var newURL = myURL + "postBook/";
        const resp = await postData(newURL, bookData);
        const respJson = await resp.json();
        if(respJson.status == "success"){
            alert("Book succesfully posted");
            location.replace(myURL + 'sell/');
        }
        else{
            alert("Error in Posting Book");
            location.replace(myURL + 'sell/');
        }
    })();
}