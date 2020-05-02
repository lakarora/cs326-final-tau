// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

// let parseCookie = str =>
//   str
//     .split(';')
//     .map(v => v.split('='))
//     .reduce((acc, v) => {
//       acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
//       return acc;
//     }, {});

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
        console.log("In find user");
        var userName = (<HTMLInputElement>document.getElementById("findUserInput")).value;
        var newURL = myURL + "findUser/";
        console.log(newURL);
        var reqBody = {"user": userName};
        const resp = await postData(newURL, reqBody);
        if(resp.status == 404){
            alert("User not found");
            location.reload();
        }
        else{
            const respJson = await resp.json();
            sessionStorage.setItem("findUser", JSON.stringify(respJson)); 
            location.replace(myURL + "rateUser/");
        }
    })();
}