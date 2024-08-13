/**
 * @file omnilumenInstaller.js
 * @description Base class for Omnilumen installers.
 * @module OmnilumenInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
import shell from 'shelljs';
import {exec as execCallback, spawn} from 'child_process';
import Table from "cli-table3";

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
     * display available versions from a repository.
     * @throws {Error} Method not implemented.
     */
    async displayVersionTags(tags) {
        throw new Error('Method not implemented.');
    }

    /**
     * Check the currently installed version.
     * @throws {Error} Method not implemented.
     */
    async checkVersion() {
        throw new Error('Method not implemented.');
    }
    /**
     * get the component tag type.
     * @throws {Error} Method not implemented.
     */
    async tagType() {
        throw new Error('Method not implemented.');
    }
    /**
     * Creates a table with the provided version tags.
     *
     * @param {string[]} tags - An array of version tags to display in the table.
     * @param {number} columns - The number of columns to display in the table.
     * @returns {Table} - A CLI table populated with the version tags.
     */
    createTable = (tags, columns = 4) => {
        const colWidths = new Array(columns).fill(20); // Dynamically generate column widths
        const table = new Table({
            head: new Array(columns).fill('Version'), // Dynamically generate column headers
            colWidths: colWidths,
        });

        const rows = [];
        for (let i = 0; i < tags.length; i += columns) {
            rows.push(tags.slice(i, i + columns));
        }

        table.push(...rows);
        return table;
    }


}

export default OmnilumenInstaller;
/**
 * Run a shell command.
 * @returns {Promise<string>} - The command output.
 */
export const runShellCommand = async (command, spinner) => {
    return new Promise((resolve, reject) => {
        shell.exec(command, { silent: true }, (code, stdout, stderr) => {
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
}

/**
 * Executes a shell command and returns the output as a trimmed string.
 * @param {string} command - The shell command to execute.
 * @returns {Promise<string>} - A promise that resolves with the command's output or rejects with an error.
 */
export const executeShellCommand = async (command) => {
    return new Promise((resolve, reject) => {
        shell.exec(command, { silent: true }, (code, stdout, stderr) => {
            if (code !== 0) {
                return reject(new Error(stderr || 'Command failed'));
            }
            resolve(stdout.trim());
        });
    });
};
/**
 * Run a shell command and log the output in real-time.
 * @param {string} command - The command to run.
 */
export const runShellCommandWithLogs = async (command) => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, { shell: true });

        process.stdout.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    console.log(line);
                }
            });
        });

        process.stderr.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    console.error(line);
                }
            });
        });

        process.on('close', (code) => {
            if (code === 0) {
                console.log(`${command} completed successfully.`);
                resolve();
            } else {
                console.error(`${command} failed with exit code ${code}.`);
                reject(new Error(`${command} failed with exit code ${code}`));
            }
        });
    });
}
/**
 * Run a shell command.
 * @param {string} command - The command to run.
 * @returns {Promise<string>} - The command output.
 */
export const runCommand = async (command) => {
    return new Promise((resolve, reject) => {
        execCallback(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}