import { defineComponent as P, h as ge, createVNode as m, mergeProps as Ve, createTextVNode as Qe, Fragment as Q, resolveComponent as E, onMounted as Ke, nextTick as me, ref as D } from "vue";
const Ge = {
  icon: {
    type: String,
    default: "ep:add-location"
  },
  inline: {
    type: Boolean,
    default: !1
  },
  width: {
    type: [Number, String],
    default: "24px"
  },
  height: {
    type: [Number, String],
    default: "24px"
  },
  color: String,
  "h-flip": {
    type: Boolean,
    default: !1
  },
  "v-flip": {
    type: Boolean,
    default: !1
  },
  flip: String,
  /**
   * Rotate the icon by 90, 180, or 270 degrees.
   * Number values are 1 for 90 degrees, 2 for 180 degrees, 3 for 270 degrees.
   */
  rotate: Number
}, A = /^[a-z0-9]+(-[a-z0-9]+)*$/, K = (e, t, n, s = "") => {
  const o = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (o.length < 2 || o.length > 3)
      return null;
    s = o.shift().slice(1);
  }
  if (o.length > 3 || !o.length)
    return null;
  if (o.length > 1) {
    const c = o.pop(), u = o.pop(), l = {
      // Allow provider without '@': "provider:prefix:name"
      provider: o.length > 0 ? o[0] : s,
      prefix: u,
      name: c
    };
    return t && !Y(l) ? null : l;
  }
  const r = o[0], i = r.split("-");
  if (i.length > 1) {
    const c = {
      provider: s,
      prefix: i.shift(),
      name: i.join("-")
    };
    return t && !Y(c) ? null : c;
  }
  if (n && s === "") {
    const c = {
      provider: s,
      prefix: "",
      name: r
    };
    return t && !Y(c, n) ? null : c;
  }
  return null;
}, Y = (e, t) => e ? !!((e.provider === "" || e.provider.match(A)) && (t && e.prefix === "" || e.prefix.match(A)) && e.name.match(A)) : !1, Pe = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), U = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), G = Object.freeze({
  ...Pe,
  ...U
}), ee = Object.freeze({
  ...G,
  body: "",
  hidden: !1
});
function Je(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const s = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return s && (n.rotate = s), n;
}
function ve(e, t) {
  const n = Je(e, t);
  for (const s in ee)
    s in U ? s in e && !(s in n) && (n[s] = U[s]) : s in t ? n[s] = t[s] : s in e && (n[s] = e[s]);
  return n;
}
function Ze(e, t) {
  const n = e.icons, s = e.aliases || /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  function r(i) {
    if (n[i])
      return o[i] = [];
    if (!(i in o)) {
      o[i] = null;
      const c = s[i] && s[i].parent, u = c && r(c);
      u && (o[i] = [c].concat(u));
    }
    return o[i];
  }
  return (t || Object.keys(n).concat(Object.keys(s))).forEach(r), o;
}
function Re(e, t, n) {
  const s = e.icons, o = e.aliases || /* @__PURE__ */ Object.create(null);
  let r = {};
  function i(c) {
    r = ve(
      s[c] || o[c],
      r
    );
  }
  return i(t), n.forEach(i), ve(e, r);
}
function We(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return n;
  e.not_found instanceof Array && e.not_found.forEach((o) => {
    t(o, null), n.push(o);
  });
  const s = Ze(e);
  for (const o in s) {
    const r = s[o];
    r && (t(o, Re(e, o, r)), n.push(o));
  }
  return n;
}
const et = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Pe
};
function Z(e, t) {
  for (const n in t)
    if (n in e && typeof e[n] != typeof t[n])
      return !1;
  return !0;
}
function De(e) {
  if (typeof e != "object" || e === null)
    return null;
  const t = e;
  if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !Z(e, et))
    return null;
  const n = t.icons;
  for (const o in n) {
    const r = n[o];
    if (!o.match(A) || typeof r.body != "string" || !Z(
      r,
      ee
    ))
      return null;
  }
  const s = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const o in s) {
    const r = s[o], i = r.parent;
    if (!o.match(A) || typeof i != "string" || !n[i] && !s[i] || !Z(
      r,
      ee
    ))
      return null;
  }
  return t;
}
const we = /* @__PURE__ */ Object.create(null);
function tt(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function j(e, t) {
  const n = we[e] || (we[e] = /* @__PURE__ */ Object.create(null));
  return n[t] || (n[t] = tt(e, t));
}
function le(e, t) {
  return De(t) ? We(t, (n, s) => {
    s ? e.icons[n] = s : e.missing.add(n);
  }) : [];
}
function nt(e, t, n) {
  try {
    if (typeof n.body == "string")
      return e.icons[t] = { ...n }, !0;
  } catch {
  }
  return !1;
}
let N = !1;
function $e(e) {
  return typeof e == "boolean" && (N = e), N;
}
function ot(e) {
  const t = typeof e == "string" ? K(e, !0, N) : e;
  if (t) {
    const n = j(t.provider, t.prefix), s = t.name;
    return n.icons[s] || (n.missing.has(s) ? null : void 0);
  }
}
function st(e, t) {
  const n = K(e, !0, N);
  if (!n)
    return !1;
  const s = j(n.provider, n.prefix);
  return nt(s, n.name, t);
}
function rt(e, t) {
  if (typeof e != "object")
    return !1;
  if (typeof t != "string" && (t = e.provider || ""), N && !t && !e.prefix) {
    let o = !1;
    return De(e) && (e.prefix = "", We(e, (r, i) => {
      i && st(r, i) && (o = !0);
    })), o;
  }
  const n = e.prefix;
  if (!Y({
    provider: t,
    prefix: n,
    name: "a"
  }))
    return !1;
  const s = j(t, n);
  return !!le(s, e);
}
const Ae = Object.freeze({
  width: null,
  height: null
}), Fe = Object.freeze({
  // Dimensions
  ...Ae,
  // Transformations
  ...U
}), it = /(-?[0-9.]*[0-9]+[0-9.]*)/g, ct = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ye(e, t, n) {
  if (t === 1)
    return e;
  if (n = n || 100, typeof e == "number")
    return Math.ceil(e * t * n) / n;
  if (typeof e != "string")
    return e;
  const s = e.split(it);
  if (s === null || !s.length)
    return e;
  const o = [];
  let r = s.shift(), i = ct.test(r);
  for (; ; ) {
    if (i) {
      const c = parseFloat(r);
      isNaN(c) ? o.push(r) : o.push(Math.ceil(c * t * n) / n);
    } else
      o.push(r);
    if (r = s.shift(), r === void 0)
      return o.join("");
    i = !i;
  }
}
const lt = (e) => e === "unset" || e === "undefined" || e === "none";
function ut(e, t) {
  const n = {
    ...G,
    ...e
  }, s = {
    ...Fe,
    ...t
  }, o = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let r = n.body;
  [n, s].forEach((y) => {
    const h = [], g = y.hFlip, I = y.vFlip;
    let M = y.rotate;
    g ? I ? M += 2 : (h.push(
      "translate(" + (o.width + o.left).toString() + " " + (0 - o.top).toString() + ")"
    ), h.push("scale(-1 1)"), o.top = o.left = 0) : I && (h.push(
      "translate(" + (0 - o.left).toString() + " " + (o.height + o.top).toString() + ")"
    ), h.push("scale(1 -1)"), o.top = o.left = 0);
    let S;
    switch (M < 0 && (M -= Math.floor(M / 4) * 4), M = M % 4, M) {
      case 1:
        S = o.height / 2 + o.top, h.unshift(
          "rotate(90 " + S.toString() + " " + S.toString() + ")"
        );
        break;
      case 2:
        h.unshift(
          "rotate(180 " + (o.width / 2 + o.left).toString() + " " + (o.height / 2 + o.top).toString() + ")"
        );
        break;
      case 3:
        S = o.width / 2 + o.left, h.unshift(
          "rotate(-90 " + S.toString() + " " + S.toString() + ")"
        );
        break;
    }
    M % 2 === 1 && (o.left !== o.top && (S = o.left, o.left = o.top, o.top = S), o.width !== o.height && (S = o.width, o.width = o.height, o.height = S)), h.length && (r = '<g transform="' + h.join(" ") + '">' + r + "</g>");
  });
  const i = s.width, c = s.height, u = o.width, l = o.height;
  let a, f;
  i === null ? (f = c === null ? "1em" : c === "auto" ? l : c, a = ye(f, u / l)) : (a = i === "auto" ? u : i, f = c === null ? ye(a, l / u) : c === "auto" ? l : c);
  const p = {}, v = (y, h) => {
    lt(h) || (p[y] = h.toString());
  };
  return v("width", a), v("height", f), p.viewBox = o.left.toString() + " " + o.top.toString() + " " + u.toString() + " " + l.toString(), {
    attributes: p,
    body: r
  };
}
const at = /\sid="(\S+)"/g, ft = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let dt = 0;
function pt(e, t = ft) {
  const n = [];
  let s;
  for (; s = at.exec(e); )
    n.push(s[1]);
  if (!n.length)
    return e;
  const o = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((r) => {
    const i = typeof t == "function" ? t(r) : t + (dt++).toString(), c = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + c + ')([")]|\\.[a-z])', "g"),
      "$1" + i + o + "$3"
    );
  }), e = e.replace(new RegExp(o, "g"), ""), e;
}
const te = /* @__PURE__ */ Object.create(null);
function ht(e, t) {
  te[e] = t;
}
function ne(e) {
  return te[e] || te[""];
}
function ue(e) {
  let t;
  if (typeof e.resources == "string")
    t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const ae = /* @__PURE__ */ Object.create(null), $ = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], H = [];
for (; $.length > 0; )
  $.length === 1 || Math.random() > 0.5 ? H.push($.shift()) : H.push($.pop());
ae[""] = ue({
  resources: ["https://api.iconify.design"].concat(H)
});
function gt(e, t) {
  const n = ue(t);
  return n === null ? !1 : (ae[e] = n, !0);
}
function fe(e) {
  return ae[e];
}
const mt = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let be = mt();
function vt(e, t) {
  const n = fe(e);
  if (!n)
    return 0;
  let s;
  if (!n.maxURL)
    s = 0;
  else {
    let o = 0;
    n.resources.forEach((i) => {
      o = Math.max(o, i.length);
    });
    const r = t + ".json?icons=";
    s = n.maxURL - o - n.path.length - r.length;
  }
  return s;
}
function wt(e) {
  return e === 404;
}
const yt = (e, t, n) => {
  const s = [], o = vt(e, t), r = "icons";
  let i = {
    type: r,
    provider: e,
    prefix: t,
    icons: []
  }, c = 0;
  return n.forEach((u, l) => {
    c += u.length + 1, c >= o && l > 0 && (s.push(i), i = {
      type: r,
      provider: e,
      prefix: t,
      icons: []
    }, c = u.length), i.icons.push(u);
  }), s.push(i), s;
};
function bt(e) {
  if (typeof e == "string") {
    const t = fe(e);
    if (t)
      return t.path;
  }
  return "/";
}
const xt = (e, t, n) => {
  if (!be) {
    n("abort", 424);
    return;
  }
  let s = bt(t.provider);
  switch (t.type) {
    case "icons": {
      const r = t.prefix, c = t.icons.join(","), u = new URLSearchParams({
        icons: c
      });
      s += r + ".json?" + u.toString();
      break;
    }
    case "custom": {
      const r = t.uri;
      s += r.slice(0, 1) === "/" ? r.slice(1) : r;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let o = 503;
  be(e + s).then((r) => {
    const i = r.status;
    if (i !== 200) {
      setTimeout(() => {
        n(wt(i) ? "abort" : "next", i);
      });
      return;
    }
    return o = 501, r.json();
  }).then((r) => {
    if (typeof r != "object" || r === null) {
      setTimeout(() => {
        r === 404 ? n("abort", r) : n("next", o);
      });
      return;
    }
    setTimeout(() => {
      n("success", r);
    });
  }).catch(() => {
    n("next", o);
  });
}, It = {
  prepare: yt,
  send: xt
};
function Mt(e) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  e.sort((o, r) => o.provider !== r.provider ? o.provider.localeCompare(r.provider) : o.prefix !== r.prefix ? o.prefix.localeCompare(r.prefix) : o.name.localeCompare(r.name));
  let s = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((o) => {
    if (s.name === o.name && s.prefix === o.prefix && s.provider === o.provider)
      return;
    s = o;
    const r = o.provider, i = o.prefix, c = o.name, u = n[r] || (n[r] = /* @__PURE__ */ Object.create(null)), l = u[i] || (u[i] = j(r, i));
    let a;
    c in l.icons ? a = t.loaded : i === "" || l.missing.has(c) ? a = t.missing : a = t.pending;
    const f = {
      provider: r,
      prefix: i,
      name: c
    };
    a.push(f);
  }), t;
}
function Ne(e, t) {
  e.forEach((n) => {
    const s = n.loaderCallbacks;
    s && (n.loaderCallbacks = s.filter((o) => o.id !== t));
  });
}
function St(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let n = !1;
    const s = e.provider, o = e.prefix;
    t.forEach((r) => {
      const i = r.icons, c = i.pending.length;
      i.pending = i.pending.filter((u) => {
        if (u.prefix !== o)
          return !0;
        const l = u.name;
        if (e.icons[l])
          i.loaded.push({
            provider: s,
            prefix: o,
            name: l
          });
        else if (e.missing.has(l))
          i.missing.push({
            provider: s,
            prefix: o,
            name: l
          });
        else
          return n = !0, !0;
        return !1;
      }), i.pending.length !== c && (n || Ne([e], r.id), r.callback(
        i.loaded.slice(0),
        i.missing.slice(0),
        i.pending.slice(0),
        r.abort
      ));
    });
  }));
}
let kt = 0;
function Ct(e, t, n) {
  const s = kt++, o = Ne.bind(null, n, s);
  if (!t.pending.length)
    return o;
  const r = {
    id: s,
    icons: t,
    callback: e,
    abort: o
  };
  return n.forEach((i) => {
    (i.loaderCallbacks || (i.loaderCallbacks = [])).push(r);
  }), o;
}
function Et(e, t = !0, n = !1) {
  const s = [];
  return e.forEach((o) => {
    const r = typeof o == "string" ? K(o, t, n) : o;
    r && s.push(r);
  }), s;
}
var Lt = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Ot(e, t, n, s) {
  const o = e.resources.length, r = e.random ? Math.floor(Math.random() * o) : e.index;
  let i;
  if (e.random) {
    let w = e.resources.slice(0);
    for (i = []; w.length > 1; ) {
      const L = Math.floor(Math.random() * w.length);
      i.push(w[L]), w = w.slice(0, L).concat(w.slice(L + 1));
    }
    i = i.concat(w);
  } else
    i = e.resources.slice(r).concat(e.resources.slice(0, r));
  const c = Date.now();
  let u = "pending", l = 0, a, f = null, p = [], v = [];
  typeof s == "function" && v.push(s);
  function y() {
    f && (clearTimeout(f), f = null);
  }
  function h() {
    u === "pending" && (u = "aborted"), y(), p.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), p = [];
  }
  function g(w, L) {
    L && (v = []), typeof w == "function" && v.push(w);
  }
  function I() {
    return {
      startTime: c,
      payload: t,
      status: u,
      queriesSent: l,
      queriesPending: p.length,
      subscribe: g,
      abort: h
    };
  }
  function M() {
    u = "failed", v.forEach((w) => {
      w(void 0, a);
    });
  }
  function S() {
    p.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), p = [];
  }
  function x(w, L, W) {
    const z = L !== "success";
    switch (p = p.filter((T) => T !== w), u) {
      case "pending":
        break;
      case "failed":
        if (z || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (L === "abort") {
      a = W, M();
      return;
    }
    if (z) {
      a = W, p.length || (i.length ? O() : M());
      return;
    }
    if (y(), S(), !e.random) {
      const T = e.resources.indexOf(w.resource);
      T !== -1 && T !== e.index && (e.index = T);
    }
    u = "completed", v.forEach((T) => {
      T(W);
    });
  }
  function O() {
    if (u !== "pending")
      return;
    y();
    const w = i.shift();
    if (w === void 0) {
      if (p.length) {
        f = setTimeout(() => {
          y(), u === "pending" && (S(), M());
        }, e.timeout);
        return;
      }
      M();
      return;
    }
    const L = {
      status: "pending",
      resource: w,
      callback: (W, z) => {
        x(L, W, z);
      }
    };
    p.push(L), l++, f = setTimeout(O, e.rotate), n(w, t, L.callback);
  }
  return setTimeout(O), I;
}
function Be(e) {
  const t = {
    ...Lt,
    ...e
  };
  let n = [];
  function s() {
    n = n.filter((c) => c().status === "pending");
  }
  function o(c, u, l) {
    const a = Ot(
      t,
      c,
      u,
      (f, p) => {
        s(), l && l(f, p);
      }
    );
    return n.push(a), a;
  }
  function r(c) {
    return n.find((u) => c(u)) || null;
  }
  return {
    query: o,
    find: r,
    setIndex: (c) => {
      t.index = c;
    },
    getIndex: () => t.index,
    cleanup: s
  };
}
function xe() {
}
const R = /* @__PURE__ */ Object.create(null);
function Tt(e) {
  if (!R[e]) {
    const t = fe(e);
    if (!t)
      return;
    const n = Be(t), s = {
      config: t,
      redundancy: n
    };
    R[e] = s;
  }
  return R[e];
}
function jt(e, t, n) {
  let s, o;
  if (typeof e == "string") {
    const r = ne(e);
    if (!r)
      return n(void 0, 424), xe;
    o = r.send;
    const i = Tt(e);
    i && (s = i.redundancy);
  } else {
    const r = ue(e);
    if (r) {
      s = Be(r);
      const i = e.resources ? e.resources[0] : "", c = ne(i);
      c && (o = c.send);
    }
  }
  return !s || !o ? (n(void 0, 424), xe) : s.query(t, o, n)().abort;
}
const Ie = "iconify2", B = "iconify", ze = B + "-count", Me = B + "-version", Xe = 36e5, Pt = 168;
function oe(e, t) {
  try {
    return e.getItem(t);
  } catch {
  }
}
function de(e, t, n) {
  try {
    return e.setItem(t, n), !0;
  } catch {
  }
}
function Se(e, t) {
  try {
    e.removeItem(t);
  } catch {
  }
}
function se(e, t) {
  return de(e, ze, t.toString());
}
function re(e) {
  return parseInt(oe(e, ze)) || 0;
}
const J = {
  local: !0,
  session: !0
}, Ye = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let pe = !1;
function Wt(e) {
  pe = e;
}
let X = typeof window > "u" ? {} : window;
function He(e) {
  const t = e + "Storage";
  try {
    if (X && X[t] && typeof X[t].length == "number")
      return X[t];
  } catch {
  }
  J[e] = !1;
}
function _e(e, t) {
  const n = He(e);
  if (!n)
    return;
  const s = oe(n, Me);
  if (s !== Ie) {
    if (s) {
      const c = re(n);
      for (let u = 0; u < c; u++)
        Se(n, B + u.toString());
    }
    de(n, Me, Ie), se(n, 0);
    return;
  }
  const o = Math.floor(Date.now() / Xe) - Pt, r = (c) => {
    const u = B + c.toString(), l = oe(n, u);
    if (typeof l == "string") {
      try {
        const a = JSON.parse(l);
        if (typeof a == "object" && typeof a.cached == "number" && a.cached > o && typeof a.provider == "string" && typeof a.data == "object" && typeof a.data.prefix == "string" && // Valid item: run callback
        t(a, c))
          return !0;
      } catch {
      }
      Se(n, u);
    }
  };
  let i = re(n);
  for (let c = i - 1; c >= 0; c--)
    r(c) || (c === i - 1 ? (i--, se(n, i)) : Ye[e].add(c));
}
function qe() {
  if (!pe) {
    Wt(!0);
    for (const e in J)
      _e(e, (t) => {
        const n = t.data, s = t.provider, o = n.prefix, r = j(
          s,
          o
        );
        if (!le(r, n).length)
          return !1;
        const i = n.lastModified || -1;
        return r.lastModifiedCached = r.lastModifiedCached ? Math.min(r.lastModifiedCached, i) : i, !0;
      });
  }
}
function Dt(e, t) {
  const n = e.lastModifiedCached;
  if (
    // Matches or newer
    n && n >= t
  )
    return n === t;
  if (e.lastModifiedCached = t, n)
    for (const s in J)
      _e(s, (o) => {
        const r = o.data;
        return o.provider !== e.provider || r.prefix !== e.prefix || r.lastModified === t;
      });
  return !0;
}
function $t(e, t) {
  pe || qe();
  function n(s) {
    let o;
    if (!J[s] || !(o = He(s)))
      return;
    const r = Ye[s];
    let i;
    if (r.size)
      r.delete(i = Array.from(r).shift());
    else if (i = re(o), !se(o, i + 1))
      return;
    const c = {
      cached: Math.floor(Date.now() / Xe),
      provider: e.provider,
      data: t
    };
    return de(
      o,
      B + i.toString(),
      JSON.stringify(c)
    );
  }
  t.lastModified && !Dt(e, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), n("local") || n("session"));
}
function ke() {
}
function At(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, St(e);
  }));
}
function Ft(e, t) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: n, prefix: s } = e, o = e.iconsToLoad;
    delete e.iconsToLoad;
    let r;
    if (!o || !(r = ne(n)))
      return;
    r.prepare(n, s, o).forEach((c) => {
      jt(n, c, (u) => {
        if (typeof u != "object")
          c.icons.forEach((l) => {
            e.missing.add(l);
          });
        else
          try {
            const l = le(
              e,
              u
            );
            if (!l.length)
              return;
            const a = e.pendingIcons;
            a && l.forEach((f) => {
              a.delete(f);
            }), $t(e, u);
          } catch (l) {
            console.error(l);
          }
        At(e);
      });
    });
  }));
}
const Nt = (e, t) => {
  const n = Et(e, !0, $e()), s = Mt(n);
  if (!s.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        s.loaded,
        s.missing,
        s.pending,
        ke
      );
    }), () => {
      u = !1;
    };
  }
  const o = /* @__PURE__ */ Object.create(null), r = [];
  let i, c;
  return s.pending.forEach((u) => {
    const { provider: l, prefix: a } = u;
    if (a === c && l === i)
      return;
    i = l, c = a, r.push(j(l, a));
    const f = o[l] || (o[l] = /* @__PURE__ */ Object.create(null));
    f[a] || (f[a] = []);
  }), s.pending.forEach((u) => {
    const { provider: l, prefix: a, name: f } = u, p = j(l, a), v = p.pendingIcons || (p.pendingIcons = /* @__PURE__ */ new Set());
    v.has(f) || (v.add(f), o[l][a].push(f));
  }), r.forEach((u) => {
    const { provider: l, prefix: a } = u;
    o[l][a].length && Ft(u, o[l][a]);
  }), t ? Ct(t, s, r) : ke;
};
function Bt(e, t) {
  const n = {
    ...e
  };
  for (const s in t) {
    const o = t[s], r = typeof o;
    s in Ae ? (o === null || o && (r === "string" || r === "number")) && (n[s] = o) : r === typeof n[s] && (n[s] = s === "rotate" ? o % 4 : o);
  }
  return n;
}
const zt = /[\s,]+/;
function Xt(e, t) {
  t.split(zt).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function Yt(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function s(o) {
    for (; o < 0; )
      o += 4;
    return o % 4;
  }
  if (n === "") {
    const o = parseInt(e);
    return isNaN(o) ? 0 : s(o);
  } else if (n !== e) {
    let o = 0;
    switch (n) {
      case "%":
        o = 25;
        break;
      case "deg":
        o = 90;
    }
    if (o) {
      let r = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(r) ? 0 : (r = r / o, r % 1 === 0 ? s(r) : 0);
    }
  }
  return t;
}
function Ht(e, t) {
  let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const s in t)
    n += " " + s + '="' + t[s] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function _t(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function qt(e) {
  return "data:image/svg+xml," + _t(e);
}
function Ut(e) {
  return 'url("' + qt(e) + '")';
}
const Ce = {
  ...Fe,
  inline: !1
}, Vt = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Qt = {
  display: "inline-block"
}, ie = {
  backgroundColor: "currentColor"
}, Ue = {
  backgroundColor: "transparent"
}, Ee = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Le = {
  webkitMask: ie,
  mask: ie,
  background: Ue
};
for (const e in Le) {
  const t = Le[e];
  for (const n in Ee)
    t[e + n] = Ee[n];
}
const _ = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  _[e + "-flip"] = t, _[e.slice(0, 1) + "-flip"] = t, _[e + "Flip"] = t;
});
function Oe(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Te = (e, t) => {
  const n = Bt(Ce, t), s = { ...Vt }, o = t.mode || "svg", r = {}, i = t.style, c = typeof i == "object" && !(i instanceof Array) ? i : {};
  for (let h in t) {
    const g = t[h];
    if (g !== void 0)
      switch (h) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          n[h] = g === !0 || g === "true" || g === 1;
          break;
        case "flip":
          typeof g == "string" && Xt(n, g);
          break;
        case "color":
          r.color = g;
          break;
        case "rotate":
          typeof g == "string" ? n[h] = Yt(g) : typeof g == "number" && (n[h] = g);
          break;
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete s["aria-hidden"];
          break;
        default: {
          const I = _[h];
          I ? (g === !0 || g === "true" || g === 1) && (n[I] = !0) : Ce[h] === void 0 && (s[h] = g);
        }
      }
  }
  const u = ut(e, n), l = u.attributes;
  if (n.inline && (r.verticalAlign = "-0.125em"), o === "svg") {
    s.style = {
      ...r,
      ...c
    }, Object.assign(s, l);
    let h = 0, g = t.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), s.innerHTML = pt(u.body, g ? () => g + "ID" + h++ : "iconifyVue"), ge("svg", s);
  }
  const { body: a, width: f, height: p } = e, v = o === "mask" || (o === "bg" ? !1 : a.indexOf("currentColor") !== -1), y = Ht(a, {
    ...l,
    width: f + "",
    height: p + ""
  });
  return s.style = {
    ...r,
    "--svg": Ut(y),
    width: Oe(l.width),
    height: Oe(l.height),
    ...Qt,
    ...v ? ie : Ue,
    ...c
  }, ge("span", s);
};
$e(!0);
ht("", It);
if (typeof document < "u" && typeof window < "u") {
  qe();
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((s) => {
      try {
        // Check if item is an object and not null/array
        (typeof s != "object" || s === null || s instanceof Array || // Check for 'icons' and 'prefix'
        typeof s.icons != "object" || typeof s.prefix != "string" || // Add icon set
        !rt(s)) && console.error(n);
      } catch {
        console.error(n);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let n in t) {
        const s = "IconifyProviders[" + n + "] is invalid.";
        try {
          const o = t[n];
          if (typeof o != "object" || !o || o.resources === void 0)
            continue;
          gt(n, o) || console.error(s);
        } catch {
          console.error(s);
        }
      }
  }
}
const Kt = {
  ...G,
  body: ""
}, Gt = P({
  // Do not inherit other attributes: it is handled by render()
  inheritAttrs: !1,
  // Set initial data
  data() {
    return {
      // Mounted status
      iconMounted: !1,
      // Callback counter to trigger re-render
      counter: 0
    };
  },
  mounted() {
    this._name = "", this._loadingIcon = null, this.iconMounted = !0;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      this._loadingIcon && (this._loadingIcon.abort(), this._loadingIcon = null);
    },
    // Get data for icon to render or null
    getIcon(e, t) {
      if (typeof e == "object" && e !== null && typeof e.body == "string")
        return this._name = "", this.abortLoading(), {
          data: e
        };
      let n;
      if (typeof e != "string" || (n = K(e, !1, !0)) === null)
        return this.abortLoading(), null;
      const s = ot(n);
      if (!s)
        return (!this._loadingIcon || this._loadingIcon.name !== e) && (this.abortLoading(), this._name = "", s !== null && (this._loadingIcon = {
          name: e,
          abort: Nt([n], () => {
            this.counter++;
          })
        })), null;
      this.abortLoading(), this._name !== e && (this._name = e, t && t(e));
      const o = ["iconify"];
      return n.prefix !== "" && o.push("iconify--" + n.prefix), n.provider !== "" && o.push("iconify--" + n.provider), { data: s, classes: o };
    }
  },
  // Render icon
  render() {
    this.counter;
    const e = this.$attrs, t = this.iconMounted ? this.getIcon(e.icon, e.onLoad) : null;
    if (!t)
      return Te(Kt, e);
    let n = e;
    return t.classes && (n = {
      ...e,
      class: (typeof e.class == "string" ? e.class + " " : "") + t.classes.join(" ")
    }), Te({
      ...G,
      ...t.data
    }, n);
  }
}), je = "mumu-icon", F = /* @__PURE__ */ P({
  name: je,
  props: Ge,
  setup(e) {
    return () => m(Gt, Ve(e, {
      class: je,
      icon: e.icon
    }), {
      default: () => [Qe("icon")]
    });
  }
});
F.name = "mumu-icon";
F.install = (e) => {
  e.component(F.name, F);
};
const Jt = {
  show: {
    type: Boolean,
    default: !1
  },
  list: {
    type: Array,
    default: []
  }
};
function C(e, t, n) {
  let o = `mu-${e}`;
  return t && (o += `__${t}`), n && (o += t ? `--${n}` : `--${n}`), o;
}
function k(e, t) {
  let s = `mu-${e}`;
  return t && (s += `--${t}`), s;
}
const ce = (e, t) => e && Array.isArray(e) && e.length > 0 ? e[t] : { title: "", url: "" }, V = (e, t) => {
  const { offsetWidth: n, offsetHeight: s } = e.value, { offsetWidth: o, offsetHeight: r } = t.value;
  e.value.style.top = (r - s - 100) / 2 + "px", e.value.style.left = (o - n) / 2 + "px";
}, d = {
  x: 0,
  // 鼠标按下时的x坐标
  y: 0,
  // 鼠标按下时的y坐标
  offsetX: 0,
  // 鼠标按下时的previewRef的left值
  offsetY: 0,
  // 鼠标按下时的previewRef的top值
  width: 0,
  // 鼠标按下时的previewRef的width值
  height: 0,
  // 鼠标按下时的previewRef的height值
  resizeing: !1,
  // 是否在调整尺寸
  draging: !1,
  // 是否在拖动
  border: ""
  // 边框类型
};
function Zt(e, t, n) {
  return {
    isWindowMax: n,
    setWindowMax: (r) => {
      r.stopPropagation(), e && (d.offsetX = e.value.offsetLeft, d.offsetY = e.value.offsetTop, d.width = e.value.offsetWidth, d.height = e.value.offsetHeight, n.value = !0, e.value.style.top = "0", e.value.style.left = "0", e.value.style.width = "100vw", e.value.style.height = "100vh", V(t, e));
    },
    setWindowNormal: (r) => {
      r.stopPropagation(), e && (n.value = !1, e.value.style.top = `${d.offsetY}px`, e.value.style.left = `${d.offsetX}px`, e.value.style.width = `${d.width}px`, e.value.style.height = `${d.height}px`, V(t, e));
    }
  };
}
function Rt(e, t) {
  const n = (r) => {
    if (!t.value && d.draging) {
      const { clientX: i, clientY: c } = r, { offsetX: u, offsetY: l } = d;
      let a = i - d.x + u, f = c - d.y + l;
      a <= 0 && (a = 0), f <= 0 && (f = 0);
      const p = window.innerWidth, v = window.innerHeight, y = p - e.value.offsetWidth, h = v - e.value.offsetHeight;
      a >= y && (a = y), f >= h && (f = h), e.value.style.left = `${a}px`, e.value.style.top = `${f}px`;
    }
  }, s = () => {
    t.value || (d.draging = !1, document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", s));
  };
  return {
    refMouseDown: (r) => {
      t.value || (d.x = r.clientX, d.y = r.clientY, d.offsetX = e.value.offsetLeft, d.offsetY = e.value.offsetTop, d.draging = !0, document.addEventListener("mousemove", n), document.addEventListener("mouseup", s));
    },
    refMouseMove: n,
    refMouseUp: s
  };
}
function en(e, t, n) {
  const s = (c) => {
    if (!n.value && d.resizeing) {
      const { clientX: u, clientY: l } = c, { offsetX: a, offsetY: f } = d, { width: p, height: v } = d, { innerWidth: y, innerHeight: h } = window, g = () => {
        const x = d.y - l > f ? f : d.y - l, O = f - x || 0, w = v + x <= 600 ? 600 : v + x;
        v + x >= 600 && (e.value.style.top = `${O}px`, e.value.style.height = `${w}px`);
      }, I = () => {
        let x = p + u - d.x;
        x <= 800 && (x = 800), x + a >= y && (x = y - a), e.value.style.width = `${x}px`;
      }, M = () => {
        let x = v + l - d.y;
        x <= 600 && (x = 600), x + f >= h && (x = h - f), e.value.style.height = `${x}px`;
      }, S = () => {
        const x = d.x - u > a ? a : d.x - u, O = a - x || 0, w = p + x <= 800 ? 800 : p + x;
        p + x >= 800 && (e.value.style.left = `${O}px`, e.value.style.width = `${w}px`);
      };
      switch (d.border) {
        case "t": {
          g();
          break;
        }
        case "r": {
          I();
          break;
        }
        case "b": {
          M();
          break;
        }
        case "l": {
          S();
          break;
        }
        case "tl": {
          g(), S();
          break;
        }
        case "tr": {
          g(), I();
          break;
        }
        case "bl": {
          M(), S();
          break;
        }
        case "br": {
          M(), I();
          break;
        }
      }
      V(t, e);
    }
  }, o = () => {
    n.value || (d.resizeing = !1, document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", o));
  };
  return {
    borderMouseDown: (c) => {
      if (c.stopPropagation(), !n.value) {
        d.x = c.clientX, d.y = c.clientY, d.offsetX = e.value.offsetLeft, d.offsetY = e.value.offsetTop, d.width = e.value.offsetWidth, d.height = e.value.offsetHeight, d.resizeing = !0;
        const u = c.target;
        u.className && (d.border = u.className.slice(-1)), document.addEventListener("mousemove", s), document.addEventListener("mouseup", o);
      }
    },
    borderMouseMove: s,
    borderMouseUp: o,
    cornerMouseDown: (c) => {
      if (c.stopPropagation(), !n.value) {
        d.x = c.clientX, d.y = c.clientY, d.offsetX = e.value.offsetLeft, d.offsetY = e.value.offsetTop, d.width = e.value.offsetWidth, d.height = e.value.offsetHeight, d.resizeing = !0;
        const u = c.target;
        u.className && (d.border = u.className.slice(-2)), document.addEventListener("mousemove", s), document.addEventListener("mouseup", o);
      }
    }
  };
}
const b = {
  degree: 0,
  // 旋转角度,初始0，累加基数 45度
  scaleX: 1,
  // x轴翻转180度
  scaleY: 1,
  // y轴翻转180度
  rate: 1.2,
  // 基础缩放倍数，1.2倍
  x: 0,
  // 鼠标按下时的x坐标
  y: 0,
  // 鼠标按下时的y坐标
  offsetX: 0,
  // 鼠标按下时的imageRef的left值
  offsetY: 0,
  // 鼠标按下时的imageRef的top值
  draging: !1
  // 是否在拖动
};
function he(e, t) {
  const n = (l, a = !1) => {
    const f = e.value, { offsetWidth: p, offsetHeight: v } = f, { offsetLeft: y, offsetTop: h } = f;
    let g = 0, I = 0;
    return l > 0 ? (g = p * b.rate, I = v * b.rate) : (g = p / b.rate, I = v / b.rate), e.value.style.width = g + "px", e.value.style.height = I + "px", a || (e.value.style.top = h - (I - v) / 2 + "px", e.value.style.left = y - (g - p) / 2 + "px"), {
      top: h - (I - v) / 2,
      left: y - (g - p) / 2
    };
  };
  return {
    rotationImg: (l) => {
      b.degree += 45 * l, e.value.style.transform = `rotate(${b.degree}deg) scale(${b.scaleX}, ${b.scaleY})`;
    },
    scaleImg: (l) => {
      l === 1 && (b.scaleX = b.scaleX === 1 ? -1 : 1), l === -1 && (b.scaleY = b.scaleY === 1 ? -1 : 1), e.value.style.transform = `rotate(${b.degree}deg) scale(${b.scaleX}, ${b.scaleY})`;
    },
    zoomImg: (l) => {
      l.preventDefault();
      const {
        x: a,
        y: f,
        offsetWidth: p,
        offsetHeight: v
      } = e.value, y = l.wheelDelta ? l.wheelDelta : -l.detail, { top: h, left: g } = n(y, !0), { x: I, y: M } = l, S = a + p / 2 - I, x = f + v / 2 - M, O = g + S * (b.rate - 1) * (y > 0 ? 1 : -1), w = h + x * (b.rate - 1) * (y > 0 ? 1 : -1);
      e.value.style.top = w + "px", e.value.style.left = O + "px";
    },
    imgZoomInOut: n,
    imageNativeSize: () => {
      const { naturalHeight: l, naturalWidth: a } = e.value, { offsetHeight: f, offsetWidth: p } = t.value;
      e.value.style.width = a + "px", e.value.style.height = l + "px", e.value.style.top = (f - l) / 2 + "px", e.value.style.left = (p - a) / 2 + "px";
    },
    download: (l) => {
      const a = document.createElement("a");
      a.setAttribute("href", l), a.setAttribute("download", "图片"), a.setAttribute("target", "_blank");
      const f = document.createEvent("MouseEvents");
      f.initEvent("click", !0, !0), a.dispatchEvent(f);
    },
    imgFitWindow: () => {
      const { naturalHeight: l, naturalWidth: a } = e.value, { offsetHeight: f, offsetWidth: p } = t.value, v = a / p, y = l / (f - 100), h = a / l;
      v > y ? (e.value.style.width = p + "px", e.value.style.height = p / h + "px") : (e.value.style.height = f - 100 + "px", e.value.style.width = (f - 100) * h + "px"), V(e, t);
    }
  };
}
function tn(e) {
  const t = (o) => {
    if (!b.draging)
      return;
    const { clientX: r, clientY: i } = o, { offsetX: c, offsetY: u } = b, l = r - b.x + c, a = i - b.y + u;
    e.value.style.left = `${l}px`, e.value.style.top = `${a}px`;
  }, n = () => {
    b.draging = !1, document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", n);
  };
  return {
    imgMouseDown: (o) => {
      o.preventDefault();
      const { clientX: r, clientY: i } = o;
      b.x = r, b.y = i, b.offsetX = e.value.offsetLeft, b.offsetY = e.value.offsetTop, b.draging = !0, document.addEventListener("mousemove", t), document.addEventListener("mouseup", n);
    },
    imgMousemove: t,
    imgMouseup: n
  };
}
function nn(e, t, n) {
  return {
    pageUp: () => {
      t.value = t.value - 1, t.value < 0 && (t.value = n.length - 1), e.value = ce(n, t.value);
    },
    pageDown: () => {
      t.value = t.value + 1, t.value >= n.length && (t.value = 0), e.value = ce(n, t.value);
    }
  };
}
const on = /* @__PURE__ */ P({
  name: "WindowOperate",
  props: {
    previewRef: {
      type: Object,
      required: !0
    },
    imageRef: {
      type: Object,
      required: !0
    },
    isWindowMax: {
      type: Object,
      required: !0
    }
  },
  emits: ["close"],
  setup(e, t) {
    const {
      previewRef: n,
      isWindowMax: s,
      imageRef: o
    } = e, {
      setWindowMax: r,
      setWindowNormal: i
    } = Zt(n, o, s);
    return () => m(Q, null, [!s.value && m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "mingcute:fullscreen-fill",
      width: "16px",
      height: "16px",
      onClick: r
    }, null), s.value && m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "mingcute:fullscreen-exit-fill",
      width: "16px",
      height: "16px",
      onClick: i
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "ep:close-bold",
      width: "16px",
      height: "16px",
      onClick: () => t.emit("close")
    }, null)]);
  }
}), sn = /* @__PURE__ */ P({
  name: "ImageOperate",
  props: {
    imageRef: {
      type: Object,
      required: !0
    },
    previewRef: {
      type: Object,
      required: !0
    },
    url: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    const {
      imageRef: t,
      previewRef: n
    } = e, {
      rotationImg: s,
      scaleImg: o,
      imgZoomInOut: r,
      imageNativeSize: i,
      download: c,
      imgFitWindow: u
    } = he(t, n);
    return Ke(u), () => m(Q, null, [m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "iconamoon:zoom-in-bold",
      onClick: () => r(1)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "iconamoon:zoom-out-bold",
      onClick: () => r(-1)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "fa6-solid:rotate-right",
      onClick: () => s(1)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "fa6-solid:rotate-left",
      onClick: () => s(-1)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "icon-park-outline:equal-ratio",
      onClick: i
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "icon-park-outline:direction",
      onClick: u
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "uis:flip-v-alt",
      onClick: () => o(1)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "uis:flip-h-alt",
      onClick: () => o(-1)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "subway:cloud-download",
      onClick: () => c(e.url)
    }, null), m(E("mumu-icon"), {
      class: k("preview", "operatingBtn"),
      color: "#f9f9f9",
      icon: "icon-park-twotone:copy"
    }, null)]);
  }
}), rn = /* @__PURE__ */ P({
  name: "PagingOperate",
  props: {
    list: {
      type: Array,
      required: !0
    },
    previewImg: {
      type: Object,
      required: !0
    },
    initIndex: {
      type: Object,
      required: !0
    },
    imageRef: {
      type: Object,
      required: !0
    },
    previewRef: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const {
      list: t,
      initIndex: n,
      previewImg: s,
      imageRef: o,
      previewRef: r
    } = e, {
      pageUp: i,
      pageDown: c
    } = nn(s, n, t), {
      imgFitWindow: u
    } = he(o, r), l = () => {
      i(), me(u);
    }, a = () => {
      c(), me(u);
    };
    return () => m(Q, null, [m(E("mumu-icon"), {
      class: [C("preview", "paging"), C("preview", "paging", "up"), k("preview", "operatingBtn")],
      color: "#f9f9f9",
      icon: "iconamoon:arrow-left-2-light",
      width: "50px",
      height: "50px",
      onClick: l
    }, null), m(E("mumu-icon"), {
      class: [C("preview", "paging"), C("preview", "paging", "down"), k("preview", "operatingBtn")],
      color: "#f9f9f9",
      icon: "iconamoon:arrow-right-2-light",
      width: "50px",
      height: "50px",
      onClick: a
    }, null)]);
  }
}), cn = /* @__PURE__ */ P({
  name: "BorderOperate",
  props: {
    previewRef: {
      type: Object,
      required: !0
    },
    imageRef: {
      type: Object,
      required: !0
    },
    isWindowMax: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const {
      previewRef: t,
      isWindowMax: n,
      imageRef: s
    } = e, {
      borderMouseDown: o,
      borderMouseUp: r,
      borderMouseMove: i,
      cornerMouseDown: c
    } = en(t, s, n);
    return () => m(Q, null, [m("div", {
      class: C("preview", "border-t"),
      onMousedown: o,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "border-r"),
      onMousedown: o,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "border-b"),
      onMousedown: o,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "border-l"),
      onMousedown: o,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "corner-tl"),
      onMousedown: c,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "corner-tr"),
      onMousedown: c,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "corner-br"),
      onMousedown: c,
      onMouseup: r,
      onMousemove: i
    }, null), m("div", {
      class: C("preview", "corner-bl"),
      onMousedown: c,
      onMouseup: r,
      onMousemove: i
    }, null)]);
  }
});
function ln(e = []) {
  const t = D(0), n = D({
    title: "",
    url: ""
  });
  n.value = ce(e, t.value);
  const s = D(), o = D(), r = D(!1);
  return {
    initIndex: t,
    previewImg: n,
    previewRef: s,
    isWindowMax: r,
    imageRef: o
  };
}
const un = "mumu-image-preview", q = /* @__PURE__ */ P({
  name: un,
  props: Jt,
  emits: ["update:show"],
  setup(e, t) {
    const {
      previewImg: n,
      previewRef: s,
      isWindowMax: o,
      imageRef: r,
      initIndex: i
    } = ln(e.list), {
      refMouseDown: c,
      refMouseMove: u,
      refMouseUp: l
    } = Rt(s, o), {
      zoomImg: a
    } = he(r, s), {
      imgMouseDown: f,
      imgMousemove: p,
      imgMouseup: v
    } = tn(
      r
      // previewRef
    );
    return () => {
      const {
        title: y,
        url: h
      } = n.value;
      return e.show && m("div", {
        ref: s,
        class: C("preview")
      }, [m("div", {
        class: C("preview", "header"),
        onMousedown: c,
        onMousemove: u,
        onMouseup: l
      }, [m("span", {
        class: k("preview", "title")
      }, [y]), m(on, {
        previewRef: s,
        imageRef: r,
        isWindowMax: o,
        onClose: () => t.emit("update:show", !1)
      }, null)]), m("div", {
        class: C("preview", "body"),
        onWheel: (g) => g.preventDefault()
      }, [m("img", {
        ref: r,
        src: h,
        onWheel: a,
        onMousedown: f,
        onMousemove: p,
        onMouseup: v
      }, null)]), m("div", {
        class: C("preview", "footer")
      }, [m(sn, {
        imageRef: r,
        previewRef: s,
        url: h
      }, null)]), m(rn, {
        initIndex: i,
        previewImg: n,
        list: e.list,
        imageRef: r,
        previewRef: s
      }, null), m(cn, {
        previewRef: s,
        imageRef: r,
        isWindowMax: o
      }, null)]);
    };
  }
});
q.install = (e) => {
  e.component(q.name, q);
};
const an = [q, F], fn = (e) => {
  an.forEach((t) => {
    e.component(t.name, t);
  });
}, pn = {
  install: fn
};
export {
  pn as default
};
