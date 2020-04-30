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
var myURL = "https://fathomless-sea-16239.herokuapp.com/";
var searchQuery = "";
window.onload = function () {
    var sp = document.getElementById("max-price-filter");
    sp.value = '600';
    sp.addEventListener("change", adjustMaxPrice);
    var sr = document.getElementById("seller-rating-filter");
    sr.value = '0';
    sr.addEventListener("change", adjustSellerRating);
    var fr = document.getElementById("filter-apply");
    fr.addEventListener('click', filterResults);
};
function adjustSellerRating() {
    var sellerRating = document.getElementById("seller-rating-filter").value;
    document.getElementById("seller-rating-title").innerHTML = "Seller Rating: " + sellerRating;
}
function adjustMaxPrice() {
    var maxPrice = document.getElementById("max-price-filter").value;
    document.getElementById("max-price-title").innerHTML = "Max Price: $" + maxPrice;
}
function filterResults() {
    return __awaiter(this, void 0, void 0, function () {
        var order, maxPrice, sellerRating, cond, searchQuery, newURL, resp, responseJson, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = "";
                    maxPrice = document.getElementById("max-price-filter").value;
                    sellerRating = document.getElementById("seller-rating-filter").value;
                    cond = [];
                    searchQuery = document.getElementById("search-bar-main").value;
                    if (document.getElementById("customRadio1").checked) {
                        order = 'price desc';
                    }
                    else if (document.getElementById("customRadio2").checked) {
                        order = "price asc";
                    }
                    else if (document.getElementById("customRadio3").checked) {
                        order = "condition desc";
                    }
                    else if (document.getElementById("customRadio4").checked) {
                        order = "rating desc";
                    }
                    else {
                        order = "None";
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
                    newURL = myURL + "search/";
                    return [4 /*yield*/, fetch(newURL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'query': searchQuery,
                                'order': order,
                                'maxPrice': maxPrice,
                                'sellerRating': sellerRating,
                                'condition': cond
                            })
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    responseJson = _a.sent();
                    if (responseJson['result'] != 'success')
                        alert("Error while sorting");
                    else {
                        r = responseJson['searchResults'];
                        /*
                            Each search result will have a json object with:
                                Title
                                Picture url
                                Description
                                Price
                                Condition
                                Seller Name
                                Link to their page
                                Seller Rating
                
                        */
                        displayBooks(r);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function displayBooks(r) {
    var view = document.getElementById('result-view');
    view.innerHTML = "";
    for (var i = 0; i < r.length; i++) {
        var toInsert = " \
        <div class='card flex-row flex-wrap'> \
            <div class='col'> \
                <div class='card-header border-0'> \
                    <img src='" + r[i]['picture'] + "' alt='' height='100px'width='100px'> \
                </div> \
            </div> \
            <div class='col-9'> \
                <div class='card-block px-2' style='padding-left: 3%;'> \
                    <a href='#' rel='Posting'><h4 class='card-title'>" + r[i]['title'] + "</h4></a> \
                    <h5>Desctiption:</h5> \
                    <p class='card-text'>" + r[i]['description'] + " \
                    </p> \
                    <h5>Condition:</h5> \
                    <p>" + r[i]['condition'] + "</p> \
                    <h5>Seller Name: <a href='" + r[i]['account-link'] + "' rel='Account Popup' style='padding-right:10%;'>" + r[i]['account-name'] + "</a>  \
                    Rating: " + r[i]['seller-rating'] + "\
                    <img src='resources/star.png' alt='star' height='16px' width='16px'></img></h5> \
                </div> </div> <div class='col'> \
                <h5 style='padding-top:75%;'>$" + r[i]['price'] + "</h5> \
            </div>  \
        </div>";
        view.insertAdjacentHTML('beforeend', toInsert);
    }
}
function searchBook() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var searchQuery, newURL, resp, responseJson, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchQuery = document.getElementById("search-bar-main").value;
                    console.log(searchQuery);
                    newURL = myURL + "search/";
                    return [4 /*yield*/, fetch(newURL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'search': searchQuery
                            })
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    responseJson = _a.sent();
                    // Dummy code
                    if (responseJson['result'] != 'success')
                        alert("Error while searching for book");
                    else {
                        r = responseJson['searchResults'];
                        /*
                            Each search result will have a json object with:
                                Title
                                Picture url
                                Description
                                Price
                                Condition
                                Seller Name
                                Link to their page
                                Seller Rating
            
                        */
                        displayBooks(r);
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
