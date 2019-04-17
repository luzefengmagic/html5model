!function (a, b) {
    function c(a) {
        return function (b) {
            return {}.toString.call(b) == "[object " + a + "]"
        }
    }

    function d() {
        return z++
    }

    function e(a) {
        return a.match(C)[0]
    }

    function f(a) {
        for (a = a.replace(D, "/"), a = a.replace(F, "$1/"); a.match(E);)a = a.replace(E, "/");
        return a
    }

    function g(a) {
        var b = a.length - 1, c = a.charAt(b);
        return "#" === c ? a.substring(0, b) : ".js" === a.substring(b - 2) || a.indexOf("?") > 0 || "/" === c ? a : a + ".js"
    }

    function h(a) {
        var b = u.alias;
        return b && w(b[a]) ? b[a] : a
    }

    function i(a) {
        var b = u.paths, c;
        return b && (c = a.match(G)) && w(b[c[1]]) && (a = b[c[1]] + c[2]), a
    }

    function j(a) {
        var b = u.vars;
        return b && a.indexOf("{") > -1 && (a = a.replace(H, function (a, c) {
            return w(b[c]) ? b[c] : a
        })), a
    }

    function k(a) {
        var b = u.map, c = a;
        if (b)for (var d = 0, e = b.length; e > d; d++) {
            var f = b[d];
            if (c = y(f) ? f(a) || a : a.replace(f[0], f[1]), c !== a)break
        }
        return c
    }

    function l(a, b) {
        var c, d = a.charAt(0);
        if (I.test(a))c = a; else if ("." === d)c = f((b ? e(b) : u.cwd) + a); else if ("/" === d) {
            var g = u.cwd.match(J);
            c = g ? g[0] + a.substring(1) : a
        } else c = u.base + a;
        return 0 === c.indexOf("//") && (c = location.protocol + c), c
    }

    function m(a, b) {
        if (!a)return "";
        a = h(a), a = i(a), a = j(a), a = g(a);
        var c = l(a, b);
        return c = k(c)
    }

    function n(a) {
        return a.hasAttribute ? a.src : a.getAttribute("src", 4)
    }

    function o(a, b, c) {
        var d = K.createElement("script");
        if (c) {
            var e = y(c) ? c(a) : c;
            e && (d.charset = e)
        }
        p(d, b, a), d.async = !0, d.src = a, R = d, Q ? P.insertBefore(d, Q) : P.appendChild(d), R = null
    }

    function p(a, b, c) {
        function d() {
            a.onload = a.onerror = a.onreadystatechange = null, u.debug || P.removeChild(a), a = null, b()
        }

        var e = "onload"in a;
        e ? (a.onload = d, a.onerror = function () {
            B("error", {uri: c, node: a}), d()
        }) : a.onreadystatechange = function () {
            /loaded|complete/.test(a.readyState) && d()
        }
    }

    function q() {
        if (R)return R;
        if (S && "interactive" === S.readyState)return S;
        for (var a = P.getElementsByTagName("script"), b = a.length - 1; b >= 0; b--) {
            var c = a[b];
            if ("interactive" === c.readyState)return S = c
        }
    }

    function r(a) {
        var b = [];
        return a.replace(U, "").replace(T, function (a, c, d) {
            d && b.push(d)
        }), b
    }

    function s(a, b) {
        this.uri = a, this.dependencies = b || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }

    if (!a.seajs) {
        var t = a.seajs = {version: "2.3.0"}, u = t.data = {}, v = c("Object"), w = c("String"), x = Array.isArray || c("Array"), y = c("Function"), z = 0, A = u.events = {};
        t.on = function (a, b) {
            var c = A[a] || (A[a] = []);
            return c.push(b), t
        }, t.off = function (a, b) {
            if (!a && !b)return A = u.events = {}, t;
            var c = A[a];
            if (c)if (b)for (var d = c.length - 1; d >= 0; d--)c[d] === b && c.splice(d, 1); else delete A[a];
            return t
        };
        var B = t.emit = function (a, b) {
            var c = A[a], d;
            if (c) {
                c = c.slice();
                for (var e = 0, f = c.length; f > e; e++)c[e](b)
            }
            return t
        }, C = /[^?#]*\//, D = /\/\.\//g, E = /\/[^/]+\/\.\.\//, F = /([^:/])\/+\//g, G = /^([^/:]+)(\/.+)$/, H = /{([^{]+)}/g, I = /^\/\/.|:\//, J = /^.*?\/\/.*?\//, K = document, L = location.href && 0 !== location.href.indexOf("about:") ? e(location.href) : "", M = K.scripts, N = K.getElementById("seajsnode") || M[M.length - 1], O = e(n(N) || L);
        t.resolve = m;
        var P = K.head || K.getElementsByTagName("head")[0] || K.documentElement, Q = P.getElementsByTagName("base")[0], R, S;
        t.request = o;
        var T = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, U = /\\\\/g, V = t.cache = {}, W, X = {}, Y = {}, Z = {}, $ = s.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        s.prototype.resolve = function () {
            for (var a = this, b = a.dependencies, c = [], d = 0, e = b.length; e > d; d++)c[d] = s.resolve(b[d], a.uri);
            return c
        }, s.prototype.load = function () {
            var a = this;
            if (!(a.status >= $.LOADING)) {
                a.status = $.LOADING;
                var c = a.resolve();
                B("load", c);
                for (var d = a._remain = c.length, e, f = 0; d > f; f++)e = s.get(c[f]), e.status < $.LOADED ? e._waitings[a.uri] = (e._waitings[a.uri] || 0) + 1 : a._remain--;
                if (0 === a._remain)return a.onload(), b;
                var g = {};
                for (f = 0; d > f; f++)e = V[c[f]], e.status < $.FETCHING ? e.fetch(g) : e.status === $.SAVED && e.load();
                for (var h in g)g.hasOwnProperty(h) && g[h]()
            }
        }, s.prototype.onload = function () {
            var a = this;
            a.status = $.LOADED, a.callback && a.callback();
            var b = a._waitings, c, d;
            for (c in b)b.hasOwnProperty(c) && (d = V[c], d._remain -= b[c], 0 === d._remain && d.onload());
            delete a._waitings, delete a._remain
        }, s.prototype.fetch = function (a) {
            function c() {
                t.request(g.requestUri, g.onRequest, g.charset)
            }

            function d() {
                delete X[h], Y[h] = !0, W && (s.save(f, W), W = null);
                var a, b = Z[h];
                for (delete Z[h]; a = b.shift();)a.load()
            }

            var e = this, f = e.uri;
            e.status = $.FETCHING;
            var g = {uri: f};
            B("fetch", g);
            var h = g.requestUri || f;
            return !h || Y[h] ? (e.load(), b) : X[h] ? (Z[h].push(e), b) : (X[h] = !0, Z[h] = [e], B("request", g = {
                uri: f,
                requestUri: h,
                onRequest: d,
                charset: u.charset
            }), g.requested || (a ? a[g.requestUri] = c : c()), b)
        }, s.prototype.exec = function () {
            function a(b) {
                return s.get(a.resolve(b)).exec()
            }

            var c = this;
            if (c.status >= $.EXECUTING)return c.exports;
            c.status = $.EXECUTING;
            var e = c.uri;
            a.resolve = function (a) {
                return s.resolve(a, e)
            }, a.async = function (b, c) {
                return s.use(b, c, e + "_async_" + d()), a
            };
            var f = c.factory, g = y(f) ? f(a, c.exports = {}, c) : f;
            return g === b && (g = c.exports), delete c.factory, c.exports = g, c.status = $.EXECUTED, B("exec", c), g
        }, s.resolve = function (a, b) {
            var c = {id: a, refUri: b};
            return B("resolve", c), c.uri || t.resolve(c.id, b)
        }, s.define = function (a, c, d) {
            var e = arguments.length;
            1 === e ? (d = a, a = b) : 2 === e && (d = c, x(a) ? (c = a, a = b) : c = b), !x(c) && y(d) && (c = r("" + d));
            var f = {id: a, uri: s.resolve(a), deps: c, factory: d};
            if (!f.uri && K.attachEvent) {
                var g = q();
                g && (f.uri = g.src)
            }
            B("define", f), f.uri ? s.save(f.uri, f) : W = f
        }, s.save = function (a, b) {
            var c = s.get(a);
            c.status < $.SAVED && (c.id = b.id || a, c.dependencies = b.deps || [], c.factory = b.factory, c.status = $.SAVED, B("save", c))
        }, s.get = function (a, b) {
            return V[a] || (V[a] = new s(a, b))
        }, s.use = function (b, c, d) {
            var e = s.get(d, x(b) ? b : [b]);
            e.callback = function () {
                for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++)b[f] = V[d[f]].exec();
                c && c.apply(a, b), delete e.callback
            }, e.load()
        }, t.use = function (a, b) {
            return s.use(a, b, u.cwd + "_use_" + d()), t
        }, s.define.cmd = {}, a.define = s.define, t.Module = s, u.fetchedList = Y, u.cid = d, t.require = function (a) {
            var b = s.get(s.resolve(a));
            return b.status < $.EXECUTING && (b.onload(), b.exec()), b.exports
        }, u.base = O, u.dir = O, u.cwd = L, u.charset = "utf-8", t.config = function (a) {
            for (var b in a) {
                var c = a[b], d = u[b];
                if (d && v(d))for (var e in c)d[e] = c[e]; else x(d) ? c = d.concat(c) : "base" === b && ("/" !== c.slice(-1) && (c += "/"), c = l(c)), u[b] = c
            }
            return B("config", a), t
        }
    }
}(this);
var debug = false;
seajs.config({
    base: '/static/script/',
    charset: 'utf-8',
    timeout: 5 * 60 * 1000,
    debug: debug
});


define("config/errorcode", function (require, exports, module) {
    var errorMsg = {
        '-1': '服务器开小差了',
        '-2': '个人信息不完整哦',
        '-3': '参数错误',
        '-10': '服务器发生未知错误，赶快告诉薯队长吧',
        '-100': '登录态过期了，请重新登录吧',
        '-101': '未登录哦，请先登录吧',
        '-102': '您的账号处于禁言状态，请联系小红书微信号',
        '-200': '笔记发布重复了',
        '-201': '重复举报了',
        '-202': '重复购买贴纸',
        '-9000': '查找不到卖家',
        '-9001': 'email已经被注册过了',
        '-9002': '错误的登录密码',
        '-9003': '操作人不是订单所有者',
        '-9004': '非法的订单状态',
        '-9005': '错误的订单修改状态',
        '-9007': '操作人不是商品的所有者',
        '-9008': '商品不存在',
        '-9009': '该商品已被删除，无法操作',
        '-9010': '该商品已下架，无法操作',
        '-9011': '该Facebook已经被绑定过',
        '-9012': '该微博已经被绑定过',
        '-9013': '该微信已经被绑定过',
        '-9014': '该订单已经被支付过',
        '-9015': '订单已过期',
        '-9016': '购物车中的卖家不是同一个',
        '-9017': '商品不在购物车中',
        '-9018': '购物车为空',
        '-9019': '抢购已失效',
        '-9020': '小分队已失效或已经组满',
        '-9021': '已购买过此抢购，每人限购一件',
        '-9022': '已购买过此促销，每人限购一件',
        '-9023': '该商品已售完，下次赶早哦亲',
        '-9024': '收货人信息格式错误',
        '-9028': '此抢购暂不支持此支付方式'
    }
    module.exports = errorMsg;
});


define("lib/jquery", function () {
    !function (a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
            if (!a.document)throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function (a, b) {
        var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty, k = {}, l = "1.11.1", m = function (a, b) {
            return new m.fn.init(a, b)
        }, n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, o = /^-ms-/, p = /-([\da-z])/gi, q = function (a, b) {
            return b.toUpperCase()
        };
        m.fn = m.prototype = {
            jquery: l, constructor: m, selector: "", length: 0, toArray: function () {
                return d.call(this)
            }, get: function (a) {
                return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
            }, pushStack: function (a) {
                var b = m.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            }, each: function (a, b) {
                return m.each(this, a, b)
            }, map: function (a) {
                return this.pushStack(m.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, slice: function () {
                return this.pushStack(d.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (a) {
                var b = this.length, c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: f, sort: c.sort, splice: c.splice
        }, m.extend = m.fn.extend = function () {
            var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)if (null != (e = arguments[h]))for (d in e)a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
            return g
        }, m.extend({
            expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
                throw new Error(a)
            }, noop: function () {
            }, isFunction: function (a) {
                return "function" === m.type(a)
            }, isArray: Array.isArray || function (a) {
                return "array" === m.type(a)
            }, isWindow: function (a) {
                return null != a && a == a.window
            }, isNumeric: function (a) {
                return !m.isArray(a) && a - parseFloat(a) >= 0
            }, isEmptyObject: function (a) {
                var b;
                for (b in a)return !1;
                return !0
            }, isPlainObject: function (a) {
                var b;
                if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))return !1;
                try {
                    if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))return !1
                } catch (c) {
                    return !1
                }
                if (k.ownLast)for (b in a)return j.call(a, b);
                for (b in a);
                return void 0 === b || j.call(a, b)
            }, type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
            }, globalEval: function (b) {
                b && m.trim(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(o, "ms-").replace(p, q)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            }, each: function (a, b, c) {
                var d, e = 0, f = a.length, g = r(a);
                if (c) {
                    if (g) {
                        for (; f > e; e++)if (d = b.apply(a[e], c), d === !1)break
                    } else for (e in a)if (d = b.apply(a[e], c), d === !1)break
                } else if (g) {
                    for (; f > e; e++)if (d = b.call(a[e], e, a[e]), d === !1)break
                } else for (e in a)if (d = b.call(a[e], e, a[e]), d === !1)break;
                return a
            }, trim: function (a) {
                return null == a ? "" : (a + "").replace(n, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (g)return g.call(b, a, c);
                    for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
                }
                return -1
            }, merge: function (a, b) {
                var c = +b.length, d = 0, e = a.length;
                while (c > d)a[e++] = b[d++];
                if (c !== c)while (void 0 !== b[d])a[e++] = b[d++];
                return a.length = e, a
            }, grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)d = !b(a[f], f), d !== h && e.push(a[f]);
                return e
            }, map: function (a, b, c) {
                var d, f = 0, g = a.length, h = r(a), i = [];
                if (h)for (; g > f; f++)d = b(a[f], f, c), null != d && i.push(d); else for (f in a)d = b(a[f], f, c), null != d && i.push(d);
                return e.apply([], i)
            }, guid: 1, proxy: function (a, b) {
                var c, e, f;
                return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function () {
                    return a.apply(b || this, c.concat(d.call(arguments)))
                }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
            }, now: function () {
                return +new Date
            }, support: k
        }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
            h["[object " + b + "]"] = b.toLowerCase()
        });
        function r(a) {
            var b = a.length, c = m.type(a);
            return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
        }

        var s = function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date, v = a.document, w = 0, x = 0, y = gb(), z = gb(), A = gb(), B = function (a, b) {
                return a === b && (l = !0), 0
            }, C = "undefined", D = 1 << 31, E = {}.hasOwnProperty, F = [], G = F.pop, H = F.push, I = F.push, J = F.slice, K = F.indexOf || function (a) {
                    for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
                    return -1
                }, L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = N.replace("w", "w#"), P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]", Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)", R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), S = new RegExp("^" + M + "*," + M + "*"), T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"), V = new RegExp(Q), W = new RegExp("^" + O + "$"), X = {
                ID: new RegExp("^#(" + N + ")"),
                CLASS: new RegExp("^\\.(" + N + ")"),
                TAG: new RegExp("^(" + N.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + Q),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + L + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            }, Y = /^(?:input|select|textarea|button)$/i, Z = /^h\d$/i, $ = /^[^{]+\{\s*\[native \w/, _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ab = /[+~]/, bb = /'|\\/g, cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"), db = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
            try {
                I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType
            } catch (eb) {
                I = {
                    apply: F.length ? function (a, b) {
                        H.apply(a, J.call(b))
                    } : function (a, b) {
                        var c = a.length, d = 0;
                        while (a[c++] = b[d++]);
                        a.length = c - 1
                    }
                }
            }
            function fb(a, b, d, e) {
                var f, h, j, k, l, o, r, s, w, x;
                if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a)return d;
                if (1 !== (k = b.nodeType) && 9 !== k)return [];
                if (p && !e) {
                    if (f = _.exec(a))if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode)return d;
                            if (h.id === j)return d.push(h), d
                        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j)return d.push(h), d
                    } else {
                        if (f[2])return I.apply(d, b.getElementsByTagName(a)), d;
                        if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName)return I.apply(d, b.getElementsByClassName(j)), d
                    }
                    if (c.qsa && (!q || !q.test(a))) {
                        if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                            while (l--)o[l] = s + qb(o[l]);
                            w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",")
                        }
                        if (x)try {
                            return I.apply(d, w.querySelectorAll(x)), d
                        } catch (y) {
                        } finally {
                            r || b.removeAttribute("id")
                        }
                    }
                }
                return i(a.replace(R, "$1"), b, d, e)
            }

            function gb() {
                var a = [];

                function b(c, e) {
                    return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
                }

                return b
            }

            function hb(a) {
                return a[u] = !0, a
            }

            function ib(a) {
                var b = n.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function jb(a, b) {
                var c = a.split("|"), e = a.length;
                while (e--)d.attrHandle[c[e]] = b
            }

            function kb(a, b) {
                var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D);
                if (d)return d;
                if (c)while (c = c.nextSibling)if (c === b)return -1;
                return a ? 1 : -1
            }

            function lb(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function mb(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function nb(a) {
                return hb(function (b) {
                    return b = +b, hb(function (c, d) {
                        var e, f = a([], c.length, b), g = f.length;
                        while (g--)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function ob(a) {
                return a && typeof a.getElementsByTagName !== C && a
            }

            c = fb.support = {}, f = fb.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, m = fb.setDocument = function (a) {
                var b, e = a ? a.ownerDocument || a : v, g = e.defaultView;
                return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function () {
                    m()
                }, !1) : g.attachEvent && g.attachEvent("onunload", function () {
                    m()
                })), c.attributes = ib(function (a) {
                    return a.className = "i", !a.getAttribute("className")
                }), c.getElementsByTagName = ib(function (a) {
                    return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
                }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function (a) {
                        return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                    }), c.getById = ib(function (a) {
                    return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length
                }), c.getById ? (d.find.ID = function (a, b) {
                    if (typeof b.getElementById !== C && p) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, d.filter.ID = function (a) {
                    var b = a.replace(cb, db);
                    return function (a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete d.find.ID, d.filter.ID = function (a) {
                    var b = a.replace(cb, db);
                    return function (a) {
                        var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                    return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
                } : function (a, b) {
                    var c, d = [], e = 0, f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        while (c = f[e++])1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                        return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0
                    }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function (a) {
                    a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked")
                }), ib(function (a) {
                    var b = e.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
                })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function (a) {
                    c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q)
                }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function (a, b) {
                    if (b)while (b = b.parentNode)if (b === a)return !0;
                    return !1
                }, B = b ? function (a, b) {
                    if (a === b)return l = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1)
                } : function (a, b) {
                    if (a === b)return l = !0, 0;
                    var c, d = 0, f = a.parentNode, g = b.parentNode, h = [a], i = [b];
                    if (!f || !g)return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0;
                    if (f === g)return kb(a, b);
                    c = a;
                    while (c = c.parentNode)h.unshift(c);
                    c = b;
                    while (c = c.parentNode)i.unshift(c);
                    while (h[d] === i[d])d++;
                    return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
                }, e) : n
            }, fb.matches = function (a, b) {
                return fb(a, null, null, b)
            }, fb.matchesSelector = function (a, b) {
                if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))try {
                    var d = s.call(a, b);
                    if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)return d
                } catch (e) {
                }
                return fb(b, n, null, [a]).length > 0
            }, fb.contains = function (a, b) {
                return (a.ownerDocument || a) !== n && m(a), t(a, b)
            }, fb.attr = function (a, b) {
                (a.ownerDocument || a) !== n && m(a);
                var e = d.attrHandle[b.toLowerCase()], f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
                return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
            }, fb.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, fb.uniqueSort = function (a) {
                var b, d = [], e = 0, f = 0;
                if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                    while (b = a[f++])b === a[f] && (e = d.push(f));
                    while (e--)a.splice(d[e], 1)
                }
                return k = null, a
            }, e = fb.getText = function (a) {
                var b, c = "", d = 0, f = a.nodeType;
                if (f) {
                    if (1 === f || 9 === f || 11 === f) {
                        if ("string" == typeof a.textContent)return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling)c += e(a)
                    } else if (3 === f || 4 === f)return a.nodeValue
                } else while (b = a[d++])c += e(b);
                return c
            }, d = fb.selectors = {
                cacheLength: 50,
                createPseudo: hb,
                match: X,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (a) {
                        return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    }, CHILD: function (a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a
                    }, PSEUDO: function (a) {
                        var b, c = !a[6] && a[2];
                        return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(cb, db).toLowerCase();
                        return "*" === a ? function () {
                            return !0
                        } : function (a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    }, CLASS: function (a) {
                        var b = y[a + " "];
                        return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function (a) {
                                return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                            })
                    }, ATTR: function (a, b, c) {
                        return function (d) {
                            var e = fb.attr(d, a);
                            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                        }
                    }, CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                        return 1 === d && 0 === e ? function (a) {
                            return !!a.parentNode
                        } : function (b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                            if (q) {
                                if (f) {
                                    while (p) {
                                        l = b;
                                        while (l = l[p])if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                    while (l = ++n && l && l[p] || (m = n = 0) || o.pop())if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                                } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)m = j[1]; else while (l = ++n && l && l[p] || (m = n = 0) || o.pop())if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b))break;
                                return m -= e, m === d || m % d === 0 && m / d >= 0
                            }
                        }
                    }, PSEUDO: function (a, b) {
                        var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
                        return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function (a, c) {
                            var d, f = e(a, b), g = f.length;
                            while (g--)d = K.call(a, f[g]), a[d] = !(c[d] = f[g])
                        }) : function (a) {
                            return e(a, 0, c)
                        }) : e
                    }
                },
                pseudos: {
                    not: hb(function (a) {
                        var b = [], c = [], d = h(a.replace(R, "$1"));
                        return d[u] ? hb(function (a, b, c, e) {
                            var f, g = d(a, null, e, []), h = a.length;
                            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function (a, e, f) {
                            return b[0] = a, d(b, null, f, c), !c.pop()
                        }
                    }), has: hb(function (a) {
                        return function (b) {
                            return fb(a, b).length > 0
                        }
                    }), contains: hb(function (a) {
                        return function (b) {
                            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                        }
                    }), lang: hb(function (a) {
                        return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(), function (b) {
                            var c;
                            do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                    }), target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    }, root: function (a) {
                        return a === o
                    }, focus: function (a) {
                        return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    }, enabled: function (a) {
                        return a.disabled === !1
                    }, disabled: function (a) {
                        return a.disabled === !0
                    }, checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    }, selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    }, empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeType < 6)return !1;
                        return !0
                    }, parent: function (a) {
                        return !d.pseudos.empty(a)
                    }, header: function (a) {
                        return Z.test(a.nodeName)
                    }, input: function (a) {
                        return Y.test(a.nodeName)
                    }, button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    }, text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    }, first: nb(function () {
                        return [0]
                    }), last: nb(function (a, b) {
                        return [b - 1]
                    }), eq: nb(function (a, b, c) {
                        return [0 > c ? c + b : c]
                    }), even: nb(function (a, b) {
                        for (var c = 0; b > c; c += 2)a.push(c);
                        return a
                    }), odd: nb(function (a, b) {
                        for (var c = 1; b > c; c += 2)a.push(c);
                        return a
                    }), lt: nb(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
                        return a
                    }), gt: nb(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b;)a.push(d);
                        return a
                    })
                }
            }, d.pseudos.nth = d.pseudos.eq;
            for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})d.pseudos[b] = lb(b);
            for (b in{submit: !0, reset: !0})d.pseudos[b] = mb(b);
            function pb() {
            }

            pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function (a, b) {
                var c, e, f, g, h, i, j, k = z[a + " "];
                if (k)return b ? 0 : k.slice(0);
                h = a, i = [], j = d.preFilter;
                while (h) {
                    (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                        value: c,
                        type: e[0].replace(R, " ")
                    }), h = h.slice(c.length));
                    for (g in d.filter)!(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                        value: c,
                        type: g,
                        matches: e
                    }), h = h.slice(c.length));
                    if (!c)break
                }
                return b ? h.length : h ? fb.error(a) : z(a, i).slice(0)
            };
            function qb(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
                return d
            }

            function rb(a, b, c) {
                var d = b.dir, e = c && "parentNode" === d, f = x++;
                return b.first ? function (b, c, f) {
                    while (b = b[d])if (1 === b.nodeType || e)return a(b, c, f)
                } : function (b, c, g) {
                    var h, i, j = [w, f];
                    if (g) {
                        while (b = b[d])if ((1 === b.nodeType || e) && a(b, c, g))return !0
                    } else while (b = b[d])if (1 === b.nodeType || e) {
                        if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)return j[2] = h[2];
                        if (i[d] = j, j[2] = a(b, c, g))return !0
                    }
                }
            }

            function sb(a) {
                return a.length > 1 ? function (b, c, d) {
                    var e = a.length;
                    while (e--)if (!a[e](b, c, d))return !1;
                    return !0
                } : a[0]
            }

            function tb(a, b, c) {
                for (var d = 0, e = b.length; e > d; d++)fb(a, b[d], c);
                return c
            }

            function ub(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                return g
            }

            function vb(a, b, c, d, e, f) {
                return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function (f, g, h, i) {
                    var j, k, l, m = [], n = [], o = g.length, p = f || tb(b || "*", h.nodeType ? [h] : h, []), q = !a || !f && b ? p : ub(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                    if (c && c(q, r, h, i), d) {
                        j = ub(r, n), d(j, [], h, i), k = j.length;
                        while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                    }
                    if (f) {
                        if (e || a) {
                            if (e) {
                                j = [], k = r.length;
                                while (k--)(l = r[k]) && j.push(q[k] = l);
                                e(null, r = [], j, i)
                            }
                            k = r.length;
                            while (k--)(l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                        }
                    } else r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r)
                })
            }

            function wb(a) {
                for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function (a) {
                    return a === b
                }, h, !0), l = rb(function (a) {
                    return K.call(b, a) > -1
                }, h, !0), m = [function (a, c, d) {
                    return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
                }]; f > i; i++)if (c = d.relative[a[i].type])m = [rb(sb(m), c)]; else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)if (d.relative[a[e].type])break;
                        return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a))
                    }
                    m.push(c)
                }
                return sb(m)
            }

            function xb(a, b) {
                var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                    var l, m, o, p = 0, q = "0", r = f && [], s = [], t = j, u = f || e && d.find.TAG("*", k), v = w += null == t ? 1 : Math.random() || .1, x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])if (o(l, g, h)) {
                                i.push(l);
                                break
                            }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++])o(r, s, g, h);
                        if (f) {
                            if (p > 0)while (q--)r[q] || s[q] || (s[q] = G.call(i));
                            s = ub(s)
                        }
                        I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
                return c ? hb(f) : f
            }

            return h = fb.compile = function (a, b) {
                var c, d = [], e = [], f = A[a + " "];
                if (!f) {
                    b || (b = g(a)), c = b.length;
                    while (c--)f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
                    f = A(a, xb(e, d)), f.selector = a
                }
                return f
            }, i = fb.select = function (a, b, e, f) {
                var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
                if (e = e || [], 1 === o.length) {
                    if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                        if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b)return e;
                        n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                    }
                    i = X.needsContext.test(a) ? 0 : j.length;
                    while (i--) {
                        if (k = j[i], d.relative[l = k.type])break;
                        if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
                            if (j.splice(i, 1), a = f.length && qb(j), !a)return I.apply(e, f), e;
                            break
                        }
                    }
                }
                return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e
            }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function (a) {
                return 1 & a.compareDocumentPosition(n.createElement("div"))
            }), ib(function (a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || jb("type|href|height|width", function (a, b, c) {
                return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), c.attributes && ib(function (a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || jb("value", function (a, b, c) {
                return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
            }), ib(function (a) {
                return null == a.getAttribute("disabled")
            }) || jb(L, function (a, b, c) {
                var d;
                return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), fb
        }(a);
        m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
        var t = m.expr.match.needsContext, u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, v = /^.[^:#\[\.,]*$/;

        function w(a, b, c) {
            if (m.isFunction(b))return m.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c
            });
            if (b.nodeType)return m.grep(a, function (a) {
                return a === b !== c
            });
            if ("string" == typeof b) {
                if (v.test(b))return m.filter(b, a, c);
                b = m.filter(b, a)
            }
            return m.grep(a, function (a) {
                return m.inArray(a, b) >= 0 !== c
            })
        }

        m.filter = function (a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function (a) {
                return 1 === a.nodeType
            }))
        }, m.fn.extend({
            find: function (a) {
                var b, c = [], d = this, e = d.length;
                if ("string" != typeof a)return this.pushStack(m(a).filter(function () {
                    for (b = 0; e > b; b++)if (m.contains(d[b], this))return !0
                }));
                for (b = 0; e > b; b++)m.find(a, d[b], c);
                return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
            }, filter: function (a) {
                return this.pushStack(w(this, a || [], !1))
            }, not: function (a) {
                return this.pushStack(w(this, a || [], !0))
            }, is: function (a) {
                return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
            }
        });
        var x, y = a.document, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, A = m.fn.init = function (a, b) {
            var c, d;
            if (!a)return this;
            if ("string" == typeof a) {
                if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))for (c in b)m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                if (d = y.getElementById(c[2]), d && d.parentNode) {
                    if (d.id !== c[2])return x.find(a);
                    this.length = 1, this[0] = d
                }
                return this.context = y, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
        };
        A.prototype = m.fn, x = m(y);
        var B = /^(?:parents|prev(?:Until|All))/, C = {children: !0, contents: !0, next: !0, prev: !0};
        m.extend({
            dir: function (a, b, c) {
                var d = [], e = a[b];
                while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c)))1 === e.nodeType && d.push(e), e = e[b];
                return d
            }, sibling: function (a, b) {
                for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
                return c
            }
        }), m.fn.extend({
            has: function (a) {
                var b, c = m(a, this), d = c.length;
                return this.filter(function () {
                    for (b = 0; d > b; b++)if (m.contains(this, c[b]))return !0
                })
            }, closest: function (a, b) {
                for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c !== b; c = c.parentNode)if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                    f.push(c);
                    break
                }
                return this.pushStack(f.length > 1 ? m.unique(f) : f)
            }, index: function (a) {
                return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (a, b) {
                return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
            }, addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        });
        function D(a, b) {
            do a = a[b]; while (a && 1 !== a.nodeType);
            return a
        }

        m.each({
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            }, parents: function (a) {
                return m.dir(a, "parentNode")
            }, parentsUntil: function (a, b, c) {
                return m.dir(a, "parentNode", c)
            }, next: function (a) {
                return D(a, "nextSibling")
            }, prev: function (a) {
                return D(a, "previousSibling")
            }, nextAll: function (a) {
                return m.dir(a, "nextSibling")
            }, prevAll: function (a) {
                return m.dir(a, "previousSibling")
            }, nextUntil: function (a, b, c) {
                return m.dir(a, "nextSibling", c)
            }, prevUntil: function (a, b, c) {
                return m.dir(a, "previousSibling", c)
            }, siblings: function (a) {
                return m.sibling((a.parentNode || {}).firstChild, a)
            }, children: function (a) {
                return m.sibling(a.firstChild)
            }, contents: function (a) {
                return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
            }
        }, function (a, b) {
            m.fn[a] = function (c, d) {
                var e = m.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
            }
        });
        var E = /\S+/g, F = {};

        function G(a) {
            var b = F[a] = {};
            return m.each(a.match(E) || [], function (a, c) {
                b[c] = !0
            }), b
        }

        m.Callbacks = function (a) {
            a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
            var b, c, d, e, f, g, h = [], i = !a.once && [], j = function (l) {
                for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                    c = !1;
                    break
                }
                b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
            }, k = {
                add: function () {
                    if (h) {
                        var d = h.length;
                        !function f(b) {
                            m.each(b, function (b, c) {
                                var d = m.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                            })
                        }(arguments), b ? e = h.length : c && (g = d, j(c))
                    }
                    return this
                }, remove: function () {
                    return h && m.each(arguments, function (a, c) {
                        var d;
                        while ((d = m.inArray(c, h, d)) > -1)h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                    }), this
                }, has: function (a) {
                    return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                }, empty: function () {
                    return h = [], e = 0, this
                }, disable: function () {
                    return h = i = c = void 0, this
                }, disabled: function () {
                    return !h
                }, lock: function () {
                    return i = void 0, c || k.disable(), this
                }, locked: function () {
                    return !i
                }, fireWith: function (a, c) {
                    return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
                }, fire: function () {
                    return k.fireWith(this, arguments), this
                }, fired: function () {
                    return !!d
                }
            };
            return k
        }, m.extend({
            Deferred: function (a) {
                var b = [["resolve", "done", m.Callbacks("once memory"), "resolved"], ["reject", "fail", m.Callbacks("once memory"), "rejected"], ["notify", "progress", m.Callbacks("memory")]], c = "pending", d = {
                    state: function () {
                        return c
                    }, always: function () {
                        return e.done(arguments).fail(arguments), this
                    }, then: function () {
                        var a = arguments;
                        return m.Deferred(function (c) {
                            m.each(b, function (b, f) {
                                var g = m.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = g && g.apply(this, arguments);
                                    a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    }, promise: function (a) {
                        return null != a ? m.extend(a, d) : d
                    }
                }, e = {};
                return d.pipe = d.then, m.each(b, function (a, f) {
                    var g = f[2], h = f[3];
                    d[f[1]] = g.add, h && g.add(function () {
                        c = h
                    }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                        return e[f[0] + "With"](this === e ? d : this, arguments), this
                    }, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            }, when: function (a) {
                var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && m.isFunction(a.promise) ? e : 0, g = 1 === f ? a : m.Deferred(), h = function (a, b, c) {
                    return function (e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                }, i, j, k;
                if (e > 1)for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
                return f || g.resolveWith(k, c), g.promise()
            }
        });
        var H;
        m.fn.ready = function (a) {
            return m.ready.promise().done(a), this
        }, m.extend({
            isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? m.readyWait++ : m.ready(!0)
            }, ready: function (a) {
                if (a === !0 ? !--m.readyWait : !m.isReady) {
                    if (!y.body)return setTimeout(m.ready);
                    m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
                }
            }
        });
        function I() {
            y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
        }

        function J() {
            (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
        }

        m.ready.promise = function (b) {
            if (!H)if (H = m.Deferred(), "complete" === y.readyState)setTimeout(m.ready); else if (y.addEventListener)y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1); else {
                y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
                var c = !1;
                try {
                    c = null == a.frameElement && y.documentElement
                } catch (d) {
                }
                c && c.doScroll && !function e() {
                    if (!m.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        I(), m.ready()
                    }
                }()
            }
            return H.promise(b)
        };
        var K = "undefined", L;
        for (L in m(k))break;
        k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function () {
            var a, b, c, d;
            c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
        }), function () {
            var a = y.createElement("div");
            if (null == k.deleteExpando) {
                k.deleteExpando = !0;
                try {
                    delete a.test
                } catch (b) {
                    k.deleteExpando = !1
                }
            }
            a = null
        }(), m.acceptData = function (a) {
            var b = m.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
        };
        var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, N = /([A-Z])/g;

        function O(a, b, c) {
            if (void 0 === c && 1 === a.nodeType) {
                var d = "data-" + b.replace(N, "-$1").toLowerCase();
                if (c = a.getAttribute(d), "string" == typeof c) {
                    try {
                        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
                    } catch (e) {
                    }
                    m.data(a, b, c)
                } else c = void 0
            }
            return c
        }

        function P(a) {
            var b;
            for (b in a)if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b)return !1;
            return !0
        }

        function Q(a, b, d, e) {
            if (m.acceptData(a)) {
                var f, g, h = m.expando, i = a.nodeType, j = i ? m.cache : a, k = i ? a[h] : a[h] && h;
                if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b)return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {toJSON: m.noop}), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
            }
        }

        function R(a, b, c) {
            if (m.acceptData(a)) {
                var d, e, f = a.nodeType, g = f ? m.cache : a, h = f ? a[m.expando] : m.expando;
                if (g[h]) {
                    if (b && (d = c ? g[h] : g[h].data)) {
                        m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                        while (e--)delete d[b[e]];
                        if (c ? !P(d) : !m.isEmptyObject(d))return
                    }
                    (c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
                }
            }
        }

        m.extend({
            cache: {},
            noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
            hasData: function (a) {
                return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
            },
            data: function (a, b, c) {
                return Q(a, b, c)
            },
            removeData: function (a, b) {
                return R(a, b)
            },
            _data: function (a, b, c) {
                return Q(a, b, c, !0)
            },
            _removeData: function (a, b) {
                return R(a, b, !0)
            }
        }), m.fn.extend({
            data: function (a, b) {
                var c, d, e, f = this[0], g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                        c = g.length;
                        while (c--)g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                        m._data(f, "parsedAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function () {
                    m.data(this, a)
                }) : arguments.length > 1 ? this.each(function () {
                    m.data(this, a, b)
                }) : f ? O(f, a, m.data(f, a)) : void 0
            }, removeData: function (a) {
                return this.each(function () {
                    m.removeData(this, a)
                })
            }
        }), m.extend({
            queue: function (a, b, c) {
                var d;
                return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
            }, dequeue: function (a, b) {
                b = b || "fx";
                var c = m.queue(a, b), d = c.length, e = c.shift(), f = m._queueHooks(a, b), g = function () {
                    m.dequeue(a, b)
                };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            }, _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return m._data(a, c) || m._data(a, c, {
                        empty: m.Callbacks("once memory").add(function () {
                            m._removeData(a, b + "queue"), m._removeData(a, c)
                        })
                    })
            }
        }), m.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                    var c = m.queue(this, a, b);
                    m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
                })
            }, dequeue: function (a) {
                return this.each(function () {
                    m.dequeue(this, a)
                })
            }, clearQueue: function (a) {
                return this.queue(a || "fx", [])
            }, promise: function (a, b) {
                var c, d = 1, e = m.Deferred(), f = this, g = this.length, h = function () {
                    --d || e.resolveWith(f, [f])
                };
                "string" != typeof a && (b = a, a = void 0), a = a || "fx";
                while (g--)c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = ["Top", "Right", "Bottom", "Left"], U = function (a, b) {
            return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
        }, V = m.access = function (a, b, c, d, e, f, g) {
            var h = 0, i = a.length, j = null == c;
            if ("object" === m.type(c)) {
                e = !0;
                for (h in c)m.access(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                    return j.call(m(a), c)
                })), b))for (; i > h; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        }, W = /^(?:checkbox|radio)$/i;
        !function () {
            var a = y.createElement("input"), b = y.createElement("div"), c = y.createDocumentFragment();
            if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
                    k.noCloneEvent = !1
                }), b.cloneNode(!0).click()), null == k.deleteExpando) {
                k.deleteExpando = !0;
                try {
                    delete b.test
                } catch (d) {
                    k.deleteExpando = !1
                }
            }
        }(), function () {
            var b, c, d = y.createElement("div");
            for (b in{
                submit: !0,
                change: !0,
                focusin: !0
            })c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
            d = null
        }();
        var X = /^(?:input|select|textarea)$/i, Y = /^key/, Z = /^(?:mouse|pointer|contextmenu)|click/, $ = /^(?:focusinfocus|focusoutblur)$/, _ = /^([^.]*)(?:\.(.+)|)$/;

        function ab() {
            return !0
        }

        function bb() {
            return !1
        }

        function cb() {
            try {
                return y.activeElement
            } catch (a) {
            }
        }

        m.event = {
            global: {},
            add: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
                if (r) {
                    c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                        return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
                    }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
                    while (h--)f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
                        type: o,
                        origType: q,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && m.expr.match.needsContext.test(e),
                        namespace: p.join(".")
                    }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
                    a = null
                }
            },
            remove: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
                if (r && (k = r.events)) {
                    b = (b || "").match(E) || [""], j = b.length;
                    while (j--)if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                        while (f--)g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
                    } else for (o in k)m.event.remove(a, o + b[j], c, d, !0);
                    m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
                }
            },
            trigger: function (b, c, d, e) {
                var f, g, h, i, k, l, n, o = [d || y], p = j.call(b, "type") ? b.type : b, q = j.call(b, "namespace") ? b.namespace.split(".") : [];
                if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                    if (!e && !k.noBubble && !m.isWindow(d)) {
                        for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode)o.push(h), l = h;
                        l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                    }
                    n = 0;
                    while ((h = o[n++]) && !b.isPropagationStopped())b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                    if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                        l = d[g], l && (d[g] = null), m.event.triggered = p;
                        try {
                            d[p]()
                        } catch (r) {
                        }
                        m.event.triggered = void 0, l && (d[g] = l)
                    }
                    return b.result
                }
            },
            dispatch: function (a) {
                a = m.event.fix(a);
                var b, c, e, f, g, h = [], i = d.call(arguments), j = (m._data(this, "events") || {})[a.type] || [], k = m.event.special[a.type] || {};
                if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                    h = m.event.handlers.call(this, a, j), b = 0;
                    while ((f = h[b++]) && !a.isPropagationStopped()) {
                        a.currentTarget = f.elem, g = 0;
                        while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
                    }
                    return k.postDispatch && k.postDispatch.call(this, a), a.result
                }
            },
            handlers: function (a, b) {
                var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
                if (h && i.nodeType && (!a.button || "click" !== a.type))for (; i != this; i = i.parentNode || this)if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                    for (e = [], f = 0; h > f; f++)d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
                    e.length && g.push({elem: i, handlers: e})
                }
                return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
            },
            fix: function (a) {
                if (a[m.expando])return a;
                var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
                g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
                while (b--)c = d[b], a[c] = f[c];
                return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (a, b) {
                    var c, d, e, f = b.button, g = b.fromElement;
                    return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                }
            },
            special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== cb() && this.focus)try {
                            return this.focus(), !1
                        } catch (a) {
                        }
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        return this === cb() && this.blur ? (this.blur(), !1) : void 0
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    }, _default: function (a) {
                        return m.nodeName(a.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
                }
            },
            simulate: function (a, b, c, d) {
                var e = m.extend(new m.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
                d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, m.removeEvent = y.removeEventListener ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function (a, b, c) {
            var d = "on" + b;
            a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
        }, m.Event = function (a, b) {
            return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
        }, m.Event.prototype = {
            isDefaultPrevented: bb,
            isPropagationStopped: bb,
            isImmediatePropagationStopped: bb,
            preventDefault: function () {
                var a = this.originalEvent;
                this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
            }
        }, m.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (a, b) {
            m.event.special[a] = {
                delegateType: b, bindType: b, handle: function (a) {
                    var c, d = this, e = a.relatedTarget, f = a.handleObj;
                    return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), k.submitBubbles || (m.event.special.submit = {
            setup: function () {
                return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function (a) {
                    var b = a.target, c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
                    c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function (a) {
                        a._submit_bubble = !0
                    }), m._data(c, "submitBubbles", !0))
                })
            }, postDispatch: function (a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
            }, teardown: function () {
                return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
            }
        }), k.changeBubbles || (m.event.special.change = {
            setup: function () {
                return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }), m.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
                })), !1) : void m.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function (a) {
                        !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
                    }), m._data(b, "changeBubbles", !0))
                })
            }, handle: function (a) {
                var b = a.target;
                return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
            }, teardown: function () {
                return m.event.remove(this, "._change"), !X.test(this.nodeName)
            }
        }), k.focusinBubbles || m.each({focus: "focusin", blur: "focusout"}, function (a, b) {
            var c = function (a) {
                m.event.simulate(b, a.target, m.event.fix(a), !0)
            };
            m.event.special[b] = {
                setup: function () {
                    var d = this.ownerDocument || this, e = m._data(d, b);
                    e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
                }, teardown: function () {
                    var d = this.ownerDocument || this, e = m._data(d, b) - 1;
                    e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
                }
            }
        }), m.fn.extend({
            on: function (a, b, c, d, e) {
                var f, g;
                if ("object" == typeof a) {
                    "string" != typeof b && (c = c || b, b = void 0);
                    for (f in a)this.on(f, b, c, a[f], e);
                    return this
                }
                if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)d = bb; else if (!d)return this;
                return 1 === e && (g = d, d = function (a) {
                    return m().off(a), g.apply(this, arguments)
                }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function () {
                    m.event.add(this, a, d, c, b)
                })
            }, one: function (a, b, c, d) {
                return this.on(a, b, c, d, 1)
            }, off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj)return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a)this.off(e, b, a[e]);
                    return this
                }
                return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function () {
                    m.event.remove(this, a, c, b)
                })
            }, trigger: function (a, b) {
                return this.each(function () {
                    m.event.trigger(a, b, this)
                })
            }, triggerHandler: function (a, b) {
                var c = this[0];
                return c ? m.event.trigger(a, b, c, !0) : void 0
            }
        });
        function db(a) {
            var b = eb.split("|"), c = a.createDocumentFragment();
            if (c.createElement)while (b.length)c.createElement(b.pop());
            return c
        }

        var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", fb = / jQuery\d+="(?:null|\d+)"/g, gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"), hb = /^\s+/, ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, jb = /<([\w:]+)/, kb = /<tbody/i, lb = /<|&#?\w+;/, mb = /<(?:script|style|link)/i, nb = /checked\s*(?:[^=]|=\s*.checked.)/i, ob = /^$|\/(?:java|ecma)script/i, pb = /^true\/(.*)/, qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, rb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, sb = db(y), tb = sb.appendChild(y.createElement("div"));
        rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;
        function ub(a, b) {
            var c, d, e = 0, f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
            if (!f)for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b));
            return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
        }

        function vb(a) {
            W.test(a.type) && (a.defaultChecked = a.checked)
        }

        function wb(a, b) {
            return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function xb(a) {
            return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
        }

        function yb(a) {
            var b = pb.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function zb(a, b) {
            for (var c, d = 0; null != (c = a[d]); d++)m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
        }

        function Ab(a, b) {
            if (1 === b.nodeType && m.hasData(a)) {
                var c, d, e, f = m._data(a), g = m._data(b, f), h = f.events;
                if (h) {
                    delete g.handle, g.events = {};
                    for (c in h)for (d = 0, e = h[c].length; e > d; d++)m.event.add(b, c, h[c][d])
                }
                g.data && (g.data = m.extend({}, g.data))
            }
        }

        function Bb(a, b) {
            var c, d, e;
            if (1 === b.nodeType) {
                if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                    e = m._data(b);
                    for (d in e.events)m.removeEvent(b, d, e.handle);
                    b.removeAttribute(m.expando)
                }
                "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
            }
        }

        m.extend({
            clone: function (a, b, c) {
                var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
                if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g)d[g] && Bb(e, d[g]);
                if (b)if (c)for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++)Ab(e, d[g]); else Ab(a, f);
                return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f
            }, buildFragment: function (a, b, c, d) {
                for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++)if (f = a[q], f || 0 === f)if ("object" === m.type(f))m.merge(p, f.nodeType ? [f] : f); else if (lb.test(f)) {
                    h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1></$2>") + l[2], e = l[0];
                    while (e--)h = h.lastChild;
                    if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
                        f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                        while (e--)m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                    }
                    m.merge(p, h.childNodes), h.textContent = "";
                    while (h.firstChild)h.removeChild(h.firstChild);
                    h = o.lastChild
                } else p.push(b.createTextNode(f));
                h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0;
                while (f = p[q++])if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
                    e = 0;
                    while (f = h[e++])ob.test(f.type || "") && c.push(f)
                }
                return h = null, o
            }, cleanData: function (a, b) {
                for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                    if (g.events)for (e in g.events)n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                    j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
                }
            }
        }), m.fn.extend({
            text: function (a) {
                return V(this, function (a) {
                    return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
                }, null, a, arguments.length)
            }, append: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = wb(this, a);
                        b.appendChild(a)
                    }
                })
            }, prepend: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = wb(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            }, before: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            }, after: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            }, remove: function (a, b) {
                for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++)b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c));
                return this
            }, empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    1 === a.nodeType && m.cleanData(ub(a, !1));
                    while (a.firstChild)a.removeChild(a.firstChild);
                    a.options && m.nodeName(a, "select") && (a.options.length = 0)
                }
                return this
            }, clone: function (a, b) {
                return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                    return m.clone(this, a, b)
                })
            }, html: function (a) {
                return V(this, function (a) {
                    var b = this[0] || {}, c = 0, d = this.length;
                    if (void 0 === a)return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0;
                    if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
                        a = a.replace(ib, "<$1></$2>");
                        try {
                            for (; d > c; c++)b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (e) {
                        }
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            }, replaceWith: function () {
                var a = arguments[0];
                return this.domManip(arguments, function (b) {
                    a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this)
                }), a && (a.length || a.nodeType) ? this : this.remove()
            }, detach: function (a) {
                return this.remove(a, !0)
            }, domManip: function (a, b) {
                a = e.apply([], a);
                var c, d, f, g, h, i, j = 0, l = this.length, n = this, o = l - 1, p = a[0], q = m.isFunction(p);
                if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p))return this.each(function (c) {
                    var d = n.eq(c);
                    q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
                });
                if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                    for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++)d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
                    if (f)for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++)d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
                    i = c = null
                }
                return this
            }
        }), m.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (a, b) {
            m.fn[a] = function (a) {
                for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++)c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
                return this.pushStack(e)
            }
        });
        var Cb, Db = {};

        function Eb(b, c) {
            var d, e = m(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
            return e.detach(), f
        }

        function Fb(a) {
            var b = y, c = Db[a];
            return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c
        }

        !function () {
            var a;
            k.shrinkWrapBlocks = function () {
                if (null != a)return a;
                a = !1;
                var b, c, d;
                return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
            }
        }();
        var Gb = /^margin/, Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"), Ib, Jb, Kb = /^(top|right|bottom|left)$/;
        a.getComputedStyle ? (Ib = function (a) {
            return a.ownerDocument.defaultView.getComputedStyle(a, null)
        }, Jb = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
        }) : y.documentElement.currentStyle && (Ib = function (a) {
            return a.currentStyle
        }, Jb = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
        });
        function Lb(a, b) {
            return {
                get: function () {
                    var c = a();
                    if (null != c)return c ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        !function () {
            var b, c, d, e, f, g, h;
            if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
                c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
                    reliableHiddenOffsets: function () {
                        return null == g && i(), g
                    }, boxSizingReliable: function () {
                        return null == f && i(), f
                    }, pixelPosition: function () {
                        return null == e && i(), e
                    }, reliableMarginRight: function () {
                        return null == h && i(), h
                    }
                });
                function i() {
                    var b, c, d, i;
                    c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {width: "4px"}).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
                }
            }
        }(), m.swap = function (a, b, c, d) {
            var e, f, g = {};
            for (f in b)g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b)a.style[f] = g[f];
            return e
        };
        var Mb = /alpha\([^)]*\)/i, Nb = /opacity\s*=\s*([^)]*)/, Ob = /^(none|table(?!-c[ea]).+)/, Pb = new RegExp("^(" + S + ")(.*)$", "i"), Qb = new RegExp("^([+-])=(" + S + ")", "i"), Rb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Sb = {letterSpacing: "0", fontWeight: "400"}, Tb = ["Webkit", "O", "Moz", "ms"];

        function Ub(a, b) {
            if (b in a)return b;
            var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Tb.length;
            while (e--)if (b = Tb[e] + c, b in a)return b;
            return d
        }

        function Vb(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
            for (g = 0; h > g; g++)d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
            return a
        }

        function Wb(a, b, c) {
            var d = Pb.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }

        function Xb(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
            return g
        }

        function Yb(a, b, c) {
            var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Ib(a), g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
            if (0 >= e || null == e) {
                if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e))return e;
                d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }

        m.extend({
            cssHooks: {
                opacity: {
                    get: function (a, b) {
                        if (b) {
                            var c = Jb(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {"float": k.cssFloat ? "cssFloat" : "styleFloat"},
            style: function (a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = m.camelCase(b), i = a.style;
                    if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c)return g && "get"in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                    if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set"in g && void 0 === (c = g.set(a, c, d)))))try {
                        i[b] = c
                    } catch (j) {
                    }
                }
            },
            css: function (a, b, c, d) {
                var e, f, g, h = m.camelCase(b);
                return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get"in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
            }
        }), m.each(["height", "width"], function (a, b) {
            m.cssHooks[b] = {
                get: function (a, c, d) {
                    return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function () {
                        return Yb(a, b, d)
                    }) : Yb(a, b, d) : void 0
                }, set: function (a, c, d) {
                    var e = d && Ib(a);
                    return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
                }
            }
        }), k.opacity || (m.cssHooks.opacity = {
            get: function (a, b) {
                return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
            }, set: function (a, b) {
                var c = a.style, d = a.currentStyle, e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
                c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e)
            }
        }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function (a, b) {
            return b ? m.swap(a, {display: "inline-block"}, Jb, [a, "marginRight"]) : void 0
        }), m.each({margin: "", padding: "", border: "Width"}, function (a, b) {
            m.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, Gb.test(a) || (m.cssHooks[a + b].set = Wb)
        }), m.fn.extend({
            css: function (a, b) {
                return V(this, function (a, b, c) {
                    var d, e, f = {}, g = 0;
                    if (m.isArray(b)) {
                        for (d = Ib(a), e = b.length; e > g; g++)f[b[g]] = m.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
                }, a, b, arguments.length > 1)
            }, show: function () {
                return Vb(this, !0)
            }, hide: function () {
                return Vb(this)
            }, toggle: function (a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                    U(this) ? m(this).show() : m(this).hide()
                })
            }
        });
        function Zb(a, b, c, d, e) {
            return new Zb.prototype.init(a, b, c, d, e)
        }

        m.Tween = Zb, Zb.prototype = {
            constructor: Zb, init: function (a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
            }, cur: function () {
                var a = Zb.propHooks[this.prop];
                return a && a.get ? a.get(this) : Zb.propHooks._default.get(this)
            }, run: function (a) {
                var b, c = Zb.propHooks[this.prop];
                return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this
            }
        }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                }, set: function (a) {
                    m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }
            }
        }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, m.easing = {
            linear: function (a) {
                return a
            }, swing: function (a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }
        }, m.fx = Zb.prototype.init, m.fx.step = {};
        var $b, _b, ac = /^(?:toggle|show|hide)$/, bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"), cc = /queueHooks$/, dc = [ic], ec = {
            "*": [function (a, b) {
                var c = this.createTween(a, b), d = c.cur(), e = bc.exec(b), f = e && e[3] || (m.cssNumber[a] ? "" : "px"), g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)), h = 1, i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

        function fc() {
            return setTimeout(function () {
                $b = void 0
            }), $b = m.now()
        }

        function gc(a, b) {
            var c, d = {height: a}, e = 0;
            for (b = b ? 1 : 0; 4 > e; e += 2 - b)c = T[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }

        function hc(a, b, c) {
            for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)if (d = e[f].call(c, b, a))return d
        }

        function ic(a, b, c) {
            var d, e, f, g, h, i, j, l, n = this, o = {}, p = a.style, q = a.nodeType && U(a), r = m._data(a, "fxshow");
            c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
                h.unqueued || i()
            }), h.unqueued++, n.always(function () {
                n.always(function () {
                    h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
                })
            })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function () {
                p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
            }));
            for (d in b)if (e = b[d], ac.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d])continue;
                    q = !0
                }
                o[d] = r && r[d] || m.style(a, d)
            } else j = void 0;
            if (m.isEmptyObject(o))"inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j); else {
                r ? "hidden"in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function () {
                    m(a).hide()
                }), n.done(function () {
                    var b;
                    m._removeData(a, "fxshow");
                    for (b in o)m.style(a, b, o[b])
                });
                for (d in o)g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
            }
        }

        function jc(a, b) {
            var c, d, e, f, g;
            for (c in a)if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand"in g) {
                f = g.expand(f), delete a[d];
                for (c in f)c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
        }

        function kc(a, b, c) {
            var d, e, f = 0, g = dc.length, h = m.Deferred().always(function () {
                delete i.elem
            }), i = function () {
                if (e)return !1;
                for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            }, j = h.promise({
                elem: a,
                props: m.extend({}, b),
                opts: m.extend(!0, {specialEasing: {}}, c),
                originalProperties: b,
                originalOptions: c,
                startTime: $b || fc(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function (b) {
                    var c = 0, d = b ? j.tweens.length : 0;
                    if (e)return this;
                    for (e = !0; d > c; c++)j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }), k = j.props;
            for (jc(k, j.opts.specialEasing); g > f; f++)if (d = dc[f].call(j, a, k, j.opts))return d;
            return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        m.Animation = m.extend(kc, {
            tweener: function (a, b) {
                m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++)c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
            }, prefilter: function (a, b) {
                b ? dc.unshift(a) : dc.push(a)
            }
        }), m.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? m.extend({}, a) : {
                complete: c || !c && b || m.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !m.isFunction(b) && b
            };
            return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
            }, d
        }, m.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(U).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
            }, animate: function (a, b, c, d) {
                var e = m.isEmptyObject(a), f = m.speed(b, c, d), g = function () {
                    var b = kc(this, m.extend({}, a), f);
                    (e || m._data(this, "finish")) && b.stop(!0)
                };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            }, stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                    var b = !0, e = null != a && a + "queueHooks", f = m.timers, g = m._data(this);
                    if (e)g[e] && g[e].stop && d(g[e]); else for (e in g)g[e] && g[e].stop && cc.test(e) && d(g[e]);
                    for (e = f.length; e--;)f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && m.dequeue(this, a)
                })
            }, finish: function (a) {
                return a !== !1 && (a = a || "fx"), this.each(function () {
                    var b, c = m._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = m.timers, g = d ? d.length : 0;
                    for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++)d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), m.each(["toggle", "show", "hide"], function (a, b) {
            var c = m.fn[b];
            m.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e)
            }
        }), m.each({
            slideDown: gc("show"),
            slideUp: gc("hide"),
            slideToggle: gc("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (a, b) {
            m.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), m.timers = [], m.fx.tick = function () {
            var a, b = m.timers, c = 0;
            for ($b = m.now(); c < b.length; c++)a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || m.fx.stop(), $b = void 0
        }, m.fx.timer = function (a) {
            m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
        }, m.fx.interval = 13, m.fx.start = function () {
            _b || (_b = setInterval(m.fx.tick, m.fx.interval))
        }, m.fx.stop = function () {
            clearInterval(_b), _b = null
        }, m.fx.speeds = {slow: 600, fast: 200, _default: 400}, m.fn.delay = function (a, b) {
            return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, function () {
            var a, b, c, d, e;
            b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
        }();
        var lc = /\r/g;
        m.fn.extend({
            val: function (a) {
                var b, c, d, e = this[0];
                {
                    if (arguments.length)return d = m.isFunction(a), this.each(function (c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function (a) {
                            return null == a ? "" : a + ""
                        })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set"in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                    if (e)return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get"in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
                }
            }
        }), m.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = m.find.attr(a, "value");
                        return null != b ? b : m.trim(m.text(a))
                    }
                }, select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                            if (b = m(c).val(), f)return b;
                            g.push(b)
                        }
                        return g
                    }, set: function (a, b) {
                        var c, d, e = a.options, f = m.makeArray(b), g = e.length;
                        while (g--)if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0)try {
                            d.selected = c = !0
                        } catch (h) {
                            d.scrollHeight
                        } else d.selected = !1;
                        return c || (a.selectedIndex = -1), e
                    }
                }
            }
        }), m.each(["radio", "checkbox"], function () {
            m.valHooks[this] = {
                set: function (a, b) {
                    return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
                }
            }, k.checkOn || (m.valHooks[this].get = function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var mc, nc, oc = m.expr.attrHandle, pc = /^(?:checked|selected)$/i, qc = k.getSetAttribute, rc = k.input;
        m.fn.extend({
            attr: function (a, b) {
                return V(this, m.attr, a, b, arguments.length > 1)
            }, removeAttr: function (a) {
                return this.each(function () {
                    m.removeAttr(this, a)
                })
            }
        }), m.extend({
            attr: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (a && 3 !== f && 8 !== f && 2 !== f)return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get"in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set"in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
            }, removeAttr: function (a, b) {
                var c, d, e = 0, f = b && b.match(E);
                if (f && 1 === a.nodeType)while (c = f[e++])d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d)
            }, attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            }
        }), nc = {
            set: function (a, b, c) {
                return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
            }
        }, m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = oc[b] || m.find.attr;
            oc[b] = rc && qc || !pc.test(b) ? function (a, b, d) {
                var e, f;
                return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e
            } : function (a, b, c) {
                return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
            }
        }), rc && qc || (m.attrHooks.value = {
            set: function (a, b, c) {
                return m.nodeName(a, "input") ? void(a.defaultValue = b) : mc && mc.set(a, b, c)
            }
        }), qc || (mc = {
            set: function (a, b, c) {
                var d = a.getAttributeNode(c);
                return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
            }
        }, oc.id = oc.name = oc.coords = function (a, b, c) {
            var d;
            return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
        }, m.valHooks.button = {
            get: function (a, b) {
                var c = a.getAttributeNode(b);
                return c && c.specified ? c.value : void 0
            }, set: mc.set
        }, m.attrHooks.contenteditable = {
            set: function (a, b, c) {
                mc.set(a, "" === b ? !1 : b, c)
            }
        }, m.each(["width", "height"], function (a, b) {
            m.attrHooks[b] = {
                set: function (a, c) {
                    return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
                }
            }
        })), k.style || (m.attrHooks.style = {
            get: function (a) {
                return a.style.cssText || void 0
            }, set: function (a, b) {
                return a.style.cssText = b + ""
            }
        });
        var sc = /^(?:input|select|textarea|button|object)$/i, tc = /^(?:a|area)$/i;
        m.fn.extend({
            prop: function (a, b) {
                return V(this, m.prop, a, b, arguments.length > 1)
            }, removeProp: function (a) {
                return a = m.propFix[a] || a, this.each(function () {
                    try {
                        this[a] = void 0, delete this[a]
                    } catch (b) {
                    }
                })
            }
        }), m.extend({
            propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
                var d, e, f, g = a.nodeType;
                if (a && 3 !== g && 8 !== g && 2 !== g)return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get"in e && null !== (d = e.get(a, b)) ? d : a[b]
            }, propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = m.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            }
        }), k.hrefNormalized || m.each(["href", "src"], function (a, b) {
            m.propHooks[b] = {
                get: function (a) {
                    return a.getAttribute(b, 4)
                }
            }
        }), k.optSelected || (m.propHooks.selected = {
            get: function (a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }
        }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            m.propFix[this.toLowerCase()] = this
        }), k.enctype || (m.propFix.enctype = "encoding");
        var uc = /[\t\r\n\f]/g;
        m.fn.extend({
            addClass: function (a) {
                var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
                if (m.isFunction(a))return this.each(function (b) {
                    m(this).addClass(a.call(this, b, this.className))
                });
                if (j)for (b = (a || "").match(E) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
                    f = 0;
                    while (e = b[f++])d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                    g = m.trim(d), c.className !== g && (c.className = g)
                }
                return this
            }, removeClass: function (a) {
                var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
                if (m.isFunction(a))return this.each(function (b) {
                    m(this).removeClass(a.call(this, b, this.className))
                });
                if (j)for (b = (a || "").match(E) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
                    f = 0;
                    while (e = b[f++])while (d.indexOf(" " + e + " ") >= 0)d = d.replace(" " + e + " ", " ");
                    g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
                }
                return this
            }, toggleClass: function (a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function (c) {
                    m(this).toggleClass(a.call(this, c, this.className, b), b)
                } : function () {
                    if ("string" === c) {
                        var b, d = 0, e = m(this), f = a.match(E) || [];
                        while (b = f[d++])e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                    } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
                })
            }, hasClass: function (a) {
                for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0)return !0;
                return !1
            }
        }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
            m.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), m.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }, bind: function (a, b, c) {
                return this.on(a, null, b, c)
            }, unbind: function (a, b) {
                return this.off(a, null, b)
            }, delegate: function (a, b, c, d) {
                return this.on(b, a, c, d)
            }, undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        });
        var vc = m.now(), wc = /\?/, xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        m.parseJSON = function (b) {
            if (a.JSON && a.JSON.parse)return a.JSON.parse(b + "");
            var c, d = null, e = m.trim(b + "");
            return e && !m.trim(e.replace(xc, function (a, b, e, f) {
                return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
            })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
        }, m.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b)return null;
            try {
                a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
            } catch (e) {
                c = void 0
            }
            return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
        };
        var yc, zc, Ac = /#.*$/, Bc = /([?&])_=[^&]*/, Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ec = /^(?:GET|HEAD)$/, Fc = /^\/\//, Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Hc = {}, Ic = {}, Jc = "*/".concat("*");
        try {
            zc = location.href
        } catch (Kc) {
            zc = y.createElement("a"), zc.href = "", zc = zc.href
        }
        yc = Gc.exec(zc.toLowerCase()) || [];
        function Lc(a) {
            return function (b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0, f = b.toLowerCase().match(E) || [];
                if (m.isFunction(c))while (d = f[e++])"+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function Mc(a, b, c, d) {
            var e = {}, f = a === Ic;

            function g(h) {
                var i;
                return e[h] = !0, m.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
                }), i
            }

            return g(b.dataTypes[0]) || !e["*"] && g("*")
        }

        function Nc(a, b) {
            var c, d, e = m.ajaxSettings.flatOptions || {};
            for (d in b)void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
            return c && m.extend(!0, a, c), a
        }

        function Oc(a, b, c) {
            var d, e, f, g, h = a.contents, i = a.dataTypes;
            while ("*" === i[0])i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
            if (e)for (g in h)if (h[g] && h[g].test(e)) {
                i.unshift(g);
                break
            }
            if (i[0]in c)f = i[0]; else {
                for (g in c) {
                    if (!i[0] || a.converters[g + " " + i[0]]) {
                        f = g;
                        break
                    }
                    d || (d = g)
                }
                f = f || d
            }
            return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
        }

        function Pc(a, b, c, d) {
            var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
            if (k[1])for (g in a.converters)j[g.toLowerCase()] = a.converters[g];
            f = k.shift();
            while (f)if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())if ("*" === f)f = i; else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g)for (e in j)if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                    break
                }
                if (g !== !0)if (g && a["throws"])b = g(b); else try {
                    b = g(b)
                } catch (l) {
                    return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
                }
            }
            return {state: "success", data: b}
        }

        m.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: zc,
                type: "GET",
                isLocal: Dc.test(yc[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Jc,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /xml/, html: /html/, json: /json/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": m.parseJSON, "text xml": m.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (a, b) {
                return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a)
            },
            ajaxPrefilter: Lc(Hc),
            ajaxTransport: Lc(Ic),
            ajax: function (a, b) {
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b), l = k.context || k, n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event, o = m.Deferred(), p = m.Callbacks("once memory"), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                    readyState: 0,
                    getResponseHeader: function (a) {
                        var b;
                        if (2 === t) {
                            if (!j) {
                                j = {};
                                while (b = Cc.exec(f))j[b[1].toLowerCase()] = b[2]
                            }
                            b = j[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function () {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function (a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function (a) {
                        var b;
                        if (a)if (2 > t)for (b in a)q[b] = [q[b], a[b]]; else v.always(a[v.status]);
                        return this
                    },
                    abort: function (a) {
                        var b = a || u;
                        return i && i.abort(b), x(0, b), this
                    }
                };
                if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t)return v;
                h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]);
                for (d in k.headers)v.setRequestHeader(d, k.headers[d]);
                if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))return v.abort();
                u = "abort";
                for (d in{success: 1, error: 1, complete: 1})v[d](k[d]);
                if (i = Mc(Ic, k, b, v)) {
                    v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
                        v.abort("timeout")
                    }, k.timeout));
                    try {
                        t = 1, i.send(r, x)
                    } catch (w) {
                        if (!(2 > t))throw w;
                        x(-1, w)
                    }
                } else x(-1, "No Transport");
                function x(a, b, c, d) {
                    var j, r, s, u, w, x = b;
                    2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
                }

                return v
            },
            getJSON: function (a, b, c) {
                return m.get(a, b, c, "json")
            },
            getScript: function (a, b) {
                return m.get(a, void 0, b, "script")
            }
        }), m.each(["get", "post"], function (a, b) {
            m[b] = function (a, c, d, e) {
                return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                })
            }
        }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            m.fn[b] = function (a) {
                return this.on(b, a)
            }
        }), m._evalUrl = function (a) {
            return m.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
        }, m.fn.extend({
            wrapAll: function (a) {
                if (m.isFunction(a))return this.each(function (b) {
                    m(this).wrapAll(a.call(this, b))
                });
                if (this[0]) {
                    var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                        var a = this;
                        while (a.firstChild && 1 === a.firstChild.nodeType)a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            }, wrapInner: function (a) {
                return this.each(m.isFunction(a) ? function (b) {
                    m(this).wrapInner(a.call(this, b))
                } : function () {
                    var b = m(this), c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            }, wrap: function (a) {
                var b = m.isFunction(a);
                return this.each(function (c) {
                    m(this).wrapAll(b ? a.call(this, c) : a)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
                }).end()
            }
        }), m.expr.filters.hidden = function (a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
        }, m.expr.filters.visible = function (a) {
            return !m.expr.filters.hidden(a)
        };
        var Qc = /%20/g, Rc = /\[\]$/, Sc = /\r?\n/g, Tc = /^(?:submit|button|image|reset|file)$/i, Uc = /^(?:input|select|textarea|keygen)/i;

        function Vc(a, b, c, d) {
            var e;
            if (m.isArray(b))m.each(b, function (b, e) {
                c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            }); else if (c || "object" !== m.type(b))d(a, b); else for (e in b)Vc(a + "[" + e + "]", b[e], c, d)
        }

        m.param = function (a, b) {
            var c, d = [], e = function (a, b) {
                b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a))m.each(a, function () {
                e(this.name, this.value)
            }); else for (c in a)Vc(c, a[c], b, e);
            return d.join("&").replace(Qc, "+")
        }, m.fn.extend({
            serialize: function () {
                return m.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var a = m.prop(this, "elements");
                    return a ? m.makeArray(a) : this
                }).filter(function () {
                    var a = this.type;
                    return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a))
                }).map(function (a, b) {
                    var c = m(this).val();
                    return null == c ? null : m.isArray(c) ? m.map(c, function (a) {
                        return {name: b.name, value: a.replace(Sc, "\r\n")}
                    }) : {name: b.name, value: c.replace(Sc, "\r\n")}
                }).get()
            }
        }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c()
        } : Zc;
        var Wc = 0, Xc = {}, Yc = m.ajaxSettings.xhr();
        a.ActiveXObject && m(a).on("unload", function () {
            for (var a in Xc)Xc[a](void 0, !0)
        }), k.cors = !!Yc && "withCredentials"in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function (a) {
            if (!a.crossDomain || k.cors) {
                var b;
                return {
                    send: function (c, d) {
                        var e, f = a.xhr(), g = ++Wc;
                        if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (e in a.xhrFields)f[e] = a.xhrFields[e];
                        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                        for (e in c)void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                        f.send(a.hasContent && a.data || null), b = function (c, e) {
                            var h, i, j;
                            if (b && (e || 4 === f.readyState))if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e)4 !== f.readyState && f.abort(); else {
                                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                try {
                                    i = f.statusText
                                } catch (k) {
                                    i = ""
                                }
                                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                            }
                            j && d(h, i, j, f.getAllResponseHeaders())
                        }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b()
                    }, abort: function () {
                        b && b(void 0, !0)
                    }
                }
            }
        });
        function Zc() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {
            }
        }

        function $c() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {
            }
        }

        m.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /(?:java|ecma)script/},
            converters: {
                "text script": function (a) {
                    return m.globalEval(a), a
                }
            }
        }), m.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), m.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b, c = y.head || m("head")[0] || y.documentElement;
                return {
                    send: function (d, e) {
                        b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                        }, c.insertBefore(b, c.firstChild)
                    }, abort: function () {
                        b && b.onload(void 0, !0)
                    }
                }
            }
        });
        var _c = [], ad = /(=)\?(?=&|$)|\?\?/;
        m.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var a = _c.pop() || m.expando + "_" + vc++;
                return this[a] = !0, a
            }
        }), m.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
                return g || m.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
                g = arguments
            }, d.always(function () {
                a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
            }), "script") : void 0
        }), m.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a)return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || y;
            var d = u.exec(a), e = !c && [];
            return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
        };
        var bd = m.fn.load;
        m.fn.load = function (a, b, c) {
            if ("string" != typeof a && bd)return bd.apply(this, arguments);
            var d, e, f, g = this, h = a.indexOf(" ");
            return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: b
            }).done(function (a) {
                e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
            }).complete(c && function (a, b) {
                    g.each(c, e || [a.responseText, b, a])
                }), this
        }, m.expr.filters.animated = function (a) {
            return m.grep(m.timers, function (b) {
                return a === b.elem
            }).length
        };
        var cd = a.document.documentElement;

        function dd(a) {
            return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
        }

        m.offset = {
            setOffset: function (a, b, c) {
                var d, e, f, g, h, i, j, k = m.css(a, "position"), l = m(a), n = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using"in b ? b.using.call(a, n) : l.css(n)
            }
        }, m.fn.extend({
            offset: function (a) {
                if (arguments.length)return void 0 === a ? this : this.each(function (b) {
                    m.offset.setOffset(this, a, b)
                });
                var b, c, d = {top: 0, left: 0}, e = this[0], f = e && e.ownerDocument;
                if (f)return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }) : d
            }, position: function () {
                if (this[0]) {
                    var a, b, c = {top: 0, left: 0}, d = this[0];
                    return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                        top: b.top - c.top - m.css(d, "marginTop", !0),
                        left: b.left - c.left - m.css(d, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    var a = this.offsetParent || cd;
                    while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position"))a = a.offsetParent;
                    return a || cd
                })
            }
        }), m.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
            var c = /Y/.test(b);
            m.fn[a] = function (d) {
                return V(this, function (a, d, e) {
                    var f = dd(a);
                    return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
                }, a, d, arguments.length, null)
            }
        }), m.each(["top", "left"], function (a, b) {
            m.cssHooks[b] = Lb(k.pixelPosition, function (a, c) {
                return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0
            })
        }), m.each({Height: "height", Width: "width"}, function (a, b) {
            m.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
                m.fn[d] = function (d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return V(this, function (b, c, d) {
                        var e;
                        return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                    }, b, f ? d : void 0, f, null)
                }
            })
        }), m.fn.size = function () {
            return this.length
        }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return m
        });
        var ed = a.jQuery, fd = a.$;
        return m.noConflict = function (b) {
            return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m
        }, typeof b === K && (a.jQuery = a.$ = m), m
    });
    !function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
    }(function (a) {
        function b(b) {
            var g = b || window.event, h = i.call(arguments, 1), j = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
            if (b = a.event.fix(g), b.type = "mousewheel", "detail"in g && (m = -1 * g.detail), "wheelDelta"in g && (m = g.wheelDelta), "wheelDeltaY"in g && (m = g.wheelDeltaY), "wheelDeltaX"in g && (l = -1 * g.wheelDeltaX), "axis"in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY"in g && (m = -1 * g.deltaY, j = m), "deltaX"in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                if (1 === g.deltaMode) {
                    var q = a.data(this, "mousewheel-line-height");
                    j *= q, m *= q, l *= q
                } else if (2 === g.deltaMode) {
                    var r = a.data(this, "mousewheel-page-height");
                    j *= r, m *= r, l *= r
                }
                if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                    var s = this.getBoundingClientRect();
                    o = b.clientX - s.left, p = b.clientY - s.top
                }
                return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
            }
        }

        function c() {
            f = null
        }

        function d(a, b) {
            return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
        }

        var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice;
        if (a.event.fixHooks)for (var j = g.length; j;)a.event.fixHooks[g[--j]] = a.event.mouseHooks;
        var k = a.event.special.mousewheel = {
            version: "3.1.12", setup: function () {
                if (this.addEventListener)for (var c = h.length; c;)this.addEventListener(h[--c], b, !1); else this.onmousewheel = b;
                a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
            }, teardown: function () {
                if (this.removeEventListener)for (var c = h.length; c;)this.removeEventListener(h[--c], b, !1); else this.onmousewheel = null;
                a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
            }, getLineHeight: function (b) {
                var c = a(b), d = c["offsetParent"in a.fn ? "offsetParent" : "parent"]();
                return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
            }, getPageHeight: function (b) {
                return a(b).height()
            }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
        };
        a.fn.extend({
            mousewheel: function (a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
            }, unmousewheel: function (a) {
                return this.unbind("mousewheel", a)
            }
        })
    });
    (function (e) {
        "use strict";
        typeof define == "function" && define.amd ? define(["jquery"], e) : e(typeof jQuery != "undefined" ? jQuery : window.Zepto)
    })(function (e) {
        "use strict";
        function r(t) {
            var n = t.data;
            t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(n))
        }

        function i(t) {
            var n = t.target, r = e(n);
            if (!r.is("[type=submit],[type=image]")) {
                var i = r.closest("[type=submit]");
                if (i.length === 0)return;
                n = i[0]
            }
            var s = this;
            s.clk = n;
            if (n.type == "image")if (t.offsetX !== undefined)s.clk_x = t.offsetX, s.clk_y = t.offsetY; else if (typeof e.fn.offset == "function") {
                var o = r.offset();
                s.clk_x = t.pageX - o.left, s.clk_y = t.pageY - o.top
            } else s.clk_x = t.pageX - n.offsetLeft, s.clk_y = t.pageY - n.offsetTop;
            setTimeout(function () {
                s.clk = s.clk_x = s.clk_y = null
            }, 100)
        }

        function s() {
            if (!e.fn.ajaxSubmit.debug)return;
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }

        var t = {};
        t.fileapi = e("<input type='file'/>").get(0).files !== undefined, t.formdata = window.FormData !== undefined;
        var n = !!e.fn.prop;
        e.fn.attr2 = function () {
            if (!n)return this.attr.apply(this, arguments);
            var e = this.prop.apply(this, arguments);
            return e && e.jquery || typeof e == "string" ? e : this.attr.apply(this, arguments)
        }, e.fn.ajaxSubmit = function (r) {
            function k(t) {
                var n = e.param(t, r.traditional).split("&"), i = n.length, s = [], o, u;
                for (o = 0; o < i; o++)n[o] = n[o].replace(/\+/g, " "), u = n[o].split("="), s.push([decodeURIComponent(u[0]), decodeURIComponent(u[1])]);
                return s
            }

            function L(t) {
                var n = new FormData;
                for (var s = 0; s < t.length; s++)n.append(t[s].name, t[s].value);
                if (r.extraData) {
                    var o = k(r.extraData);
                    for (s = 0; s < o.length; s++)o[s] && n.append(o[s][0], o[s][1])
                }
                r.data = null;
                var u = e.extend(!0, {}, e.ajaxSettings, r, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: i || "POST"
                });
                r.uploadProgress && (u.xhr = function () {
                    var t = e.ajaxSettings.xhr();
                    return t.upload && t.upload.addEventListener("progress", function (e) {
                        var t = 0, n = e.loaded || e.position, i = e.total;
                        e.lengthComputable && (t = Math.ceil(n / i * 100)), r.uploadProgress(e, n, i, t)
                    }, !1), t
                }), u.data = null;
                var a = u.beforeSend;
                return u.beforeSend = function (e, t) {
                    r.formData ? t.data = r.formData : t.data = n, a && a.call(this, e, t)
                }, e.ajax(u)
            }

            function A(t) {
                function T(e) {
                    var t = null;
                    try {
                        e.contentWindow && (t = e.contentWindow.document)
                    } catch (n) {
                        s("cannot get iframe.contentWindow document: " + n)
                    }
                    if (t)return t;
                    try {
                        t = e.contentDocument ? e.contentDocument : e.document
                    } catch (n) {
                        s("cannot get iframe.contentDocument: " + n), t = e.document
                    }
                    return t
                }

                function k() {
                    function f() {
                        try {
                            var e = T(v).readyState;
                            s("state = " + e), e && e.toLowerCase() == "uninitialized" && setTimeout(f, 50)
                        } catch (t) {
                            s("Server abort: ", t, " (", t.name, ")"), _(x), w && clearTimeout(w), w = undefined
                        }
                    }

                    var t = a.attr2("target"), n = a.attr2("action"), r = "multipart/form-data", u = a.attr("enctype") || a.attr("encoding") || r;
                    o.setAttribute("target", p), (!i || /post/i.test(i)) && o.setAttribute("method", "POST"), n != l.url && o.setAttribute("action", l.url), !l.skipEncodingOverride && (!i || /post/i.test(i)) && a.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    }), l.timeout && (w = setTimeout(function () {
                        b = !0, _(S)
                    }, l.timeout));
                    var c = [];
                    try {
                        if (l.extraData)for (var h in l.extraData)l.extraData.hasOwnProperty(h) && (e.isPlainObject(l.extraData[h]) && l.extraData[h].hasOwnProperty("name") && l.extraData[h].hasOwnProperty("value") ? c.push(e('<input type="hidden" name="' + l.extraData[h].name + '">').val(l.extraData[h].value).appendTo(o)[0]) : c.push(e('<input type="hidden" name="' + h + '">').val(l.extraData[h]).appendTo(o)[0]));
                        l.iframeTarget || d.appendTo("body"), v.attachEvent ? v.attachEvent("onload", _) : v.addEventListener("load", _, !1), setTimeout(f, 15);
                        try {
                            o.submit()
                        } catch (m) {
                            var g = document.createElement("form").submit;
                            g.apply(o)
                        }
                    } finally {
                        o.setAttribute("action", n), o.setAttribute("enctype", u), t ? o.setAttribute("target", t) : a.removeAttr("target"), e(c).remove()
                    }
                }

                function _(t) {
                    if (m.aborted || M)return;
                    A = T(v), A || (s("cannot access response document"), t = x);
                    if (t === S && m) {
                        m.abort("timeout"), E.reject(m, "timeout");
                        return
                    }
                    if (t == x && m) {
                        m.abort("server abort"), E.reject(m, "error", "server abort");
                        return
                    }
                    if (!A || A.location.href == l.iframeSrc)if (!b)return;
                    v.detachEvent ? v.detachEvent("onload", _) : v.removeEventListener("load", _, !1);
                    var n = "success", r;
                    try {
                        if (b)throw"timeout";
                        var i = l.dataType == "xml" || A.XMLDocument || e.isXMLDoc(A);
                        s("isXml=" + i);
                        if (!i && window.opera && (A.body === null || !A.body.innerHTML) && --O) {
                            s("requeing onLoad callback, DOM not available"), setTimeout(_, 250);
                            return
                        }
                        var o = A.body ? A.body : A.documentElement;
                        m.responseText = o ? o.innerHTML : null, m.responseXML = A.XMLDocument ? A.XMLDocument : A, i && (l.dataType = "xml"), m.getResponseHeader = function (e) {
                            var t = {"content-type": l.dataType};
                            return t[e.toLowerCase()]
                        }, o && (m.status = Number(o.getAttribute("status")) || m.status, m.statusText = o.getAttribute("statusText") || m.statusText);
                        var u = (l.dataType || "").toLowerCase(), a = /(json|script|text)/.test(u);
                        if (a || l.textarea) {
                            var f = A.getElementsByTagName("textarea")[0];
                            if (f)m.responseText = f.value, m.status = Number(f.getAttribute("status")) || m.status, m.statusText = f.getAttribute("statusText") || m.statusText; else if (a) {
                                var c = A.getElementsByTagName("pre")[0], p = A.getElementsByTagName("body")[0];
                                c ? m.responseText = c.textContent ? c.textContent : c.innerText : p && (m.responseText = p.textContent ? p.textContent : p.innerText)
                            }
                        } else u == "xml" && !m.responseXML && m.responseText && (m.responseXML = D(m.responseText));
                        try {
                            L = H(m, u, l)
                        } catch (g) {
                            n = "parsererror", m.error = r = g || n
                        }
                    } catch (g) {
                        s("error caught: ", g), n = "error", m.error = r = g || n
                    }
                    m.aborted && (s("upload aborted"), n = null), m.status && (n = m.status >= 200 && m.status < 300 || m.status === 304 ? "success" : "error"), n === "success" ? (l.success && l.success.call(l.context, L, "success", m), E.resolve(m.responseText, "success", m), h && e.event.trigger("ajaxSuccess", [m, l])) : n && (r === undefined && (r = m.statusText), l.error && l.error.call(l.context, m, n, r), E.reject(m, "error", r), h && e.event.trigger("ajaxError", [m, l, r])), h && e.event.trigger("ajaxComplete", [m, l]), h && !--e.active && e.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, m, n), M = !0, l.timeout && clearTimeout(w), setTimeout(function () {
                        l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), m.responseXML = null
                    }, 100)
                }

                var o = a[0], u, f, l, h, p, d, v, m, g, y, b, w, E = e.Deferred();
                E.abort = function (e) {
                    m.abort(e)
                };
                if (t)for (f = 0; f < c.length; f++)u = e(c[f]), n ? u.prop("disabled", !1) : u.removeAttr("disabled");
                l = e.extend(!0, {}, e.ajaxSettings, r), l.context = l.context || l, p = "jqFormIO" + (new Date).getTime(), l.iframeTarget ? (d = e(l.iframeTarget), y = d.attr2("name"), y ? p = y : d.attr2("name", p)) : (d = e('<iframe name="' + p + '" src="' + l.iframeSrc + '" />'), d.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), v = d[0], m = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {
                    },
                    getResponseHeader: function () {
                    },
                    setRequestHeader: function () {
                    },
                    abort: function (t) {
                        var n = t === "timeout" ? "timeout" : "aborted";
                        s("aborting upload... " + n), this.aborted = 1;
                        try {
                            v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop")
                        } catch (r) {
                        }
                        d.attr("src", l.iframeSrc), m.error = n, l.error && l.error.call(l.context, m, n, t), h && e.event.trigger("ajaxError", [m, l, n]), l.complete && l.complete.call(l.context, m, n)
                    }
                }, h = l.global, h && 0 === e.active++ && e.event.trigger("ajaxStart"), h && e.event.trigger("ajaxSend", [m, l]);
                if (l.beforeSend && l.beforeSend.call(l.context, m, l) === !1)return l.global && e.active--, E.reject(), E;
                if (m.aborted)return E.reject(), E;
                g = o.clk, g && (y = g.name, y && !g.disabled && (l.extraData = l.extraData || {}, l.extraData[y] = g.value, g.type == "image" && (l.extraData[y + ".x"] = o.clk_x, l.extraData[y + ".y"] = o.clk_y)));
                var S = 1, x = 2, N = e("meta[name=csrf-token]").attr("content"), C = e("meta[name=csrf-param]").attr("content");
                C && N && (l.extraData = l.extraData || {}, l.extraData[C] = N), l.forceSync ? k() : setTimeout(k, 10);
                var L, A, O = 50, M, D = e.parseXML || function (e, t) {
                        return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && t.documentElement.nodeName != "parsererror" ? t : null
                    }, P = e.parseJSON || function (e) {
                        return window.eval("(" + e + ")")
                    }, H = function (t, n, r) {
                    var i = t.getResponseHeader("content-type") || "", s = n === "xml" || !n && i.indexOf("xml") >= 0, o = s ? t.responseXML : t.responseText;
                    return s && o.documentElement.nodeName === "parsererror" && e.error && e.error("parsererror"), r && r.dataFilter && (o = r.dataFilter(o, n)), typeof o == "string" && (n === "json" || !n && i.indexOf("json") >= 0 ? o = P(o) : (n === "script" || !n && i.indexOf("javascript") >= 0) && e.globalEval(o)), o
                };
                return E
            }

            if (!this.length)return s("ajaxSubmit: skipping submit process - no element selected"), this;
            var i, o, u, a = this;
            typeof r == "function" ? r = {success: r} : r === undefined && (r = {}), i = r.type || this.attr2("method"), o = r.url || this.attr2("action"), u = typeof o == "string" ? e.trim(o) : "", u = u || window.location.href || "", u && (u = (u.match(/^([^#]+)/) || [])[1]), r = e.extend(!0, {
                url: u,
                success: e.ajaxSettings.success,
                type: i || e.ajaxSettings.type,
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, r);
            var f = {};
            this.trigger("form-pre-serialize", [this, r, f]);
            if (f.veto)return s("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (r.beforeSerialize && r.beforeSerialize(this, r) === !1)return s("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            var l = r.traditional;
            l === undefined && (l = e.ajaxSettings.traditional);
            var c = [], h, p = this.formToArray(r.semantic, c);
            r.data && (r.extraData = r.data, h = e.param(r.data, l));
            if (r.beforeSubmit && r.beforeSubmit(p, this, r) === !1)return s("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            this.trigger("form-submit-validate", [p, this, r, f]);
            if (f.veto)return s("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            var d = e.param(p, l);
            h && (d = d ? d + "&" + h : h), r.type.toUpperCase() == "GET" ? (r.url += (r.url.indexOf("?") >= 0 ? "&" : "?") + d, r.data = null) : r.data = d;
            var v = [];
            r.resetForm && v.push(function () {
                a.resetForm()
            }), r.clearForm && v.push(function () {
                a.clearForm(r.includeHidden)
            });
            if (!r.dataType && r.target) {
                var m = r.success || function () {
                    };
                v.push(function (t) {
                    var n = r.replaceTarget ? "replaceWith" : "html";
                    e(r.target)[n](t).each(m, arguments)
                })
            } else r.success && v.push(r.success);
            r.success = function (e, t, n) {
                var i = r.context || this;
                for (var s = 0, o = v.length; s < o; s++)v[s].apply(i, [e, t, n || a, a])
            };
            if (r.error) {
                var g = r.error;
                r.error = function (e, t, n) {
                    var i = r.context || this;
                    g.apply(i, [e, t, n, a])
                }
            }
            if (r.complete) {
                var y = r.complete;
                r.complete = function (e, t) {
                    var n = r.context || this;
                    y.apply(n, [e, t, a])
                }
            }
            var b = e("input[type=file]:enabled", this).filter(function () {
                return e(this).val() !== ""
            }), w = b.length > 0, E = "multipart/form-data", S = a.attr("enctype") == E || a.attr("encoding") == E, x = t.fileapi && t.formdata;
            s("fileAPI :" + x);
            var T = (w || S) && !x, N;
            r.iframe !== !1 && (r.iframe || T) ? r.closeKeepAlive ? e.get(r.closeKeepAlive, function () {
                N = A(p)
            }) : N = A(p) : (w || S) && x ? N = L(p) : N = e.ajax(r), a.removeData("jqxhr").data("jqxhr", N);
            for (var C = 0; C < c.length; C++)c[C] = null;
            return this.trigger("form-submit-notify", [this, r]), this
        }, e.fn.ajaxForm = function (t) {
            t = t || {}, t.delegation = t.delegation && e.isFunction(e.fn.on);
            if (!t.delegation && this.length === 0) {
                var n = {s: this.selector, c: this.context};
                return !e.isReady && n.s ? (s("DOM not ready, queuing ajaxForm"), e(function () {
                    e(n.s, n.c).ajaxForm(t)
                }), this) : (s("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
            }
            return t.delegation ? (e(document).off("submit.form-plugin", this.selector, r).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, t, r).on("click.form-plugin", this.selector, t, i), this) : this.ajaxFormUnbind().bind("submit.form-plugin", t, r).bind("click.form-plugin", t, i)
        }, e.fn.ajaxFormUnbind = function () {
            return this.unbind("submit.form-plugin click.form-plugin")
        }, e.fn.formToArray = function (n, r) {
            var i = [];
            if (this.length === 0)return i;
            var s = this[0], o = this.attr("id"), u = n ? s.getElementsByTagName("*") : s.elements, a;
            u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), o && (a = e(':input[form="' + o + '"]').get(), a.length && (u = (u || []).concat(a)));
            if (!u || !u.length)return i;
            var f, l, c, h, p, d, v;
            for (f = 0, d = u.length; f < d; f++) {
                p = u[f], c = p.name;
                if (!c || p.disabled)continue;
                if (n && s.clk && p.type == "image") {
                    s.clk == p && (i.push({name: c, value: e(p).val(), type: p.type}), i.push({
                        name: c + ".x",
                        value: s.clk_x
                    }, {name: c + ".y", value: s.clk_y}));
                    continue
                }
                h = e.fieldValue(p, !0);
                if (h && h.constructor == Array) {
                    r && r.push(p);
                    for (l = 0, v = h.length; l < v; l++)i.push({name: c, value: h[l]})
                } else if (t.fileapi && p.type == "file") {
                    r && r.push(p);
                    var m = p.files;
                    if (m.length)for (l = 0; l < m.length; l++)i.push({
                        name: c,
                        value: m[l],
                        type: p.type
                    }); else i.push({name: c, value: "", type: p.type})
                } else h !== null && typeof h != "undefined" && (r && r.push(p), i.push({
                    name: c,
                    value: h,
                    type: p.type,
                    required: p.required
                }))
            }
            if (!n && s.clk) {
                var g = e(s.clk), y = g[0];
                c = y.name, c && !y.disabled && y.type == "image" && (i.push({
                    name: c,
                    value: g.val()
                }), i.push({name: c + ".x", value: s.clk_x}, {name: c + ".y", value: s.clk_y}))
            }
            return i
        }, e.fn.formSerialize = function (t) {
            return e.param(this.formToArray(t))
        }, e.fn.fieldSerialize = function (t) {
            var n = [];
            return this.each(function () {
                var r = this.name;
                if (!r)return;
                var i = e.fieldValue(this, t);
                if (i && i.constructor == Array)for (var s = 0, o = i.length; s < o; s++)n.push({
                    name: r,
                    value: i[s]
                }); else i !== null && typeof i != "undefined" && n.push({name: this.name, value: i})
            }), e.param(n)
        }, e.fn.fieldValue = function (t) {
            for (var n = [], r = 0, i = this.length; r < i; r++) {
                var s = this[r], o = e.fieldValue(s, t);
                if (o === null || typeof o == "undefined" || o.constructor == Array && !o.length)continue;
                o.constructor == Array ? e.merge(n, o) : n.push(o)
            }
            return n
        }, e.fieldValue = function (t, n) {
            var r = t.name, i = t.type, s = t.tagName.toLowerCase();
            n === undefined && (n = !0);
            if (n && (!r || t.disabled || i == "reset" || i == "button" || (i == "checkbox" || i == "radio") && !t.checked || (i == "submit" || i == "image") && t.form && t.form.clk != t || s == "select" && t.selectedIndex == -1))return null;
            if (s == "select") {
                var o = t.selectedIndex;
                if (o < 0)return null;
                var u = [], a = t.options, f = i == "select-one", l = f ? o + 1 : a.length;
                for (var c = f ? o : 0; c < l; c++) {
                    var h = a[c];
                    if (h.selected) {
                        var p = h.value;
                        p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text : h.value);
                        if (f)return p;
                        u.push(p)
                    }
                }
                return u
            }
            return e(t).val()
        }, e.fn.clearForm = function (t) {
            return this.each(function () {
                e("input,select,textarea", this).clearFields(t)
            })
        }, e.fn.clearFields = e.fn.clearInputs = function (t) {
            var n = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var r = this.type, i = this.tagName.toLowerCase();
                n.test(r) || i == "textarea" ? this.value = "" : r == "checkbox" || r == "radio" ? this.checked = !1 : i == "select" ? this.selectedIndex = -1 : r == "file" ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(r) || typeof t == "string" && e(this).is(t)) && (this.value = "")
            })
        }, e.fn.resetForm = function () {
            return this.each(function () {
                (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) && this.reset()
            })
        }, e.fn.enable = function (e) {
            return e === undefined && (e = !0), this.each(function () {
                this.disabled = !e
            })
        }, e.fn.selected = function (t) {
            return t === undefined && (t = !0), this.each(function () {
                var n = this.type;
                if (n == "checkbox" || n == "radio")this.checked = t; else if (this.tagName.toLowerCase() == "option") {
                    var r = e(this).parent("select");
                    t && r[0] && r[0].type == "select-one" && r.find("option").selected(!1), this.selected = t
                }
            })
        }, e.fn.ajaxSubmit.debug = !1
    })
    return jQuery.noConflict(true);
});


define("lib/json", function (require, exports, module) {
    typeof JSON != "object" && (JSON = {}), function () {
        "use strict";
        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap, u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case"string":
                    return quote(a);
                case"number":
                    return isFinite(a) ? String(a) : "null";
                case"boolean":
                case"null":
                    return String(a);
                case"object":
                    if (!a)return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1)u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1)typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else for (r in a)Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }

        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var cx, escapable, gap, indent, meta, rep;
        typeof JSON.stringify != "function" && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function (e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")for (r = 0; r < n; r += 1)indent += " "; else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return str("", {"": e});
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")for (n in i)Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }

            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }()
    return JSON;
})


define("module/cgi", function (require) {

    var CGI =
    {
        'getDiscoveryList': 'http://<%=domain%>/api/discovery/list2',//获取笔记列表
        'getDiscoveryTopics': 'http://<%=domain%>/api/discovery/topics',//获取笔记所有主题
        'follow': 'http://<%=domain%>/api/discovery/like',//关注
        'unfollow': 'http://<%=domain%>/api/discovery/dislike',//取消关注
        'uploadImage': 'http://<%=domain%>/api/upload_image',//上传图片
        'createDiscovery': 'http://<%=domain%>/api/discovery/create',//创建笔记
        'getDisCoveryDetail': 'http://<%=domain%>/api/discovery/item',//获取笔记详情
        'getComment': 'http://<%=domain%>/api/discovery/get_comment',//获取评论
        'saveComment': 'http://<%=domain%>/api/discovery/save_comment',//保存评论
        'deleteComment': 'http://<%=domain%>/api/discovery/delete_comment',//删除评论
        'reportToTeam': 'http://<%=domain%>/api/discovery/usr/report',//举报
        'resetPassword': 'http://<%=domain%>/api/s1/seller/reset_password',//重置密码
        'getAllRankData': 'http://<%=domain%>/api/topranking/data',//获取总榜排名数据
        'addCart': 'http://<%=domain%>/api/shopping_cart/add',//添加购物车商品
        'getCart': 'http://<%=domain%>/api/shopping_cart/get',//获取购物车商品信息
        'getTransPrice': 'http://<%=domain%>/api/order/trans_price',//获取运费数量
        'removeCart': 'http://<%=domain%>/api/shopping_cart/remove',//删除购物车商品
        'addCart': 'http://<%=domain%>/api/shopping_cart/add',//添加购物车商品
        'editCart2': 'http://<%=domain%>/api/shopping_cart/edit2',//编辑购物车商品
        'orderGet': 'http://<%=domain%>/api/order/user_info/get',//获取用户订单的地址信息
        'orderSave': 'http://<%=domain%>/api/order/user_info/save',//保存用户订单填的地址等信息
        'order': 'http://<%=domain%>/api/order/create',//提交订单
        'getZoneData': 'http://<%=domain%>/api/zone'//获取省市区地址数据
    };

    var Domain = location.host;

    var uid = new Date().getTime();
    var CgiGet = {
        get: function (cgi, params, cache, domain) {
            var url = [CGI[cgi].replace('<%=domain%>', domain || Domain)];
            if (!url) {
                throw new Error('Cgi：' + cgi + ' 不存在');
                return;
            }
            if (cgi.indexOf('?') === -1) {
                url.push('?');
            }
            if (typeof params == 'string') {
                url.push(params);
            }
            else if (typeof params == 'object') {
                for (var key in params) {
                    url.push('&' + key + '=' + params[key]);
                }
            }
            if (!cache) {
                url.push('&_r=' + (++uid));
            }
            return url.join('');
        }
    };
    return CgiGet;

});


define("module/cookie", function () {

    var dateAdd = function (date, interval, num) {
        switch (interval) {
            case 'y':
                date.setFullYear(date.getFullYear() + num);
                break;
            case 'q':
                date.setMonth(date.getMonth() + (num * 3));
                break;
            case 'n':
                date.setMonth(date.getMonth() + num);
                break;
            case 'd':
                date.setDate(date.getDate() + num);
                break;
            case 'w':
                date.setDate(date.getDate() + (num * 7));
                break;
            case 'h':
                date.setHours(date.getHours() + num);
                break;
            case 'm':
                date.setMinutes(date.getMinutes() + num);
                break;
            case 's':
                date.setSeconds(date.getSeconds() + num);
                break;
            case 'i':
                date.setMilliseconds(date.getMilliseconds() + num);
                break;
            default:
                date.setMilliseconds(date.getMilliseconds() + num);
                break;
        }
        return date;
    }

    return {
        set: function (key, value, domain, path, expires) {
            var args = arguments;
            var size = args.length;
            var date = new Date();
            domain = domain || "3366.com";
            path = path || "/";
            expires = dateAdd(date, 'i', expires || 0).toGMTString();
            switch (size) {
                case 2:
                    document.cookie = key + "=" + encodeURIComponent(value) + "; path=/;";
                    break;
                case 3:
                    document.cookie = key + "=" + encodeURIComponent(value) + "; path=/; domain=" + domain;
                    break;
                case 4:
                    document.cookie = key + "=" + encodeURIComponent(value) + "; path=" + path + "; domain=" + domain;
                    break;
                case 5:
                    document.cookie = key + "=" + encodeURIComponent(value) + "; path=" + path + "; domain=" + domain + "; expires=" + expires;
                    break;
                default:
                    throw new Error("设置cookie时参数错误！");
            }
        },
        get: function (key) {
            var _cookie = document.cookie;
            var items = _cookie.split("; ");
            var item = [];
            var size = items.length;
            for (var i = 0; i < size; i++) {
                item = items[i].split("=");
                if (key == item[0] && item.length == 2) {
                    return decodeURIComponent(item[1]);
                }
            }
            return "";
        },
        remove: function (key, domain, path) {
            this.set(key, "", domain, path, -1);
        }
    }
});


define("module/user", function (require) {
    var $ = require('lib/jquery');
    var User = {
        dialog: null,
        nick: null,
        info: {},
        heads: {},
        lastCheckLoginTime: 0,
        checkLoginInfo: null,
        getInfoCallbackQueue: [],
        checkLoginCallbackQueue: [],
        getNick: function () {
        },
        trunkNick: function (limitLength, nick) {
            var nick = nick || this.getNick();
            var len = nick.length;
            var length = 0;
            var i = 0
            for (; i < len && length <= limitLength; i++) {
                if (nick.charAt(i).match(/[^\x00-\xff]/ig) != null) {
                    length += 2;
                }
                else {
                    length += 1;
                }
            }

            if (length > limitLength) {
                nick = nick.substring(0, i - 1) + "...";
            }
            return nick;
        },
        isLogin: function () {
            var status = $('#login_status').text();
            if (status === '1' || status === 1) {
                return true;
            }
            ;
            return false;
        },
        checkLogin: function (callback, useCache) {

        },
        login: function () {

            if (this.dialog) {
                this.dialog.open();
                return;
            }
            var _this = this;
            require.async('ui/widget/dialog', function (Dialog) {
                _this.dialog = new Dialog({
                    'template': '<div id="<%=id%>" class="login-dialog png_bg">\
								<div class="login-dialog-close"><a href="javascript:void" class="png_bg" id="<%=id%>_close"></a></div>\
								<div class="login-dialog-logo"><a class="png_bg"></a></div>\
								<div class="login-dialog-desc">\
									<div class="login-dialog-line"></div>\
									<div class="login-dialog-text">登录</div>\
									<div class="login-dialog-line"></div>\
									<div class="clear"></div>\
								</div>\
								<div class="login-dialog-btn">\
									<a href="javascript:void" class="login-dialog-weibo png_bg j_login_btn" d-type="weibo"></a>\
									<a href="javascript:void" class="login-dialog-qq png_bg j_login_btn" d-type="qq"></a>\
									<div class="clear"></div>\
								</div>\
							</div>',
                    'animation': 'fade',
                    'destroyWhenClosed': false,
                    'onCreated': function () {
                        $('.j_login_btn').bind('click', function () {
                            var type = $(this).attr('d-type');
                            window.location.href = '/login/' + type + '?backurl=' + encodeURIComponent(window.location.href);
                            return false;
                        });
                    }
                });
                _this.dialog.open();
            });
        },
        logout: function (redirect) {

            $(window).trigger('logout');
        },
        clearUserCookie: function () {

        },
        getInfo: function (uin, params, callback) {
            var _this = this,
                query = {};
            if (this.getInfoProcessing) {
                this.getInfoCallbackQueue.push(function () {
                    _this.getInfo(uin, params, callback);
                });
                return;
            }
            this.getInfoProcessing = true;

        },
        getHeads: function (uins, callback) {

        }
    }
    return User;
});


define("module/util", function (require) {
    var Cookie = require('module/cookie');
    var $ = require('lib/jquery');
    var Util = {
        escapeHTML: function (str) {
            return str.replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        },
        unescapeHTML: function (str) {
            return str.replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
        },
        getImageUrl: function (url) {
            var href = location.href;
            if (href.indexOf('www.wgmsm.com') > -1 || href.indexOf('localhost') > -1) {
                return url;
            }
            ;
            url.replace('www.wgmsm.com', 'www.wgmsm.com');
            if (url.indexOf('http://') == -1) {
                url = 'http://www.wgmsm.com' + url;
            }
            ;
            return url;
        },
        getParam: function (key, type) {
            var type = type || 'search', str, arr;
            switch (type) {
                case 'hash':
                    str = location.hash.replace(/^#/, '');
                    break;
                case 'search':
                    str = location.search.replace(/^\?/, '');
                    break;
            }
            if (str == '') {
                return null;
            }
            arr = str.split('&');
            for (var i = 0, l = arr.length, tmp; i < l; i++) {
                tmp = arr[i].split('=');
                if (tmp[0] == key) {
                    return tmp[1];
                }
            }
        },
        toUnicode: function (str) {
            return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
        },
        toGB2312: function (str) {
            return unescape(str.replace(/\\u/gi, '%u'));
        },

        formatTime: function (time, type) {
            var mGap = 60, hGap = 60 * 60, dGap = 24 * 3600, wGap = 7 * 24 * 3600;
            var str = '还剩';
            type = type || 1;
            if (type == 1) {//还剩下多少时间
                time = Math.ceil(time / 1000);
                do {
                    if (time >= dGap) {
                        str += (parseInt(time / dGap, 10) + '天');
                        time = time % dGap;
                    } else if (time >= hGap) {
                        str += (parseInt(time / hGap, 10) + '时');
                        time = time % hGap;
                    } else if (time >= mGap) {
                        str += (parseInt(time / mGap, 10) + '分');
                        time = time % mGap;
                        if (time == 0) {
                            str += '0秒';
                            break;
                        }
                        ;
                    } else {
                        str += (parseInt(time, 10) + '秒');
                        break;
                    }
                    if (time == 0) {
                        break;
                    }
                    ;
                } while (true);
            } else if (type == 2) {//发布多长时间
                time = Math.ceil(time / 1000);
                if (time < mGap) {
                    str = time + '秒前';
                } else if (time < hGap) {
                    str = parseInt(time / mGap, 10) + '分钟前';
                } else if (time < dGap) {
                    str = parseInt(time / hGap, 10) + '小时前';
                } else if (time < wGap) {
                    str = parseInt(time / dGap, 10) + '天前';
                } else {
                    str = parseInt(time / wGap, 10) + '周前';
                }
            } else if (type == 3) {//购物车，没有小时，只有分钟和秒数
                str = '';
                time = Math.ceil(time / 1000);
                do {
                    if (time >= mGap) {
                        t = parseInt(time / mGap, 10);
                        if (t < 10) {
                            t = '0' + t;
                        }
                        ;
                        str += (t + ':');
                        time = time % mGap;
                        if (time == 0) {
                            str += '00';
                            break;
                        }
                        ;
                    } else {
                        t = parseInt(time, 10);
                        if (t < 10) {
                            t = '0' + t;
                        }
                        ;
                        str += t;
                        break;
                    }
                } while (true);
                var arr = str.split(':');
                if (arr.length == 1) {
                    arr.unshift('00');
                }
                str = arr.join(':');
            } else {//烦死了，返回json，自己拼吧
                var result = {};
                str = '';
                time = Math.ceil(time / 1000);
                do {
                    if (time >= hGap) {
                        t = parseInt(time / hGap, 10);
                        if (t < 10) {
                            t = '0' + t;
                        }
                        ;
                        result.hour = t;
                        time = time % hGap;
                        if (time == 0) {
                            result.minute = '00';
                            result.second = '00';
                            break;
                        }
                        ;
                    } else if (time >= mGap) {
                        t = parseInt(time / mGap, 10);
                        if (t < 10) {
                            t = '0' + t;
                        }
                        ;
                        result.minute = t;
                        time = time % mGap;
                        if (time == 0) {
                            result.second = '00';
                            break;
                        }
                        ;
                    } else {
                        t = parseInt(time, 10);
                        if (t < 10) {
                            t = '0' + t;
                        }
                        ;
                        result.second = t;
                        break;
                    }
                } while (true);
                !result.hour ? (result.hour = '00') : '';
                !result.minute ? (result.minute = '00') : '';
                !result.second ? (result.second = '00') : '';
                return result;
            }
            return str;
        },
        convertContent: function (str, style, type) {
            var arr = [',', '.', '?', '!', '，', '。', '？', '！', '\n', '\r', '\r\n', '～', '~'], indexArr = [];
            for (var i = 0; i < arr.length; i++) {
                indexArr.push(str.indexOf(arr[i]));
            }
            ;
            indexArr.sort(function (a, b) {
                return a - b;
            });
            var index;
            for (var i = 0; i < indexArr.length; i++) {
                if (indexArr[i] == -1) {
                    continue;
                }
                ;
                index = indexArr[i];
                break;
            }
            ;
            var title = str.slice(0, index + 1), cont = str.slice(index + 1);
            cont = cont.replace(/\\n/g, '<br/>');
            cont = cont.replace(/\n/g, '<br/>');
            cont = cont.replace(/\r\n/g, '<br/>');
            cont = cont.replace(/\s/g, '&nbsp;');
            cont = cont.replace(/^(<br\/>)*/, '');//去掉开头的换行符
            style = style || 'font-size:13px;line-height:18px;color:#636363';
            type = type || 'html';
            if (type == 'json') {
                return {
                    title: title,
                    cont: cont
                }
            }
            return '<p style=' + style + '><span style="color:#f15467;">' + title + '</span>' + cont + '</p>';
        }
    };

    return Util;
});


define("util/ajax", function (require) {
    var $ = require('lib/jquery');
    var Ajax = {
        post: function (options) {
            var param = {};
            param.url = options.url;
            param.data = options.data || {};
            param.type = "POST",
                param.dataType = options.dataType || 'json';
            param.error = options.error || options.fail || function () {
                };
            param.success = options.success || function () {
                };
            $.ajax(param);
        },
        get: function (options) {
            var param = {};
            param.url = options.url;
            param.data = options.data || {};
            param.type = "GET",
                param.dataType = options.dataType || 'json';
            param.error = options.error || options.fail || function () {
                };
            param.success = options.success || function () {
                };
            $.ajax(param);
        },
        getScript: function (src, callback) //async 是不异步
        {
            var start = new Date().getTime();
            $.getScript(src, function () {
                var delay = new Date().getTime() - start;
                callback && callback();
            });
        },
        jsonp: function (src, data, callback) {
            $.ajax({
                url: src,
                data: data,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: callback
            });
        }
    };
    return Ajax;
});


define("util/browser", function (require, exports, module) {
    var Browser = module.exports = {};

    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject)
        Browser.ie = ua.match(/msie ([\d.]+)/)[1]
    else if (ua.indexOf('firefox') > -1)
        Browser.firefox = ua.match(/firefox\/([\d.]+)/)[1]
    else if (ua.match(/chrome\/([\d.]+)/))
        Browser.chrome = ua.match(/chrome\/([\d.]+)/)[1]
    else if (window.opera)
        Browser.opera = ua.match(/opera.([\d.]+)/)[1]
    else if (window.openDatabase)
        Browser.safari = ua.match(/version\/([\d.]+)/)[1];
});


define("ui/template", function () {

    var cache = {};

    var tmpl = function (str, data) {


        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :


            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                "with(obj){p.push('" +

                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        return data ? fn(data) : fn;
    };

    return {
        parse: tmpl
    }
});


define("ui/widget/dialog", function (require) {

    var $ = require('lib/jquery');
    var Util = require('module/util');
    var template = require('ui/template');

    var uid = 0;
    var Dialog = function (options) {
        this.id = 'dialog_' + (++uid);
        this.dom = null;
        this.mask = null;
        this.timer = null;
        this.options = $.extend({
                title: '提示',
                toolbar: '',
                footer: '',
                content: '',
                submitButtonText: '确定',
                cancelButtonText: '取消',
                dragable: true,
                destroyWhenClosed: true,
                autoClose: false,
                autoCloseDelay: 1500,
                useModal: true,
                closeAfterSubmit: true,
                showCloseButton: true,
                showSubmitButton: true,
                showCancelButton: true,
                showHeader: true,
                showFooter: true,
                onCreated: function () {
                },
                onOpened: function () {
                },
                onClosed: function () {
                },
                onDestroyed: function () {
                },
                onSubmitted: function () {
                },
                onCanceled: function () {
                },
                onCoverClicked: function () {
                },
                width: '570px',
                height: '302px',
                zIndex: 5000,
                mainStyle: 'popup_msg',
                template: Dialog.template,
                autoPosit: true,
                left: '25%',
                top: '25%',
                animation: null,
                maskStyle: {}
            },
            options || {});

        Dialog.instances[this.id] = this;
    }
    Dialog.prototype = {
        create: function () {
            var _this = this;
            var tplData = {};
            tplData.id = this.id;
            tplData.showHeader = this.options.showHeader ? '' : 'display:none;';
            tplData.showFooter = this.options.showFooter ? '' : 'display:none;';
            tplData.showCloseButton = this.options.showCloseButton ? '' : 'display:none;';
            tplData.showSubmitButton = this.options.showSubmitButton ? '' : 'display:none;';
            tplData.showCancelButton = this.options.showCancelButton ? '' : 'display:none;';
            tplData.footer = this.options.footer ? this.options.footer : '';
            tplData.content = this.options.content.replace('<%=dialogId%>', this.id);
            tplData.getImageUrl = Util.getImageUrl;
            tplData.mainStyle = this.options.mainStyle;
            tplData = $.extend(this.options, tplData);
            if (this.options.useModal) {
                this.mask = new Dialog.Mask($.extend({
                    zIndex: this.options.zIndex - 1,
                    target: this.options.maskTarget
                }, this.options.maskStyle));
                this.mask.create();
                $(this.mask.dom).click(function () {
                    _this.options.onCoverClicked.call(_this);
                });
            }
            var dialog = template.parse(this.options.template, tplData);
            $(document.body).append(dialog);
            this.dom = $('#' + this.id).get(0);
            $('#' + this.id + '_close').click(function () {
                _this.close();
                return false;
            });
            $('#' + this.id + '_submit').click(function () {
                if (_this.options.onSubmitted.call(_this) || _this.options.closeAfterSubmit) {
                    _this.close();
                }
                return false;
            });
            $('#' + this.id + '_cancel').click(function () {
                _this.options.onCanceled.call(_this);
                _this.close();
                return false;
            });
            if (this.options.dragable) {
            }
            this.options.onCreated.call(this);
        },
        open: function () {
            if (this.dom == null) {
                this.create();
            }
            if (this.options.autoPosit) {
                this.setPosition();
            }
            var animation = this.options.animation;
            switch (animation) {
                case 'fade':
                    $(this.dom).fadeIn();
                    break;
                case 'slide':
                    $(this.dom).slideDown();
                    break;
                default:
                    $(this.dom).show();
                    break;
            }
            var _this = this;
            if (this.options.autoClose) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(function () {
                        _this.close();
                    },
                    this.options.autoCloseDelay);
            }
            if (this.mask) {
                this.mask.show();
            }
            this.options.onOpened.call(this);
        },
        close: function () {
            var animation = this.options.animation;
            switch (animation) {
                case 'fade':
                    $(this.dom).fadeOut();
                    break;
                case 'slide':
                    $(this.dom).slideUp();
                    break;
                default:
                    $(this.dom).hide();
                    break;
            }
            if (this.mask) {
                this.mask.hide();
            }
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            if (this.options && this.options.onClosed) {
                this.options.onClosed.call(this);
            }
            if (this.options && this.options.destroyWhenClosed) {
                var _this = this;
                setTimeout(function () {
                        _this.destroy();
                    },
                    10);
            }
        },
        resize: function (size, resizeContent) {
            if (resizeContent) {
                var target = $('.popup_bd', this.dom);
            } else {
                var target = $(this.dom);
            }
            if (size.width) {
                target.css({
                    'width': size.width
                });
            }
            if (size.height) {
                target.css({
                    'height': size.height
                })
            }
        },
        changeButtonText: function (type, text) {
            switch (type) {
                case 'submit':
                    var btn = $('#' + this.id + '_submit').get(0);
                    break;
                case 'cancel':
                    var btn = $('#' + this.id + '_cancel').get(0);
                    break;
            }
            btn.innerHTML = text;
        },
        setPosition: function () {
            if (!this.options.autoPosit) {
                return;
            }
            var topPos = $(document).scrollTop() || 0,
                wh = $(window).height(),
                dh = $(this.dom).height(),
                top,
                win = window;
            if (topPos < 0) {
                topPos = 0;
            }
            if (wh < dh) {//dom太长
                if (topPos <= (dh - wh)) {
                    top = topPos;
                } else {
                    top = topPos - (dh - wh);
                }
            } else {
                top = Math.floor((wh - dh) / 2) + topPos;
            }
            $(this.dom).css({
                left: Math.floor(($(window).width() - $(this.dom).width()) / 2) + 'px',
                top: top + 'px'
            });
        },
        onWindowResized: function () {
            this.setPosition();
            if (this.mask) {
                this.mask.onWindowResized();
            }
        },
        onWindowScroll: function () {
            if (this.mask) {
                this.mask.onWindowResized();
            }
            ;
        },
        cancelAutoClose: function () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        restoreAutoClose: function () {
            var _this = this;
            this.timer = setTimeout(function () {
                _this.close();
            }, this.options.autoCloseDelay);
        },
        destroy: function () {
            try {
                $(this.dom).remove();
                if (this.mask) {
                    this.mask.destroy();
                }
                this.options.onDestroyed.call(this);
                this.dom = null;
                this.options = null;
                Dialog.instances[this.id] = null;
                delete Dialog.instances[this.id];
            } catch (_) {
            }
        }
    };

    Dialog.template = '<div id="<%=id%>" style="position: absolute; visibility: visible; display: block; z-index: <%=zIndex%>;width:<%=width%>;">\
                            <div class="mgp-dialog <%=mainStyle%>">\
                                <div class="mgp-dialog-close" style="<%=showCloseButton%>"><a id="<%=id%>_close" href="javascript:void(0)"></a></div>\
                                <div class="mgp-dialog-title" style="<%=showHeader%>"><%=title%></div>\
                                <div class="mgp-dialog-content"><%=content%></div>\
                                <div class="mgp-dialog-footer" style="<%=showFooter%>">\
                                    <a style="<%=showCancelButton%>" href="javascript:void(0)" class="mgp-dialog-cancel" id="<%=id%>_cancel"><%=cancelButtonText%></a>\
                                    <a style="<%=showSubmitButton%>" href="javascript:void(0)" class="mgp-dialog-submit" id="<%=id%>_submit"><%=submitButtonText%></a>\
                                </div>\
                            </div>\
                        </div>';

    Dialog.contentTemplate = '<div class="mgp-dialog-text"><%=content%></div>';

    Dialog.instances = {};


    Dialog.confirm = function (options) {
        var options = $.extend({}, options);
        options.content = template.parse(Dialog.contentTemplate, {content: options.content || ''});
        options.zIndex = options.zIndex || 11000;
        var dialog = new Dialog(options);
        dialog.open();
        return dialog;
    };
    Dialog.notice = function (options) {
        var options = $.extend({
            type: 'warning',
            showCancelButton: false
        }, options);
        options.content = template.parse(Dialog.contentTemplate, {content: options.content || ''});
        options.zIndex = options.zIndex || 11000;
        var dialog = new Dialog(options);
        dialog.open();
        return dialog;
    }
    Dialog.close = function (id) {
        if (id) {
            Dialog.instances[id].close();
        } else {
            for (var ins in Dialog.instances) {
                Dialog.instances[ins].close();
            }
        }
    }
    Dialog.destroy = function () {
        for (var ins in Dialog.instances) {
            try {
                Dialog.instances[ins].destroy();
            } catch (ex) {
            }
        }
        Dialog.instances = null;
    }
    Dialog.Mask = function (options) {
        this.options = $.extend({
                target: document.body,
                zIndex: 990,
                opacity: 0.5
            },
            options || {});
        this.dom = null;
    }
    Dialog.Mask.prototype = {
        create: function () {

            var width = $(this.options.target).get(0).scrollWidth,
                height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
                zIndex = this.options.zIndex,
                opacity = this.options.opacity;
            this.dom = document.createElement('div');
            document.body.appendChild(this.dom);
            $(this.dom).css({
                'position': 'absolute',
                'zIndex': zIndex,
                'left': 0,
                'top': 0,
                'width': width + 'px',
                'height': height + 'px',
                'display': 'none'
            });
            $(this.dom).append('<div style="position:absolute; left:0; top:0; width:' + width + 'px;height:' + height + 'px; background:#000000;z-index:' + zIndex + ';opacity:' + opacity + '; filter:alpha(opacity=' + (opacity * 100) + ');-moz-opacity:' + opacity + ';"></div>');
        },
        show: function () {
            if (!this.dom) {
                this.create();
            }
            $(this.dom).show();
        },
        hide: function () {
            $(this.dom).hide();
        },
        onWindowResized: function () {
            var width = $(this.options.target).get(0).scrollWidth,
                height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            $(this.dom).css({
                'width': width + 'px',
                'height': height + 'px'
            });
            $(this.dom).find('div').css({
                'width': width + 'px',
                'height': height + 'px'
            });
            $(this.dom).find('iframe').css({
                'width': width + 'px',
                'height': height + 'px'
            });
            $(this.dom).find('img').css({
                'width': width + 'px',
                'height': height + 'px'
            });
        },
        destroy: function () {
            $(this.dom).remove();
            this.dom = null;
            this.options = null;
        }
    }

    Dialog.onWindowResized = function () {
        for (var id in Dialog.instances) {
            try {
                Dialog.instances[id].onWindowResized();
            } catch (_) {
            }
        }
    }
    Dialog.onWindowScroll = function () {
        for (var id in Dialog.instances) {
            try {
                Dialog.instances[id].onWindowScroll();
            } catch (_) {
            }
        }
    }

    $(window).bind('windowResize', function () {
        Dialog.onWindowResized();
    });
    $(window).bind('windowScroll', function () {
        Dialog.onWindowScroll();
    });

    (function () {
        var timer = null;
        $(window).resize(function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                $(window).trigger('windowResize');
                timer = null;
            }, 100);
        });
        $(window).scroll(function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                $(window).trigger('windowScroll');
                timer = null;
            }, 200);
        });
    })();

    return Dialog;

});


define("ui/widget/imglazyload", function (require) {
    var $ = require('lib/jquery');
    var Util = require('module/util');

    var ImgsAry = [];
    var container = '';

    function Handler() {
        var CurWinTop = $(container).height() + $(container).scrollTop();
        for (var i = 0; i < ImgsAry.length; i++) {
            var e = ImgsAry[i];
            if (e.top < CurWinTop) {
                $(e).css('background-color', '');
                $(e).find("img[lz_src]").each(function () {
                    var img = $(this), lz_src = img.attr("lz_src");
                    img.attr("src", lz_src);
                    img.removeClass(Imglazyload.myoptions.className);
                    img.removeAttr('lz_src');
                    img.fadeIn();
                });
                ImgsAry.splice(i, 1);
                i--;
                if (ImgsAry.length <= 0) {
                    $(container).unbind('scroll resize', Handler);
                }
            }
        }
    }

    var Imglazyload = {
        myoptions: {
            "className": ".j_lazyload",
            "threshold": 100,
            'container': ''
        },
        show: function (lzoptions) {
            $.extend(this.myoptions, lzoptions);
            var _this = this;
            if (this.myoptions.container) {
                container = this.myoptions.container;
                var imgs = $(container).find(this.myoptions.className);
            }
            else {
                container = window;
                var imgs = $(document.body).find(this.myoptions.className);
            }
            if (imgs.length) {
                imgs.each(function (i, e) {
                    if (e.inited) {
                        return
                    }
                    ;
                    e.inited = true;
                    if (_this.myoptions.container) {
                        e.top = $(e).offset().top - $(container).offset().top - Imglazyload.myoptions.threshold;
                    }
                    else {
                        e.top = $(e).offset().top - Imglazyload.myoptions.threshold;
                    }
                    $(e).css('background-color', '#ebebeb');
                    $(e).find("img[lz_src]").hide();
                    ImgsAry.push(e);
                });
                Imglazyload.init();
            }
        },
        init: function () {
            Handler();
            $(container).bind('scroll resize', Handler);
        }
    };
    return Imglazyload;
});


define("ui/widget/zoompic", 'ui/widget/zoompic', function (require, exports, module) {
    var $ = require('lib/jquery'),
        undefined;

    function ZoomPic() {
        this.initialize.apply(this, arguments)
    }

    ZoomPic.prototype =
    {
        initialize: function (id) {
            var _this = this;
            this.wrap = typeof id === "string" ? document.getElementById(id) : id;
            this.oUl = this.wrap.getElementsByTagName("ul")[0];
            this.aLi = this.wrap.getElementsByTagName("li");
            this.prev = $(this.wrap).find('.j_prev')[0]
            this.next = $(this.wrap).find('.j_next')[0]
            this.timer = null;
            this.aSort = [];
            this.iCenter = 2;
            this._doPrev = function () {
                return _this.doPrev.apply(_this)
            };
            this._doNext = function () {
                return _this.doNext.apply(_this)
            };
            this.options = [
                {width: 202, height: 316, top: 42, left: 108, zIndex: 1},
                {width: 242, height: 373, top: 13, left: 286, zIndex: 2},
                {width: 256, height: 400, top: 0, left: 504, zIndex: 3},
                {width: 242, height: 373, top: 13, left: 740, zIndex: 2},
                {width: 202, height: 316, top: 42, left: 960, zIndex: 1},
            ];
            for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];

            this.setUp();
            this.addEvent(this.prev, "click", this._doPrev);
            this.addEvent(this.next, "click", this._doNext);
            this.doImgClick();
            this.timer = setInterval(function () {
                _this.doNext()
            }, 3000);
            this.wrap.onmouseover = function () {
                clearInterval(_this.timer)
            };
            this.wrap.onmouseout = function () {
                _this.timer = setInterval(function () {
                    _this.doNext()
                }, 3000);
            }
        },
        doPrev: function () {
            this.aSort.unshift(this.aSort.pop());
            this.setUp()
        },
        doNext: function () {
            this.aSort.push(this.aSort.shift());
            this.setUp()
        },
        doImgClick: function () {
            var _this = this;
            for (var i = 0; i < this.aSort.length; i++) {
                this.aSort[i].onclick = function () {
                    if (this.index > _this.iCenter) {
                        for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
                        _this.setUp()
                    }
                    else if (this.index < _this.iCenter) {
                        for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
                        _this.setUp()
                    }
                }
            }
        },
        setUp: function () {
            var _this = this;
            var i = 0;
            for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
            for (i = 0; i < this.aSort.length; i++) {
                this.aSort[i].index = i;
                if (i < 5) {
                    $(this.aSort[i]).show()
                    this.doMove(this.aSort[i], this.options[i], function () {
                        _this.timer = setInterval(function () {
                            _this.doNext()
                        }, 3000);
                    });
                }
                else {
                    $(this.aSort[i]).css({
                        'display': 'none',
                        'width': 0,
                        'height': 0,
                        'top': 37,
                        'left': this.oUl.offsetWidth / 2
                    })
                }
            }
        },
        addEvent: function (oElement, sEventType, fnHandler) {
            return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
        },
        css: function (oElement, attr, value) {
            if (arguments.length == 2) {
                return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
            }
            else if (arguments.length == 3) {
                switch (attr) {
                    case "width":
                    case "height":
                    case "top":
                    case "left":
                    case "bottom":
                        oElement.style[attr] = value + "px";
                        break;
                    case "opacity" :
                        oElement.style.filter = "alpha(opacity=" + value + ")";
                        oElement.style.opacity = value / 100;
                        break;
                    default :
                        oElement.style[attr] = value;
                        break
                }
            }
        },
        doMove: function (oElement, oAttr, fnCallBack) {
            clearInterval(this.timer)
            var _this = this;
            (function (oElement, oAttr) {
                $(oElement).animate({
                    'width': oAttr['width'] + 'px', 'height': oAttr['height'] + 'px', 'top': oAttr['top'] + 'px',
                    'left': oAttr['left'] + 'px', 'zIndex': oAttr['zIndex']
                }, {
                    'speed': 'fast', 'easing': 'swing', 'callback': function () {
                        fnCallBack && fnCallBack()
                    }
                })
            })(oElement, oAttr)
        }
    };
    module.exports = ZoomPic
});


define("ui/page/site", function (require, exports, module) {
    var $ = require('lib/jquery'),
        Browser = require('util/browser'),
        User = require('module/user'),
        undefined;
    var site = module.exports = {};

    function initEvent() {
        $('.j_login').bind('click', function () {
            User.login();
            return false;
        });
        $('.j_and_download').bind('click', function () {
            var url = $(this).attr('href')
            require.async('ui/page/common/download', function (download) {
                download.show(url);
            });
            return false;
        });
    }

    site.init = function () {
        if (Browser.ie == '6.0') {
            require.async('ui/page/ie6', function (ie6) {
                ie6.fixBgGrayBug('.png_bg');
            });
        }
        initEvent();
    }
});


define("ui/page/ie6", function (require, exports, module) {
    var $ = require('lib/jquery'),
        undefined;
    var IE6 = module.exports = {};
    IE6.fixBgGrayBug = function (container) {
        $('img').each(function (index, item) {
            var src = $(item).attr('src');
            src && $(item).attr('src', src.substring(0, src.indexOf('?')));
        });
        container = container || '.png_bg';
        window.DD_belatedPNG && window.DD_belatedPNG.fix(container);
    };
});
