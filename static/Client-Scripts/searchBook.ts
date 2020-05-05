// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

window.onload = function(){
    (async () => {
        validateUser();
    })();
    let sb = document.getElementById("searchBtn");
    sb.addEventListener("click", searchBook);
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

async function searchBook(): Promise<void> {
    (async () => {
        let newURL = myURL + "searchBook/";
        let data = {};
        if ((<HTMLInputElement>document.getElementById('title')).value=='' || (<HTMLInputElement>document.getElementById('title')).value==null) {
            alert("Search was empty!!!");
        } else {
            data = {
                'query':(<HTMLInputElement>document.getElementById('title')).value
            }
            var resp = await postData(newURL, data);
            if (resp.status == 200) {
                const responseJson = await resp.json(); 
                sessionStorage.setItem("searchResults", JSON.stringify(responseJson['searchResults']));
                let newURL = myURL+'seachResults/';
                console.log(newURL);
                location.replace(myURL + 'searchResults/');
            } else if (resp.status==404) {
                alert("No book by that title was found");
            } else {
                alert("Couldnt connect to the server");
            }
        }
    })();
}

