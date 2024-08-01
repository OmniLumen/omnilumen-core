"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseSetupMenu", {
  enumerable: true,
  get: function () {
    return _baseSetupMenu.default;
  }
});
Object.defineProperty(exports, "OmnilumenInstaller", {
  enumerable: true,
  get: function () {
    return _omnilumenInstaller.default;
  }
});
Object.defineProperty(exports, "displayCurrentVersions", {
  enumerable: true,
  get: function () {
    return _versionToolkit.displayCurrentVersions;
  }
});
Object.defineProperty(exports, "displayInstallerVersion", {
  enumerable: true,
  get: function () {
    return _versionToolkit.displayInstallerVersion;
  }
});
Object.defineProperty(exports, "displayVersion", {
  enumerable: true,
  get: function () {
    return _versionToolkit.displayVersion;
  }
});
Object.defineProperty(exports, "displayVersionTags", {
  enumerable: true,
  get: function () {
    return _versionToolkit.displayVersionTags;
  }
});
Object.defineProperty(exports, "getVersionTags", {
  enumerable: true,
  get: function () {
    return _versionToolkit.getVersionTags;
  }
});
Object.defineProperty(exports, "getVersions", {
  enumerable: true,
  get: function () {
    return _versionToolkit.getVersions;
  }
});
Object.defineProperty(exports, "runCommand", {
  enumerable: true,
  get: function () {
    return _omnilumenInstaller.runCommand;
  }
});
Object.defineProperty(exports, "runShellCommand", {
  enumerable: true,
  get: function () {
    return _omnilumenInstaller.runShellCommand;
  }
});
Object.defineProperty(exports, "runShellCommandWithLogs", {
  enumerable: true,
  get: function () {
    return _omnilumenInstaller.runShellCommandWithLogs;
  }
});
Object.defineProperty(exports, "updateVersion", {
  enumerable: true,
  get: function () {
    return _versionToolkit.updateVersion;
  }
});
var _baseSetupMenu = _interopRequireDefault(require("./baseSetupMenu.js"));
var _omnilumenInstaller = _interopRequireWildcard(require("./omnilumenInstaller.js"));
var _versionToolkit = require("./versionToolkit.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }