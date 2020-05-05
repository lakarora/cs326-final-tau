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
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            validateUser();
            return [2 /*return*/];
        });
    }); });
    var sb = document.getElementById("searchBtn");
    sb.addEventListener("click", searchBook);
};
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
function searchBook() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var newURL, data, resp, responseJson, newURL_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newURL = myURL + "searchBook/";
                            data = {};
                            if (!(document.getElementById('title').value == '' || document.getElementById('title').value == null)) return [3 /*break*/, 1];
                            alert("Search was empty!!!");
                            return [3 /*break*/, 4];
                        case 1:
                            data = {
                                'query': document.getElementById('title').value
                            };
                            return [4 /*yield*/, postData(newURL, data)];
                        case 2:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 3:
                            responseJson = _a.sent();
                            console.log(JSON.stringify(resp));
                            if (responseJson['result'] == 'success') {
                                sessionStorage.setItem("searchResults", JSON.stringify(responseJson['searchResults']));
                                newURL_1 = myURL + 'seachResults/';
                                console.log(newURL_1);
                                location.replace(myURL + 'searchResults/');
                                //window.open(newURL, "_self");
                            }
                            else if (responseJson['result'] == 'nobooks') {
                                alert("No book by that title was found");
                            }
                            else {
                                alert("Couldnt connect to the server");
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
