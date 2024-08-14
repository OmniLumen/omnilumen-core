/**
 * @file baseSetupMenu.js
 * @description BaseSetupMenu to set up components.
 * @module BaseSetupMenu
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import {COMMON, MENU_ACTIONS} from "../constants/const.js";
import inquirer from 'inquirer';
import chalk from 'chalk';
import {
    displayCurrentVersions,
    displayInstallerVersion,
    getVersions,
    updateVersion
} from './versionToolkit.js';
import cfonts from 'cfonts';

class BaseSetupMenu {
    constructor(installerMap) {
        this.installerMap = installerMap;
    }

    async showMenu() {
        const components = this.getComponents();
        const versions = await getVersions(this.installerMap);
        displayCurrentVersions(versions);

        let continueLoop = true;
        while (continueLoop) {
            const componentPrompt = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'component',
                    message: 'Choose a component:',
                    choices: components,
                }
            ]);

            if (componentPrompt.component === COMMON.EXIT) {
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
        const componentName = chalk.green(installer.constructor.name.replace('Installer', ''));

        // eslint-disable-next-line no-constant-condition
        while (true) {
            let currentVersion = (await installer.checkVersion()).toLowerCase();
            let actions = [MENU_ACTIONS.BACK, MENU_ACTIONS.SHOW_RELEASES, MENU_ACTIONS.VERSION_INFO];

            if (currentVersion === COMMON.UNKNOWN) {
                actions.push(MENU_ACTIONS.INSTALL);
            } else {
                actions.push(MENU_ACTIONS.UPDATE);
                actions.push(MENU_ACTIONS.UNINSTALL);
            }

            const actionPrompt = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: `Choose an action for the ${componentName} component:`,
                    choices: actions,
                }
            ]);

            if (actionPrompt.action === MENU_ACTIONS.BACK) {
                return;
            }

            const continueLoop = await this.handleAction(installer, actionPrompt.action);

            if (actionPrompt.action === MENU_ACTIONS.UNINSTALL) {
                currentVersion = (await installer.checkVersion()).toLowerCase();
                if (currentVersion === COMMON.UNKNOWN) {
                    actions = [MENU_ACTIONS.BACK, MENU_ACTIONS.SHOW_RELEASES, MENU_ACTIONS.VERSION_INFO, MENU_ACTIONS.INSTALL];
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
            case MENU_ACTIONS.INSTALL:
                await installer.install();
                break;
            case MENU_ACTIONS.UPDATE:
                await updateVersion(installer);
                break;
            case MENU_ACTIONS.UNINSTALL:
                await installer.uninstall();
                break;
            case MENU_ACTIONS.SHOW_RELEASES:
                // eslint-disable-next-line no-case-declarations
                const { tags, error } = await installer.getAvailableVersions();
                if (error) {
                    console.error('Error fetching available versions:', error);
                } else {
                    await installer.displayVersionTags(tags);
                }
                break;
                break;
            case MENU_ACTIONS.VERSION_INFO:
                await displayInstallerVersion(installer)
                break;
            case COMMON.EXIT:
                console.log('Exiting...');
                return false;
            default:
                console.log('Unknown action');
        }
        return true;
    }
}
export default BaseSetupMenu;

/**
 * Function to display a stylized message using cfonts.
 * The message, font, colors, and other settings can be customized.
 *
 * @param {string} message - The message to display.
 * @param {object} [options={}] - The configuration options for cfonts.
 * @param {string} [options.font='simple'] - The font face to use.
 * @param {string} [options.align='left'] - The text alignment.
 * @param {Array<string>} [options.colors=['system']] - The colors to use.
 * @param {string} [options.background='transparent'] - The background color.
 * @param {number} [options.letterSpacing=1] - The letter spacing.
 * @param {number} [options.lineHeight=1] - The line height.
 * @param {boolean} [options.space=true] - Whether to add empty lines on top and bottom.
 * @param {number|string} [options.maxLength='0'] - The maximum length of a line.
 * @param {Array<string>} [options.gradient=['red', 'blue']] - The gradient colors.
 * @param {boolean} [options.independentGradient=false] - Whether to recalculate the gradient for each line.
 * @param {boolean} [options.transitionGradient=false] - Whether to transition between colors directly.
 * @param {boolean} [options.rawMode=false] - Whether to use CRLF for line breaks.
 * @param {string} [options.env='node'] - The environment in which cfonts is executed.
 */
export const displayHomeMenu = (message, options = {}) => {
    // Set default options and allow overwriting through the options parameter
    const defaultOptions = {
        font: 'simple',
        align: 'left',
        colors: ['system'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: ['red', 'blue'],
        independentGradient: false,
        transitionGradient: false,
        rawMode: false,
        env: 'node'
    };

    const mergedOptions = { ...defaultOptions, ...options };

    // Display the styled message
    cfonts.say(message, mergedOptions);
}
