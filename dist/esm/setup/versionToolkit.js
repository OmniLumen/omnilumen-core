function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * @file versionToolkit.js
 * @description Utility function to get sorted tags by commit date from a GitHub repository.
 * @module versionToolkit
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import axios from 'axios';
import semver from 'semver';
import moment from 'moment';
import Table from "cli-table3";
import prompts from "prompts";
import omnilumenConfig from '../conf/config.js';
import { GITHUB_API_URL } from "../constants/const";

/**
* Get sorted tags by commit date from a GitHub repository.
* @param {string} repo - The repository to get tags from.
* @param {number} [numberOfTags=20] - The number of tags to fetch.
* @param cacheExpiryHours - expired cache in hrs
* @returns {Promise<Array<{ version: string, date: string }>>} - The sorted tags.
* @throws {Error} Error fetching tags.
*/
export var getVersionTags = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(repo) {
    var numberOfTags,
      cacheExpiryHours,
      cacheKey,
      cachedData,
      currentTime,
      _tags,
      withinRateLimit,
      tagsUrl,
      tagsResponse,
      tags,
      validTags,
      sortedTags,
      tagsData,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          numberOfTags = _args.length > 1 && _args[1] !== undefined ? _args[1] : 12;
          cacheExpiryHours = _args.length > 2 && _args[2] !== undefined ? _args[2] : 2;
          _context.prev = 2;
          cacheKey = "tags_".concat(repo);
          cachedData = omnilumenConfig.get(cacheKey);
          currentTime = moment();
          if (!(cachedData && currentTime.diff(moment(cachedData.timestamp), 'hours') < cacheExpiryHours)) {
            _context.next = 9;
            break;
          }
          _tags = cachedData.tags.slice(0, numberOfTags);
          return _context.abrupt("return", {
            tags: _tags,
            error: null
          });
        case 9:
          _context.next = 11;
          return checkRateLimit();
        case 11:
          withinRateLimit = _context.sent;
          if (withinRateLimit) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", {
            tags: [],
            error: 'API rate limit exceeded. Please try again later.'
          });
        case 14:
          // Step 1: Get the tags
          tagsUrl = "".concat(GITHUB_API_URL, "/repos/").concat(repo, "/tags?per_page=100");
          _context.next = 17;
          return axios.get(tagsUrl);
        case 17:
          tagsResponse = _context.sent;
          tags = tagsResponse.data; // Step 2: Filter tags that match the major.minor.patch format
          validTags = tags.filter(function (tag) {
            return semver.valid(tag.name);
          }); // Step 3: Sort tags by version
          sortedTags = validTags.sort(function (a, b) {
            return semver.rcompare(a.name, b.name);
          }).slice(0, numberOfTags);
          tagsData = sortedTags.map(function (tag) {
            return {
              version: tag.name
            };
          }); // Store in cache
          omnilumenConfig.set(cacheKey, {
            tags: tagsData,
            timestamp: currentTime
          });
          return _context.abrupt("return", {
            tags: tagsData,
            error: null
          });
        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](2);
          console.error('Error fetching tags:', _context.t0);
          return _context.abrupt("return", {
            tags: [],
            error: 'Error fetching tags. Please check your network connection and try again.'
          });
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 26]]);
  }));
  return function getVersionTags(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Check GitHub API rate limit status.
 * @returns {Promise<boolean>} - True if within rate limit, false if exceeded.
 * @throws {Error} If unable to check rate limit.
 */
var checkRateLimit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var response, remaining;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return axios.get("".concat(GITHUB_API_URL, "/rate_limit"));
        case 3:
          response = _context2.sent;
          remaining = response.data.rate.remaining;
          return _context2.abrupt("return", remaining > 0);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('Error checking rate limit:', _context2.t0);
          return _context2.abrupt("return", false);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function checkRateLimit() {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Get versions of the installed components.
 * @returns {Object} - The versions of the components.
 * @param installerMap
 */
export var getVersions = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(installerMap) {
    var versions, installerName, installer;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          versions = {};
          _context3.t0 = _regeneratorRuntime().keys(installerMap);
        case 2:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 16;
            break;
          }
          installerName = _context3.t1.value;
          _context3.prev = 4;
          installer = installerMap[installerName];
          _context3.next = 8;
          return installer.checkVersion();
        case 8:
          versions[installerName] = _context3.sent;
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t2 = _context3["catch"](4);
          versions[installerName] = 'Unknown';
        case 14:
          _context3.next = 2;
          break;
        case 16:
          return _context3.abrupt("return", versions);
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 11]]);
  }));
  return function getVersions(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
export var displayCurrentVersions = function displayCurrentVersions(versions) {
  var table = new Table({
    head: ['Tool', 'Version'],
    colWidths: [20, 50]
  });
  for (var _i = 0, _Object$entries = Object.entries(versions); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      tool = _Object$entries$_i[0],
      version = _Object$entries$_i[1];
    table.push([tool, version]);
  }
  console.log(table.toString());
};
export var displayVersion = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(tool, version) {
    var table;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          table = new Table({
            head: ['Tool', 'Version'],
            colWidths: [20, 50]
          });
          table.push([tool, version]);
          console.log(table.toString());
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function displayVersion(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Display versions in a table.
 * @param {Object} tags - The versions to display.
 */
export var displayVersionTags = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(tags) {
    var table, rows, i;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          table = new Table({
            head: ['Version'],
            colWidths: [20, 20, 20, 20]
          });
          rows = [];
          for (i = 0; i < tags.length; i += 4) {
            rows.push(tags.slice(i, i + 4).map(function (tag) {
              return tag.version;
            }));
          }
          table.push.apply(table, rows);
          console.log(table.toString());
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function displayVersionTags(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
export var displayInstallerVersion = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(installer) {
    var version, toolName;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return installer.checkVersion();
        case 2:
          version = _context6.sent;
          toolName = installer.constructor.name.replace('Installer', '').toLowerCase();
          _context6.next = 6;
          return displayVersion(toolName, version);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function displayInstallerVersion(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Handle the updating to a selected version.
 * @param {Object} installer - The installer object.
 */
export var updateVersion = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(installer) {
    var version;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return promptVersionSelection(installer, 'update');
        case 2:
          version = _context7.sent;
          if (!version) {
            _context7.next = 6;
            break;
          }
          _context7.next = 6;
          return installer.update(version);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function updateVersion(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Fetch available versions and prompt the user to select one.
 * @param {Object} installer - The installer object.
 * @param {string} action - The action to be performed ('install' or 'update').
 * @returns {Promise<string|null>} - The selected version or null if 'Back' is chosen.
 */
var promptVersionSelection = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(installer, action) {
    var result, response;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return installer.getAvailableVersions();
        case 2:
          result = _context8.sent;
          if (!result.error) {
            _context8.next = 6;
            break;
          }
          console.error('Error fetching available versions:', result.error);
          return _context8.abrupt("return", null);
        case 6:
          _context8.next = 8;
          return displayVersionTags(result.tags);
        case 8:
          _context8.next = 10;
          return prompts({
            type: 'select',
            name: 'version',
            message: "Which version do you want to ".concat(action, "?"),
            choices: [{
              title: 'Back',
              value: 'back'
            }].concat(_toConsumableArray(result.tags.map(function (tag) {
              return {
                title: tag.version,
                value: tag.version
              };
            })))
          });
        case 10:
          response = _context8.sent;
          if (!(response.version === 'back')) {
            _context8.next = 15;
            break;
          }
          return _context8.abrupt("return", null);
        case 15:
          if (!response.version) {
            _context8.next = 19;
            break;
          }
          return _context8.abrupt("return", response.version);
        case 19:
          console.log("".concat(action.charAt(0).toUpperCase() + action.slice(1), " cancelled."));
          return _context8.abrupt("return", null);
        case 21:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function promptVersionSelection(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();