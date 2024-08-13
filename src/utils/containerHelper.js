import {executeShellCommand} from "../setup/index.js";

/**
 * Checks if Docker is installed and running on the system.
 * @returns {Promise<boolean>} Resolves to true if Docker is installed, otherwise resolves to false.
 */
export const  isDockerInstalled = async() => {
    try {
        const result = await executeShellCommand('docker --version');
        if (result) {
            return true;
        } else {
            throw new Error('Docker is not installed or not running.');
        }
    } catch (error) {
        return false;
    }
}

/**
 * Checks if the Stellar Quickstart Docker image is available locally.
 * @returns {Promise<boolean>} Resolves to true if the image is available, otherwise resolves to false.
 */
export const isImageAvailable = async()=>{

    try {
        const result = await executeShellCommand('docker images -q stellar/quickstart');
        if (result) {
            return true;
        } else {
            throw new Error('Stellar Quickstart image is not available locally.');
        }
    } catch (error) {
        return false;
    }
}

/**
 * Ensures that Docker is installed and the Stellar Quickstart image is available locally.
 * @returns {Promise<boolean>} Resolves to true if both Docker and the Quickstart image are available, otherwise resolves to false.
 */
export const ensureStellarQuickStart = async() => {
    try {
        const dockerInstalled = await isDockerInstalled();
        if (!dockerInstalled) {
            console.error('Docker is not installed or not running.');
            return false;
        }
        console.log('Docker is installed.');

        const imageAvailable = await isImageAvailable();
        if (!imageAvailable) {
            console.error('Stellar Quickstart image is not available locally.');
            return false;
        }
        console.log('Stellar Quickstart image is available locally.');

        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}