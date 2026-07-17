import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/@iga-pages/cli/dist/request-handler.js
var require_request_handler = __commonJS({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/@iga-pages/cli/dist/request-handler.js"(exports) {
    "use strict";
    var __webpack_require__ = {};
    (() => {
      __webpack_require__.d = (exports1, definition) => {
        for (var key in definition)
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports1, key))
            Object.defineProperty(exports1, key, {
              enumerable: true,
              get: definition[key]
            });
      };
    })();
    (() => {
      __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
      __webpack_require__.r = (exports1) => {
        if ("u" > typeof Symbol && Symbol.toStringTag)
          Object.defineProperty(exports1, Symbol.toStringTag, {
            value: "Module"
          });
        Object.defineProperty(exports1, "__esModule", {
          value: true
        });
      };
    })();
    var __webpack_exports__ = {};
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      RequestHandler: () => RequestHandler2,
      calculateRoutePrefix: () => calculateRoutePrefix
    });
    var external_stream_namespaceObject = __require("stream");
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done)
        resolve(value);
      else
        Promise.resolve(value).then(_next, _throw);
    }
    function _async_to_generator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function _define_property(obj, key, value) {
      if (key in obj)
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      else
        obj[key] = value;
      return obj;
    }
    function _object_spread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if ("function" == typeof Object.getOwnPropertySymbols)
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        ownKeys.forEach(function(key) {
          _define_property(target, key, source[key]);
        });
      }
      return target;
    }
    var RequestHandler2 = class {
      execute(handler2, context) {
        return _async_to_generator(function* () {
          const { req, res, params, routePrefix, method } = context;
          const HTTP_METHODS = [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "HEAD",
            "OPTIONS"
          ];
          const hasNamedMethodExports = HTTP_METHODS.some((m) => handler2[m] && "function" == typeof handler2[m]);
          if (handler2[method] && "function" == typeof handler2[method]) {
            const webRequest = yield this.createWebRequest(req, params);
            const webResponse = yield handler2[method](webRequest);
            yield this.sendWebResponse(webResponse, res);
            return true;
          }
          if (hasNamedMethodExports) {
            res.statusCode = 405;
            res.setHeader("Allow", HTTP_METHODS.filter((m) => handler2[m] && "function" == typeof handler2[m]).join(", "));
            res.end();
            return true;
          }
          if (handler2.fetch && "function" == typeof handler2.fetch) {
            const webRequest = yield this.createWebRequest(req, params);
            const webResponse = yield handler2.fetch(webRequest);
            yield this.sendWebResponse(webResponse, res);
            return true;
          }
          if (this.isFrameworkInstance(handler2)) {
            yield this.handleFramework(handler2, req, res, params, routePrefix);
            return true;
          }
          if ("function" == typeof handler2) {
            yield this.handleLegacy(handler2, req, res, params);
            return true;
          }
          return false;
        }).call(this);
      }
      isFrameworkInstance(handler2) {
        if ("function" == typeof handler2 && (handler2.handle || handler2._router))
          return true;
        if (null !== handler2 && "object" == typeof handler2 && "function" == typeof handler2.callback && Array.isArray(handler2.middleware))
          return true;
        return false;
      }
      handleFramework(app, req, res, params, routePrefix) {
        return _async_to_generator(function* () {
          req.params = _object_spread({}, req.params, params);
          const originalUrl = req.url || "/";
          if (routePrefix && "/" !== routePrefix) {
            const pathname = originalUrl.split("?")[0];
            const queryString = originalUrl.includes("?") ? originalUrl.substring(originalUrl.indexOf("?")) : "";
            const escapedPrefix = this.escapeRegExp(routePrefix);
            let newPath = pathname.replace(new RegExp(`^${escapedPrefix}`), "") || "/";
            if (!newPath.startsWith("/"))
              newPath = "/" + newPath;
            req.url = newPath + queryString;
          }
          try {
            yield new Promise((resolve, reject) => {
              const originalEnd = res.end.bind(res);
              res.end = function(...args) {
                originalEnd(...args);
                resolve();
                return res;
              };
              res.on("error", reject);
              try {
                if ("function" == typeof app)
                  app(req, res, (err) => {
                    if (err)
                      reject(err);
                  });
                else {
                  app.on("error", (err) => {
                    if (err)
                      reject(err);
                  });
                  app.callback()(req, res);
                }
              } catch (error) {
                reject(error);
              }
            });
          } finally {
            req.url = originalUrl;
          }
        }).call(this);
      }
      handleLegacy(handler2, req, res, params) {
        return _async_to_generator(function* () {
          const igaReq = req;
          const igaRes = res;
          const raw = yield this.readRequestBody(req);
          this.restoreBody(req, raw);
          igaReq.query = this.parseQuery(req.url || "");
          igaReq.params = params;
          igaReq.cookies = this.parseCookies(req);
          igaReq.body = this.parseBodyBuffer(raw, req.headers["content-type"], req.method);
          this.enhanceResponse(igaRes);
          yield handler2(igaReq, igaRes);
        }).call(this);
      }
      restoreBody(req, body) {
        const pt = new external_stream_namespaceObject.PassThrough();
        const on = pt.on.bind(pt);
        const originalOn = req.on.bind(req);
        req.read = pt.read.bind(pt);
        req.on = req.addListener = (name, cb) => "data" === name || "end" === name ? on(name, cb) : originalOn(name, cb);
        pt.write(body);
        pt.end();
      }
      createWebRequest(_0) {
        return _async_to_generator(function* (req, params = {}) {
          const protocol = "http";
          const host = req.headers.host || "localhost";
          const url = `${protocol}://${host}${req.url}`;
          const requestInit = {
            method: req.method || "GET",
            headers: req.headers
          };
          const method = (req.method || "GET").toUpperCase();
          if ([
            "POST",
            "PUT",
            "PATCH"
          ].includes(method)) {
            const raw = yield this.readRequestBody(req);
            if (raw.length)
              requestInit.body = raw;
          }
          const request = new Request(url, requestInit);
          request.params = params;
          return request;
        }).apply(this, arguments);
      }
      sendWebResponse(webResponse, res) {
        return _async_to_generator(function* () {
          res.statusCode = webResponse.status;
          webResponse.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          if (webResponse.body) {
            const reader = webResponse.body.getReader();
            while (true) {
              const { done, value } = yield reader.read();
              if (done)
                break;
              yield new Promise((resolve, reject) => {
                res.write(Buffer.from(value), (err) => err ? reject(err) : resolve());
              });
            }
            res.end();
          } else
            res.end();
        })();
      }
      readRequestBody(req) {
        return new Promise((resolve, reject) => {
          const chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks)));
          req.on("error", reject);
        });
      }
      parseBodyBuffer(raw, contentTypeHeader, method) {
        const verb = (method || "GET").toUpperCase();
        if (![
          "POST",
          "PUT",
          "PATCH"
        ].includes(verb))
          return;
        if (!raw.length)
          return;
        const contentType = (contentTypeHeader || "").split(";")[0].trim();
        if ("application/json" === contentType)
          try {
            return JSON.parse(raw.toString("utf-8"));
          } catch (unused) {
            throw Object.assign(new Error("Invalid JSON body"), {
              statusCode: 400
            });
          }
        if ("application/x-www-form-urlencoded" === contentType)
          return Object.fromEntries(new URLSearchParams(raw.toString("utf-8")));
        if ("application/octet-stream" === contentType)
          return raw;
        return raw.toString("utf-8");
      }
      parseCookies(req) {
        const header = req.headers.cookie;
        if (!header)
          return {};
        const raw = Array.isArray(header) ? header.join("; ") : header;
        const result = {};
        for (const pair of raw.split(";")) {
          const idx = pair.indexOf("=");
          if (idx < 0)
            continue;
          const key = pair.slice(0, idx).trim();
          const value = pair.slice(idx + 1).trim();
          if (key)
            result[key] = decodeURIComponent(value);
        }
        return result;
      }
      parseQuery(url) {
        const search = url.includes("?") ? url.slice(url.indexOf("?")) : "";
        const sp = new URLSearchParams(search);
        const result = {};
        for (const key of sp.keys()) {
          const values = sp.getAll(key);
          result[key] = 1 === values.length ? values[0] : values;
        }
        return result;
      }
      escapeRegExp(str) {
        return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      }
      enhanceResponse(res) {
        res.json = function(data) {
          this.setHeader("Content-Type", "application/json; charset=utf-8");
          this.end(JSON.stringify(data));
          return this;
        };
        res.status = function(code) {
          this.statusCode = code;
          return this;
        };
        res.send = function(data) {
          if ("object" == typeof data && null !== data && !Buffer.isBuffer(data))
            return this.json(data);
          if ("string" == typeof data) {
            if (!this.getHeader("Content-Type"))
              this.setHeader("Content-Type", "text/html; charset=utf-8");
            this.end(data);
            return this;
          }
          if (Buffer.isBuffer(data)) {
            if (!this.getHeader("Content-Type"))
              this.setHeader("Content-Type", "application/octet-stream");
            this.end(data);
            return this;
          }
          this.end(String(data));
          return this;
        };
        res.redirect = function(statusOrUrl, url) {
          if ("string" == typeof statusOrUrl) {
            url = statusOrUrl;
            statusOrUrl = 307;
          }
          if ("number" != typeof statusOrUrl || "string" != typeof url)
            throw new Error("Invalid redirect arguments. Use res.redirect('/url') or res.redirect(301, '/url').");
          this.writeHead(statusOrUrl, {
            Location: url
          }).end();
          return this;
        };
      }
    };
    function calculateRoutePrefix(route) {
      const prefix = route.replace(/\/\[\[.*?\]\]$/, "");
      return prefix || "/";
    }
    exports.RequestHandler = __webpack_exports__.RequestHandler;
    exports.calculateRoutePrefix = __webpack_exports__.calculateRoutePrefix;
    for (__rspack_i in __webpack_exports__)
      if (-1 === [
        "RequestHandler",
        "calculateRoutePrefix"
      ].indexOf(__rspack_i))
        exports[__rspack_i] = __webpack_exports__[__rspack_i];
    var __rspack_i;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// .iga-temp-functions-entry.mjs
var import_request_handler = __toESM(require_request_handler(), 1);
import { createServer } from "http";

// api/[[...slug]].js
var slug_exports = {};
__export(slug_exports, {
  default: () => handler
});
import { createRequire } from "module";
var require2 = createRequire(import.meta.url);
var {
  getDB,
  findById,
  findOne,
  findAll,
  insert,
  update,
  remove,
  increment,
  scheduleSave,
  ensureDB
} = require2("../database.js");
var jwt = require2("jsonwebtoken");
var bcrypt = require2("bcryptjs");
var JWT_SECRET = "hanlin-forum-secret-2026";
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function getIP(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff)
    return xff.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") || "unknown";
}
async function getBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
var loginAttempts = /* @__PURE__ */ new Map();
function checkLoginRate(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  const recent = attempts.filter((t) => now - t < 9e5);
  if (recent.length >= 10)
    return false;
  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}
function getAuthUser(request) {
  const auth = request.headers.get("authorization");
  if (!auth)
    return null;
  const token = auth.replace("Bearer ", "");
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
function requireAuth(request) {
  const user = getAuthUser(request);
  if (!user)
    return { user: null, error: json({ error: "\u672A\u767B\u5F55" }, 401) };
  return { user, error: null };
}
function requireAdmin(request) {
  const { user, error } = requireAuth(request);
  if (error)
    return { user: null, error };
  if (user.role !== "admin")
    return { user: null, error: json({ error: "Not Found" }, 404) };
  return { user, error: null };
}
function formatPost(post, currentUserId) {
  const db = getDB();
  const author = findById("users", post.user_id);
  const category = findById("categories", post.category_id);
  let liked = false, voted = 0, favorited = false;
  if (currentUserId) {
    liked = !!findOne("post_likes", { post_id: post.id, user_id: currentUserId });
    const vote = findOne("post_votes", { post_id: post.id, user_id: currentUserId });
    voted = vote ? vote.vote_type : 0;
    favorited = !!findOne("favorites", { post_id: post.id, user_id: currentUserId });
  }
  const poll = findOne("post_polls", { post_id: post.id });
  let pollData = null, pollVoted = null;
  if (poll) {
    pollData = { id: poll.id, question: poll.question, agree: poll.agree, disagree: poll.disagree };
    if (currentUserId) {
      const pollVote = findOne("poll_votes", { poll_id: poll.id, user_id: currentUserId });
      pollVoted = pollVote ? pollVote.choice : null;
    }
  }
  return {
    ...post,
    tags: typeof post.tags === "string" ? JSON.parse(post.tags || "[]") : post.tags || [],
    images: typeof post.images === "string" ? JSON.parse(post.images || "[]") : post.images || [],
    author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === "admin" ? "student" : author.role } : null,
    category: category ? { id: category.id, name: category.name, slug: category.slug, color: category.color } : null,
    liked,
    voted,
    favorited,
    poll: pollData,
    poll_voted: pollVoted,
    score: (post.upvotes || 0) - (post.downvotes || 0)
  };
}
function formatComment(comment, currentUserId) {
  const author = findById("users", comment.user_id);
  let liked = false;
  if (currentUserId) {
    liked = !!findOne("comment_likes", { comment_id: comment.id, user_id: currentUserId });
  }
  const replies = findAll("comments", { parent_id: comment.id }).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((r) => formatComment(r, currentUserId));
  return {
    ...comment,
    author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === "admin" ? "student" : author.role } : null,
    liked,
    replies
  };
}
function publicUser(user, viewerRole) {
  if (!user)
    return null;
  const showRole = viewerRole === "admin" || user.role !== "admin" ? user.role : "student";
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    avatar_color: user.avatar_color,
    bio: user.bio,
    department: user.department,
    role: showRole,
    post_count: user.post_count || 0,
    comment_count: user.comment_count || 0,
    like_received: user.like_received || 0,
    created_at: user.created_at
  };
}
async function handler(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  await ensureDB();
  try {
    if (method === "POST") {
      if (path === "/api/auth/login") {
        const { username, password } = await getBody(request);
        if (!username || !password)
          return json({ error: "\u8BF7\u8F93\u5165\u8D26\u53F7\u548C\u5BC6\u7801" }, 400);
        if (!checkLoginRate(getIP(request)))
          return json({ error: "\u5C1D\u8BD5\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF715\u5206\u949F\u540E\u518D\u8BD5" }, 429);
        const user = findOne("users", { username });
        if (!user)
          return json({ error: "\u8D26\u53F7\u4E0D\u5B58\u5728" }, 401);
        if (!bcrypt.compareSync(password, user.password))
          return json({ error: "\u5BC6\u7801\u9519\u8BEF" }, 401);
        const banned = findOne("banned_users", { user_id: user.id });
        if (banned)
          return json({ error: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u8A00" }, 403);
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        return json({ token, user: publicUser(user, user.role) });
      }
      if (path === "/api/auth/register") {
        const { username, password, nickname, department, role } = await getBody(request);
        if (!username || !password || !nickname)
          return json({ error: "\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F" }, 400);
        if (username.length < 3)
          return json({ error: "\u8D26\u53F7\u81F3\u5C113\u4E2A\u5B57\u7B26" }, 400);
        if (password.length < 6)
          return json({ error: "\u5BC6\u7801\u81F3\u5C116\u4E2A\u5B57\u7B26" }, 400);
        const existing = findOne("users", { username });
        if (existing)
          return json({ error: "\u8D26\u53F7\u5DF2\u5B58\u5728" }, 409);
        const colors = ["#8B2323", "#C9A227", "#6B1A1A", "#D4AF37", "#A52A2A", "#B8860B", "#CD853F", "#DA8A2C"];
        const avatar_color = colors[Math.floor(Math.random() * colors.length)];
        const hashed = bcrypt.hashSync(password, 8);
        const user = insert("users", {
          username,
          password: hashed,
          nickname,
          avatar_color,
          bio: "\u6B22\u8FCE\u6765\u5230\u7FF0\u6797\u6821\u56ED\u8BBA\u575B",
          department: department || "",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          post_count: 0,
          comment_count: 0,
          like_received: 0,
          role: role === "teacher" ? "teacher" : "student"
        });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        return json({ token, user: publicUser(user, user.role) });
      }
      if (path === "/api/posts") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const { title, content, category_id, tags, images } = await getBody(request);
        if (!title || !content || !category_id)
          return json({ error: "\u8BF7\u586B\u5199\u6807\u9898\u3001\u5185\u5BB9\u548C\u5206\u7C7B" }, 400);
        const post = insert("posts", {
          user_id: user.id,
          category_id,
          title,
          content,
          tags: JSON.stringify(tags || []),
          images: JSON.stringify(images || []),
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          views: 0,
          likes: 0,
          upvotes: 0,
          downvotes: 0,
          comment_count: 0,
          is_pinned: 0
        });
        increment("users", user.id, "post_count", 1);
        return json({ post: formatPost(post, user.id) });
      }
      let m;
      if (m = path.match(/^\/api\/posts\/(\d+)\/like$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const postId = parseInt(m[1]);
        const existing = findOne("post_likes", { post_id: postId, user_id: user.id });
        if (existing) {
          remove("post_likes", { post_id: postId, user_id: user.id });
          increment("posts", postId, "likes", -1);
          const post = findById("posts", postId);
          if (post)
            increment("users", post.user_id, "like_received", -1);
          return json({ liked: false, likes: findById("posts", postId).likes });
        } else {
          insert("post_likes", { post_id: postId, user_id: user.id, created_at: (/* @__PURE__ */ new Date()).toISOString() });
          increment("posts", postId, "likes", 1);
          const post = findById("posts", postId);
          if (post)
            increment("users", post.user_id, "like_received", 1);
          if (post && post.user_id !== user.id) {
            const liker = findById("users", user.id);
            insert("notifications", {
              user_id: post.user_id,
              type: "like",
              content: `${liker.nickname} \u8D5E\u4E86\u4F60\u7684\u5E16\u5B50\u300C${post.title}\u300D`,
              link: `/post/${postId}`,
              is_read: 0,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
          return json({ liked: true, likes: findById("posts", postId).likes });
        }
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/vote$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const { vote_type } = await getBody(request);
        if (![1, -1].includes(vote_type))
          return json({ error: "\u65E0\u6548\u7684\u6295\u7968\u7C7B\u578B" }, 400);
        const postId = parseInt(m[1]);
        const existing = findOne("post_votes", { post_id: postId, user_id: user.id });
        const post = findById("posts", postId);
        if (!post)
          return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        if (existing) {
          if (existing.vote_type === vote_type) {
            remove("post_votes", { post_id: postId, user_id: user.id });
            if (vote_type === 1)
              increment("posts", postId, "upvotes", -1);
            else
              increment("posts", postId, "downvotes", -1);
            return json({ voted: 0, upvotes: post.upvotes, downvotes: post.downvotes });
          } else {
            update("post_votes", existing.id, { vote_type });
            if (vote_type === 1) {
              increment("posts", postId, "upvotes", 1);
              increment("posts", postId, "downvotes", -1);
            } else {
              increment("posts", postId, "upvotes", -1);
              increment("posts", postId, "downvotes", 1);
            }
            return json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
          }
        } else {
          insert("post_votes", { post_id: postId, user_id: user.id, vote_type, created_at: (/* @__PURE__ */ new Date()).toISOString() });
          if (vote_type === 1)
            increment("posts", postId, "upvotes", 1);
          else
            increment("posts", postId, "downvotes", 1);
          return json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
        }
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/favorite$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const postId = parseInt(m[1]);
        const existing = findOne("favorites", { post_id: postId, user_id: user.id });
        if (existing) {
          remove("favorites", { post_id: postId, user_id: user.id });
          return json({ favorited: false });
        } else {
          insert("favorites", { post_id: postId, user_id: user.id, created_at: (/* @__PURE__ */ new Date()).toISOString() });
          return json({ favorited: true });
        }
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/poll$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const { choice } = await getBody(request);
        if (!["agree", "disagree"].includes(choice))
          return json({ error: "\u65E0\u6548\u7684\u6295\u7968\u9009\u9879" }, 400);
        const postId = parseInt(m[1]);
        const poll = findOne("post_polls", { post_id: postId });
        if (!poll)
          return json({ error: "\u8BE5\u5E16\u5B50\u6CA1\u6709\u6295\u7968" }, 404);
        const existing = findOne("poll_votes", { poll_id: poll.id, user_id: user.id });
        if (existing)
          return json({ error: "\u4F60\u5DF2\u7ECF\u6295\u8FC7\u7968\u4E86" }, 400);
        insert("poll_votes", { poll_id: poll.id, user_id: user.id, choice, created_at: (/* @__PURE__ */ new Date()).toISOString() });
        increment("post_polls", poll.id, choice, 1);
        const updated = findById("post_polls", poll.id);
        return json({ poll: updated, voted: choice });
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/comments$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const { content, parent_id } = await getBody(request);
        if (!content)
          return json({ error: "\u8BF7\u8F93\u5165\u8BC4\u8BBA\u5185\u5BB9" }, 400);
        const postId = parseInt(m[1]);
        const comment = insert("comments", {
          post_id: postId,
          user_id: user.id,
          parent_id: parent_id || null,
          content,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          likes: 0
        });
        increment("posts", postId, "comment_count", 1);
        increment("users", user.id, "comment_count", 1);
        const post = findById("posts", postId);
        if (post && post.user_id !== user.id) {
          const commenter = findById("users", user.id);
          insert("notifications", {
            user_id: post.user_id,
            type: "comment",
            content: `${commenter.nickname} \u8BC4\u8BBA\u4E86\u4F60\u7684\u5E16\u5B50\u300C${post.title}\u300D`,
            link: `/post/${postId}`,
            is_read: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        return json({ comment: formatComment(comment, user.id) });
      }
      if (m = path.match(/^\/api\/comments\/(\d+)\/like$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const commentId = parseInt(m[1]);
        const existing = findOne("comment_likes", { comment_id: commentId, user_id: user.id });
        if (existing) {
          remove("comment_likes", { comment_id: commentId, user_id: user.id });
          increment("comments", commentId, "likes", -1);
          return json({ liked: false, likes: findById("comments", commentId).likes });
        } else {
          insert("comment_likes", { comment_id: commentId, user_id: user.id });
          increment("comments", commentId, "likes", 1);
          return json({ liked: true, likes: findById("comments", commentId).likes });
        }
      }
      if (path === "/api/suggestions") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const { title, content, category } = await getBody(request);
        if (!title || !content)
          return json({ error: "\u8BF7\u586B\u5199\u6807\u9898\u548C\u5185\u5BB9" }, 400);
        const sug = insert("suggestions", {
          user_id: user.id,
          title,
          content,
          category: category || "general",
          status: "pending",
          priority: 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          support_count: 0,
          admin_reply: ""
        });
        const author = findById("users", user.id);
        return json({ suggestion: { ...sug, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, supported: false } });
      }
      if (m = path.match(/^\/api\/suggestions\/(\d+)\/support$/)) {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const sugId = parseInt(m[1]);
        const existing = findOne("suggestion_supports", { suggestion_id: sugId, user_id: user.id });
        if (existing) {
          remove("suggestion_supports", { suggestion_id: sugId, user_id: user.id });
          increment("suggestions", sugId, "support_count", -1);
          return json({ supported: false, support_count: findById("suggestions", sugId).support_count });
        } else {
          insert("suggestion_supports", { suggestion_id: sugId, user_id: user.id });
          increment("suggestions", sugId, "support_count", 1);
          return json({ supported: true, support_count: findById("suggestions", sugId).support_count });
        }
      }
      if (path === "/api/admin/announce") {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const { title, content, type } = await getBody(request);
        if (!title || !content)
          return json({ error: "\u8BF7\u586B\u5199\u516C\u544A\u6807\u9898\u548C\u5185\u5BB9" }, 400);
        const announcement = insert("announcements", {
          user_id: user.id,
          title,
          content,
          type: type || "info",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        return json({ announcement });
      }
      if (m = path.match(/^\/api\/admin\/ban\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const userId = parseInt(m[1]);
        const targetUser = findById("users", userId);
        if (!targetUser)
          return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        if (targetUser.role === "admin")
          return json({ error: "\u4E0D\u80FD\u7981\u8A00\u7BA1\u7406\u5458" }, 400);
        const existing = findOne("banned_users", { user_id: userId });
        if (existing)
          return json({ error: "\u8BE5\u7528\u6237\u5DF2\u88AB\u7981\u8A00" }, 400);
        const record = insert("banned_users", {
          user_id: userId,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        return json({ success: true, banned: record });
      }
      if (path === "/api/admin/poll") {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const { post_id, question } = await getBody(request);
        if (!post_id || !question)
          return json({ error: "\u8BF7\u63D0\u4F9B\u5E16\u5B50ID\u548C\u6295\u7968\u95EE\u9898" }, 400);
        const post = findById("posts", parseInt(post_id));
        if (!post)
          return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        const existing = findOne("post_polls", { post_id: parseInt(post_id) });
        if (existing)
          return json({ error: "\u8BE5\u5E16\u5B50\u5DF2\u6709\u6295\u7968" }, 400);
        const poll = insert("post_polls", {
          post_id: parseInt(post_id),
          question,
          agree: 0,
          disagree: 0
        });
        return json({ poll });
      }
      if (path === "/api/admin/create-user") {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const { username, password, nickname, department, role, bio } = await getBody(request);
        if (!username || !password || !nickname)
          return json({ error: "\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F" }, 400);
        if (username.length < 3)
          return json({ error: "\u8D26\u53F7\u81F3\u5C113\u4E2A\u5B57\u7B26" }, 400);
        if (password.length < 6)
          return json({ error: "\u5BC6\u7801\u81F3\u5C116\u4E2A\u5B57\u7B26" }, 400);
        const existing = findOne("users", { username });
        if (existing)
          return json({ error: "\u8D26\u53F7\u5DF2\u5B58\u5728" }, 409);
        const colors = ["#8B2323", "#C9A227", "#6B1A1A", "#D4AF37", "#A52A2A", "#B8860B", "#CD853F", "#DA8A2C", "#8B4513", "#BDB76B", "#9B2226", "#BB9457", "#6D1A1A", "#CFA636", "#7A1F1F", "#DAA520", "#A0522D", "#BC8F8F", "#8B6914", "#D2691E"];
        const avatar_color = colors[Math.floor(Math.random() * colors.length)];
        const hashed = bcrypt.hashSync(password, 8);
        const userRole = role === "teacher" ? "teacher" : "student";
        const newUser = insert("users", {
          username,
          password: hashed,
          nickname,
          avatar_color,
          bio: bio || "\u6B22\u8FCE\u6765\u5230\u7FF0\u6797\u6821\u56ED\u8BBA\u575B",
          department: department || "\u9AD8\u4E2D\u90E8",
          created_at: new Date(Date.now() - Math.random() * 864e5 * 30).toISOString(),
          post_count: 0,
          comment_count: 0,
          like_received: 0,
          role: userRole
        });
        return json({ success: true, user: { id: newUser.id, username: newUser.username, nickname: newUser.nickname, department: newUser.department, role: newUser.role } });
      }
      if (path === "/api/admin/post-as-user") {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const { user_id, title, content, category_id, tags, images } = await getBody(request);
        if (!user_id || !title || !content || !category_id)
          return json({ error: "\u53C2\u6570\u4E0D\u5B8C\u6574" }, 400);
        const targetUser = findById("users", parseInt(user_id));
        if (!targetUser)
          return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        const post = insert("posts", {
          user_id: parseInt(user_id),
          category_id,
          title,
          content,
          tags: JSON.stringify(tags || []),
          images: JSON.stringify(images || []),
          created_at: new Date(Date.now() - Math.random() * 36e5 * 24).toISOString(),
          views: Math.floor(Math.random() * 50) + 10,
          likes: 0,
          upvotes: 0,
          downvotes: 0,
          comment_count: 0,
          is_pinned: 0
        });
        increment("users", parseInt(user_id), "post_count", 1);
        return json({ success: true, post: formatPost(post, user.id) });
      }
    } else if (method === "GET") {
      if (path === "/api/auth/me") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const fullUser = findById("users", user.id);
        if (!fullUser)
          return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        return json({ user: publicUser(fullUser, user.role) });
      }
      if (path === "/api/categories") {
        const db = getDB();
        const cats = [...db.categories].sort((a, b) => a.sort_order - b.sort_order);
        const result = cats.map((cat) => ({
          ...cat,
          post_count: db.posts.filter((p) => p.category_id === cat.id).length
        }));
        return json({ categories: result });
      }
      if (path === "/api/posts") {
        const currentUser = getAuthUser(request);
        const currentUserId = currentUser?.id;
        const db = getDB();
        const category = url.searchParams.get("category");
        const sort = url.searchParams.get("sort") || "latest";
        const search = url.searchParams.get("search");
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "20");
        const offset = (page - 1) * limit;
        let posts = [...db.posts];
        if (category && category !== "all") {
          const cat = db.categories.find((c) => c.slug === category);
          if (cat)
            posts = posts.filter((p) => p.category_id === cat.id);
        }
        if (search) {
          const q = search.toLowerCase();
          posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
        }
        if (sort === "hot") {
          posts.sort((a, b) => b.is_pinned - a.is_pinned || b.upvotes + b.likes + b.comment_count * 2 - (a.upvotes + a.likes + a.comment_count * 2));
        } else if (sort === "top") {
          posts.sort((a, b) => b.is_pinned - a.is_pinned || b.upvotes - a.upvotes);
        } else {
          posts.sort((a, b) => b.is_pinned - a.is_pinned || new Date(b.created_at) - new Date(a.created_at));
        }
        const total = posts.length;
        const paged = posts.slice(offset, offset + limit);
        const formatted = paged.map((p) => formatPost(p, currentUserId));
        return json({ posts: formatted, total, page, hasMore: offset + formatted.length < total });
      }
      if (path === "/api/announcements") {
        const db = getDB();
        const announcements = [...db.announcements].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((ann) => {
          const author = findById("users", ann.user_id);
          return {
            ...ann,
            author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, role: author.role } : null
          };
        });
        return json({ announcements });
      }
      if (path === "/api/stats") {
        const db = getDB();
        const today = (/* @__PURE__ */ new Date()).toDateString();
        return json({
          users: db.users.length,
          posts: db.posts.length,
          comments: db.comments.length,
          todayPosts: db.posts.filter((p) => new Date(p.created_at).toDateString() === today).length
        });
      }
      if (path === "/api/notifications") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const db = getDB();
        const notifications = db.notifications.filter((n) => n.user_id === user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 20);
        const unread = db.notifications.filter((n) => n.user_id === user.id && n.is_read === 0).length;
        return json({ notifications, unread });
      }
      if (path === "/api/users/me/favorites") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const db = getDB();
        const favs = db.favorites.filter((f) => f.user_id === user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const posts = favs.map((f) => formatPost(findById("posts", f.post_id), user.id)).filter(Boolean);
        return json({ posts });
      }
      if (path === "/api/suggestions") {
        const currentUser = getAuthUser(request);
        const db = getDB();
        const status = url.searchParams.get("status");
        const sort = url.searchParams.get("sort") || "support";
        let suggestions = [...db.suggestions];
        if (status && status !== "all")
          suggestions = suggestions.filter((s) => s.status === status);
        if (sort === "latest") {
          suggestions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
          suggestions.sort((a, b) => b.support_count - a.support_count);
        }
        const result = suggestions.map((s) => {
          const author = findById("users", s.user_id);
          let supported = false;
          if (currentUser)
            supported = !!findOne("suggestion_supports", { suggestion_id: s.id, user_id: currentUser.id });
          return { ...s, nickname: author?.nickname, avatar_color: author?.avatar_color, department: author?.department, supported };
        });
        return json({ suggestions: result });
      }
      if (path === "/api/admin/users") {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const db = getDB();
        const users = db.users.map((u) => {
          const banned = findOne("banned_users", { user_id: u.id });
          return {
            id: u.id,
            username: u.username,
            nickname: u.nickname,
            avatar_color: u.avatar_color,
            department: u.department,
            role: u.role,
            created_at: u.created_at,
            post_count: u.post_count || 0,
            comment_count: u.comment_count || 0,
            like_received: u.like_received || 0,
            banned: !!banned,
            banned_at: banned ? banned.created_at : null
          };
        });
        return json({ users });
      }
      if (path === "/api/admin/stats") {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const db = getDB();
        const now = /* @__PURE__ */ new Date();
        const today = now.toDateString();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 864e5);
        const todayNewUsers = db.users.filter((u) => new Date(u.created_at).toDateString() === today).length;
        const todayNewPosts = db.posts.filter((p) => new Date(p.created_at).toDateString() === today).length;
        const activeUserIds = new Set(db.posts.filter((p) => new Date(p.created_at) >= sevenDaysAgo).map((p) => p.user_id));
        return json({
          total_users: db.users.length,
          total_posts: db.posts.length,
          total_comments: db.comments.length,
          today_new_users: todayNewUsers,
          today_new_posts: todayNewPosts,
          active_users: activeUserIds.size,
          banned_users: db.banned_users.length
        });
      }
      let m;
      if (m = path.match(/^\/api\/posts\/(\d+)$/)) {
        const postId = parseInt(m[1]);
        const post = findById("posts", postId);
        if (!post)
          return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        increment("posts", postId, "views", 1);
        const currentUser = getAuthUser(request);
        return json({ post: formatPost(post, currentUser?.id) });
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/comments$/)) {
        const postId = parseInt(m[1]);
        const db = getDB();
        const currentUser = getAuthUser(request);
        const comments = db.comments.filter((c) => c.post_id === postId && c.parent_id === null).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return json({ comments: comments.map((c) => formatComment(c, currentUser?.id)) });
      }
      if (m = path.match(/^\/api\/users\/(\d+)$/)) {
        const userId = parseInt(m[1]);
        const targetUser = findById("users", userId);
        if (!targetUser)
          return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        const db = getDB();
        const currentUser = getAuthUser(request);
        const posts = db.posts.filter((p) => p.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10).map((p) => formatPost(p, currentUser?.id));
        return json({ user: publicUser(targetUser, currentUser?.role), posts });
      }
    } else if (method === "PUT") {
      if (path === "/api/users/profile") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const { nickname, bio, department } = await getBody(request);
        update("users", user.id, { nickname, bio, department });
        return json({ user: publicUser(findById("users", user.id), user.role) });
      }
      if (path === "/api/notifications/read") {
        const { user, error } = requireAuth(request);
        if (error)
          return error;
        const db = getDB();
        db.notifications.forEach((n) => {
          if (n.user_id === user.id)
            n.is_read = 1;
        });
        scheduleSave();
        return json({ success: true });
      }
    } else if (method === "DELETE") {
      let m;
      if (m = path.match(/^\/api\/admin\/posts\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const db = getDB();
        const postId = parseInt(m[1]);
        const post = findById("posts", postId);
        if (!post)
          return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        const commentIds = db.comments.filter((c) => c.post_id === postId).map((c) => c.id);
        const pollIds = db.post_polls.filter((p) => p.post_id === postId).map((p) => p.id);
        db.poll_votes = db.poll_votes.filter((v) => !pollIds.includes(v.poll_id));
        db.post_polls = db.post_polls.filter((p) => p.post_id !== postId);
        db.comment_likes = db.comment_likes.filter((cl) => !commentIds.includes(cl.comment_id));
        db.comments = db.comments.filter((c) => c.post_id !== postId);
        db.post_likes = db.post_likes.filter((l) => l.post_id !== postId);
        db.post_votes = db.post_votes.filter((v) => v.post_id !== postId);
        db.favorites = db.favorites.filter((f) => f.post_id !== postId);
        db.posts = db.posts.filter((p) => p.id !== postId);
        if (post.user_id) {
          const author = findById("users", post.user_id);
          if (author && author.post_count > 0)
            author.post_count -= 1;
        }
        scheduleSave();
        return json({ success: true });
      }
      if (m = path.match(/^\/api\/admin\/ban\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error)
          return error;
        const userId = parseInt(m[1]);
        const existing = findOne("banned_users", { user_id: userId });
        if (!existing)
          return json({ error: "\u8BE5\u7528\u6237\u672A\u88AB\u7981\u8A00" }, 404);
        remove("banned_users", { user_id: userId });
        return json({ success: true });
      }
    }
    return json({ error: "Not Found" }, 404);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

// .iga-temp-functions-entry.mjs
var requestHandler = new import_request_handler.RequestHandler();
var handler0 = handler || slug_exports;
var routes = [
  {
    route: "/api/[[...slug]]",
    routePrefix: "/api",
    pattern: new RegExp("^\\/api\\/\\[\\[\\.\\.\\.slug\\]\\]\\/?$"),
    params: [],
    type: "static",
    priority: 100,
    handler: handler0
  }
];
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = url.pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  for (const route of routes) {
    const match = pathname.match(route.pattern);
    if (match) {
      try {
        const pathParams = match.groups || {};
        const handler2 = route.handler;
        const method = (req.method || "GET").toUpperCase();
        const context = {
          req,
          res,
          params: pathParams,
          routePrefix: route.routePrefix,
          method
        };
        const handled = await requestHandler.execute(handler2, context);
        if (!handled && !res.headersSent) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            error: "Invalid handler",
            message: "Handler must export GET/POST/etc., fetch method, framework instance, or default function"
          }));
        }
        return;
      } catch (error) {
        console.error("Error handling request:", error);
        if (!res.headersSent) {
          const statusCode = error && error.statusCode ? error.statusCode : 500;
          res.statusCode = statusCode;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            error: "Internal Server Error",
            message: error.message
          }));
        }
        return;
      }
    }
  }
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    error: "Not Found",
    path: pathname
  }));
}
var isMainModule = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\\\/g, "/"));
if (isMainModule) {
  const PORT = process.env.PORT || 3e3;
  const server = createServer(handleRequest);
  server.listen(PORT, () => {
    console.log(`\u{1F680} Serverless Functions running on http://localhost:${PORT}`);
  });
}
export {
  handleRequest,
  routes
};
