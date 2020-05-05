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
window.onload = function () {
    var _this = this;
    // Check if user is logged in
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var userInfo;
        return __generator(this, function (_a) {
            validateUser();
            userInfo = JSON.parse(sessionStorage.getItem('rateUserInfo'));
            populateElements(userInfo);
            return [2 /*return*/];
        });
    }); })();
    document.getElementById("giveSellerRating").addEventListener("click", sellerRate);
    document.getElementById("giveBuyerRating").addEventListener("click", buyerRate);
    document.getElementById("addRating").addEventListener("click", rateUser);
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
function rateUser(userInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // Passes in the new rating to be set to the server
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var userInfo, rating, ratingType, numBuyerRatings, numSellerRatings, buyerRating, sellerRating, newTotalRating, newRating, newTotalRating, newRating, newURL, resp, respJSON;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userInfo = JSON.parse(sessionStorage.getItem('rateUserInfo'));
                            rating = parseInt(document.getElementById("rating").value);
                            ratingType = 'sellerRating', numBuyerRatings = parseInt(userInfo.numBuyerRatings), numSellerRatings = parseInt(userInfo.numSellerRatings), buyerRating = parseInt(userInfo.buyerRating), sellerRating = parseInt(userInfo.sellerRating);
                            if (sessionStorage.getItem('buyerRating?')) {
                                ratingType = 'buyerRating';
                                newTotalRating = rating + buyerRating * numBuyerRatings;
                                numBuyerRatings = numBuyerRatings + 1;
                                newRating = newTotalRating / numBuyerRatings;
                            }
                            else {
                                newTotalRating = rating + sellerRating * numSellerRatings;
                                numSellerRatings = numSellerRatings + 1;
                                newRating = newTotalRating / numSellerRatings;
                            }
                            newURL = myURL + "addNewRating/";
                            return [4 /*yield*/, postData(newURL, {
                                    'ratingType': ratingType,
                                    'userToBeRated': userInfo.username,
                                    'newRating': newRating,
                                    'numSellerRatings': numSellerRatings,
                                    'numBuyerRatings': numBuyerRatings,
                                    'oldBuyerRating': buyerRating,
                                    'oldSellerRating': sellerRating
                                })];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 2:
                            respJSON = _a.sent();
                            if (respJSON['result'] != 'success') {
                                alert("There was en error. Please try again");
                                // Clear both buyerRating, sellerRating, userInfo for future use
                                sessionStorage.removeItem('sellerRating?');
                                sessionStorage.removeItem('buyerRating?');
                                sessionStorage.removeItem('rateUserInfo');
                                location.reload();
                            }
                            else {
                                alert("Rating has been updated");
                                window.open(myURL + "options/", "_self");
                                // Clear both buyerRating, sellerRating, userInfo for future use
                                sessionStorage.removeItem('sellerRating?');
                                sessionStorage.removeItem('buyerRating?');
                                sessionStorage.removeItem('rateUserInfo');
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function populateElements(userInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var uni_to_fullname;
        return __generator(this, function (_a) {
            uni_to_fullname = {
                'umass': 'University of Massachusetts Amherst',
                'smith': 'Smith College',
                'mtholyoke': 'Mount Holyoke College',
                'amherstcol': 'Amherst College',
                'hampshire': 'Hampshire College'
            };
            document.getElementById("username").innerHTML = userInfo.username;
            document.getElementById("userInstitute").innerHTML = uni_to_fullname[userInfo.institution];
            // show only one decimals of the ratings
            document.getElementById("sellerRating").innerHTML = userInfo.sellerRating.toFixed(1);
            document.getElementById("buyerRating").innerHTML = userInfo.buyerRating.toFixed(1);
            return [2 /*return*/];
        });
    });
}
function sellerRate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            sessionStorage.setItem('sellerRating?', '1');
            return [2 /*return*/];
        });
    });
}
function buyerRate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            sessionStorage.setItem("buyerRating?", '1');
            return [2 /*return*/];
        });
    });
}
