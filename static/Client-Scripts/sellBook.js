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
window.onload = function () {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            validateUser();
            return [2 /*return*/];
        });
    }); })();
    document.getElementById("sellBookForm").addEventListener("submit", nextPrice, false);
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
function nextPrice(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var inputs, title, author, isbn, condition, inst, subject, cNumber, bookData, newURL, resp, respJson, amznPrice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.preventDefault();
                            inputs = document.getElementById("sellBookForm").elements;
                            title = inputs["title"].value.toLowerCase();
                            author = inputs["author"].value.toLowerCase();
                            isbn = inputs["isbn"].value.toLowerCase();
                            condition = inputs["condition"].value.toLowerCase();
                            inst = inputs["institution"].value.toLowerCase();
                            subject = inputs["courseSubject"].value.toLowerCase();
                            cNumber = inputs["courseNumber"].value.toLowerCase();
                            bookData = {
                                "title": title,
                                "author": author,
                                "isbn": isbn,
                                "condition": condition
                            };
                            if (inst != "N/A") {
                                bookData["college"] = inst;
                                bookData["courseSubject"] = subject;
                                bookData["courseNumber"] = cNumber;
                            }
                            newURL = myURL + "setPrice/";
                            return [4 /*yield*/, postData(newURL, bookData)];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 2:
                            respJson = _a.sent();
                            amznPrice = respJson.price;
                            bookData["amznPrice"] = amznPrice;
                            sessionStorage.setItem("sellBookData", JSON.stringify(bookData));
                            console.log("here");
                            window.open(newURL, "_self");
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function putPrice() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var bookData, amznPrice, usedPrice;
                return __generator(this, function (_a) {
                    bookData = JSON.parse(sessionStorage.getItem("sellBookData"));
                    amznPrice = bookData.amznPrice;
                    usedPrice = document.getElementById("amznPrice");
                    usedPrice.innerHTML = "<b> $" + amznPrice + "</b>";
                    return [2 /*return*/];
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function postBook() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var username, bookData, price, newURL, resp, respJson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (sessionStorage.getItem("sellBookData") == null) {
                                alert("Please Enter Book Information");
                                location.replace(myURL + 'sell/');
                                return [2 /*return*/];
                            }
                            username = sessionStorage.getItem('currentUser');
                            bookData = JSON.parse(sessionStorage.getItem("sellBookData"));
                            price = document.getElementById("price").value;
                            if (price == "") {
                                alert("Please enter a price");
                            }
                            bookData.username = username;
                            bookData.price = price;
                            newURL = myURL + "postBook/";
                            return [4 /*yield*/, postData(newURL, bookData)];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 2:
                            respJson = _a.sent();
                            if (respJson.result == "success") {
                                alert("Book succesfully posted");
                                location.replace(myURL + 'sell/');
                            }
                            else {
                                alert("Error in Posting Book");
                                location.replace(myURL + 'sell/');
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
