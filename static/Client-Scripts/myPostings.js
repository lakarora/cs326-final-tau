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
var myURL = "https://protected-island-78699.herokuapp.com/";
// const myURL = "http://localhost:8080/"
window.onload = function () {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            validateUser();
            renderList();
            return [2 /*return*/];
        });
    }); })();
    document.getElementById("delete").addEventListener("click", confirmDelete);
};
function validateUser() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var username;
                return __generator(this, function (_a) {
                    username = sessionStorage.getItem('currentUser');
                    if (username == null) {
                        alert("Please Log In!");
                        location.replace(myURL);
                    }
                    return [2 /*return*/];
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        redirect: 'follow',
                        body: JSON.stringify(data)
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
function createListItem(bookTitle, n) {
    var li = document.createElement('li');
    li.setAttribute("id", "book" + n.toString());
    var chBox = document.createElement('input');
    li.innerHTML = '<input type="checkbox" id=' + "ch" + n.toString() + '>&nbsp;&nbsp;<label>' + bookTitle + '</label>';
    return li;
}
function renderList() {
    return __awaiter(this, void 0, void 0, function () {
        var listP, posts, i;
        return __generator(this, function (_a) {
            listP = document.getElementById("listPosts");
            posts = JSON.parse(sessionStorage.getItem("myPosts")).postings;
            if (posts.length == 0) {
                alert("No active posts");
                location.replace(myURL + 'options/');
                return [2 /*return*/];
            }
            for (i = 0; i < posts.length; i++) {
                listP.appendChild(createListItem(posts[i].title, i));
            }
            return [2 /*return*/];
        });
    });
}
//function  to submit the elements to be deleted
function confirmDelete() {
    return __awaiter(this, void 0, void 0, function () {
        var posts, delList, i, newURL, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("IN CONF delete");
                    posts = JSON.parse(sessionStorage.getItem("myPosts")).postings;
                    delList = [];
                    for (i = 0; i < posts.length; i++) {
                        if ((document.getElementById("ch" + i.toString())).checked) {
                            delList.push(posts[i]._id);
                        }
                    }
                    console.log(delList);
                    newURL = myURL + 'Delete/';
                    return [4 /*yield*/, postData(newURL, { "delList": delList })];
                case 1:
                    resp = _a.sent();
                    window.open(myURL + 'accountInfo/', '_self');
                    return [2 /*return*/];
            }
        });
    });
}
