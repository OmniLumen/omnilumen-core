"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateVersion = exports.getVersions = exports.getVersionTags = exports.displayVersionTags = exports.displayVersion = exports.displayInstallerVersion = exports.displayCurrentVersions = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _semver = _interopRequireDefault(require("semver"));
var _moment = _interopRequireDefault(require("moment"));
var _cliTable = _interopRequireDefault(require("cli-table3"));
var _prompts = _interopRequireDefault(require("prompts"));
var _config = _interopRequireDefault(require("../conf/config.js"));
var _const = require("../constants/const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @file versionToolkit.js
 * @description Utility function to get sorted tags by commit date from a GitHub repository.
 * @module versionToolkit
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

/**
* Get sorted tags by commit date from a GitHub repository.
* @param {string} repo - The repository to get tags from.
* @param {number} [numberOfTags=20] - The number of tags to fetch.
* @param cacheExpiryHours - expired cache in hrs
* @returns {Promise<Array<{ version: string, date: string }>>} - The sorted tags.
* @throws {Error} Error fetching tags.
*/
const getVersionTags = async (repo, numberOfTags = 12, cacheExpiryHours = 2) => {
  try {
    const cacheKey = `tags_${repo}`;
    const cachedData = _config.default.get(cacheKey);
    const currentTime = (0, _moment.default)();
    if (cachedData && currentTime.diff((0, _moment.default)(cachedData.timestamp), 'hours') < cacheExpiryHours) {
      const tags = cachedData.tags.slice(0, numberOfTags);
      return {
        tags,
        error: null
      };
    }
    // Check rate limit before making requests
    const withinRateLimit = await checkRateLimit();
    if (!withinRateLimit) {
      return {
        tags: [],
        error: 'API rate limit exceeded. Please try again later.'
      };
    }

    // Step 1: Get the tags
    const tagsUrl = `${_const.GITHUB_API_URL}/repos/${repo}/tags?per_page=100`;
    const tagsResponse = await _axios.default.get(tagsUrl);
    const tags = tagsResponse.data;

    // Step 2: Filter tags that match the major.minor.patch format
    const validTags = tags.filter(tag => _semver.default.valid(tag.name));

    // Step 3: Sort tags by version
    const sortedTags = validTags.sort((a, b) => _semver.default.rcompare(a.name, b.name)).slice(0, numberOfTags);
    const tagsData = sortedTags.map(tag => ({
      version: tag.name
    }));

    // Store in cache
    _config.default.set(cacheKey, {
      tags: tagsData,
      timestamp: currentTime
    });
    return {
      tags: tagsData,
      error: null
    };
  } catch (error) {
    console.error('Error fetching tags:', error);
    return {
      tags: [],
      error: 'Error fetching tags. Please check your network connection and try again.'
    };
  }
};

/**
 * Check GitHub API rate limit status.
 * @returns {Promise<boolean>} - True if within rate limit, false if exceeded.
 * @throws {Error} If unable to check rate limit.
 */
exports.getVersionTags = getVersionTags;
const checkRateLimit = async () => {
  try {
    const response = await _axios.default.get(`${_const.GITHUB_API_URL}/rate_limit`);
    const remaining = response.data.rate.remaining;
    return remaining > 0;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return false;
  }
};

/**
 * Get versions of the installed components.
 * @returns {Object} - The versions of the components.
 * @param installerMap
 */
const getVersions = async installerMap => {
  const versions = {};
  for (const installerName in installerMap) {
    try {
      const installer = installerMap[installerName];
      versions[installerName] = await installer.checkVersion();
    } catch (error) {
      versions[installerName] = 'Unknown';
    }
  }
  return versions;
};
exports.getVersions = getVersions;
const displayCurrentVersions = versions => {
  const table = new _cliTable.default({
    head: ['Tool', 'Version'],
    colWidths: [20, 50]
  });
  for (const [tool, version] of Object.entries(versions)) {
    table.push([tool, version]);
  }
  console.log(table.toString());
};
exports.displayCurrentVersions = displayCurrentVersions;
const displayVersion = async (tool, version) => {
  const table = new _cliTable.default({
    head: ['Tool', 'Version'],
    colWidths: [20, 50]
  });
  table.push([tool, version]);
  console.log(table.toString());
};
/**
 * Display versions in a table.
 * @param {Object} tags - The versions to display.
 */
exports.displayVersion = displayVersion;
const displayVersionTags = async tags => {
  const table = new _cliTable.default({
    head: ['Version'],
    colWidths: [20, 20, 20, 20]
  });
  const rows = [];
  for (let i = 0; i < tags.length; i += 4) {
    rows.push(tags.slice(i, i + 4).map(tag => tag.version));
  }
  table.push(...rows);
  console.log(table.toString());
};
exports.displayVersionTags = displayVersionTags;
const displayInstallerVersion = async installer => {
  const version = await installer.checkVersion();
  const toolName = installer.constructor.name.replace('Installer', '').toLowerCase();
  await displayVersion(toolName, version);
};

/**
 * Handle the updating to a selected version.
 * @param {Object} installer - The installer object.
 */
exports.displayInstallerVersion = displayInstallerVersion;
const updateVersion = async installer => {
  const version = await promptVersionSelection(installer, 'update');
  if (version) {
    await installer.update(version);
  }
};
/**
 * Fetch available versions and prompt the user to select one.
 * @param {Object} installer - The installer object.
 * @param {string} action - The action to be performed ('install' or 'update').
 * @returns {Promise<string|null>} - The selected version or null if 'Back' is chosen.
 */
exports.updateVersion = updateVersion;
const promptVersionSelection = async (installer, action) => {
  const result = await installer.getAvailableVersions();
  if (result.error) {
    console.error('Error fetching available versions:', result.error);
    return null;
  }
  await displayVersionTags(result.tags);
  const response = await (0, _prompts.default)({
    type: 'select',
    name: 'version',
    message: `Which version do you want to ${action}?`,
    choices: [{
      title: 'Back',
      value: 'back'
    }, ...result.tags.map(tag => ({
      title: tag.version,
      value: tag.version
    }))]
  });
  if (response.version === 'back') {
    return null; // Return to the previous menu
  } else if (response.version) {
    return response.version;
  } else {
    console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} cancelled.`);
    return null;
  }
};