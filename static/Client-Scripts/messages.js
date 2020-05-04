var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
var myURL = "http://localhost:8080/";
var conversations = [];
var selected = 0;
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
window.onload = function () {
    var sm = document.getElementById('send-message-button');
    sm.addEventListener('click', sendMessage);
    var cb = document.getElementById('conversation');
    cb.addEventListener('click', selectConversation);
    loadConversations();
};
var parseCookie = function (str) {
    return str
        .split(';')
        .map(function (v) { return v.split('='); })
        .reduce(function (acc, v) {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
};
function loadConversations() {
    return __awaiter(this, void 0, void 0, function () {
        var newURL, cookie, cookieObj, newURL_1, uname, resp, responseJson, view, i, toInsert, toInsert, view_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newURL = myURL + "messages/";
                    cookie = document.cookie;
                    if (cookie == "") {
                        alert("Please Log In!");
                        location.replace(myURL);
                    }
                    cookieObj = parseCookie(cookie);
                    if (!(cookieObj.username == null)) return [3 /*break*/, 1];
                    alert("Please Log In!");
                    location.replace(myURL);
                    return [3 /*break*/, 4];
                case 1:
                    newURL_1 = myURL + "messages/";
                    uname = cookieObj.username;
                    return [4 /*yield*/, fetch(newURL_1, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'username': uname
                            })
                        })];
                case 2:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 3:
                    responseJson = _a.sent();
                    if (responseJson['result'] != 'success')
                        alert("Error while sorting");
                    else {
                        conversations = responseJson['conversations'];
                        view = document.getElementById('users-box');
                        view.innerHTML = "";
                        if (conversations.length > 0) {
                            for (i = 0; i < conversations.length; i++) {
                                toInsert = "<a onclick='selectConversation(" + i + ")' id='conversation' class='list-group-item list-group-item-action list-group-item-light rounded-0'> \
                                        <div class='media'> \
                                            <div class='media-body ml-4'> \
                                                <div class='d-flex align-items-center justify-content-between mb-1'> \
                                                    <h6 class='mb-0'>" + conversations[i]['username'] + "</h6><small class='small font-weight-bold'>" + conversations[i]['date'] + "</small> \
                                                </div> \
                                            </div> \
                                        </div> \
                                    </a>";
                                view.insertAdjacentHTML('beforeend', toInsert);
                            }
                        }
                        else {
                            toInsert = "<p>No Messages</p>";
                            view_1 = document.getElementById('messages-box');
                            view_1.insertAdjacentHTML('beforeend', toInsert);
                        }
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function selectConversation(num) {
    selected = num;
    for (var i = 0; i < conversations.length; i++) {
        var toInsert = "";
        if (i == num) {
            var toInsert_1 = "<a onclick='selectConversation(" + i + ")' id='conversation' class='list-group-item list-group-item-action active text-white rounded-0'> \
                                <div class='media'> \
                                    <div class='media-body ml-4'> \
                                        <div class='d-flex align-items-center justify-content-between mb-1'> \
                                            <h6 class='mb-0'>" + conversations[i]['username'] + "</h6><small class='small font-weight-bold'>" + conversations[i]['date'] + "</small> \
                                        </div> \
                                    </div> \
                                </div> \
                            </a> ";
        }
        else {
            var toInsert_2 = "<a onclick='selectConversation(" + i + ")' id='conversation' class='list-group-item list-group-item-action list-group-item-light rounded-0'> \
                                <div class='media'> \
                                    <div class='media-body ml-4'> \
                                        <div class='d-flex align-items-center justify-content-between mb-1'> \
                                            <h6 class='mb-0'>" + conversations[i]['username'] + "</h6><small class='small font-weight-bold'>" + conversations[i]['date'] + "</small> \
                                        </div> \
                                    </div> \
                                </div> \
                            </a> ";
        }
        var view = document.getElementById('messages-box');
        view.innerHTML = "";
        view.insertAdjacentHTML('beforeend', toInsert);
        for (var i_1 = 0; i_1 < conversations[num]['messages'].length; i_1++) {
            if (conversations[num]['messages'][i_1]['type'] == 'received') {
                displayWhiteMessage(conversations[num]['messages'][i_1]['content']);
            }
            else {
                displayBlueMessage(conversations[num]['messages'][i_1]['content']);
            }
        }
    }
}
function displayBlueMessage(message) {
    var toInsert = "<div class='media w-50 ml-auto mb-3'> \
    <div class='media-body'> \
        <div class='bg-primary rounded py-2 px-3 mb-2'> \
            <p class='text-small mb-0 text-white'>" + message + "</p> \
            </div> \
        </div> \
    </div>";
    var view = document.getElementById('messages-box');
    view.insertAdjacentHTML('beforeend', toInsert);
}
function displayWhiteMessage(message) {
    var toInsert = "<div class='media w-50 mb-3'> \
        <div class='media-body ml-3'> \
            <div class='bg-light rounded py-2 px-3 mb-2'> \
                <p class='text-small mb-0 text-muted'>" + message + "</p> \
            </div> \
        </div> \
    </div>";
    var view = document.getElementById('messages-box');
    view.insertAdjacentHTML('beforeend', toInsert);
}
function sendMessage() {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            message = document.getElementById("send-message-bar").value;
            document.getElementById("send-message-bar").value = "";
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
            return [2 /*return*/];
        });
    });
}
