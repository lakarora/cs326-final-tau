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
var searchResults = [];
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
                            'Content-Type': 'application/json'
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
var parseCookie = function (str) {
    return str
        .split(';')
        .map(function (v) { return v.split('='); })
        .reduce(function (acc, v) {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
};
window.onload = function () {
    var sp = document.getElementById("max-price-filter");
    sp.value = '600';
    sp.addEventListener("change", adjustMaxPrice);
    var sr = document.getElementById("seller-rating-filter");
    sr.value = '0';
    sr.addEventListener("change", adjustSellerRating);
    var fr = document.getElementById("filter-apply");
    fr.addEventListener('click', filterResults);
    searchResults = JSON.parse(sessionStorage.getItem('searchResults'));
    console.log(searchResults);
    displayBooks(searchResults);
};
function adjustSellerRating() {
    var sellerRating = document.getElementById("seller-rating-filter").value;
    document.getElementById("seller-rating-title").innerHTML = "Seller Rating: " + sellerRating;
}
function adjustMaxPrice() {
    var maxPrice = document.getElementById("max-price-filter").value;
    document.getElementById("max-price-title").innerHTML = "Max Price: $" + maxPrice;
}
function asc(a, b) {
    if (a['price'] < b['price'])
        return 1;
    else
        return -1;
}
function desc(a, b) {
    if (a['price'] > b['price'])
        return 1;
    else
        return -1;
}
function csort(a, b) {
    if (a['condition'] > b['condition'])
        return 1;
    else
        return -1;
}
function rsort(a, b) {
    if (a['seller-rating'] > b['seller-rating'])
        return 1;
    else
        return -1;
}
function filterResults() {
    return __awaiter(this, void 0, void 0, function () {
        var order, maxPrice, sellerRating, cond, maxPrice_1, sellerRating_1, toDisplay, i;
        return __generator(this, function (_a) {
            order = document.getElementById("order").value;
            maxPrice = parseFloat(document.getElementById("max-price-filter").value);
            sellerRating = parseFloat(document.getElementById("seller-rating-filter").value);
            cond = [];
            if (isNaN(maxPrice)) {
                maxPrice_1 = 10000000000;
            }
            if (isNaN(sellerRating)) {
                sellerRating_1 = '-1';
            }
            if (document.getElementById("customCheck1").checked) {
                cond.push('poor');
            }
            if (document.getElementById("customCheck2").checked) {
                cond.push("worn");
            }
            if (document.getElementById("customCheck3").checked) {
                cond.push("good");
            }
            if (document.getElementById("customCheck4").checked) {
                cond.push("great");
            }
            if (document.getElementById("customCheck5").checked) {
                cond.push("new");
            }
            if (cond.length == 0) {
                cond.push("new");
                cond.push("great");
                cond.push("good");
                cond.push("worn");
                cond.push('poor');
            }
            toDisplay = [];
            for (i = 0; i < searchResults.length; i++) {
                if (cond.includes(searchResults[i]['condition'].toLowerCase()) &&
                    //parseFloat(searchResults[i]['seller-rating']) > sellerRating &&
                    parseFloat(searchResults[i]['price']) < maxPrice) {
                    toDisplay.push(searchResults[i]);
                }
            }
            if (order == 'desc') {
                toDisplay = toDisplay.sort(desc);
            }
            else if (order == 'asc') {
                toDisplay = toDisplay.sort(asc);
            }
            else if (order == 'cond') {
                toDisplay = toDisplay.sort(csort);
            }
            else if (order == 'rate') {
                toDisplay = toDisplay.sort(rsort);
            }
            displayBooks(toDisplay);
            return [2 /*return*/];
        });
    });
}
function messageUser(num) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var cookie, cookieObj, newURL, bookData, message, data, newURL_1, resp, responseJson, newURL_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cookie = document.cookie;
                            if (cookie == "") {
                                alert("Please Log In!");
                                location.replace(myURL);
                            }
                            cookieObj = parseCookie(cookie);
                            if (!(cookieObj.username == null)) return [3 /*break*/, 1];
                            alert("Please Log In!");
                            location.replace(myURL);
                            return [3 /*break*/, 5];
                        case 1:
                            newURL = myURL + "searchBook/";
                            bookData = searchResults[num];
                            message = prompt("What would you like to say?", "Hello, Im interested in your " + bookData['title'] + " posting.");
                            if (!(message == "" || message == null)) return [3 /*break*/, 2];
                            return [3 /*break*/, 5];
                        case 2:
                            data = {
                                'message': message,
                                'user': searchResults['account-name']
                            };
                            newURL_1 = myURL + "postMessage/";
                            return [4 /*yield*/, postData(newURL_1, data)];
                        case 3:
                            resp = _a.sent();
                            if (!(resp.status == 200)) return [3 /*break*/, 5];
                            return [4 /*yield*/, resp.json()];
                        case 4:
                            responseJson = _a.sent();
                            if (responseJson['result'] == 'success') {
                                newURL_2 = myURL + 'messages/';
                                location.replace(newURL_2);
                            }
                            else {
                                alert("Couldn't send message");
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function displayBooks(r) {
    var view = document.getElementById('result-view');
    view.innerHTML = "";
    if (r.length == 0) {
        view.innerHTML = "<h3 align='center'style='padding-top:25%;'>no results...</h3>";
    }
    for (var i = 0; i < r.length; i++) {
        var toInsert = " \
        <div class='card flex-row flex-wrap'> \
            <div class='col'> \
                <div class='card-header border-0'> \
                    <img src='../resources/no-image-listing.png' alt='' height='100px'width='100px'> \
                </div> \
            </div> \
            <div class='col-9'> \
                <div class='card-block px-2' style='padding-left: 3%;'> \
                    <a href='#' rel='Posting'><h4 class='card-title'>" + r[i]['title'] + "</h4></a> \
                    <h5>Condition:</h5> \
                    <p>" + r[i]['condition'] + "</p>  </br></br>\
                    <h5>Seller Name: <a href='#' rel='Account Popup' style='padding-right:10%;'>" + r[i]['username'] + "</a>  \
                </div> </div> <div class='col'> \
                <h5 style='padding-top:75%;color:blue;'>$" + r[i]['price'] + "</h5> \
                <h5 style='padding-top:5%;'>Amazon Price: $" + r[i]['amazonPrice'] + "</h5> \
                <button id='message-button' type='button' class='btn btn-primary' onclick='messageUser(" + i + ")'>Message</button> \
                </br> \
            </div>  \
        </div>";
        view.insertAdjacentHTML('beforeend', toInsert);
    }
}
