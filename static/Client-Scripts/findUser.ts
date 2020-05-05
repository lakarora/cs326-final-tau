// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

window.onload = function() {
    (async () => {
        validateUser();
    })
    document.getElementById("findUserButton").addEventListener("click",findUser);
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
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    return resp; 
}

async function findUser(): Promise<void> {
    (async () => {
        var userName = (<HTMLInputElement>document.getElementById("findUserInput")).value;
        var newURL = myURL + "findUser/";
        var reqBody = {"username": userName};
        const resp = await postData(newURL, reqBody);
        const respJSON = await resp.json();
        if(respJSON.result != 'success'){
            console.log(respJSON.result);
            console.log("HI");
            alert("User not found");
            return;
        }
        else{
            // We got the information from the server. Put it in session storage for next page.
            // console.log(typeof(resp));
            sessionStorage.setItem("rateUserInfo", JSON.stringify(respJSON)); 
            window.open(myURL + "rateUser/", "_self");
        }
    })();
}