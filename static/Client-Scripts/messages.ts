// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"


let conversations = [];
let selected = 0;
/*
let conversations = [
        {
            'username': 'Nathan',
            'date': 'April 26',
            'messages': [
                {
                    'type': 'received',
                    'content': 'Hello can i buy the bio book?'
                },
                {
                    'type': 'sent',
                    'content': 'Ya totally are you good with the price?'
                }
            ]
        }, 
        {
            'username': 'Nishad',
            'date': 'April 24',
            'messages': [
                {
                    'type': 'sent',
                    'content': 'I saw the posting for the cs book would you be willing to negotiate?'
                }
            ]
        }
    ];
*/

window.onload = function(){
    let sm = document.getElementById('send-message-button');
    sm.addEventListener('click', sendMessage);
    let cb = document.getElementById('conversation');
    cb.addEventListener('click',selectConversation);
    loadConversations();
}

let parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

async function loadConversations() {
    const newURL = myURL + "messages/";
    var cookie = document.cookie;
    if(cookie == ""){
        alert("Please Log In!");
        location.replace(myURL);
    }
    var cookieObj = parseCookie(cookie);
    if( cookieObj.username == null){
        alert("Please Log In!");
        location.replace(myURL);
    } else {
        const newURL = myURL + "messages/";
        let uname = cookieObj.username;
        
        const resp = await fetch(newURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'username': uname
                    }
                )
            });
        const responseJson = await resp.json(); 

        if(responseJson['result'] != 'success')
            alert("Error while sorting");
        else {
            conversations = responseJson['conversations'];
            let view = document.getElementById('users-box');
            view.innerHTML ="";
            if (conversations.length > 0) {
                for (let i = 0;i < conversations.length; i++) {
                    let toInsert = "<a onclick='selectConversation("+i+")' id='conversation' class='list-group-item list-group-item-action list-group-item-light rounded-0'> \
                                        <div class='media'> \
                                            <div class='media-body ml-4'> \
                                                <div class='d-flex align-items-center justify-content-between mb-1'> \
                                                    <h6 class='mb-0'>"+conversations[i]['username']+"</h6><small class='small font-weight-bold'>"+conversations[i]['date']+"</small> \
                                                </div> \
                                            </div> \
                                        </div> \
                                    </a>";
                    
                    
                    view.insertAdjacentHTML('beforeend', toInsert);
                }
            } else {
                let toInsert = "<p>No Messages</p>";
                let view = document.getElementById('messages-box');
                view.insertAdjacentHTML('beforeend', toInsert);
            }   
        }
    }
}

function selectConversation(num) {
    selected = num;
    for (let i = 0;i < conversations.length; i++) {
        let toInsert = "";
        if (i == num) {
            let toInsert = "<a onclick='selectConversation("+i+")' id='conversation' class='list-group-item list-group-item-action active text-white rounded-0'> \
                                <div class='media'> \
                                    <div class='media-body ml-4'> \
                                        <div class='d-flex align-items-center justify-content-between mb-1'> \
                                            <h6 class='mb-0'>"+conversations[i]['username']+"</h6><small class='small font-weight-bold'>"+conversations[i]['date']+"</small> \
                                        </div> \
                                    </div> \
                                </div> \
                            </a> ";
        } else {
            let toInsert = "<a onclick='selectConversation("+i+")' id='conversation' class='list-group-item list-group-item-action list-group-item-light rounded-0'> \
                                <div class='media'> \
                                    <div class='media-body ml-4'> \
                                        <div class='d-flex align-items-center justify-content-between mb-1'> \
                                            <h6 class='mb-0'>"+conversations[i]['username']+"</h6><small class='small font-weight-bold'>"+conversations[i]['date']+"</small> \
                                        </div> \
                                    </div> \
                                </div> \
                            </a> ";
        }
        let view = document.getElementById('messages-box');
        view.innerHTML ="";
        view.insertAdjacentHTML('beforeend', toInsert);

        for (let i = 0; i < conversations[num]['messages'].length; i++) {
            if (conversations[num]['messages'][i]['type'] == 'received') {
                displayWhiteMessage(conversations[num]['messages'][i]['content']);
            } else {
                displayBlueMessage(conversations[num]['messages'][i]['content']);
            }
        }

    }
}

function displayBlueMessage(message) {
    let toInsert = "<div class='media w-50 ml-auto mb-3'> \
    <div class='media-body'> \
        <div class='bg-primary rounded py-2 px-3 mb-2'> \
            <p class='text-small mb-0 text-white'>" + message + "</p> \
            </div> \
        </div> \
    </div>";

    let view = document.getElementById('messages-box');
    view.insertAdjacentHTML('beforeend', toInsert);
}

function displayWhiteMessage(message) {
    let toInsert = "<div class='media w-50 mb-3'> \
        <div class='media-body ml-3'> \
            <div class='bg-light rounded py-2 px-3 mb-2'> \
                <p class='text-small mb-0 text-muted'>" + message + "</p> \
            </div> \
        </div> \
    </div>";

    let view = document.getElementById('messages-box');
    view.insertAdjacentHTML('beforeend', toInsert);
}

async function sendMessage() {
    //(async () => {
        let message = (<HTMLInputElement>document.getElementById("send-message-bar")).value;
        (<HTMLInputElement>document.getElementById("send-message-bar")).value = "";
        console.log(message);
        /*
        const newURL = myURL + "messages/";
        const resp = await fetch(newURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'user': conversations[selected]['messages']['content'],
                        'message': message
                    }
                )
            }
        );
        */
        conversations[selected]['messages'].push({
            'type': 'sent',
            'content': message
        });
        displayBlueMessage(message);
    //})
}