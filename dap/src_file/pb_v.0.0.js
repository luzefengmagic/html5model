var uigs_clpingbackurl = "http://pb.sogou.com/cl.gif";
var uigs_pvpingbackurl = "http://pb.sogou.com/pv.gif";
var uigs_version = "v1.1";
var uigs_staytime = new Date().getTime();
if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_clpingbackurl) != "undefined" && uigs_para.uigs_clpingbackurl != "") {
    uigs_clpingbackurl = uigs_para.uigs_clpingbackurl
}
if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_pvpingbackurl) != "undefined" && uigs_para.uigs_pvpingbackurl != "") {
    uigs_pvpingbackurl = uigs_para.uigs_pvpingbackurl
}
var uigs_cookieArray = new Array();
var uigs_acookie = document.cookie.split("; ");
var uigs_pbs = new Array();
for (var i = 0; i < uigs_acookie.length; i++) {
    var arr = uigs_acookie[i].split("=");
    uigs_cookieArray[arr[0]] = arr[1]
}
function uigs_getCookie(A) {
    return uigs_cookieArray[A]
}
function uigs_getCookiePara() {
    var A = "";
    if (typeof (uigs_para) != "undefined") {
        if (typeof (uigs_para.uigs_cookie) == "undefined") {
        } else {
            var B = uigs_para.uigs_cookie.split(",");
            for (i in B) {
                if (typeof (uigs_getCookie(B[i])) != "undefined") {
                    if (B[i] != "SUV") {
                        if (A == "") {
                            A = B[i] + "=" + uigs_getCookie(B[i])
                        } else {
                            A = A + "&" + B[i] + "=" + uigs_getCookie(B[i])
                        }
                    }
                }
            }
        }
    }
    return encodeURIComponent(A)
}
uigs_d = escape((new Date().getTime()) * 1000 + Math.round(Math.random() * 1000));
if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_uuid) == "undefined") {
    uigs_para.uigs_uuid = uigs_d
}
function uigs_getPingbackhead() {
    if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_productid) != "undefined") {
        uigs_c = escape((new Date().getTime()) * 1000 + Math.round(Math.random() * 1000));
        r = (typeof (encodeURIComponent) == "function") ? encodeURIComponent(document.referrer) : document.referrer;
        var A = "?uigs_productid=" + uigs_para.uigs_productid + "&uigs_t=" + uigs_c;
        if (typeof (uigs_para.uigs_cookie) == "undefined") {
        } else {
            A += "&uigs_cookie=" + uigs_getCookiePara()
        }
        if (typeof (uigs_para.uigs_uuid) != "undefined") {
            A += "&uigs_uuid=" + uigs_para.uigs_uuid
        }
        for (i in uigs_para) {
            if (i == "uigs_cookie" || i == "uigs_uuid" || i == "uigs_productid") {
            } else {
                A += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(uigs_para[i])
            }
        }
        A += "&uigs_version=" + uigs_version + "&uigs_refer=" + r;
        return A
    } else {
        return ""
    }
}
function uigs_pv() {
    if (!uigs_getCookie("SUV")) {
        uigs_c = escape((new Date().getTime()) * 1000 + Math.round(Math.random() * 1000));
        cookie = "SUV=" + uigs_c + ";path=/;expires=Tue, 19-Jan-2046 00:00:00 GMT;domain=sogou.com"
    }
    if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_productid) != "undefined") {
        var C = uigs_staytime;
        if (uigs_staytime < 0) {
            C = 0 - uigs_staytime
        }
        var A = uigs_pvpingbackurl + uigs_getPingbackhead();
        var B = uigs_pbs.length;
        uigs_pbs[B] = new Image();
        uigs_pbs[B].src = A
    }
}
var uigs_spv;
if (typeof (uigs_pvflag) == "undefined" || !uigs_pvflag) {
    if (!uigs_spv) {
        uigs_pv()
    }
}
uigs_spv = 1;
$uigs_d = document;
var uigs_oldclick = $uigs_d.onclick;
$uigs_d.onclick = function (A) {
    var B;
    if (uigs_oldclick) {
        B = uigs_oldclick(A)
    }
    uigs_clickit(A);
    return B
};
var uigs_clickit = function (D) {
    if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_productid) != "undefined") {
        if ((D && (D.button != 0)) || ((!D) && (window.event.button != 0))) {
            return
        }
        try {
            D = D || window.event;
            var G = ((D.target) ? D.target : D.srcElement);
            var C = "";
            var H = "";
            var A = "";
            var E = "";
            while (C == "") {
                A = G.tagName.toUpperCase();
                if (!C) {
                    C = G.uigs || G.getAttribute("uigs") || ""
                }
                if (C && C == "nouigs") {
                    return
                }
                if (A == "A" || A == "LINK" || A == "AREA" || A == "INPUT" || A == "DIV") {
                    H = A
                }
                if (G.href) {
                    E = G.href
                }
                try {
                    if (H == uigs_para.uigs_pbtag) {
                        C = G.id || G.getAttribute("id") || "";
                        while (C == "") {
                            if (G.parentNode) {
                                G = G.parentNode
                            } else {
                                break
                            }
                            if (!G.tagName) {
                                break
                            }
                            if (!C) {
                                C = G.id || G.getAttribute("id") || ""
                            }
                        }
                        break
                    }
                } catch (B) {
                }
                if (G.parentNode) {
                    G = G.parentNode
                } else {
                    break
                }
                if (!G.tagName) {
                    break
                }
            }
            if ((H && (C)) || (H && H == uigs_para.uigs_pbtag)) {
                uigsPB(C + "&href=" + E)
            }
        } catch (F) {
        }
    }
};
function uigsPB(A) {
    if (typeof (uigs_para) != "undefined" && typeof (uigs_para.uigs_productid) != "undefined") {
        var D = uigs_staytime;
        if (uigs_staytime < 0) {
            D = 0 - uigs_staytime
        }
        var B = uigs_clpingbackurl + uigs_getPingbackhead() + "&uigs_st=" + parseInt((new Date().getTime() - D) / 1000) + "&uigs_cl=" + encodeURIComponent(A);
        var C = uigs_pbs.length;
        uigs_pbs[C] = new Image();
        uigs_pbs[C].src = B
    }
}
var uigs_al = false;
function uigs_iecompattest() {
    return (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body
}
var uigs_judgeBottom = function () {
    try {
        var B = uigs_iecompattest().clientHeight;
        var A = uigs_iecompattest().scrollHeight;
        var F = uigs_iecompattest().scrollTop;
        if (F > 100 && A - B - F < 100 && !uigs_al) {
            uigs_al = true;
            var C = "";
            var D = uigs_staytime;
            if (uigs_staytime < 0) {
                D = 0 - uigs_staytime
            }
            C = "tob=" + parseInt((new Date().getTime() - D) / 1000);
            uigsPB(C)
        }
    } catch (E) {
    }
};
window.setInterval(uigs_judgeBottom, 100);