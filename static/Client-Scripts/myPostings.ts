// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

window.onload = function() {
    (async() => {
        validateUser();
    })();
}

async function validateUser(): Promise<void> {
    (async () => {
        var username = sessionStorage.getItem('currentUser');
        if(username == null){
            alert("Please Log In!");
            location.replace(myURL);
         }
    })(); 
 }
 
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

function createListItem(bookTitle : string, n: number) {
    var li = (<HTMLElement>document.createElement('li'));
    li.setAttribute("id", "book"+ n.toString());
    var chBox = (<HTMLElement>document.createElement('input'));
    li.innerHTML = '<input type="checkbox" id=' + "ch" + n.toString() +  '>&nbsp;&nbsp;<label>'+ bookTitle +'</label>';
    return li;
}

async function renderList(){
    console.log("sdfasjdf");
    var listP = (<HTMLElement>document.getElementById("listPosts"));
    var posts = JSON.parse(sessionStorage.getItem("myPosts")).postings;
    if( posts.length == 0){
        alert("No active posts");
        location.replace(myURL + 'options/');
        return;
    }
    for(let i=0; i< posts.length; i++){
        listP.appendChild(createListItem(posts[i], i));
    }
}