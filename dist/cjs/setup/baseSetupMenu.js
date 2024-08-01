"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _const = require("../constants/const");
var _inquirer = _interopRequireDefault(require("inquirer"));
var _chalk = _interopRequireDefault(require("chalk"));
var _versionToolkit = require("./versionToolkit.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @file baseSetupMenu.js
 * @description BaseSetupMenu to set up components.
 * @module BaseSetupMenu
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

// Adjust the path as needed

class BaseSetupMenu {
  constructor(installerMap) {
    this.installerMap = installerMap;
  }
  async showMenu() {
    const components = this.getComponents();
    const versions = await (0, _versionToolkit.getVersions)(this.installerMap);
    (0, _versionToolkit.displayCurrentVersions)(versions);
    let continueLoop = true;
    while (continueLoop) {
      const componentPrompt = await _inquirer.default.prompt([{
        type: 'list',
        name: 'component',
        message: 'Choose a component:',
        choices: components
      }]);
      if (componentPrompt.component === _const.COMMON.EXIT) {
        continueLoop = false;
        process.exit(0);
      } else {
        await this.handleComponent(componentPrompt.component);
      }
    }
  }
  async checkPrerequisite() {
    throw new Error('Method not implemented.');
  }
  getComponents() {
    throw new Error('Method not implemented.');
  }
  async handleComponent(component) {
    const installer = this.installerMap[component];
    await this.showActionMenu(installer);
  }
  async showActionMenu(installer) {
    const componentName = _chalk.default.green(installer.constructor.name.replace('Installer', ''));

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let currentVersion = (await installer.checkVersion()).toLowerCase();
      let actions = [_const.MENU_ACTIONS.BACK, _const.MENU_ACTIONS.SHOW_RELEASES, _const.MENU_ACTIONS.VERSION_INFO];
      if (currentVersion === _const.COMMON.UNKNOWN) {
        actions.push(_const.MENU_ACTIONS.INSTALL);
      } else {
        actions.push(_const.MENU_ACTIONS.UPDATE);
        actions.push(_const.MENU_ACTIONS.UNINSTALL);
      }
      const actionPrompt = await _inquirer.default.prompt([{
        type: 'list',
        name: 'action',
        message: `Choose an action for the ${componentName} component:`,
        choices: actions
      }]);
      if (actionPrompt.action === _const.MENU_ACTIONS.BACK) {
        return;
      }
      const continueLoop = await this.handleAction(installer, actionPrompt.action);
      if (actionPrompt.action === _const.MENU_ACTIONS.UNINSTALL) {
        currentVersion = (await installer.checkVersion()).toLowerCase();
        if (currentVersion === _const.COMMON.UNKNOWN) {
          actions = [_const.MENU_ACTIONS.BACK, _const.MENU_ACTIONS.SHOW_RELEASES, _const.MENU_ACTIONS.VERSION_INFO, _const.MENU_ACTIONS.INSTALL];
        }
      }
      if (!continueLoop) {
        break;
      }
    }
  }

  /**
   * Handle the chosen action for an installer.
   * @param {OmnilumenInstaller} installer - The installer instance.
   * @param {string} action - The action to perform.
   */
  async handleAction(installer, action) {
    switch (action) {
      case _const.MENU_ACTIONS.INSTALL:
        await installer.install();
        break;
      case _const.MENU_ACTIONS.UPDATE:
        await (0, _versionToolkit.updateVersion)(installer);
        break;
      case _const.MENU_ACTIONS.UNINSTALL:
        await installer.uninstall();
        break;
      case _const.MENU_ACTIONS.SHOW_RELEASES:
        // eslint-disable-next-line no-case-declarations
        const {
          tags,
          error
        } = await installer.getAvailableVersions();
        if (error) {
          console.error('Error fetching available versions:', error);
        } else {
          await (0, _versionToolkit.displayVersionTags)(tags);
        }
        break;
      case _const.MENU_ACTIONS.VERSION_INFO:
        await (0, _versionToolkit.displayInstallerVersion)(installer);
        break;
      case _const.COMMON.EXIT:
        console.log('Exiting...');
        return false;
      default:
        console.log('Unknown action');
    }
    return true;
  }
}
var _default = exports.default = BaseSetupMenu;