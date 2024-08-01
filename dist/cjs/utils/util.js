"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWindows = exports.isMacOS = exports.isLinux = void 0;
var _os = _interopRequireDefault(require("os"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Checks if the current operating system is Windows.
 * @returns {boolean} True if the current OS is Windows, false otherwise.
 */
const isWindows = () => {
  return _os.default.platform() === 'win32';
};

/**
 * Utility functions for the application.
 * @module utils
 */

/**
 * Checks if the current operating system is macOS.
 * @returns {boolean} True if the current OS is macOS, false otherwise.
 */
exports.isWindows = isWindows;
const isMacOS = () => {
  return _os.default.platform() === 'darwin';
};

/**
 * Checks if the current operating system is Linux.
 * @returns {boolean} True if the current OS is Linux, false otherwise.
 */
exports.isMacOS = isMacOS;
const isLinux = () => {
  return _os.default.platform() === 'linux';
};
exports.isLinux = isLinux;