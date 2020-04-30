const myURL = "https://fathomless-sea-16239.herokuapp.com/";

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
    const newURL = myURL + "/search/";
    let data = {};
    if ((<HTMLInputElement>document.getElementById("searchByBook")).checked && !(<HTMLInputElement>document.getElementById("searchByCourse")).checked) {
        alert("Can only check 1");
        return;
    } else if (!(<HTMLInputElement>document.getElementById("searchByBook")).checked && !(<HTMLInputElement>document.getElementById("searchByCourse")).checked){
        alert("You must select an option!");
        return;
    } else if ((<HTMLInputElement>document.getElementById("searchByBook")).checked){
        data = {
            'type':'byBook',
            'query': {
                'title': (<HTMLInputElement>document.getElementById("title")).value,
                'isbn': (<HTMLInputElement>document.getElementById("isbn")).value,
                'author':(<HTMLInputElement>document.getElementById("author")).value 
            }
        }
    } else {
        data = {
            'type':'byCourse',
            'query': {
                'title': (<HTMLInputElement>document.getElementById("dropdownMenuButton")).value,
                'isbn': (<HTMLInputElement>document.getElementById("courseSubject")).value,
                'author':(<HTMLInputElement>document.getElementById("courseNumber")).value 
            }
        }
    } 
    var resp = await postData(newURL, data);
}

