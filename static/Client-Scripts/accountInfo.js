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
function getInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var uni_to_fullname;
        var _this = this;
        return __generator(this, function (_a) {
            uni_to_fullname = {
                'umass': 'University of Massachusetts Amherst',
                'smith': 'Smith College',
                'mtholyoke': 'Mount Holyoke College',
                'amherstcol': 'Amherst College',
                'hampshire': 'Hampshire College'
            };
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var newURL, uname, resp, respJson, username, fullName, institution, bRating, sRating;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newURL = myURL + "accountInfo/";
                            uname = sessionStorage.getItem('currentUser');
                            console.log("here");
                            return [4 /*yield*/, fetch(newURL, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ 'username': uname })
                                })];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 2:
                            respJson = _a.sent();
                            console.log(respJson);
                            if (respJson.result != "success") {
                                alert("Error finding user");
                                location.replace(myURL);
                                return [2 /*return*/];
                            }
                            username = document.getElementById("username");
                            fullName = document.getElementById("fullName");
                            institution = document.getElementById("userInstitute");
                            bRating = document.getElementById("bRating");
                            sRating = document.getElementById("sRating");
                            username.innerHTML = respJson.username;
                            fullName.innerHTML = respJson.fullName;
                            institution.innerHTML = uni_to_fullname[respJson.institution];
                            bRating.innerHTML = "<b>" + respJson.bRating.toFixed(1) + "\/5</b>";
                            sRating.innerHTML = "<b>" + respJson.sRating.toFixed(1) + "\/5</b>";
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function myPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var username, newURL, resp, respJson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            username = document.getElementById("username");
                            newURL = myURL + "MyPostings/";
                            console.log(username);
                            return [4 /*yield*/, postData(newURL, { "username": sessionStorage.getItem('currentUser') })];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 2:
                            respJson = _a.sent();
                            if (resp.status == 404) {
                                alert("Error");
                                location.reload();
                            }
                            else {
                                sessionStorage.setItem("myPosts", JSON.stringify(respJson));
                                location.replace(newURL);
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
function goToMessages() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var messageUrl;
                return __generator(this, function (_a) {
                    messageUrl = "https://tranquil-wildwood-23570.herokuapp.com/";
                    window.open(messageUrl, '_blank');
                    return [2 /*return*/];
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
