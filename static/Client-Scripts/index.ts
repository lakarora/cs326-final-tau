const myURL = "http://localhost:8080/login/";

async function verifyLogin() : Promise<void> {
    (async () => {

        // Cast because TypeScript takes it as HTMLElement which does not have value field
        var email = (<HTMLInputElement>document.getElementById("loginEmail")).value;
        var password = (<HTMLInputElement>document.getElementById("loginPassword")).value;
        const resp = await fetch(myURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'email': email,
                        'password': password
                    }
                )
            });
        const responseJson = await resp.json();
        if(responseJson['result'] != 'loggedIn')
            alert("Error while logging in")
        else {
            alert("Login successful");

            // Set cookie in browser for the user logged in and load the next page
        }
    })();
}