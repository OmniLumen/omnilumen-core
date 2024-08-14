import {executeShellCommand, runShellCommandWithLogs} from "../setup/index.js";
import { execSync } from 'child_process';
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

/**
 * Function to stop and remove any Docker container based on the stellar/quickstart image.
 */
export const shutdownContainer = async (name) => {
    try {
        // Use the provided name to find containers based on the specified image
        const findContainersCommand = `docker ps -q --filter "ancestor=${name}"`;

        // Find all containers running the specified image
        const containerIds = (await executeShellCommand(findContainersCommand)).split('\n');

        if (containerIds.length === 0 || containerIds[0] === '') {
            console.log(`No running containers found for image: ${name}.`);
            return;
        }

        // Stop and remove all matching containers
        for (const containerId of containerIds) {
            if (containerId) {
                console.log(`Stopping container ID: ${containerId}`);
                await executeShellCommand(`docker stop ${containerId}`);
                console.log(`Removing container ID: ${containerId}`);
                await executeShellCommand(`docker rm ${containerId}`);
            }
        }

        console.log(`All containers based on image '${name}' have been shut down.`);
    } catch (error) {
        console.error(`Error during shutdown: ${error.message}`);
    }
}

/**
 * Common function to start a Docker container for the Stellar Quickstart.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 * @param {string} networkOption - The network option to pass to the quickstart (e.g., --testnet, --pubnet).
 * @param {string} containerName - The name of the Docker container (e.g., "stellar").
 * @param {string} dockerImage - The Docker image to use (e.g., "stellar/quickstart").
 * @param {string} volumeOption - The volume option for Docker (e.g., `-v "/path:/opt/stellar"`).
 */
export const startDockerContainer = async (customArgs, networkOption, containerName, dockerImage, volumeOption) => {
    let detachedMode = false;
    let interactiveMode = false;
    let port = '8000:8000'; // Default port
    let additionalArgs = []; // Store additional arguments

    // Iterate over arguments and handle flags like -d, -it, and -p
    for (let i = 0; i < customArgs.length; i++) {
        const arg = customArgs[i];
        if (arg === '-d') {
            detachedMode = true;
        } else if (arg === '-it') {
            interactiveMode = true;
        } else if (arg.startsWith('-p') && i + 1 < customArgs.length) {
            port = customArgs[i + 1];
            i++; // Skip the next element as it's part of the -p argument
        } else {
            additionalArgs.push(arg); // Collect any other arguments
        }
    }

    // Determine the appropriate flag based on the mode and environment
    let dockerFlags;
    if (detachedMode) {
        dockerFlags = '-d';
    } else if (interactiveMode) {
        // If -it was explicitly passed by the user, we honor it, but check if TTY is available
        dockerFlags = process.stdout.isTTY ? '-it' : '-i';
    } else {
        // Default to -i if no specific interactive flag was passed
        dockerFlags = '-i';
    }

    // Construct the Docker command with all arguments
    const dockerCommand = `docker run ${dockerFlags} -p "${port}" --name ${containerName} ${volumeOption} ${dockerImage} ${networkOption} ${additionalArgs.join(' ')}`;

    console.log("Executing:", dockerCommand);
    await runShellCommandWithLogs(dockerCommand);

    if (!detachedMode) {
        // Attach to the container logs if not running in detached mode
        try {
            const logCommand = `docker logs -f ${containerName}`;
            console.log(`Streaming logs for container '${containerName}':`);
            execSync(logCommand, { stdio: 'inherit' });  // Stream logs to the console
        } catch (error) {
            console.error(`Error streaming logs for container '${containerName}': ${error.message}`);
        }
    }
}

/**
 * Stops and removes a Docker container by name if it exists.
 * @param {string} containerName - The name of the container to stop and remove.
 */
export const removeExistingContainer = (containerName) => {
    try {
        // Stop the container if it's running
        execSync(`docker stop ${containerName}`, { stdio: 'ignore' });
        // Remove the container
        execSync(`docker rm ${containerName}`, { stdio: 'ignore' });
        console.log(`Existing container '${containerName}' stopped and removed.`);
    } catch (error) {
        // Ignore errors if the container does not exist or cannot be stopped/removed
        console.log(`No existing container named '${containerName}' found, or it could not be removed.`);
    }
};

/**
 * Stops and removes Docker containers based on the image name.
 * @param {string} imageName - The name of the Docker image to stop and remove containers for.
 */
export const stopContainersByImageName = (imageName) => {
    try {
        // Find all container IDs running the specified image
        const containerIds = execSync(`docker ps -q --filter "ancestor=${imageName}"`, { stdio: 'pipe' })
            .toString()
            .trim()
            .split('\n');

        if (containerIds.length > 0 && containerIds[0] !== '') {
            containerIds.forEach((containerId) => {
                // Stop each container
                execSync(`docker stop ${containerId}`, { stdio: 'ignore' });
                // Remove each container
                execSync(`docker rm ${containerId}`, { stdio: 'ignore' });
                console.log(`Stopped and removed container ID: ${containerId}`);
            });
        } else {
            console.log(`No running containers found for image '${imageName}'.`);
        }
    } catch (error) {
        console.error(`Error stopping containers for image '${imageName}': ${error.message}`);
    }
};