import shell from "shelljs";
import inquirer from "inquirer";

/**
 * Recursively searches for a command in the command structure.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string} key - The command key to search for.
 * @returns {Object|null} - The found command structure or null if not found.
 */
export const findCommand = (commandStructure, key) => {
    if (commandStructure.key === key) {
        return commandStructure;
    }
    if (commandStructure.commands) {
        for (let command of commandStructure.commands) {
            const found = findCommand(command, key);
            if (found) {
                return found;
            }
        }
    }
    return null;
}
/**
 * Recursively searches for a command in the command structure, considering the command path.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string} path - The command path to search for.
 * @returns {Object|null} - The found command structure or null if not found.
 */
export const findCommandWithPath = (commandStructure, path) => {
    const keys = path.split(' ');
    let currentStructure = commandStructure;

    for (let key of keys) {
        currentStructure = findFirstLevelCommand(currentStructure, key);
        if (!currentStructure) {
            return null;
        }
    }

    return currentStructure;
}
/**
 * Recursively finds all occurrences of a command and builds their paths.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string} key - The command key to search for.
 * @param {string} [path=''] - The current command path.
 * @returns {string[]} - An array of command paths.
 */
export const findAllCommands = (commandStructure, key, path = '') => {
    let commands = [];
    const currentPath = path ? `${path} ${commandStructure.key}` : commandStructure.key;

    if (commandStructure.key === key) {
        commands.push(currentPath);
    }

    if (commandStructure.commands) {
        for (let command of commandStructure.commands) {
            commands = commands.concat(findAllCommands(command, key, currentPath));
        }
    }

    return commands;
}

/**
 * Processes the input command, finds all matching subcommands, and handles them based on the number of matches.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string} command - The user input command to process.
 * @returns {Promise<string|null>} - A promise that resolves to the final command to execute or null if user selection is required.
 */
export const processCommand = async (commandStructure, command) => {
    const splitCommand = command.split(' ');
    const lastSubcommand = splitCommand[splitCommand.length - 1];

    const matchingCommands = findAllCommands(commandStructure, lastSubcommand);

    if (matchingCommands.length === 1) {
        // If there's only one match, return it directly
        return matchingCommands[0];
    } else if (matchingCommands.length > 1) {
        // Filter commands by checking if the command context uniquely identifies it
        const contextMatches = matchingCommands.filter(cmd => cmd.endsWith(command));
        if (contextMatches.length === 1) {
            // If the context uniquely identifies a command, return it
            return contextMatches[0];
        } else {
            // If multiple matches still exist, prompt the user to select one
            return await displayOptions(contextMatches);
        }
    } else {
        // If no exact match is found, traverse up the command hierarchy
        return await findClosestHelpCommand(commandStructure, splitCommand);
    }
}

/**
 * Traverses up the command hierarchy to find a valid help or command if the exact match is not found.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string[]} commandParts - The split parts of the command.
 * @returns {Promise<string|null>} - A promise that resolves to the found help or command, or null if not found.
 */
/**
 * Traverses up the command hierarchy to find a valid help or command if the exact match is not found.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string[]} commandParts - The split parts of the command.
 * @returns {Promise<string|null>} - A promise that resolves to the found help or command, or null if not found.
 */
/**
 * Traverses up the command hierarchy to find a valid help or command if the exact match is not found.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string[]} commandParts - The split parts of the command.
 * @returns {Promise<string|null>} - A promise that resolves to the found help or command, or null if not found.
 */
export const findClosestHelpCommand = async (commandStructure, commandParts) => {
    let currentCommand = commandParts.join(' ');
    let currentPath = '';

    for (let i = 0; i < commandParts.length; i++) {
        if (i > 0) {
            currentPath += ' ';
        }
        currentPath += commandParts[i];
    }

    for (let i = commandParts.length - 1; i >= 0; i--) {
        const partialCommand = commandParts.slice(0, i + 1).join(' ');
        const helpCommand = `stellar ${partialCommand} --help`;

        // Check if the partial command is a valid command at this level
        const foundCommand = findCommandWithPath(commandStructure, partialCommand);
        if (foundCommand) {
            // console.log(`Command "${currentCommand}" not found. Showing help for "${partialCommand}":`);
            return helpCommand;
        }
    }
    return 'stellar --help';
}
/**
 * Recursively searches for a command in the command structure.
 * @param {Object} commandStructure - The command structure to search within.
 * @param {string} key - The command key to search for.
 * @returns {Object|null} - The found command structure or null if not found.
 */
export const findFirstLevelCommand = (commandStructure, key) => {
    if (commandStructure.key === key) {
        return commandStructure;
    }
    if (commandStructure.commands) {
        for (let command of commandStructure.commands) {
            if (command.key === key) {
                return command;
            }
        }
    }
    return null;
}
/**
 * Displays a list of command options for user selection.
 * @param {string[]} commands - The list of matching command paths.
 */
/**
 * Displays a list of command options for user selection using inquirer.prompt.
 * @param {string[]} commands - The list of matching command paths.
 * @returns {Promise<string>} - A promise that resolves to the selected command.
 */
export const displayOptions = async (commands) => {
    const { selectedCommand } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedCommand',
            message: 'Select a command to execute:',
            choices: commands
        }
    ]);
    return selectedCommand;
}

/**
 * Function to recursively check if the last argument matches any command keys.
 * @param {Array} commands - The array of command objects.
 * @param {String} lastArg - The last argument in the process.argv array.
 * @returns {Boolean} - Returns true if the last argument matches a command key, otherwise false.
 */
export const isLastArgCommandKey = (commands, lastArg) => {
    for (const command of commands) {
        if (command.key === lastArg) {
            return true;
        }
        if (command.commands && command.commands.length > 0) {
            if (isLastArgCommandKey(command.commands, lastArg)) {
                return true;
            }
        }
    }
    return false;
}

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