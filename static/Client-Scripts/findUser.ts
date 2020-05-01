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

async function findUser(): Promise<void> {
    var user = (<HTMLInputElement>document.getElementById("findUserInput")).value;
    var newURL = myURL + "findUser/";
    var resp = await postData(newURL, {"user": user});
    const respJson = await resp.json();
    if(respJson.status == "404"){
        alert("User not found");
        location.reload();
    }
    else{
        sessionStorage.setItem("findUser", JSON.stringify(respJson)); 
        location.replace(myURL + "/rateUser");
    }
}