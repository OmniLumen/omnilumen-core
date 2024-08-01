"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runShellCommandWithLogs = exports.runShellCommand = exports.runCommand = exports.default = void 0;
var _shelljs = _interopRequireDefault(require("shelljs"));
var _child_process = require("child_process");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @file omnilumenInstaller.js
 * @description Base class for Omnilumen installers.
 * @module OmnilumenInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

class OmnilumenInstaller {
  /**
   * Install the component.
   * @throws {Error} Method not implemented.
   */
  async install() {
    throw new Error('Method not implemented.');
  }

  /**
   * Update the component.
   * @param {string} [version='latest'] - The version to update.
   * @throws {Error} Method not implemented.
   */
  async update(version = 'latest') {
    throw new Error('Method not implemented.');
  }

  /**
   * Uninstall the component.
   * @throws {Error} Method not implemented.
   */
  async uninstall() {
    throw new Error('Method not implemented.');
  }

  /**
   * Get available versions from a repository.
   * @throws {Error} Method not implemented.
   */
  async getAvailableVersions() {
    throw new Error('Method not implemented.');
  }

  /**
   * Check the currently installed version.
   * @throws {Error} Method not implemented.
   */
  async checkVersion() {
    throw new Error('Method not implemented.');
  }
}
var _default = exports.default = OmnilumenInstaller;
/**
 * Run a shell command.
 * @returns {Promise<string>} - The command output.
 */
const runShellCommand = async (command, spinner) => {
  return new Promise((resolve, reject) => {
    _shelljs.default.exec(command, {
      silent: true
    }, (code, stdout, stderr) => {
      if (code !== 0) {
        spinner.fail(`Command failed: ${command}\n${stderr || 'Unknown error'}`);
        return reject(new Error(stderr || 'Command failed'));
      }
      spinner.text = `${command} completed successfully.`;
      resolve(stdout.trim());
    });

    // Simulate dynamic spinner updates
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Loading components...';
    }, 1000);
    setTimeout(() => {
      spinner.color = 'green';
      spinner.text = 'Finalizing setup...';
    }, 2000);
  });
};

/**
 * Run a shell command and log the output in real-time.
 * @param {string} command - The command to run.
 */
exports.runShellCommand = runShellCommand;
const runShellCommandWithLogs = async command => {
  return new Promise((resolve, reject) => {
    const process = (0, _child_process.spawn)(command, {
      shell: true
    });
    process.stdout.on('data', data => {
      const lines = data.toString().split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          console.log(line);
        }
      });
    });
    process.stderr.on('data', data => {
      const lines = data.toString().split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          console.error(line);
        }
      });
    });
    process.on('close', code => {
      if (code === 0) {
        console.log(`${command} completed successfully.`);
        resolve();
      } else {
        console.error(`${command} failed with exit code ${code}.`);
        reject(new Error(`${command} failed with exit code ${code}`));
      }
    });
  });
};
/**
 * Run a shell command.
 * @param {string} command - The command to run.
 * @returns {Promise<string>} - The command output.
 */
exports.runShellCommandWithLogs = runShellCommandWithLogs;
const runCommand = async command => {
  return new Promise((resolve, reject) => {
    (0, _child_process.exec)(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};
exports.runCommand = runCommand;