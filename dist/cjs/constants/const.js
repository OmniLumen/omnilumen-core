"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MENU_ACTIONS = exports.GITHUB_API_URL = exports.COMMON = void 0;
/**
 * @file const.js
 * @description define constants.
 * @module BaseSetupMenu
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

const MENU_ACTIONS = exports.MENU_ACTIONS = {
  BACK: 'back',
  SHOW_RELEASES: 'showReleases',
  VERSION_INFO: 'versionInfo',
  UPDATE: 'update',
  UNINSTALL: 'uninstall',
  INSTALL: 'install'
};
const COMMON = exports.COMMON = {
  UNKNOWN: 'unknown',
  EXIT: 'exit'
};
const GITHUB_API_URL = exports.GITHUB_API_URL = 'https://api.github.com';