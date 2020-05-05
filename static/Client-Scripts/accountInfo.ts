// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

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
    (async () => {
        const newURL = myURL + "accountInfo/";
        let uname = sessionStorage.getItem('currentUser');
        const resp = await fetch(newURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': uname})
            }); 
        const respJson = await resp.json();
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
        institution.innerHTML = respJson.institution;
        bRating.innerHTML = "<b>" + respJson.bRating + "\/5</b>";
        sRating.innerHTML = "<b>" + respJson.sRating + "\/5</b>";
    })();
}

async function myPosts() : Promise<void> {
    (async () => { 
        var username = (<HTMLElement>document.getElementById("username"));
        var newURL = myURL + "MyPostings/"
        var resp = await postData( newURL, {"userName":username});
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