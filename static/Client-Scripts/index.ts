const myURL = "http://localhost:8080/";

async function verifyLogin() : Promise<void> {
    (async () => {

        // Cast because TypeScript takes it as HTMLElement which does not have value field
        var username = (<HTMLInputElement>document.getElementById("loginUsername")).value;
        var password = (<HTMLInputElement>document.getElementById("loginPassword")).value;
        const newURL = myURL + "login/";
        const resp = await fetch(newURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'email': username,
                        'password': password
                    }
                )
            });
        const responseJson = await resp.json();
        if(responseJson['result'] != 'success')
            alert("Error while logging in")
        else {
            alert("Login successful");
            // Set cookie in browser for the user logged in and load the next page
            document.cookie = "username=" + username;

            // Now load the next page --> Options to buy, sell, rate users, and view user profile
            const newURL = myURL + "options/";
            window.open(newURL, "_self");
        }
    })();
}