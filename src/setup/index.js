/**
 * @file index.js
 * @description export setup functions
 * @module setup
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import BaseSetupMenu, { displayHomeMenu }  from "./baseSetupMenu.js";
import OmnilumenInstaller, {runShellCommand, runShellCommandWithLogs, runCommand, executeShellCommand} from "./omnilumenInstaller.js";
export {getVersions, listImageTags, displayCurrentVersions, displayInstallerVersion, displayVersion, displayVersionTagsTable, displayImageTagsTable, getVersionTags, updateVersion} from "./versionToolkit.js";
export { BaseSetupMenu, displayHomeMenu, OmnilumenInstaller, runShellCommand, runShellCommandWithLogs, runCommand, executeShellCommand };