import os from 'os';

/**
 * Checks if the current operating system is Windows.
 * @returns {boolean} True if the current OS is Windows, false otherwise.
 */
export const isWindows = () => {
    return os.platform() === 'win32';
};

/**
 * Utility functions for the application.
 * @module utils
 */

/**
 * Checks if the current operating system is macOS.
 * @returns {boolean} True if the current OS is macOS, false otherwise.
 */
export const isMacOS = () => {
    return os.platform() === 'darwin';
};

/**
 * Checks if the current operating system is Linux.
 * @returns {boolean} True if the current OS is Linux, false otherwise.
 */
export const isLinux = () => {
    return os.platform() === 'linux';
};