/**
 * @file commandHelper.js
 * @description BaseSetupMenu to set up components.
 * @module Command Utils
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import Configstore from "configstore";
import shell from "shelljs";

/**
 * Initializes and loads the CLI configuration store.
 *
 * @param {string} configName - The name of the configuration store.
 * @returns {Configstore} - Returns an instance of Configstore for the given configuration name.
 */
export const loadConfigStore = (configName) => {
    return new Configstore(configName);
};

/**
 * Finds the nearest valid command path by progressively removing the last part of the command.
 *
 * @param configStore - configstore with command path
 * @param {string[]} commandParts - The array of command parts (e.g., ['stellar', 'network', 'rm']).
 * @returns {string|null} - Returns the nearest valid command path or null if none found.
 */
function findNearestValidCommand(configStore, commandParts) {

    const originalCommandParts = [...commandParts]; // Keep the original parts intact
    let commandPath;
    while (commandParts.length > 0) {
        commandPath = commandParts.join('.'); // Join parts with '.'
        if (configStore.has(commandPath)) {
            return commandPath;
        }

        commandParts.pop(); // Remove the last part and try again
    }
    return originalCommandParts.length > 1 ? originalCommandParts.slice(0, -1).join('.') : null;
}

/**
 * Checks if a command path exists in the store.
 *
 * @param configStore - configstore with command path
 * @param {string} commandPath - The dot-separated command path (e.g., 'stellar.network.rm').
 * @returns {boolean} - Returns true if the command path exists in the store, false otherwise.
 */
export const isCommandInStore = (configStore, commandPath) => {
    return configStore.has(commandPath);
};
/**
 * Processes the command arguments to build the final command, ensuring it is valid.
 *
 * @param configStore - configstore with command path
 * @param reconstructedCommand
 * @returns {Promise<string>} - Returns the final command to be executed.
 */
export const processCliCommandArgs = async (configStore, reconstructedCommand) => {
    const [commandPart, ...optionsPart] = reconstructedCommand.split(/ --/);
    // Reattach the options part with -- prefix
    const optionsString = optionsPart.length > 0 ? `--${optionsPart.join(' --')}` : '';
    // Split the command part into its individual arguments
    const commandParts = commandPart.trim().split(' ');
    const startsWithStellar = commandParts[0] === 'stellar';
    // Construct the command path using all parts of the command
    const commandPath = commandParts.join('.');
    // If the full command exists, return it without duplicating options
    if (configStore.has(commandPath)) {
        return `${commandPart.trim()} ${optionsString}`.trim();
    }
    // If the full command doesn't exist, find the nearest valid command
    const nearestCommandPath = findNearestValidCommand(configStore, [...commandParts]);
    if (nearestCommandPath) {
        const splitNearestCommand = nearestCommandPath.split('.');
        const lastKeyword = splitNearestCommand[splitNearestCommand.length - 1];
        const lastKeywordIndex = commandParts.indexOf(lastKeyword) + 1;
        const remainingArgs = commandParts.slice(lastKeywordIndex).join(' ');
        return `${startsWithStellar ? '' : 'stellar '}${splitNearestCommand.join(' ')} ${remainingArgs} ${optionsString}`.trim();
    }
    return 'stellar --help';
};

/**
 * Recursively generates command paths from the command structure and stores them in configstore.
 *
 * @param configStore - configstore with command path
 * @param {Object} commandStructure - The structure representing the command hierarchy.
 * @param {string} parentPath - The parent path to be prefixed to the current command.
 */
export const generateCommandPaths = (configStore, commandStructure, parentPath = '') => {
    const currentPath = parentPath ? `${parentPath}.${commandStructure.key}` : commandStructure.key;

    if (commandStructure.commands && commandStructure.commands.length > 0) {
        // Continue traversing down the tree
        commandStructure.commands.forEach(subCommand => {
            generateCommandPaths(configStore, subCommand, currentPath);
        });
    } else {
        // If it's a leaf node, store the path
        configStore.set(currentPath, commandStructure.description);
    }
};

// Function to retrieve all stored commands
export const getStoredCommands = (configStore) => {
    return configStore.all;
};

/**
 * execute command
 * @param command
 */
export const executeCommand = (command) => {
    shell.exec(command, { silent: false }, (code, stdout, stderr) => {
        process.exit(code);  // Force exit after command execution
    });
}

/**
 * Function to ensure Stellar CLI is installed
 * @returns {Promise<boolean>} - Returns true if Stellar CLI is installed, otherwise false
 */
export async function ensureStellarCli() {
    return new Promise((resolve, reject) => {
        shell.exec('stellar --version', { silent: true }, (code, stdout, stderr) => {
            if (code === 0) {
                resolve(true);
            } else {
                console.log('Stellar CLI not found. Switching to menu for installation...');
                resolve(false);
            }
        });
    });
}

/**
 * Recursively traverse the command structure and collect command data.
 *
 * @param {Object} commandStructure - The command structure to traverse.
 * @param {Array} collectedCommands - The array where collected command data will be stored.
 */
export function collectCommands(commandStructure, collectedCommands = []) {
    if (commandStructure.commands && commandStructure.commands.length > 0) {
        commandStructure.commands.forEach(subCommand => {
            collectedCommands.push({
                command: subCommand.key,
                description: subCommand.description,
                example: subCommand.example || '',
            });
            collectCommands(subCommand, collectedCommands);
        });
    }
}
