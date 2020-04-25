export {}
let myURL = "https://enigmatic-bastion-90313.herokuapp.com/";

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
    const newURL = myURL + "search/";
    var title = (<HTMLInputElement>document.getElementById("title")).value;
    var resp = await postData(newURL, {query: title});
}

