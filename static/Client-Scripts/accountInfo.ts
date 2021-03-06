const myURL = "https://protected-island-78699.herokuapp.com/";
// const myURL = "http://localhost:8080/"

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

async function getInfo(): Promise<void> {
    const uni_to_fullname = {
        'umass': 'University of Massachusetts Amherst',
        'smith': 'Smith College',
        'mtholyoke': 'Mount Holyoke College',
        'amherstcol': 'Amherst College',
        'hampshire': 'Hampshire College'
    };

    (async () => {
        const newURL = myURL + "accountInfo/";
        let uname = sessionStorage.getItem('currentUser');
        console.log("here");
        const resp = await fetch(newURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': uname})
            }); 
        const respJson = await resp.json();
        console.log(respJson);
        if(respJson.result != "success"){
            alert("Error finding user");
            location.replace(myURL);
            return;
        }
        var username = (<HTMLElement>document.getElementById("username"));
        var fullName = (<HTMLElement>document.getElementById("fullName"));
        var institution = (<HTMLElement>document.getElementById("userInstitute"));
        var bRating = (<HTMLElement>document.getElementById("bRating"));
        var sRating = (<HTMLElement>document.getElementById("sRating"));
        username.innerHTML = respJson.username;
        fullName.innerHTML = respJson.fullName;
        institution.innerHTML = uni_to_fullname[respJson.institution];
        bRating.innerHTML = "<b>" + respJson.bRating.toFixed(1) + "\/5</b>";
        sRating.innerHTML = "<b>" + respJson.sRating.toFixed(1) + "\/5</b>";
    })();
}

async function myPosts() : Promise<void> {
    (async () => { 
        var username = (<HTMLElement>document.getElementById("username"));
        var newURL = myURL + "MyPostings/"
        console.log(username);
        var resp = await postData( newURL, {"username": sessionStorage.getItem('currentUser')});
        const respJson = await resp.json();
        if(resp.status == 404){
            alert("Error");
            location.reload();
        }
        else{
            sessionStorage.setItem("myPosts", JSON.stringify(respJson));
            location.replace(newURL);
        }
    })();
}

async function goToMessages() : Promise<void> {
    (async () => {
        const messageUrl = "https://tranquil-wildwood-23570.herokuapp.com/";
        window.open(messageUrl, '_blank')
    })();
}