// Version 1.13.2 sunburst-chart - https://github.com/vasturiano/sunburst-chart
! function (t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Sunburst = n()
}(this, (function () {
    "use strict";
    ! function (t, n) {
        void 0 === n && (n = {});
        var e = n.insertAt;
        if (t && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0],
                i = document.createElement("style");
            i.type = "text/css", "top" === e && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t))
        }
    }(".sunburst-viz .slice path {\n  cursor: pointer;\n}\n\n.sunburst-viz text {\n  font-family: sans-serif;\n  font-size: 12px;\n  dominant-baseline: middle;\n  text-anchor: middle;\n  pointer-events: none;\n  fill: #222;\n}\n\n.sunburst-viz .text-contour {\n  fill: none;\n  stroke: white;\n  stroke-width: 5;\n  stroke-linejoin: 'round';\n}\n\n.sunburst-viz .main-arc {\n  stroke-width: 1px;\n  transition: opacity .4s;\n}\n\n.sunburst-viz .main-arc:hover {\n  opacity: 0.85;\n  transition: opacity .05s;\n}\n\n.sunburst-viz .hidden-arc {\n  fill: none;\n}\n\n.sunburst-viz {\n  position: relative;\n}\n\n.sunburst-tooltip {\n  display: none;\n  position: absolute;\n  max-width: 320px;\n  white-space: nowrap;\n  padding: 5px;\n  border-radius: 3px;\n  font: 12px sans-serif;\n  color: #eee;\n  background: rgba(0,0,0,0.65);\n  pointer-events: none;\n}\n\n.sunburst-tooltip .tooltip-title {\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 5px;\n}\n");
    var t = "http://www.w3.org/1999/xhtml",
        n = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: t,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };

    function e(t) {
        var e = t += "",
            r = e.indexOf(":");
        return r >= 0 && "xmlns" !== (e = t.slice(0, r)) && (t = t.slice(r + 1)), n.hasOwnProperty(e) ? {
            space: n[e],
            local: t
        } : t
    }

    function r(n) {
        return function () {
            var e = this.ownerDocument,
                r = this.namespaceURI;
            return r === t && e.documentElement.namespaceURI === t ? e.createElement(n) : e.createElementNS(r, n)
        }
    }

    function i(t) {
        return function () {
            return this.ownerDocument.createElementNS(t.space, t.local)
        }
    }

    function a(t) {
        var n = e(t);
        return (n.local ? i : r)(n)
    }

    function o() { }

    function u(t) {
        return null == t ? o : function () {
            return this.querySelector(t)
        }
    }

    function l(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t)
    }

    function s() {
        return []
    }

    function c(t) {
        return null == t ? s : function () {
            return this.querySelectorAll(t)
        }
    }

    function h(t) {
        return function () {
            return this.matches(t)
        }
    }

    function f(t) {
        return function (n) {
            return n.matches(t)
        }
    }
    var p = Array.prototype.find;

    function d() {
        return this.firstElementChild
    }
    var v = Array.prototype.filter;

    function y() {
        return this.children
    }

    function g(t) {
        return new Array(t.length)
    }

    function m(t, n) {
        this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n
    }

    function _(t) {
        return function () {
            return t
        }
    }

    function w(t, n, e, r, i, a) {
        for (var o, u = 0, l = n.length, s = a.length; u < s; ++u)(o = n[u]) ? (o.__data__ = a[u], r[u] = o) : e[u] = new m(t, a[u]);
        for (; u < l; ++u)(o = n[u]) && (i[u] = o)
    }

    function x(t, n, e, r, i, a, o) {
        var u, l, s, c = new Map,
            h = n.length,
            f = a.length,
            p = new Array(h);
        for (u = 0; u < h; ++u)(l = n[u]) && (p[u] = s = o.call(l, l.__data__, u, n) + "", c.has(s) ? i[u] = l : c.set(s, l));
        for (u = 0; u < f; ++u) s = o.call(t, a[u], u, a) + "", (l = c.get(s)) ? (r[u] = l, l.__data__ = a[u], c.delete(s)) : e[u] = new m(t, a[u]);
        for (u = 0; u < h; ++u)(l = n[u]) && c.get(p[u]) === l && (i[u] = l)
    }

    function b(t) {
        return t.__data__
    }

    function M(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }

    function A(t) {
        return function () {
            this.removeAttribute(t)
        }
    }

    function N(t) {
        return function () {
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function k(t, n) {
        return function () {
            this.setAttribute(t, n)
        }
    }

    function S(t, n) {
        return function () {
            this.setAttributeNS(t.space, t.local, n)
        }
    }

    function E(t, n) {
        return function () {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
        }
    }

    function T(t, n) {
        return function () {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
        }
    }

    function C(t) {
        return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
    }

    function P(t) {
        return function () {
            this.style.removeProperty(t)
        }
    }

    function O(t, n, e) {
        return function () {
            this.style.setProperty(t, n, e)
        }
    }

    function R(t, n, e) {
        return function () {
            var r = n.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
        }
    }

    function I(t, n) {
        return t.style.getPropertyValue(n) || C(t).getComputedStyle(t, null).getPropertyValue(n)
    }

    function j(t) {
        return function () {
            delete this[t]
        }
    }

    function q(t, n) {
        return function () {
            this[t] = n
        }
    }

    function L(t, n) {
        return function () {
            var e = n.apply(this, arguments);
            null == e ? delete this[t] : this[t] = e
        }
    }

    function z(t) {
        return t.trim().split(/^|\s+/)
    }

    function D(t) {
        return t.classList || new B(t)
    }

    function B(t) {
        this._node = t, this._names = z(t.getAttribute("class") || "")
    }

    function X(t, n) {
        for (var e = D(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
    }

    function H(t, n) {
        for (var e = D(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
    }

    function V(t) {
        return function () {
            X(this, t)
        }
    }

    function U(t) {
        return function () {
            H(this, t)
        }
    }

    function $(t, n) {
        return function () {
            (n.apply(this, arguments) ? X : H)(this, t)
        }
    }

    function Y() {
        this.textContent = ""
    }

    function F(t) {
        return function () {
            this.textContent = t
        }
    }

    function G(t) {
        return function () {
            var n = t.apply(this, arguments);
            this.textContent = null == n ? "" : n
        }
    }

    function Z() {
        this.innerHTML = ""
    }

    function W(t) {
        return function () {
            this.innerHTML = t
        }
    }

    function K(t) {
        return function () {
            var n = t.apply(this, arguments);
            this.innerHTML = null == n ? "" : n
        }
    }

    function Q() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function J() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function tt() {
        return null
    }

    function nt() {
        var t = this.parentNode;
        t && t.removeChild(this)
    }

    function et() {
        var t = this.cloneNode(!1),
            n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t
    }

    function rt() {
        var t = this.cloneNode(!0),
            n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t
    }

    function it(t) {
        return t.trim().split(/^|\s+/).map((function (t) {
            var n = "",
                e = t.indexOf(".");
            return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {
                type: t,
                name: n
            }
        }))
    }

    function at(t) {
        return function () {
            var n = this.__on;
            if (n) {
                for (var e, r = 0, i = -1, a = n.length; r < a; ++r) e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.options);
                ++i ? n.length = i : delete this.__on
            }
        }
    }

    function ot(t, n, e) {
        return function () {
            var r, i = this.__on,
                a = function (t) {
                    return function (n) {
                        t.call(this, n, this.__data__)
                    }
                }(n);
            if (i)
                for (var o = 0, u = i.length; o < u; ++o)
                    if ((r = i[o]).type === t.type && r.name === t.name) return this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = a, r.options = e), void (r.value = n);
            this.addEventListener(t.type, a, e), r = {
                type: t.type,
                name: t.name,
                value: n,
                listener: a,
                options: e
            }, i ? i.push(r) : this.__on = [r]
        }
    }

    function ut(t, n, e) {
        var r = C(t),
            i = r.CustomEvent;
        "function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i)
    }

    function lt(t, n) {
        return function () {
            return ut(this, t, n)
        }
    }

    function st(t, n) {
        return function () {
            return ut(this, t, n.apply(this, arguments))
        }
    }
    m.prototype = {
        constructor: m,
        appendChild: function (t) {
            return this._parent.insertBefore(t, this._next)
        },
        insertBefore: function (t, n) {
            return this._parent.insertBefore(t, n)
        },
        querySelector: function (t) {
            return this._parent.querySelector(t)
        },
        querySelectorAll: function (t) {
            return this._parent.querySelectorAll(t)
        }
    }, B.prototype = {
        add: function (t) {
            this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function (t) {
            var n = this._names.indexOf(t);
            n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function (t) {
            return this._names.indexOf(t) >= 0
        }
    };
    var ct = [null];

    function ht(t, n) {
        this._groups = t, this._parents = n
    }

    function ft() {
        return new ht([
            [document.documentElement]
        ], ct)
    }

    function pt(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }

    function dt(t) {
        let n = t,
            e = t;

        function r(t, n, r, i) {
            for (null == r && (r = 0), null == i && (i = t.length); r < i;) {
                const a = r + i >>> 1;
                e(t[a], n) < 0 ? r = a + 1 : i = a
            }
            return r
        }
        return 1 === t.length && (n = (n, e) => t(n) - e, e = function (t) {
            return (n, e) => pt(t(n), e)
        }(t)), {
            left: r,
            center: function (t, e, i, a) {
                null == i && (i = 0), null == a && (a = t.length);
                const o = r(t, e, i, a - 1);
                return o > i && n(t[o - 1], e) > -n(t[o], e) ? o - 1 : o
            },
            right: function (t, n, r, i) {
                for (null == r && (r = 0), null == i && (i = t.length); r < i;) {
                    const a = r + i >>> 1;
                    e(t[a], n) > 0 ? i = a : r = a + 1
                }
                return r
            }
        }
    }
    ht.prototype = ft.prototype = {
        constructor: ht,
        select: function (t) {
            "function" != typeof t && (t = u(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var a, o, l = n[i], s = l.length, c = r[i] = new Array(s), h = 0; h < s; ++h)(a = l[h]) && (o = t.call(a, a.__data__, h, l)) && ("__data__" in a && (o.__data__ = a.__data__), c[h] = o);
            return new ht(r, this._parents)
        },
        selectAll: function (t) {
            t = "function" == typeof t ? function (t) {
                return function () {
                    var n = t.apply(this, arguments);
                    return null == n ? [] : l(n)
                }
            }(t) : c(t);
            for (var n = this._groups, e = n.length, r = [], i = [], a = 0; a < e; ++a)
                for (var o, u = n[a], s = u.length, h = 0; h < s; ++h)(o = u[h]) && (r.push(t.call(o, o.__data__, h, u)), i.push(o));
            return new ht(r, i)
        },
        selectChild: function (t) {
            return this.select(null == t ? d : function (t) {
                return function () {
                    return p.call(this.children, t)
                }
            }("function" == typeof t ? t : f(t)))
        },
        selectChildren: function (t) {
            return this.selectAll(null == t ? y : function (t) {
                return function () {
                    return v.call(this.children, t)
                }
            }("function" == typeof t ? t : f(t)))
        },
        filter: function (t) {
            "function" != typeof t && (t = h(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var a, o = n[i], u = o.length, l = r[i] = [], s = 0; s < u; ++s)(a = o[s]) && t.call(a, a.__data__, s, o) && l.push(a);
            return new ht(r, this._parents)
        },
        data: function (t, n) {
            if (!arguments.length) return Array.from(this, b);
            var e = n ? x : w,
                r = this._parents,
                i = this._groups;
            "function" != typeof t && (t = _(t));
            for (var a = i.length, o = new Array(a), u = new Array(a), s = new Array(a), c = 0; c < a; ++c) {
                var h = r[c],
                    f = i[c],
                    p = f.length,
                    d = l(t.call(h, h && h.__data__, c, r)),
                    v = d.length,
                    y = u[c] = new Array(v),
                    g = o[c] = new Array(v),
                    m = s[c] = new Array(p);
                e(h, f, y, g, m, d, n);
                for (var M, A, N = 0, k = 0; N < v; ++N)
                    if (M = y[N]) {
                        for (N >= k && (k = N + 1); !(A = g[k]) && ++k < v;);
                        M._next = A || null
                    }
            }
            return (o = new ht(o, r))._enter = u, o._exit = s, o
        },
        enter: function () {
            return new ht(this._enter || this._groups.map(g), this._parents)
        },
        exit: function () {
            return new ht(this._exit || this._groups.map(g), this._parents)
        },
        join: function (t, n, e) {
            var r = this.enter(),
                i = this,
                a = this.exit();
            return r = "function" == typeof t ? t(r) : r.append(t + ""), null != n && (i = n(i)), null == e ? a.remove() : e(a), r && i ? r.merge(i).order() : i
        },
        merge: function (t) {
            if (!(t instanceof ht)) throw new Error("invalid merge");
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, a = Math.min(r, i), o = new Array(r), u = 0; u < a; ++u)
                for (var l, s = n[u], c = e[u], h = s.length, f = o[u] = new Array(h), p = 0; p < h; ++p)(l = s[p] || c[p]) && (f[p] = l);
            for (; u < r; ++u) o[u] = n[u];
            return new ht(o, this._parents)
        },
        selection: function () {
            return this
        },
        order: function () {
            for (var t = this._groups, n = -1, e = t.length; ++n < e;)
                for (var r, i = t[n], a = i.length - 1, o = i[a]; --a >= 0;)(r = i[a]) && (o && 4 ^ r.compareDocumentPosition(o) && o.parentNode.insertBefore(r, o), o = r);
            return this
        },
        sort: function (t) {
            function n(n, e) {
                return n && e ? t(n.__data__, e.__data__) : !n - !e
            }
            t || (t = M);
            for (var e = this._groups, r = e.length, i = new Array(r), a = 0; a < r; ++a) {
                for (var o, u = e[a], l = u.length, s = i[a] = new Array(l), c = 0; c < l; ++c)(o = u[c]) && (s[c] = o);
                s.sort(n)
            }
            return new ht(i, this._parents).order()
        },
        call: function () {
            var t = arguments[0];
            return arguments[0] = this, t.apply(null, arguments), this
        },
        nodes: function () {
            return Array.from(this)
        },
        node: function () {
            for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
                for (var r = t[n], i = 0, a = r.length; i < a; ++i) {
                    var o = r[i];
                    if (o) return o
                }
            return null
        },
        size: function () {
            let t = 0;
            for (const n of this) ++t;
            return t
        },
        empty: function () {
            return !this.node()
        },
        each: function (t) {
            for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
                for (var i, a = n[e], o = 0, u = a.length; o < u; ++o)(i = a[o]) && t.call(i, i.__data__, o, a);
            return this
        },
        attr: function (t, n) {
            var r = e(t);
            if (arguments.length < 2) {
                var i = this.node();
                return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r)
            }
            return this.each((null == n ? r.local ? N : A : "function" == typeof n ? r.local ? T : E : r.local ? S : k)(r, n))
        },
        style: function (t, n, e) {
            return arguments.length > 1 ? this.each((null == n ? P : "function" == typeof n ? R : O)(t, n, null == e ? "" : e)) : I(this.node(), t)
        },
        property: function (t, n) {
            return arguments.length > 1 ? this.each((null == n ? j : "function" == typeof n ? L : q)(t, n)) : this.node()[t]
        },
        classed: function (t, n) {
            var e = z(t + "");
            if (arguments.length < 2) {
                for (var r = D(this.node()), i = -1, a = e.length; ++i < a;)
                    if (!r.contains(e[i])) return !1;
                return !0
            }
            return this.each(("function" == typeof n ? $ : n ? V : U)(e, n))
        },
        text: function (t) {
            return arguments.length ? this.each(null == t ? Y : ("function" == typeof t ? G : F)(t)) : this.node().textContent
        },
        html: function (t) {
            return arguments.length ? this.each(null == t ? Z : ("function" == typeof t ? K : W)(t)) : this.node().innerHTML
        },
        raise: function () {
            return this.each(Q)
        },
        lower: function () {
            return this.each(J)
        },
        append: function (t) {
            var n = "function" == typeof t ? t : a(t);
            return this.select((function () {
                return this.appendChild(n.apply(this, arguments))
            }))
        },
        insert: function (t, n) {
            var e = "function" == typeof t ? t : a(t),
                r = null == n ? tt : "function" == typeof n ? n : u(n);
            return this.select((function () {
                return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
            }))
        },
        remove: function () {
            return this.each(nt)
        },
        clone: function (t) {
            return this.select(t ? rt : et)
        },
        datum: function (t) {
            return arguments.length ? this.property("__data__", t) : this.node().__data__
        },
        on: function (t, n, e) {
            var r, i, a = it(t + ""),
                o = a.length;
            if (!(arguments.length < 2)) {
                for (u = n ? ot : at, r = 0; r < o; ++r) this.each(u(a[r], n, e));
                return this
            }
            var u = this.node().__on;
            if (u)
                for (var l, s = 0, c = u.length; s < c; ++s)
                    for (r = 0, l = u[s]; r < o; ++r)
                        if ((i = a[r]).type === l.type && i.name === l.name) return l.value
        },
        dispatch: function (t, n) {
            return this.each(("function" == typeof n ? st : lt)(t, n))
        },
        [Symbol.iterator]: function* () {
            for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
                for (var r, i = t[n], a = 0, o = i.length; a < o; ++a)(r = i[a]) && (yield r)
        }
    };
    const vt = dt(pt).right;
    dt((function (t) {
        return null === t ? NaN : +t
    })).center;
    var yt = Math.sqrt(50),
        gt = Math.sqrt(10),
        mt = Math.sqrt(2);

    function _t(t, n, e) {
        var r = (n - t) / Math.max(0, e),
            i = Math.floor(Math.log(r) / Math.LN10),
            a = r / Math.pow(10, i);
        return i >= 0 ? (a >= yt ? 10 : a >= gt ? 5 : a >= mt ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (a >= yt ? 10 : a >= gt ? 5 : a >= mt ? 2 : 1)
    }

    function wt(t, n) {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                this.range(t);
                break;
            default:
                this.range(n).domain(t)
        }
        return this
    }

    function xt(t, n, e) {
        t.prototype = n.prototype = e, e.constructor = t
    }

    function bt(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e
    }

    function Mt() { }
    var At = .7,
        Nt = 1 / At,
        kt = "\\s*([+-]?\\d+)\\s*",
        St = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        Et = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Tt = /^#([0-9a-f]{3,8})$/,
        Ct = new RegExp("^rgb\\(" + [kt, kt, kt] + "\\)$"),
        Pt = new RegExp("^rgb\\(" + [Et, Et, Et] + "\\)$"),
        Ot = new RegExp("^rgba\\(" + [kt, kt, kt, St] + "\\)$"),
        Rt = new RegExp("^rgba\\(" + [Et, Et, Et, St] + "\\)$"),
        It = new RegExp("^hsl\\(" + [St, Et, Et] + "\\)$"),
        jt = new RegExp("^hsla\\(" + [St, Et, Et, St] + "\\)$"),
        qt = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function Lt() {
        return this.rgb().formatHex()
    }

    function zt() {
        return this.rgb().formatRgb()
    }

    function Dt(t) {
        var n, e;
        return t = (t + "").trim().toLowerCase(), (n = Tt.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), 6 === e ? Bt(n) : 3 === e ? new Ut(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : 8 === e ? Xt(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (255 & n) / 255) : 4 === e ? Xt(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, ((15 & n) << 4 | 15 & n) / 255) : null) : (n = Ct.exec(t)) ? new Ut(n[1], n[2], n[3], 1) : (n = Pt.exec(t)) ? new Ut(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = Ot.exec(t)) ? Xt(n[1], n[2], n[3], n[4]) : (n = Rt.exec(t)) ? Xt(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = It.exec(t)) ? Gt(n[1], n[2] / 100, n[3] / 100, 1) : (n = jt.exec(t)) ? Gt(n[1], n[2] / 100, n[3] / 100, n[4]) : qt.hasOwnProperty(t) ? Bt(qt[t]) : "transparent" === t ? new Ut(NaN, NaN, NaN, 0) : null
    }

    function Bt(t) {
        return new Ut(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
    }

    function Xt(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new Ut(t, n, e, r)
    }

    function Ht(t) {
        return t instanceof Mt || (t = Dt(t)), t ? new Ut((t = t.rgb()).r, t.g, t.b, t.opacity) : new Ut
    }

    function Vt(t, n, e, r) {
        return 1 === arguments.length ? Ht(t) : new Ut(t, n, e, null == r ? 1 : r)
    }

    function Ut(t, n, e, r) {
        this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
    }

    function $t() {
        return "#" + Ft(this.r) + Ft(this.g) + Ft(this.b)
    }

    function Yt() {
        var t = this.opacity;
        return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
    }

    function Ft(t) {
        return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
    }

    function Gt(t, n, e, r) {
        return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new Wt(t, n, e, r)
    }

    function Zt(t) {
        if (t instanceof Wt) return new Wt(t.h, t.s, t.l, t.opacity);
        if (t instanceof Mt || (t = Dt(t)), !t) return new Wt;
        if (t instanceof Wt) return t;
        var n = (t = t.rgb()).r / 255,
            e = t.g / 255,
            r = t.b / 255,
            i = Math.min(n, e, r),
            a = Math.max(n, e, r),
            o = NaN,
            u = a - i,
            l = (a + i) / 2;
        return u ? (o = n === a ? (e - r) / u + 6 * (e < r) : e === a ? (r - n) / u + 2 : (n - e) / u + 4, u /= l < .5 ? a + i : 2 - a - i, o *= 60) : u = l > 0 && l < 1 ? 0 : o, new Wt(o, u, l, t.opacity)
    }

    function Wt(t, n, e, r) {
        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
    }

    function Kt(t, n, e) {
        return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
    }
    xt(Mt, Dt, {
        copy: function (t) {
            return Object.assign(new this.constructor, this, t)
        },
        displayable: function () {
            return this.rgb().displayable()
        },
        hex: Lt,
        formatHex: Lt,
        formatHsl: function () {
            return Zt(this).formatHsl()
        },
        formatRgb: zt,
        toString: zt
    }), xt(Ut, Vt, bt(Mt, {
        brighter: function (t) {
            return t = null == t ? Nt : Math.pow(Nt, t), new Ut(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        darker: function (t) {
            return t = null == t ? At : Math.pow(At, t), new Ut(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        rgb: function () {
            return this
        },
        displayable: function () {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: $t,
        formatHex: $t,
        formatRgb: Yt,
        toString: Yt
    })), xt(Wt, (function (t, n, e, r) {
        return 1 === arguments.length ? Zt(t) : new Wt(t, n, e, null == r ? 1 : r)
    }), bt(Mt, {
        brighter: function (t) {
            return t = null == t ? Nt : Math.pow(Nt, t), new Wt(this.h, this.s, this.l * t, this.opacity)
        },
        darker: function (t) {
            return t = null == t ? At : Math.pow(At, t), new Wt(this.h, this.s, this.l * t, this.opacity)
        },
        rgb: function () {
            var t = this.h % 360 + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < .5 ? e : 1 - e) * n,
                i = 2 * e - r;
            return new Ut(Kt(t >= 240 ? t - 240 : t + 120, i, r), Kt(t, i, r), Kt(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
        },
        displayable: function () {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        },
        formatHsl: function () {
            var t = this.opacity;
            return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
        }
    }));
    var Qt = t => () => t;

    function Jt(t) {
        return 1 == (t = +t) ? tn : function (n, e) {
            return e - n ? function (t, n, e) {
                return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e,
                    function (r) {
                        return Math.pow(t + r * n, e)
                    }
            }(n, e, t) : Qt(isNaN(n) ? e : n)
        }
    }

    function tn(t, n) {
        var e = n - t;
        return e ? function (t, n) {
            return function (e) {
                return t + e * n
            }
        }(t, e) : Qt(isNaN(t) ? n : t)
    }
    var nn = function t(n) {
        var e = Jt(n);

        function r(t, n) {
            var r = e((t = Vt(t)).r, (n = Vt(n)).r),
                i = e(t.g, n.g),
                a = e(t.b, n.b),
                o = tn(t.opacity, n.opacity);
            return function (n) {
                return t.r = r(n), t.g = i(n), t.b = a(n), t.opacity = o(n), t + ""
            }
        }
        return r.gamma = t, r
    }(1);

    function en(t, n) {
        n || (n = []);
        var e, r = t ? Math.min(n.length, t.length) : 0,
            i = n.slice();
        return function (a) {
            for (e = 0; e < r; ++e) i[e] = t[e] * (1 - a) + n[e] * a;
            return i
        }
    }

    function rn(t, n) {
        var e, r = n ? n.length : 0,
            i = t ? Math.min(r, t.length) : 0,
            a = new Array(i),
            o = new Array(r);
        for (e = 0; e < i; ++e) a[e] = hn(t[e], n[e]);
        for (; e < r; ++e) o[e] = n[e];
        return function (t) {
            for (e = 0; e < i; ++e) o[e] = a[e](t);
            return o
        }
    }

    function an(t, n) {
        var e = new Date;
        return t = +t, n = +n,
            function (r) {
                return e.setTime(t * (1 - r) + n * r), e
            }
    }

    function on(t, n) {
        return t = +t, n = +n,
            function (e) {
                return t * (1 - e) + n * e
            }
    }

    function un(t, n) {
        var e, r = {},
            i = {};
        for (e in null !== t && "object" == typeof t || (t = {}), null !== n && "object" == typeof n || (n = {}), n) e in t ? r[e] = hn(t[e], n[e]) : i[e] = n[e];
        return function (t) {
            for (e in r) i[e] = r[e](t);
            return i
        }
    }
    var ln = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        sn = new RegExp(ln.source, "g");

    function cn(t, n) {
        var e, r, i, a = ln.lastIndex = sn.lastIndex = 0,
            o = -1,
            u = [],
            l = [];
        for (t += "", n += "";
            (e = ln.exec(t)) && (r = sn.exec(n));)(i = r.index) > a && (i = n.slice(a, i), u[o] ? u[o] += i : u[++o] = i), (e = e[0]) === (r = r[0]) ? u[o] ? u[o] += r : u[++o] = r : (u[++o] = null, l.push({
                i: o,
                x: on(e, r)
            })), a = sn.lastIndex;
        return a < n.length && (i = n.slice(a), u[o] ? u[o] += i : u[++o] = i), u.length < 2 ? l[0] ? function (t) {
            return function (n) {
                return t(n) + ""
            }
        }(l[0].x) : function (t) {
            return function () {
                return t
            }
        }(n) : (n = l.length, function (t) {
            for (var e, r = 0; r < n; ++r) u[(e = l[r]).i] = e.x(t);
            return u.join("")
        })
    }

    function hn(t, n) {
        var e, r, i = typeof n;
        return null == n || "boolean" === i ? Qt(n) : ("number" === i ? on : "string" === i ? (e = Dt(n)) ? (n = e, nn) : cn : n instanceof Dt ? nn : n instanceof Date ? an : (r = n, !ArrayBuffer.isView(r) || r instanceof DataView ? Array.isArray(n) ? rn : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? un : on : en))(t, n)
    }

    function fn(t, n) {
        return t = +t, n = +n,
            function (e) {
                return Math.round(t * (1 - e) + n * e)
            }
    }
    var pn, dn = 180 / Math.PI,
        vn = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1
        };

    function yn(t, n, e, r, i, a) {
        var o, u, l;
        return (o = Math.sqrt(t * t + n * n)) && (t /= o, n /= o), (l = t * e + n * r) && (e -= t * l, r -= n * l), (u = Math.sqrt(e * e + r * r)) && (e /= u, r /= u, l /= u), t * r < n * e && (t = -t, n = -n, l = -l, o = -o), {
            translateX: i,
            translateY: a,
            rotate: Math.atan2(n, t) * dn,
            skewX: Math.atan(l) * dn,
            scaleX: o,
            scaleY: u
        }
    }

    function gn(t, n, e, r) {
        function i(t) {
            return t.length ? t.pop() + " " : ""
        }
        return function (a, o) {
            var u = [],
                l = [];
            return a = t(a), o = t(o),
                function (t, r, i, a, o, u) {
                    if (t !== i || r !== a) {
                        var l = o.push("translate(", null, n, null, e);
                        u.push({
                            i: l - 4,
                            x: on(t, i)
                        }, {
                            i: l - 2,
                            x: on(r, a)
                        })
                    } else (i || a) && o.push("translate(" + i + n + a + e)
                }(a.translateX, a.translateY, o.translateX, o.translateY, u, l),
                function (t, n, e, a) {
                    t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), a.push({
                        i: e.push(i(e) + "rotate(", null, r) - 2,
                        x: on(t, n)
                    })) : n && e.push(i(e) + "rotate(" + n + r)
                }(a.rotate, o.rotate, u, l),
                function (t, n, e, a) {
                    t !== n ? a.push({
                        i: e.push(i(e) + "skewX(", null, r) - 2,
                        x: on(t, n)
                    }) : n && e.push(i(e) + "skewX(" + n + r)
                }(a.skewX, o.skewX, u, l),
                function (t, n, e, r, a, o) {
                    if (t !== e || n !== r) {
                        var u = a.push(i(a) + "scale(", null, ",", null, ")");
                        o.push({
                            i: u - 4,
                            x: on(t, e)
                        }, {
                            i: u - 2,
                            x: on(n, r)
                        })
                    } else 1 === e && 1 === r || a.push(i(a) + "scale(" + e + "," + r + ")")
                }(a.scaleX, a.scaleY, o.scaleX, o.scaleY, u, l), a = o = null,
                function (t) {
                    for (var n, e = -1, r = l.length; ++e < r;) u[(n = l[e]).i] = n.x(t);
                    return u.join("")
                }
        }
    }
    var mn = gn((function (t) {
        const n = new ("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(t + "");
        return n.isIdentity ? vn : yn(n.a, n.b, n.c, n.d, n.e, n.f)
    }), "px, ", "px)", "deg)"),
        _n = gn((function (t) {
            return null == t ? vn : (pn || (pn = document.createElementNS("http://www.w3.org/2000/svg", "g")), pn.setAttribute("transform", t), (t = pn.transform.baseVal.consolidate()) ? yn((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : vn)
        }), ", ", ")", ")");

    function wn(t) {
        return +t
    }
    var xn = [0, 1];

    function bn(t) {
        return t
    }

    function Mn(t, n) {
        return (n -= t = +t) ? function (e) {
            return (e - t) / n
        } : (e = isNaN(n) ? NaN : .5, function () {
            return e
        });
        var e
    }

    function An(t, n, e) {
        var r = t[0],
            i = t[1],
            a = n[0],
            o = n[1];
        return i < r ? (r = Mn(i, r), a = e(o, a)) : (r = Mn(r, i), a = e(a, o)),
            function (t) {
                return a(r(t))
            }
    }

    function Nn(t, n, e) {
        var r = Math.min(t.length, n.length) - 1,
            i = new Array(r),
            a = new Array(r),
            o = -1;
        for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++o < r;) i[o] = Mn(t[o], t[o + 1]), a[o] = e(n[o], n[o + 1]);
        return function (n) {
            var e = vt(t, n, 1, r) - 1;
            return a[e](i[e](n))
        }
    }

    function kn(t, n) {
        return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
    }

    function Sn() {
        var t, n, e, r, i, a, o = xn,
            u = xn,
            l = hn,
            s = bn;

        function c() {
            var t, n, e, l = Math.min(o.length, u.length);
            return s !== bn && (t = o[0], n = o[l - 1], t > n && (e = t, t = n, n = e), s = function (e) {
                return Math.max(t, Math.min(n, e))
            }), r = l > 2 ? Nn : An, i = a = null, h
        }

        function h(n) {
            return null == n || isNaN(n = +n) ? e : (i || (i = r(o.map(t), u, l)))(t(s(n)))
        }
        return h.invert = function (e) {
            return s(n((a || (a = r(u, o.map(t), on)))(e)))
        }, h.domain = function (t) {
            return arguments.length ? (o = Array.from(t, wn), c()) : o.slice()
        }, h.range = function (t) {
            return arguments.length ? (u = Array.from(t), c()) : u.slice()
        }, h.rangeRound = function (t) {
            return u = Array.from(t), l = fn, c()
        }, h.clamp = function (t) {
            return arguments.length ? (s = !!t || bn, c()) : s !== bn
        }, h.interpolate = function (t) {
            return arguments.length ? (l = t, c()) : l
        }, h.unknown = function (t) {
            return arguments.length ? (e = t, h) : e
        },
            function (e, r) {
                return t = e, n = r, c()
            }
    }

    function En() {
        return Sn()(bn, bn)
    }

    function Tn(t, n) {
        if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
        var e, r = t.slice(0, e);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
    }

    function Cn(t) {
        return (t = Tn(Math.abs(t))) ? t[1] : NaN
    }
    var Pn, On = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function Rn(t) {
        if (!(n = On.exec(t))) throw new Error("invalid format: " + t);
        var n;
        return new In({
            fill: n[1],
            align: n[2],
            sign: n[3],
            symbol: n[4],
            zero: n[5],
            width: n[6],
            comma: n[7],
            precision: n[8] && n[8].slice(1),
            trim: n[9],
            type: n[10]
        })
    }

    function In(t) {
        this.fill = void 0 === t.fill ? " " : t.fill + "", this.align = void 0 === t.align ? ">" : t.align + "", this.sign = void 0 === t.sign ? "-" : t.sign + "", this.symbol = void 0 === t.symbol ? "" : t.symbol + "", this.zero = !!t.zero, this.width = void 0 === t.width ? void 0 : +t.width, this.comma = !!t.comma, this.precision = void 0 === t.precision ? void 0 : +t.precision, this.trim = !!t.trim, this.type = void 0 === t.type ? "" : t.type + ""
    }

    function jn(t, n) {
        var e = Tn(t, n);
        if (!e) return t + "";
        var r = e[0],
            i = e[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    Rn.prototype = In.prototype, In.prototype.toString = function () {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
    };
    var qn = {
        "%": (t, n) => (100 * t).toFixed(n),
        b: t => Math.round(t).toString(2),
        c: t => t + "",
        d: function (t) {
            return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
        },
        e: (t, n) => t.toExponential(n),
        f: (t, n) => t.toFixed(n),
        g: (t, n) => t.toPrecision(n),
        o: t => Math.round(t).toString(8),
        p: (t, n) => jn(100 * t, n),
        r: jn,
        s: function (t, n) {
            var e = Tn(t, n);
            if (!e) return t + "";
            var r = e[0],
                i = e[1],
                a = i - (Pn = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                o = r.length;
            return a === o ? r : a > o ? r + new Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Tn(t, Math.max(0, n + a - 1))[0]
        },
        X: t => Math.round(t).toString(16).toUpperCase(),
        x: t => Math.round(t).toString(16)
    };

    function Ln(t) {
        return t
    }
    var zn, Dn, Bn, Xn = Array.prototype.map,
        Hn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function Vn(t) {
        var n, e, r = void 0 === t.grouping || void 0 === t.thousands ? Ln : (n = Xn.call(t.grouping, Number), e = t.thousands + "", function (t, r) {
            for (var i = t.length, a = [], o = 0, u = n[0], l = 0; i > 0 && u > 0 && (l + u + 1 > r && (u = Math.max(1, r - l)), a.push(t.substring(i -= u, i + u)), !((l += u + 1) > r));) u = n[o = (o + 1) % n.length];
            return a.reverse().join(e)
        }),
            i = void 0 === t.currency ? "" : t.currency[0] + "",
            a = void 0 === t.currency ? "" : t.currency[1] + "",
            o = void 0 === t.decimal ? "." : t.decimal + "",
            u = void 0 === t.numerals ? Ln : function (t) {
                return function (n) {
                    return n.replace(/[0-9]/g, (function (n) {
                        return t[+n]
                    }))
                }
            }(Xn.call(t.numerals, String)),
            l = void 0 === t.percent ? "%" : t.percent + "",
            s = void 0 === t.minus ? "−" : t.minus + "",
            c = void 0 === t.nan ? "NaN" : t.nan + "";

        function h(t) {
            var n = (t = Rn(t)).fill,
                e = t.align,
                h = t.sign,
                f = t.symbol,
                p = t.zero,
                d = t.width,
                v = t.comma,
                y = t.precision,
                g = t.trim,
                m = t.type;
            "n" === m ? (v = !0, m = "g") : qn[m] || (void 0 === y && (y = 12), g = !0, m = "g"), (p || "0" === n && "=" === e) && (p = !0, n = "0", e = "=");
            var _ = "$" === f ? i : "#" === f && /[boxX]/.test(m) ? "0" + m.toLowerCase() : "",
                w = "$" === f ? a : /[%p]/.test(m) ? l : "",
                x = qn[m],
                b = /[defgprs%]/.test(m);

            function M(t) {
                var i, a, l, f = _,
                    M = w;
                if ("c" === m) M = x(t) + M, t = "";
                else {
                    var A = (t = +t) < 0 || 1 / t < 0;
                    if (t = isNaN(t) ? c : x(Math.abs(t), y), g && (t = function (t) {
                        t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r) switch (t[r]) {
                            case ".":
                                i = n = r;
                                break;
                            case "0":
                                0 === i && (i = r), n = r;
                                break;
                            default:
                                if (!+t[r]) break t;
                                i > 0 && (i = 0)
                        }
                        return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t
                    }(t)), A && 0 == +t && "+" !== h && (A = !1), f = (A ? "(" === h ? h : s : "-" === h || "(" === h ? "" : h) + f, M = ("s" === m ? Hn[8 + Pn / 3] : "") + M + (A && "(" === h ? ")" : ""), b)
                        for (i = -1, a = t.length; ++i < a;)
                            if (48 > (l = t.charCodeAt(i)) || l > 57) {
                                M = (46 === l ? o + t.slice(i + 1) : t.slice(i)) + M, t = t.slice(0, i);
                                break
                            }
                }
                v && !p && (t = r(t, 1 / 0));
                var N = f.length + t.length + M.length,
                    k = N < d ? new Array(d - N + 1).join(n) : "";
                switch (v && p && (t = r(k + t, k.length ? d - M.length : 1 / 0), k = ""), e) {
                    case "<":
                        t = f + t + M + k;
                        break;
                    case "=":
                        t = f + k + t + M;
                        break;
                    case "^":
                        t = k.slice(0, N = k.length >> 1) + f + t + M + k.slice(N);
                        break;
                    default:
                        t = k + f + t + M
                }
                return u(t)
            }
            return y = void 0 === y ? 6 : /[gprs]/.test(m) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)), M.toString = function () {
                return t + ""
            }, M
        }
        return {
            format: h,
            formatPrefix: function (t, n) {
                var e = h(((t = Rn(t)).type = "f", t)),
                    r = 3 * Math.max(-8, Math.min(8, Math.floor(Cn(n) / 3))),
                    i = Math.pow(10, -r),
                    a = Hn[8 + r / 3];
                return function (t) {
                    return e(i * t) + a
                }
            }
        }
    }

    function Un(t, n, e, r) {
        var i, a = function (t, n, e) {
            var r = Math.abs(n - t) / Math.max(0, e),
                i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                a = r / i;
            return a >= yt ? i *= 10 : a >= gt ? i *= 5 : a >= mt && (i *= 2), n < t ? -i : i
        }(t, n, e);
        switch ((r = Rn(null == r ? ",f" : r)).type) {
            case "s":
                var o = Math.max(Math.abs(t), Math.abs(n));
                return null != r.precision || isNaN(i = function (t, n) {
                    return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Cn(n) / 3))) - Cn(Math.abs(t)))
                }(a, o)) || (r.precision = i), Bn(r, o);
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
                null != r.precision || isNaN(i = function (t, n) {
                    return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Cn(n) - Cn(t)) + 1
                }(a, Math.max(Math.abs(t), Math.abs(n)))) || (r.precision = i - ("e" === r.type));
                break;
            case "f":
            case "%":
                null != r.precision || isNaN(i = function (t) {
                    return Math.max(0, -Cn(Math.abs(t)))
                }(a)) || (r.precision = i - 2 * ("%" === r.type))
        }
        return Dn(r)
    }

    function $n(t) {
        var n = t.domain;
        return t.ticks = function (t) {
            var e = n();
            return function (t, n, e) {
                var r, i, a, o, u = -1;
                if (e = +e, (t = +t) == (n = +n) && e > 0) return [t];
                if ((r = n < t) && (i = t, t = n, n = i), 0 === (o = _t(t, n, e)) || !isFinite(o)) return [];
                if (o > 0) {
                    let e = Math.round(t / o),
                        r = Math.round(n / o);
                    for (e * o < t && ++e, r * o > n && --r, a = new Array(i = r - e + 1); ++u < i;) a[u] = (e + u) * o
                } else {
                    o = -o;
                    let e = Math.round(t * o),
                        r = Math.round(n * o);
                    for (e / o < t && ++e, r / o > n && --r, a = new Array(i = r - e + 1); ++u < i;) a[u] = (e + u) / o
                }
                return r && a.reverse(), a
            }(e[0], e[e.length - 1], null == t ? 10 : t)
        }, t.tickFormat = function (t, e) {
            var r = n();
            return Un(r[0], r[r.length - 1], null == t ? 10 : t, e)
        }, t.nice = function (e) {
            null == e && (e = 10);
            var r, i, a = n(),
                o = 0,
                u = a.length - 1,
                l = a[o],
                s = a[u],
                c = 10;
            for (s < l && (i = l, l = s, s = i, i = o, o = u, u = i); c-- > 0;) {
                if ((i = _t(l, s, e)) === r) return a[o] = l, a[u] = s, n(a);
                if (i > 0) l = Math.floor(l / i) * i, s = Math.ceil(s / i) * i;
                else {
                    if (!(i < 0)) break;
                    l = Math.ceil(l * i) / i, s = Math.floor(s * i) / i
                }
                r = i
            }
            return t
        }, t
    }

    function Yn() {
        var t = En();
        return t.copy = function () {
            return kn(t, Yn())
        }, wt.apply(t, arguments), $n(t)
    }

    function Fn(t) {
        return function (n) {
            return n < 0 ? -Math.pow(-n, t) : Math.pow(n, t)
        }
    }

    function Gn(t) {
        return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
    }

    function Zn(t) {
        return t < 0 ? -t * t : t * t
    }

    function Wn(t) {
        var n = t(bn, bn),
            e = 1;

        function r() {
            return 1 === e ? t(bn, bn) : .5 === e ? t(Gn, Zn) : t(Fn(e), Fn(1 / e))
        }
        return n.exponent = function (t) {
            return arguments.length ? (e = +t, r()) : e
        }, $n(n)
    }

    function Kn() {
        var t = Wn(Sn());
        return t.copy = function () {
            return kn(t, Kn()).exponent(t.exponent())
        }, wt.apply(t, arguments), t
    }

    function Qn(t) {
        var n = 0,
            e = t.children,
            r = e && e.length;
        if (r)
            for (; --r >= 0;) n += e[r].value;
        else n = 1;
        t.value = n
    }

    function Jn(t, n) {
        t instanceof Map ? (t = [void 0, t], void 0 === n && (n = ne)) : void 0 === n && (n = te);
        for (var e, r, i, a, o, u = new ie(t), l = [u]; e = l.pop();)
            if ((i = n(e.data)) && (o = (i = Array.from(i)).length))
                for (e.children = i, a = o - 1; a >= 0; --a) l.push(r = i[a] = new ie(i[a])), r.parent = e, r.depth = e.depth + 1;
        return u.eachBefore(re)
    }

    function te(t) {
        return t.children
    }

    function ne(t) {
        return Array.isArray(t) ? t[1] : null
    }

    function ee(t) {
        void 0 !== t.data.value && (t.value = t.data.value), t.data = t.data.data
    }

    function re(t) {
        var n = 0;
        do {
            t.height = n
        } while ((t = t.parent) && t.height < ++n)
    }

    function ie(t) {
        this.data = t, this.depth = this.height = 0, this.parent = null
    }

    function ae(t) {
        t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
    }

    function oe() {
        var t = 1,
            n = 1,
            e = 0,
            r = !1;

        function i(i) {
            var a = i.height + 1;
            return i.x0 = i.y0 = e, i.x1 = t, i.y1 = n / a, i.eachBefore(function (t, n) {
                return function (r) {
                    r.children && function (t, n, e, r, i) {
                        for (var a, o = t.children, u = -1, l = o.length, s = t.value && (r - n) / t.value; ++u < l;)(a = o[u]).y0 = e, a.y1 = i, a.x0 = n, a.x1 = n += a.value * s
                    }(r, r.x0, t * (r.depth + 1) / n, r.x1, t * (r.depth + 2) / n);
                    var i = r.x0,
                        a = r.y0,
                        o = r.x1 - e,
                        u = r.y1 - e;
                    o < i && (i = o = (i + o) / 2), u < a && (a = u = (a + u) / 2), r.x0 = i, r.y0 = a, r.x1 = o, r.y1 = u
                }
            }(n, a)), r && i.eachBefore(ae), i
        }
        return i.round = function (t) {
            return arguments.length ? (r = !!t, i) : r
        }, i.size = function (e) {
            return arguments.length ? (t = +e[0], n = +e[1], i) : [t, n]
        }, i.padding = function (t) {
            return arguments.length ? (e = +t, i) : e
        }, i
    }
    zn = Vn({
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), Dn = zn.format, Bn = zn.formatPrefix, ie.prototype = Jn.prototype = {
        constructor: ie,
        count: function () {
            return this.eachAfter(Qn)
        },
        each: function (t, n) {
            let e = -1;
            for (const r of this) t.call(n, r, ++e, this);
            return this
        },
        eachAfter: function (t, n) {
            for (var e, r, i, a = this, o = [a], u = [], l = -1; a = o.pop();)
                if (u.push(a), e = a.children)
                    for (r = 0, i = e.length; r < i; ++r) o.push(e[r]);
            for (; a = u.pop();) t.call(n, a, ++l, this);
            return this
        },
        eachBefore: function (t, n) {
            for (var e, r, i = this, a = [i], o = -1; i = a.pop();)
                if (t.call(n, i, ++o, this), e = i.children)
                    for (r = e.length - 1; r >= 0; --r) a.push(e[r]);
            return this
        },
        find: function (t, n) {
            let e = -1;
            for (const r of this)
                if (t.call(n, r, ++e, this)) return r
        },
        sum: function (t) {
            return this.eachAfter((function (n) {
                for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0;) e += r[i].value;
                n.value = e
            }))
        },
        sort: function (t) {
            return this.eachBefore((function (n) {
                n.children && n.children.sort(t)
            }))
        },
        path: function (t) {
            for (var n = this, e = function (t, n) {
                if (t === n) return t;
                var e = t.ancestors(),
                    r = n.ancestors(),
                    i = null;
                t = e.pop(), n = r.pop();
                for (; t === n;) i = t, t = e.pop(), n = r.pop();
                return i
            }(n, t), r = [n]; n !== e;) n = n.parent, r.push(n);
            for (var i = r.length; t !== e;) r.splice(i, 0, t), t = t.parent;
            return r
        },
        ancestors: function () {
            for (var t = this, n = [t]; t = t.parent;) n.push(t);
            return n
        },
        descendants: function () {
            return Array.from(this)
        },
        leaves: function () {
            var t = [];
            return this.eachBefore((function (n) {
                n.children || t.push(n)
            })), t
        },
        links: function () {
            var t = this,
                n = [];
            return t.each((function (e) {
                e !== t && n.push({
                    source: e.parent,
                    target: e
                })
            })), n
        },
        copy: function () {
            return Jn(this).eachBefore(ee)
        },
        [Symbol.iterator]: function* () {
            var t, n, e, r, i = this,
                a = [i];
            do {
                for (t = a.reverse(), a = []; i = t.pop();)
                    if (yield i, n = i.children)
                        for (e = 0, r = n.length; e < r; ++e) a.push(n[e])
            } while (a.length)
        }
    };
    const ue = Math.PI,
        le = 2 * ue,
        se = 1e-6,
        ce = le - se;

    function he() {
        this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
    }

    function fe() {
        return new he
    }

    function pe(t) {
        return function () {
            return t
        }
    }
    he.prototype = fe.prototype = {
        constructor: he,
        moveTo: function (t, n) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n)
        },
        closePath: function () {
            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
        },
        lineTo: function (t, n) {
            this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
        },
        quadraticCurveTo: function (t, n, e, r) {
            this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r)
        },
        bezierCurveTo: function (t, n, e, r, i, a) {
            this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +a)
        },
        arcTo: function (t, n, e, r, i) {
            t = +t, n = +n, e = +e, r = +r, i = +i;
            var a = this._x1,
                o = this._y1,
                u = e - t,
                l = r - n,
                s = a - t,
                c = o - n,
                h = s * s + c * c;
            if (i < 0) throw new Error("negative radius: " + i);
            if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
            else if (h > se)
                if (Math.abs(c * u - l * s) > se && i) {
                    var f = e - a,
                        p = r - o,
                        d = u * u + l * l,
                        v = f * f + p * p,
                        y = Math.sqrt(d),
                        g = Math.sqrt(h),
                        m = i * Math.tan((ue - Math.acos((d + h - v) / (2 * y * g))) / 2),
                        _ = m / g,
                        w = m / y;
                    Math.abs(_ - 1) > se && (this._ += "L" + (t + _ * s) + "," + (n + _ * c)), this._ += "A" + i + "," + i + ",0,0," + +(c * f > s * p) + "," + (this._x1 = t + w * u) + "," + (this._y1 = n + w * l)
                } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
            else;
        },
        arc: function (t, n, e, r, i, a) {
            t = +t, n = +n, a = !!a;
            var o = (e = +e) * Math.cos(r),
                u = e * Math.sin(r),
                l = t + o,
                s = n + u,
                c = 1 ^ a,
                h = a ? r - i : i - r;
            if (e < 0) throw new Error("negative radius: " + e);
            null === this._x1 ? this._ += "M" + l + "," + s : (Math.abs(this._x1 - l) > se || Math.abs(this._y1 - s) > se) && (this._ += "L" + l + "," + s), e && (h < 0 && (h = h % le + le), h > ce ? this._ += "A" + e + "," + e + ",0,1," + c + "," + (t - o) + "," + (n - u) + "A" + e + "," + e + ",0,1," + c + "," + (this._x1 = l) + "," + (this._y1 = s) : h > se && (this._ += "A" + e + "," + e + ",0," + +(h >= ue) + "," + c + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))))
        },
        rect: function (t, n, e, r) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"
        },
        toString: function () {
            return this._
        }
    };
    var de = Math.abs,
        ve = Math.atan2,
        ye = Math.cos,
        ge = Math.max,
        me = Math.min,
        _e = Math.sin,
        we = Math.sqrt,
        xe = 1e-12,
        be = Math.PI,
        Me = be / 2,
        Ae = 2 * be;

    function Ne(t) {
        return t > 1 ? 0 : t < -1 ? be : Math.acos(t)
    }

    function ke(t) {
        return t >= 1 ? Me : t <= -1 ? -Me : Math.asin(t)
    }

    function Se(t) {
        return t.innerRadius
    }

    function Ee(t) {
        return t.outerRadius
    }

    function Te(t) {
        return t.startAngle
    }

    function Ce(t) {
        return t.endAngle
    }

    function Pe(t) {
        return t && t.padAngle
    }

    function Oe(t, n, e, r, i, a, o, u) {
        var l = e - t,
            s = r - n,
            c = o - i,
            h = u - a,
            f = h * l - c * s;
        if (!(f * f < xe)) return [t + (f = (c * (n - a) - h * (t - i)) / f) * l, n + f * s]
    }

    function Re(t, n, e, r, i, a, o) {
        var u = t - e,
            l = n - r,
            s = (o ? a : -a) / we(u * u + l * l),
            c = s * l,
            h = -s * u,
            f = t + c,
            p = n + h,
            d = e + c,
            v = r + h,
            y = (f + d) / 2,
            g = (p + v) / 2,
            m = d - f,
            _ = v - p,
            w = m * m + _ * _,
            x = i - a,
            b = f * v - d * p,
            M = (_ < 0 ? -1 : 1) * we(ge(0, x * x * w - b * b)),
            A = (b * _ - m * M) / w,
            N = (-b * m - _ * M) / w,
            k = (b * _ + m * M) / w,
            S = (-b * m + _ * M) / w,
            E = A - y,
            T = N - g,
            C = k - y,
            P = S - g;
        return E * E + T * T > C * C + P * P && (A = k, N = S), {
            cx: A,
            cy: N,
            x01: -c,
            y01: -h,
            x11: A * (i / x - 1),
            y11: N * (i / x - 1)
        }
    }
    var Ie = {
        value: () => { }
    };

    function je() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
            if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
            r[t] = []
        }
        return new qe(r)
    }

    function qe(t) {
        this._ = t
    }

    function Le(t, n) {
        return t.trim().split(/^|\s+/).map((function (t) {
            var e = "",
                r = t.indexOf(".");
            if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            return {
                type: t,
                name: e
            }
        }))
    }

    function ze(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r)
            if ((e = t[r]).name === n) return e.value
    }

    function De(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r)
            if (t[r].name === n) {
                t[r] = Ie, t = t.slice(0, r).concat(t.slice(r + 1));
                break
            } return null != e && t.push({
                name: n,
                value: e
            }), t
    }
    qe.prototype = je.prototype = {
        constructor: qe,
        on: function (t, n) {
            var e, r = this._,
                i = Le(t + "", r),
                a = -1,
                o = i.length;
            if (!(arguments.length < 2)) {
                if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                for (; ++a < o;)
                    if (e = (t = i[a]).type) r[e] = De(r[e], t.name, n);
                    else if (null == n)
                        for (e in r) r[e] = De(r[e], t.name, null);
                return this
            }
            for (; ++a < o;)
                if ((e = (t = i[a]).type) && (e = ze(r[e], t.name))) return e
        },
        copy: function () {
            var t = {},
                n = this._;
            for (var e in n) t[e] = n[e].slice();
            return new qe(t)
        },
        call: function (t, n) {
            if ((e = arguments.length - 2) > 0)
                for (var e, r, i = new Array(e), a = 0; a < e; ++a) i[a] = arguments[a + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (a = 0, e = (r = this._[t]).length; a < e; ++a) r[a].value.apply(n, i)
        },
        apply: function (t, n, e) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(n, e)
        }
    };
    var Be, Xe, He = 0,
        Ve = 0,
        Ue = 0,
        $e = 0,
        Ye = 0,
        Fe = 0,
        Ge = "object" == typeof performance && performance.now ? performance : Date,
        Ze = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
            setTimeout(t, 17)
        };

    function We() {
        return Ye || (Ze(Ke), Ye = Ge.now() + Fe)
    }

    function Ke() {
        Ye = 0
    }

    function Qe() {
        this._call = this._time = this._next = null
    }

    function Je(t, n, e) {
        var r = new Qe;
        return r.restart(t, n, e), r
    }

    function tr() {
        Ye = ($e = Ge.now()) + Fe, He = Ve = 0;
        try {
            ! function () {
                We(), ++He;
                for (var t, n = Be; n;)(t = Ye - n._time) >= 0 && n._call.call(null, t), n = n._next;
                --He
            }()
        } finally {
            He = 0,
                function () {
                    var t, n, e = Be,
                        r = 1 / 0;
                    for (; e;) e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Be = n);
                    Xe = t, er(r)
                }(), Ye = 0
        }
    }

    function nr() {
        var t = Ge.now(),
            n = t - $e;
        n > 1e3 && (Fe -= n, $e = t)
    }

    function er(t) {
        He || (Ve && (Ve = clearTimeout(Ve)), t - Ye > 24 ? (t < 1 / 0 && (Ve = setTimeout(tr, t - Ge.now() - Fe)), Ue && (Ue = clearInterval(Ue))) : (Ue || ($e = Ge.now(), Ue = setInterval(nr, 1e3)), He = 1, Ze(tr)))
    }

    function rr(t, n, e) {
        var r = new Qe;
        return n = null == n ? 0 : +n, r.restart((e => {
            r.stop(), t(e + n)
        }), n, e), r
    }
    Qe.prototype = Je.prototype = {
        constructor: Qe,
        restart: function (t, n, e) {
            if ("function" != typeof t) throw new TypeError("callback is not a function");
            e = (null == e ? We() : +e) + (null == n ? 0 : +n), this._next || Xe === this || (Xe ? Xe._next = this : Be = this, Xe = this), this._call = t, this._time = e, er()
        },
        stop: function () {
            this._call && (this._call = null, this._time = 1 / 0, er())
        }
    };
    var ir = je("start", "end", "cancel", "interrupt"),
        ar = [];

    function or(t, n, e, r, i, a) {
        var o = t.__transition;
        if (o) {
            if (e in o) return
        } else t.__transition = {};
        ! function (t, n, e) {
            var r, i = t.__transition;

            function a(t) {
                e.state = 1, e.timer.restart(o, e.delay, e.time), e.delay <= t && o(t - e.delay)
            }

            function o(a) {
                var s, c, h, f;
                if (1 !== e.state) return l();
                for (s in i)
                    if ((f = i[s]).name === e.name) {
                        if (3 === f.state) return rr(o);
                        4 === f.state ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", t, t.__data__, f.index, f.group), delete i[s]) : +s < n && (f.state = 6, f.timer.stop(), f.on.call("cancel", t, t.__data__, f.index, f.group), delete i[s])
                    } if (rr((function () {
                        3 === e.state && (e.state = 4, e.timer.restart(u, e.delay, e.time), u(a))
                    })), e.state = 2, e.on.call("start", t, t.__data__, e.index, e.group), 2 === e.state) {
                    for (e.state = 3, r = new Array(h = e.tween.length), s = 0, c = -1; s < h; ++s)(f = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (r[++c] = f);
                    r.length = c + 1
                }
            }

            function u(n) {
                for (var i = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(l), e.state = 5, 1), a = -1, o = r.length; ++a < o;) r[a].call(t, i);
                5 === e.state && (e.on.call("end", t, t.__data__, e.index, e.group), l())
            }

            function l() {
                for (var r in e.state = 6, e.timer.stop(), delete i[n], i) return;
                delete t.__transition
            }
            i[n] = e, e.timer = Je(a, 0, e.time)
        }(t, e, {
            name: n,
            index: r,
            group: i,
            on: ir,
            tween: ar,
            time: a.time,
            delay: a.delay,
            duration: a.duration,
            ease: a.ease,
            timer: null,
            state: 0
        })
    }

    function ur(t, n) {
        var e = sr(t, n);
        if (e.state > 0) throw new Error("too late; already scheduled");
        return e
    }

    function lr(t, n) {
        var e = sr(t, n);
        if (e.state > 3) throw new Error("too late; already running");
        return e
    }

    function sr(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e
    }

    function cr(t, n) {
        var e, r;
        return function () {
            var i = lr(this, t),
                a = i.tween;
            if (a !== e)
                for (var o = 0, u = (r = e = a).length; o < u; ++o)
                    if (r[o].name === n) {
                        (r = r.slice()).splice(o, 1);
                        break
                    } i.tween = r
        }
    }

    function hr(t, n, e) {
        var r, i;
        if ("function" != typeof e) throw new Error;
        return function () {
            var a = lr(this, t),
                o = a.tween;
            if (o !== r) {
                i = (r = o).slice();
                for (var u = {
                    name: n,
                    value: e
                }, l = 0, s = i.length; l < s; ++l)
                    if (i[l].name === n) {
                        i[l] = u;
                        break
                    } l === s && i.push(u)
            }
            a.tween = i
        }
    }

    function fr(t, n, e) {
        var r = t._id;
        return t.each((function () {
            var t = lr(this, r);
            (t.value || (t.value = {}))[n] = e.apply(this, arguments)
        })),
            function (t) {
                return sr(t, r).value[n]
            }
    }

    function pr(t, n) {
        var e;
        return ("number" == typeof n ? on : n instanceof Dt ? nn : (e = Dt(n)) ? (n = e, nn) : cn)(t, n)
    }

    function dr(t) {
        return function () {
            this.removeAttribute(t)
        }
    }

    function vr(t) {
        return function () {
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function yr(t, n, e) {
        var r, i, a = e + "";
        return function () {
            var o = this.getAttribute(t);
            return o === a ? null : o === r ? i : i = n(r = o, e)
        }
    }

    function gr(t, n, e) {
        var r, i, a = e + "";
        return function () {
            var o = this.getAttributeNS(t.space, t.local);
            return o === a ? null : o === r ? i : i = n(r = o, e)
        }
    }

    function mr(t, n, e) {
        var r, i, a;
        return function () {
            var o, u, l = e(this);
            if (null != l) return (o = this.getAttribute(t)) === (u = l + "") ? null : o === r && u === i ? a : (i = u, a = n(r = o, l));
            this.removeAttribute(t)
        }
    }

    function _r(t, n, e) {
        var r, i, a;
        return function () {
            var o, u, l = e(this);
            if (null != l) return (o = this.getAttributeNS(t.space, t.local)) === (u = l + "") ? null : o === r && u === i ? a : (i = u, a = n(r = o, l));
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function wr(t, n) {
        return function (e) {
            this.setAttribute(t, n.call(this, e))
        }
    }

    function xr(t, n) {
        return function (e) {
            this.setAttributeNS(t.space, t.local, n.call(this, e))
        }
    }

    function br(t, n) {
        var e, r;

        function i() {
            var i = n.apply(this, arguments);
            return i !== r && (e = (r = i) && xr(t, i)), e
        }
        return i._value = n, i
    }

    function Mr(t, n) {
        var e, r;

        function i() {
            var i = n.apply(this, arguments);
            return i !== r && (e = (r = i) && wr(t, i)), e
        }
        return i._value = n, i
    }

    function Ar(t, n) {
        return function () {
            ur(this, t).delay = +n.apply(this, arguments)
        }
    }

    function Nr(t, n) {
        return n = +n,
            function () {
                ur(this, t).delay = n
            }
    }

    function kr(t, n) {
        return function () {
            lr(this, t).duration = +n.apply(this, arguments)
        }
    }

    function Sr(t, n) {
        return n = +n,
            function () {
                lr(this, t).duration = n
            }
    }

    function Er(t, n) {
        if ("function" != typeof n) throw new Error;
        return function () {
            lr(this, t).ease = n
        }
    }

    function Tr(t, n, e) {
        var r, i, a = function (t) {
            return (t + "").trim().split(/^|\s+/).every((function (t) {
                var n = t.indexOf(".");
                return n >= 0 && (t = t.slice(0, n)), !t || "start" === t
            }))
        }(n) ? ur : lr;
        return function () {
            var o = a(this, t),
                u = o.on;
            u !== r && (i = (r = u).copy()).on(n, e), o.on = i
        }
    }
    var Cr = ft.prototype.constructor;

    function Pr(t) {
        return function () {
            this.style.removeProperty(t)
        }
    }

    function Or(t, n, e) {
        return function (r) {
            this.style.setProperty(t, n.call(this, r), e)
        }
    }

    function Rr(t, n, e) {
        var r, i;

        function a() {
            var a = n.apply(this, arguments);
            return a !== i && (r = (i = a) && Or(t, a, e)), r
        }
        return a._value = n, a
    }

    function Ir(t) {
        return function (n) {
            this.textContent = t.call(this, n)
        }
    }

    function jr(t) {
        var n, e;

        function r() {
            var r = t.apply(this, arguments);
            return r !== e && (n = (e = r) && Ir(r)), n
        }
        return r._value = t, r
    }
    var qr = 0;

    function Lr(t, n, e, r) {
        this._groups = t, this._parents = n, this._name = e, this._id = r
    }

    function zr(t) {
        return ft().transition(t)
    }

    function Dr() {
        return ++qr
    }
    var Br = ft.prototype;
    Lr.prototype = zr.prototype = {
        constructor: Lr,
        select: function (t) {
            var n = this._name,
                e = this._id;
            "function" != typeof t && (t = u(t));
            for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
                for (var l, s, c = r[o], h = c.length, f = a[o] = new Array(h), p = 0; p < h; ++p)(l = c[p]) && (s = t.call(l, l.__data__, p, c)) && ("__data__" in l && (s.__data__ = l.__data__), f[p] = s, or(f[p], n, e, p, f, sr(l, e)));
            return new Lr(a, this._parents, n, e)
        },
        selectAll: function (t) {
            var n = this._name,
                e = this._id;
            "function" != typeof t && (t = c(t));
            for (var r = this._groups, i = r.length, a = [], o = [], u = 0; u < i; ++u)
                for (var l, s = r[u], h = s.length, f = 0; f < h; ++f)
                    if (l = s[f]) {
                        for (var p, d = t.call(l, l.__data__, f, s), v = sr(l, e), y = 0, g = d.length; y < g; ++y)(p = d[y]) && or(p, n, e, y, d, v);
                        a.push(d), o.push(l)
                    } return new Lr(a, o, n, e)
        },
        filter: function (t) {
            "function" != typeof t && (t = h(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var a, o = n[i], u = o.length, l = r[i] = [], s = 0; s < u; ++s)(a = o[s]) && t.call(a, a.__data__, s, o) && l.push(a);
            return new Lr(r, this._parents, this._name, this._id)
        },
        merge: function (t) {
            if (t._id !== this._id) throw new Error;
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, a = Math.min(r, i), o = new Array(r), u = 0; u < a; ++u)
                for (var l, s = n[u], c = e[u], h = s.length, f = o[u] = new Array(h), p = 0; p < h; ++p)(l = s[p] || c[p]) && (f[p] = l);
            for (; u < r; ++u) o[u] = n[u];
            return new Lr(o, this._parents, this._name, this._id)
        },
        selection: function () {
            return new Cr(this._groups, this._parents)
        },
        transition: function () {
            for (var t = this._name, n = this._id, e = Dr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
                for (var o, u = r[a], l = u.length, s = 0; s < l; ++s)
                    if (o = u[s]) {
                        var c = sr(o, n);
                        or(o, t, e, s, u, {
                            time: c.time + c.delay + c.duration,
                            delay: 0,
                            duration: c.duration,
                            ease: c.ease
                        })
                    } return new Lr(r, this._parents, t, e)
        },
        call: Br.call,
        nodes: Br.nodes,
        node: Br.node,
        size: Br.size,
        empty: Br.empty,
        each: Br.each,
        on: function (t, n) {
            var e = this._id;
            return arguments.length < 2 ? sr(this.node(), e).on.on(t) : this.each(Tr(e, t, n))
        },
        attr: function (t, n) {
            var r = e(t),
                i = "transform" === r ? _n : pr;
            return this.attrTween(t, "function" == typeof n ? (r.local ? _r : mr)(r, i, fr(this, "attr." + t, n)) : null == n ? (r.local ? vr : dr)(r) : (r.local ? gr : yr)(r, i, n))
        },
        attrTween: function (t, n) {
            var r = "attr." + t;
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == n) return this.tween(r, null);
            if ("function" != typeof n) throw new Error;
            var i = e(t);
            return this.tween(r, (i.local ? br : Mr)(i, n))
        },
        style: function (t, n, e) {
            var r = "transform" == (t += "") ? mn : pr;
            return null == n ? this.styleTween(t, function (t, n) {
                var e, r, i;
                return function () {
                    var a = I(this, t),
                        o = (this.style.removeProperty(t), I(this, t));
                    return a === o ? null : a === e && o === r ? i : i = n(e = a, r = o)
                }
            }(t, r)).on("end.style." + t, Pr(t)) : "function" == typeof n ? this.styleTween(t, function (t, n, e) {
                var r, i, a;
                return function () {
                    var o = I(this, t),
                        u = e(this),
                        l = u + "";
                    return null == u && (this.style.removeProperty(t), l = u = I(this, t)), o === l ? null : o === r && l === i ? a : (i = l, a = n(r = o, u))
                }
            }(t, r, fr(this, "style." + t, n))).each(function (t, n) {
                var e, r, i, a, o = "style." + n,
                    u = "end." + o;
                return function () {
                    var l = lr(this, t),
                        s = l.on,
                        c = null == l.value[o] ? a || (a = Pr(n)) : void 0;
                    s === e && i === c || (r = (e = s).copy()).on(u, i = c), l.on = r
                }
            }(this._id, t)) : this.styleTween(t, function (t, n, e) {
                var r, i, a = e + "";
                return function () {
                    var o = I(this, t);
                    return o === a ? null : o === r ? i : i = n(r = o, e)
                }
            }(t, r, n), e).on("end.style." + t, null)
        },
        styleTween: function (t, n, e) {
            var r = "style." + (t += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == n) return this.tween(r, null);
            if ("function" != typeof n) throw new Error;
            return this.tween(r, Rr(t, n, null == e ? "" : e))
        },
        text: function (t) {
            return this.tween("text", "function" == typeof t ? function (t) {
                return function () {
                    var n = t(this);
                    this.textContent = null == n ? "" : n
                }
            }(fr(this, "text", t)) : function (t) {
                return function () {
                    this.textContent = t
                }
            }(null == t ? "" : t + ""))
        },
        textTween: function (t) {
            var n = "text";
            if (arguments.length < 1) return (n = this.tween(n)) && n._value;
            if (null == t) return this.tween(n, null);
            if ("function" != typeof t) throw new Error;
            return this.tween(n, jr(t))
        },
        remove: function () {
            return this.on("end.remove", function (t) {
                return function () {
                    var n = this.parentNode;
                    for (var e in this.__transition)
                        if (+e !== t) return;
                    n && n.removeChild(this)
                }
            }(this._id))
        },
        tween: function (t, n) {
            var e = this._id;
            if (t += "", arguments.length < 2) {
                for (var r, i = sr(this.node(), e).tween, a = 0, o = i.length; a < o; ++a)
                    if ((r = i[a]).name === t) return r.value;
                return null
            }
            return this.each((null == n ? cr : hr)(e, t, n))
        },
        delay: function (t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? Ar : Nr)(n, t)) : sr(this.node(), n).delay
        },
        duration: function (t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? kr : Sr)(n, t)) : sr(this.node(), n).duration
        },
        ease: function (t) {
            var n = this._id;
            return arguments.length ? this.each(Er(n, t)) : sr(this.node(), n).ease
        },
        easeVarying: function (t) {
            if ("function" != typeof t) throw new Error;
            return this.each(function (t, n) {
                return function () {
                    var e = n.apply(this, arguments);
                    if ("function" != typeof e) throw new Error;
                    lr(this, t).ease = e
                }
            }(this._id, t))
        },
        end: function () {
            var t, n, e = this,
                r = e._id,
                i = e.size();
            return new Promise((function (a, o) {
                var u = {
                    value: o
                },
                    l = {
                        value: function () {
                            0 == --i && a()
                        }
                    };
                e.each((function () {
                    var e = lr(this, r),
                        i = e.on;
                    i !== t && ((n = (t = i).copy())._.cancel.push(u), n._.interrupt.push(u), n._.end.push(l)), e.on = n
                })), 0 === i && a()
            }))
        },
        [Symbol.iterator]: Br[Symbol.iterator]
    };
    var Xr = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function (t) {
            return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
        }
    };

    function Hr(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]);)
            if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
        return e
    }

    function Vr(t, n, e) {
        var r, i, a, o, u;

        function l() {
            var s = Date.now() - o;
            s < n && s >= 0 ? r = setTimeout(l, n - s) : (r = null, e || (u = t.apply(a, i), a = i = null))
        }
        null == n && (n = 100);
        var s = function () {
            a = this, i = arguments, o = Date.now();
            var s = e && !r;
            return r || (r = setTimeout(l, n)), s && (u = t.apply(a, i), a = i = null), u
        };
        return s.clear = function () {
            r && (clearTimeout(r), r = null)
        }, s.flush = function () {
            r && (u = t.apply(a, i), a = i = null, clearTimeout(r), r = null)
        }, s
    }
    ft.prototype.interrupt = function (t) {
        return this.each((function () {
            ! function (t, n) {
                var e, r, i, a = t.__transition,
                    o = !0;
                if (a) {
                    for (i in n = null == n ? null : n + "", a) (e = a[i]).name === n ? (r = e.state > 2 && e.state < 5, e.state = 6, e.timer.stop(), e.on.call(r ? "interrupt" : "cancel", t, t.__data__, e.index, e.group), delete a[i]) : o = !1;
                    o && delete t.__transition
                }
            }(this, t)
        }))
    }, ft.prototype.transition = function (t) {
        var n, e;
        t instanceof Lr ? (n = t._id, t = t._name) : (n = Dr(), (e = Xr).time = We(), t = null == t ? null : t + "");
        for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
            for (var o, u = r[a], l = u.length, s = 0; s < l; ++s)(o = u[s]) && or(o, t, n, s, u, e || Hr(o, n));
        return new Lr(r, this._parents, t, n)
    }, Vr.debounce = Vr;
    var Ur = Vr;

    function $r(t, n) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || function (t, n) {
            if (!(Symbol.iterator in Object(t)) && "[object Arguments]" !== Object.prototype.toString.call(t)) return;
            var e = [],
                r = !0,
                i = !1,
                a = void 0;
            try {
                for (var o, u = t[Symbol.iterator](); !(r = (o = u.next()).done) && (e.push(o.value), !n || e.length !== n); r = !0);
            } catch (t) {
                i = !0, a = t
            } finally {
                try {
                    r || null == u.return || u.return()
                } finally {
                    if (i) throw a
                }
            }
            return e
        }(t, n) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }
    var Yr = function t(n, e) {
        var r = e.default,
            i = void 0 === r ? null : r,
            a = e.triggerUpdate,
            o = void 0 === a || a,
            u = e.onChange,
            l = void 0 === u ? function (t, n) { } : u;
        ! function (t, n) {
            if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, t), this.name = n, this.defaultVal = i, this.triggerUpdate = o, this.onChange = l
    };
    var Fr, Gr, Zr, Wr, Kr, Qr, Jr, ti, ni, ei, ri, ii, ai, oi, ui = function (t) {
        return t instanceof Function ? t : "string" == typeof t ? function (n) {
            return n[t]
        } : function (n) {
            return t
        }
    };
    return Fr = {
        props: {
            width: {
                default: window.innerWidth
            },
            height: {
                default: window.innerHeight
            },
            data: {
                onChange: function (t, n) {
                    n.needsReparse = !0
                }
            },
            children: {
                default: "children",
                onChange: function (t, n) {
                    n.needsReparse = !0
                }
            },
            sort: {
                onChange: function (t, n) {
                    n.needsReparse = !0
                }
            },
            label: {
                default: function (t) {
                    return t.name
                }
            },
            labelOrientation: {
                default: "auto"
            },
            size: {
                default: "value",
                onChange: function (t, n) {
                    n.needsReparse = !0
                }
            },
            color: {
                default: function (t) {
                    return "lightgrey"
                }
            },
            strokeColor: {
                default: function (t) {
                    return "white"
                }
            },
            minSliceAngle: {
                default: .2
            },
            maxLevels: {},
            excludeRoot: {
                default: !1,
                onChange: function (t, n) {
                    n.needsReparse = !0
                }
            },
            centerRadius: {
                default: .1
            },
            radiusScaleExponent: {
                default: .5
            },
            showLabels: {
                default: !0
            },
            tooltipContent: {
                default: function (t) {
                    return ""
                },
                triggerUpdate: !1
            },
            tooltipTitle: {
                default: null,
                triggerUpdate: !1
            },
            showTooltip: {
                default: function (t) {
                    return !0
                },
                triggerUpdate: !1
            },
            focusOnNode: {
                onChange: function (t, n) {
                    t && n.initialised && function t(e) {
                        n.svg.selectAll(".slice").filter((function (t) {
                            return t === e
                        })).each((function (n) {
                            this.parentNode.appendChild(this), n.parent && t(n.parent)
                        }))
                    }(t.__dataNode)
                }
            },
            onClick: {
                triggerUpdate: !1
            },
            onHover: {
                triggerUpdate: !1
            }
        },
        methods: {
            _parseData: function (t) {
                if (t.data) {
                    var n = Jn(t.data, ui(t.children)).sum(ui(t.size));
                    if (t.sort && n.sort(t.sort), oe().padding(0)(n), t.excludeRoot) {
                        var e = Yn().domain([n.y1 - n.y0, 1]);
                        n.descendants().forEach((function (t) {
                            t.y0 = e(t.y0), t.y1 = e(t.y1)
                        }))
                    }
                    n.descendants().forEach((function (t, n) {
                        t.id = n, t.data.__dataNode = t
                    })), t.layoutData = n.descendants()
                }
            }
        },
        aliases: {
            onNodeClick: "onClick"
        },
        init: function (t, n) {
            var e = this;
            n.chartId = Math.round(1e12 * Math.random()), n.radiusScale = Kn(), n.angleScale = Yn().domain([0, 10]).range([0, 2 * Math.PI]).clamp(!0), n.arc = function () {
                var t = Se,
                    n = Ee,
                    e = pe(0),
                    r = null,
                    i = Te,
                    a = Ce,
                    o = Pe,
                    u = null;

                function l() {
                    var l, s, c = +t.apply(this, arguments),
                        h = +n.apply(this, arguments),
                        f = i.apply(this, arguments) - Me,
                        p = a.apply(this, arguments) - Me,
                        d = de(p - f),
                        v = p > f;
                    if (u || (u = l = fe()), h < c && (s = h, h = c, c = s), h > xe)
                        if (d > Ae - xe) u.moveTo(h * ye(f), h * _e(f)), u.arc(0, 0, h, f, p, !v), c > xe && (u.moveTo(c * ye(p), c * _e(p)), u.arc(0, 0, c, p, f, v));
                        else {
                            var y, g, m = f,
                                _ = p,
                                w = f,
                                x = p,
                                b = d,
                                M = d,
                                A = o.apply(this, arguments) / 2,
                                N = A > xe && (r ? +r.apply(this, arguments) : we(c * c + h * h)),
                                k = me(de(h - c) / 2, +e.apply(this, arguments)),
                                S = k,
                                E = k;
                            if (N > xe) {
                                var T = ke(N / c * _e(A)),
                                    C = ke(N / h * _e(A));
                                (b -= 2 * T) > xe ? (w += T *= v ? 1 : -1, x -= T) : (b = 0, w = x = (f + p) / 2), (M -= 2 * C) > xe ? (m += C *= v ? 1 : -1, _ -= C) : (M = 0, m = _ = (f + p) / 2)
                            }
                            var P = h * ye(m),
                                O = h * _e(m),
                                R = c * ye(x),
                                I = c * _e(x);
                            if (k > xe) {
                                var j, q = h * ye(_),
                                    L = h * _e(_),
                                    z = c * ye(w),
                                    D = c * _e(w);
                                if (d < be && (j = Oe(P, O, z, D, q, L, R, I))) {
                                    var B = P - j[0],
                                        X = O - j[1],
                                        H = q - j[0],
                                        V = L - j[1],
                                        U = 1 / _e(Ne((B * H + X * V) / (we(B * B + X * X) * we(H * H + V * V))) / 2),
                                        $ = we(j[0] * j[0] + j[1] * j[1]);
                                    S = me(k, (c - $) / (U - 1)), E = me(k, (h - $) / (U + 1))
                                }
                            }
                            M > xe ? E > xe ? (y = Re(z, D, P, O, h, E, v), g = Re(q, L, R, I, h, E, v), u.moveTo(y.cx + y.x01, y.cy + y.y01), E < k ? u.arc(y.cx, y.cy, E, ve(y.y01, y.x01), ve(g.y01, g.x01), !v) : (u.arc(y.cx, y.cy, E, ve(y.y01, y.x01), ve(y.y11, y.x11), !v), u.arc(0, 0, h, ve(y.cy + y.y11, y.cx + y.x11), ve(g.cy + g.y11, g.cx + g.x11), !v), u.arc(g.cx, g.cy, E, ve(g.y11, g.x11), ve(g.y01, g.x01), !v))) : (u.moveTo(P, O), u.arc(0, 0, h, m, _, !v)) : u.moveTo(P, O), c > xe && b > xe ? S > xe ? (y = Re(R, I, q, L, c, -S, v), g = Re(P, O, z, D, c, -S, v), u.lineTo(y.cx + y.x01, y.cy + y.y01), S < k ? u.arc(y.cx, y.cy, S, ve(y.y01, y.x01), ve(g.y01, g.x01), !v) : (u.arc(y.cx, y.cy, S, ve(y.y01, y.x01), ve(y.y11, y.x11), !v), u.arc(0, 0, c, ve(y.cy + y.y11, y.cx + y.x11), ve(g.cy + g.y11, g.cx + g.x11), v), u.arc(g.cx, g.cy, S, ve(g.y11, g.x11), ve(g.y01, g.x01), !v))) : u.arc(0, 0, c, x, w, v) : u.lineTo(R, I)
                        }
                    else u.moveTo(0, 0);
                    if (u.closePath(), l) return u = null, l + "" || null
                }
                return l.centroid = function () {
                    var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2,
                        r = (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - be / 2;
                    return [ye(r) * e, _e(r) * e]
                }, l.innerRadius = function (n) {
                    return arguments.length ? (t = "function" == typeof n ? n : pe(+n), l) : t
                }, l.outerRadius = function (t) {
                    return arguments.length ? (n = "function" == typeof t ? t : pe(+t), l) : n
                }, l.cornerRadius = function (t) {
                    return arguments.length ? (e = "function" == typeof t ? t : pe(+t), l) : e
                }, l.padRadius = function (t) {
                    return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : pe(+t), l) : r
                }, l.startAngle = function (t) {
                    return arguments.length ? (i = "function" == typeof t ? t : pe(+t), l) : i
                }, l.endAngle = function (t) {
                    return arguments.length ? (a = "function" == typeof t ? t : pe(+t), l) : a
                }, l.padAngle = function (t) {
                    return arguments.length ? (o = "function" == typeof t ? t : pe(+t), l) : o
                }, l.context = function (t) {
                    return arguments.length ? (u = null == t ? null : t, l) : u
                }, l
            }().startAngle((function (t) {
                return n.angleScale(t.x0)
            })).endAngle((function (t) {
                return n.angleScale(t.x1)
            })).innerRadius((function (t) {
                return Math.max(0, n.radiusScale(t.y0))
            })).outerRadius((function (t) {
                return Math.max(0, n.radiusScale(t.y1))
            }));
            var r = function (t) {
                return "string" == typeof t ? new ht([
                    [document.querySelector(t)]
                ], [document.documentElement]) : new ht([
                    [t]
                ], ct)
            }(t).append("div").attr("class", "sunburst-viz");
            n.svg = r.append("svg"), n.canvas = n.svg.append("g"), n.tooltip = r.append("div").attr("class", "sunburst-tooltip"), r.on("mousemove", (function (t) {
                var e = function (t, n) {
                    if (t = function (t) {
                        let n;
                        for (; n = t.sourceEvent;) t = n;
                        return t
                    }(t), void 0 === n && (n = t.currentTarget), n) {
                        var e = n.ownerSVGElement || n;
                        if (e.createSVGPoint) {
                            var r = e.createSVGPoint();
                            return r.x = t.clientX, r.y = t.clientY, [(r = r.matrixTransform(n.getScreenCTM().inverse())).x, r.y]
                        }
                        if (n.getBoundingClientRect) {
                            var i = n.getBoundingClientRect();
                            return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop]
                        }
                    }
                    return [t.pageX, t.pageY]
                }(t);
                n.tooltip.style("left", e[0] + "px").style("top", e[1] + "px").style("transform", "translate(-".concat(e[0] / n.width * 100, "%, 21px)"))
            })), n.svg.on("click", (function () {
                return (n.onClick || e.focusOnNode)(null)
            })).on("mouseover", (function () {
                return n.onHover && n.onHover(null)
            }))
        },
        update: function (t) {
            var n = this;
            t.needsReparse && (this._parseData(), t.needsReparse = !1);
            var e = Math.min(t.width, t.height) / 2;
            if (t.radiusScale.range([e * Math.max(0, Math.min(1, t.centerRadius)), e]), t.radiusScaleExponent > 0 && t.radiusScale.exponent(t.radiusScaleExponent), t.svg.style("width", t.width + "px").style("height", t.height + "px").attr("viewBox", "".concat(-t.width / 2, " ").concat(-t.height / 2, " ").concat(t.width, " ").concat(t.height)), t.layoutData) {
                var r = t.focusOnNode && t.focusOnNode.__dataNode.y0 >= 0 && t.focusOnNode.__dataNode || {
                    x0: 0,
                    x1: 1,
                    y0: 0,
                    y1: 1
                },
                    i = t.canvas.selectAll(".slice").data(t.layoutData.filter((function (n) {
                        return n.x1 >= r.x0 && n.x0 <= r.x1 && (n.x1 - n.x0) / (r.x1 - r.x0) > t.minSliceAngle / 360 && (!t.maxLevels || n.depth - (r.depth || (t.excludeRoot ? 1 : 0)) < t.maxLevels) && (n.y0 >= 0 || r.parent)
                    })), (function (t) {
                        return t.id
                    })),
                    a = ui(t.label),
                    o = ui(t.color),
                    u = ui(t.strokeColor),
                    l = zr().duration(750),
                    s = t.layoutData[0].y1 - t.layoutData[0].y0,
                    c = Math.min(1, r.y0 + s * Math.min(r.hasOwnProperty("height") ? r.height + 1 : 1 / 0, t.maxLevels || 1 / 0));
                t.svg.transition(l).tween("scale", (function () {
                    var n = hn(t.angleScale.domain(), [r.x0, r.x1]),
                        e = hn(t.radiusScale.domain(), [r.y0, c]);
                    return function (r) {
                        t.angleScale.domain(n(r)), t.radiusScale.domain(e(r))
                    }
                }));
                var h = i.exit().transition(l).style("opacity", 0).remove();
                h.select("path.main-arc").attrTween("d", (function (n) {
                    return function () {
                        return t.arc(n)
                    }
                })), h.select("path.hidden-arc").attrTween("d", (function (t) {
                    return function () {
                        return m(t)
                    }
                }));
                var f = i.enter().append("g").attr("class", "slice").style("opacity", 0).on("click", (function (e, r) {
                    e.stopPropagation(), (t.onClick || n.focusOnNode)(r.data)
                })).on("mouseover", (function (n, e) {
                    n.stopPropagation(), t.onHover && t.onHover(e.data), t.tooltip.style("display", t.showTooltip(e.data, e) ? "inline" : "none"), t.tooltip.html('<div class="tooltip-title">'.concat(t.tooltipTitle ? t.tooltipTitle(e.data, e) : function (t) {
                        for (var n = [], e = t; e;) n.unshift(e), e = e.parent;
                        return n
                    }(e).slice(t.excludeRoot ? 1 : 0).map((function (t) {
                        return a(t.data)
                    })).join(" &rarr; "), "</div>").concat(t.tooltipContent(e.data, e)))
                })).on("mouseout", (function () {
                    t.tooltip.style("display", "none")
                }));
                f.append("path").attr("class", "main-arc").style("stroke", (function (t) {
                    return u(t.data, t.parent)
                })).style("fill", (function (t) {
                    return o(t.data, t.parent)
                })), f.append("path").attr("class", "hidden-arc").attr("id", (function (n) {
                    return "hidden-arc-".concat(t.chartId, "-").concat(n.id)
                }));
                var p = f.append("text").attr("class", "angular-label");
                p.append("textPath").attr("class", "text-contour").attr("startOffset", "50%").attr("xlink:href", (function (n) {
                    return "#hidden-arc-".concat(t.chartId, "-").concat(n.id)
                })), p.append("textPath").attr("class", "text-stroke").attr("startOffset", "50%").attr("xlink:href", (function (n) {
                    return "#hidden-arc-".concat(t.chartId, "-").concat(n.id)
                }));
                var d = f.append("g").attr("class", "radial-label");
                d.append("text").attr("class", "text-contour"), d.append("text").attr("class", "text-stroke");
                var v = i.merge(f);
                v.style("opacity", 1), v.select("path.main-arc").transition(l).attrTween("d", (function (n) {
                    return function () {
                        return t.arc(n)
                    }
                })).style("stroke", (function (t) {
                    return u(t.data, t.parent)
                })).style("fill", (function (t) {
                    return o(t.data, t.parent)
                }));
                var y = t.showLabels && ["angular", "auto"].includes(t.labelOrientation.toLowerCase()),
                    g = t.showLabels && ["radial", "auto"].includes(t.labelOrientation.toLowerCase());
                y && v.select("path.hidden-arc").transition(l).attrTween("d", (function (t) {
                    return function () {
                        return m(t)
                    }
                })), v.selectAll("text.angular-label").select("textPath.text-contour"), v.selectAll("text.angular-label").select("textPath.text-stroke"), v.selectAll("g.radial-label").select("text.text-contour"), v.selectAll("g.radial-label").select("text.text-stroke"), v.select(".angular-label").transition(l).styleTween("display", (function (n) {
                    return function () {
                        return y && ("auto" === t.labelOrientation ? "angular" === x(n) : _(n)) ? null : "none"
                    }
                })), v.select(".radial-label").transition(l).styleTween("display", (function (n) {
                    return function () {
                        return g && ("auto" === t.labelOrientation ? "radial" === x(n) : w(n)) ? null : "none"
                    }
                })), y && v.selectAll("text.angular-label").selectAll("textPath").text((function (t) {
                    return a(t.data)
                })), g && v.selectAll("g.radial-label").selectAll("text").text((function (t) {
                    return a(t.data)
                })).transition(l).attrTween("transform", (function (n) {
                    return function () {
                        return function (n) {
                            var e = (t.angleScale(n.x0) + t.angleScale(n.x1) - Math.PI) / 2,
                                r = Math.max(0, (t.radiusScale(n.y0) + t.radiusScale(n.y1)) / 2),
                                i = r * Math.cos(e),
                                a = r * Math.sin(e),
                                o = 180 * e / Math.PI;
                            return e > Math.PI / 2 && e < 3 * Math.PI / 2 && (o += 180), "translate(".concat(i, ", ").concat(a, ") rotate(").concat(o, ")")
                        }(n)
                    }
                }))
            }

            function m(n) {
                var e = Math.PI / 2,
                    r = [t.angleScale(n.x0) - e, t.angleScale(n.x1) - e],
                    i = Math.max(0, (t.radiusScale(n.y0) + t.radiusScale(n.y1)) / 2);
                if (!(i && r[1] - r[0])) return "";
                var a = (r[1] + r[0]) / 2,
                    o = a > 0 && a < Math.PI;
                o && r.reverse();
                var u = fe();
                return u.arc(0, 0, i, r[0], r[1], o), u.toString()
            }

            function _(n) {
                var e = t.angleScale(n.x1) - t.angleScale(n.x0),
                    r = Math.max(0, (t.radiusScale(n.y0) + t.radiusScale(n.y1)) / 2) * e;
                return 7 * a(n.data).toString().length < r
            }

            function w(n) {
                if (t.radiusScale(n.y0) * (t.angleScale(n.x1) - t.angleScale(n.x0)) < 14) return !1;
                var e = t.radiusScale(n.y1) - t.radiusScale(n.y0);
                return 7 * a(n.data).toString().length < e
            }

            function x(n) {
                var e = (t.angleScale(n.x0) + t.angleScale(n.x1)) / 2 % Math.PI;
                return e > Math.PI / 4 && e < 3 * Math.PI / 4 ? w(n) ? "radial" : _(n) ? "angular" : null : _(n) ? "angular" : w(n) ? "radial" : null
            }
        }
    }, Gr = Fr.stateInit, Zr = void 0 === Gr ? function () {
        return {}
    } : Gr, Wr = Fr.props, Kr = void 0 === Wr ? {} : Wr, Qr = Fr.methods, Jr = void 0 === Qr ? {} : Qr, ti = Fr.aliases, ni = void 0 === ti ? {} : ti, ei = Fr.init, ri = void 0 === ei ? function () { } : ei, ii = Fr.update, ai = void 0 === ii ? function () { } : ii, oi = Object.keys(Kr).map((function (t) {
        return new Yr(t, Kr[t])
    })),
        function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = Object.assign({}, Zr instanceof Function ? Zr(t) : Zr, {
                    initialised: !1
                }),
                e = {};

            function r(n) {
                return i(n, t), a(), r
            }
            var i = function (t, e) {
                ri.call(r, t, n, e), n.initialised = !0
            },
                a = Ur((function () {
                    n.initialised && (ai.call(r, n, e), e = {})
                }), 1);
            return oi.forEach((function (t) {
                r[t.name] = function (t) {
                    var i = t.name,
                        o = t.triggerUpdate,
                        u = void 0 !== o && o,
                        l = t.onChange,
                        s = void 0 === l ? function (t, n) { } : l,
                        c = t.defaultVal,
                        h = void 0 === c ? null : c;
                    return function (t) {
                        var o = n[i];
                        if (!arguments.length) return o;
                        var l = void 0 === t ? h : t;
                        return n[i] = l, s.call(r, l, n, o), !e.hasOwnProperty(i) && (e[i] = o), u && a(), r
                    }
                }(t)
            })), Object.keys(Jr).forEach((function (t) {
                r[t] = function () {
                    for (var e, i = arguments.length, a = new Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                    return (e = Jr[t]).call.apply(e, [r, n].concat(a))
                }
            })), Object.entries(ni).forEach((function (t) {
                var n = $r(t, 2),
                    e = n[0],
                    i = n[1];
                return r[e] = r[i]
            })), r.resetProps = function () {
                return oi.forEach((function (t) {
                    r[t.name](t.defaultVal)
                })), r
            }, r.resetProps(), n._rerender = a, r
        }
}));