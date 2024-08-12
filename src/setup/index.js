/**
 * @file index.js
 * @description export setup functions
 * @module setup
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import BaseSetupMenu  from "./baseSetupMenu.js";
import OmnilumenInstaller, {runShellCommand, runShellCommandWithLogs, runCommand} from "./omnilumenInstaller.js";
export {getVersions, listImageTags, displayCurrentVersions, displayInstallerVersion, displayVersion, displayVersionTags, getVersionTags, updateVersion} from "./versionToolkit.js";
export { BaseSetupMenu, OmnilumenInstaller, runShellCommand, runShellCommandWithLogs, runCommand };