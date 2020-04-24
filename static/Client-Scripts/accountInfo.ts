const myURL = "http://localhost:8080/";

let parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

async function getInfo(): Promise<void> {
    (async () => {
        var cookie = document.cookie;
        var cookieObj = parseCookie(cookie);
        if( cookieObj.username == null){
            alert("Please Log In!");
            location.replace(myURL);
        } else {
            const newURL = myURL + "accountInfo/";
            let uname = cookieObj.username;
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
        }
    })();
}