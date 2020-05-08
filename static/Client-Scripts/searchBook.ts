// const myURL = "http://localhost:8080/";
const myURL = "https://protected-island-78699.herokuapp.com/";
window.onload=function(){
    let sb = document.getElementById("searchBtn");
    sb.addEventListener("click", searchBook);
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
            const responseJson = await resp.json(); 
            if (responseJson['result'] == 'success') {

                sessionStorage.setItem("searchResults", JSON.stringify(responseJson['searchResults']));
                let newURL = myURL+'seachResults/';
                location.replace(myURL + 'searchResults/');
                //window.open(newURL, "_self");
            } else if (responseJson['result'] == 'nobooks') {
                alert("No book by that title was found");
            } else {
                alert("Couldnt connect to the server");
            }
        }
    })();

}