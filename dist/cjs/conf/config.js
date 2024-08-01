"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configstore = _interopRequireDefault(require("configstore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const omnilumenConfig = new _configstore.default('omnilumen-cli', {
  sourcedEnv: false
});
var _default = exports.default = omnilumenConfig;