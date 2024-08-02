/**
 * @file versionToolkit.js
 * @description Utility function to get sorted tags by commit date from a GitHub repository.
 * @module versionToolkit
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import axios from 'axios';
import semver from 'semver';
import moment from 'moment';
import Table from "cli-table3";
import prompts from "prompts";
import omnilumenConfig from '../conf/config.js';
import {GITHUB_API_URL} from "../constants/const.js";


/**
* Get sorted tags by commit date from a GitHub repository.
* @param {string} repo - The repository to get tags from.
* @param {number} [numberOfTags=20] - The number of tags to fetch.
* @param cacheExpiryHours - expired cache in hrs
* @returns {Promise<Array<{ version: string, date: string }>>} - The sorted tags.
* @throws {Error} Error fetching tags.
*/
export const getVersionTags = async (repo, numberOfTags = 12, cacheExpiryHours= 2) => {
    try {
        const cacheKey = `tags_${repo}`;
        const cachedData = omnilumenConfig.get(cacheKey);
        const currentTime = moment();

        if (cachedData && currentTime.diff(moment(cachedData.timestamp), 'hours') < cacheExpiryHours) {
            const tags = cachedData.tags.slice(0, numberOfTags);
            return { tags, error: null };
        }
        // Check rate limit before making requests
        const withinRateLimit = await checkRateLimit();
        if (!withinRateLimit) {
            return { tags: [], error: 'API rate limit exceeded. Please try again later.' };
        }

        // Step 1: Get the tags
        const tagsUrl = `${GITHUB_API_URL}/repos/${repo}/tags?per_page=100`;
        const tagsResponse = await axios.get(tagsUrl);
        const tags = tagsResponse.data;

        // Step 2: Filter tags that match the major.minor.patch format
        const validTags = tags.filter(tag => semver.valid(tag.name));

        // Step 3: Sort tags by version
        const sortedTags = validTags.sort((a, b) => semver.rcompare(a.name, b.name)).slice(0, numberOfTags);
        const tagsData = sortedTags.map(tag => ({ version: tag.name }));

        // Store in cache
        omnilumenConfig.set(cacheKey, { tags: tagsData, timestamp: currentTime });

        return { tags: tagsData, error: null };
    } catch (error) {
        console.error('Error fetching tags:', error);
        return { tags: [], error: 'Error fetching tags. Please check your network connection and try again.' };
    }
};

/**
 * Check GitHub API rate limit status.
 * @returns {Promise<boolean>} - True if within rate limit, false if exceeded.
 * @throws {Error} If unable to check rate limit.
 */
const checkRateLimit = async () => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/rate_limit`);
        const remaining = response.data.rate.remaining;
        return remaining > 0;
    } catch (error) {
        console.error('Error checking rate limit:', error);
        return false;
    }
};

/**
 * Get versions of the installed components.
 * @returns {Object} - The versions of the components.
 * @param installerMap
 */
export const getVersions = async (installerMap) => {
    const versions = {};

    for (const installerName in installerMap) {
        try {
            const installer = installerMap[installerName];
            versions[installerName] = await installer.checkVersion();
        } catch (error) {
            versions[installerName] = 'Unknown';
        }
    }

    return versions;
}
export const displayCurrentVersions = (versions) => {
    const table = new Table({
        head: ['Tool', 'Version'],
        colWidths: [20, 50]
    });

    for (const [tool, version] of Object.entries(versions)) {
        table.push([tool, version]);
    }

    console.log(table.toString());
}

export const displayVersion = async (tool, version) => {
    const table = new Table({
        head: ['Tool', 'Version'],
        colWidths: [20, 50]
    });

    table.push([tool, version]);

    console.log(table.toString());
}
/**
 * Display versions in a table.
 * @param {Object} tags - The versions to display.
 */
export const displayVersionTags = async (tags) => {
    const table = new Table({
        head: ['Version'],
        colWidths: [20, 20, 20, 20]
    });

    const rows = [];
    for (let i = 0; i < tags.length; i += 4) {
        rows.push(tags.slice(i, i + 4).map(tag => tag.version));
    }
    table.push(...rows);
    console.log(table.toString());
}
export const displayInstallerVersion = async (installer) => {
    const version = await installer.checkVersion();
    const toolName = installer.constructor.name.replace('Installer', '').toLowerCase();
    await displayVersion(toolName, version);
}


/**
 * Handle the updating to a selected version.
 * @param {Object} installer - The installer object.
 */
export const updateVersion = async (installer) => {
    const version = await promptVersionSelection(installer, 'update');
    if (version) {
        await installer.update(version);
    }
};
/**
 * Fetch available versions and prompt the user to select one.
 * @param {Object} installer - The installer object.
 * @param {string} action - The action to be performed ('install' or 'update').
 * @returns {Promise<string|null>} - The selected version or null if 'Back' is chosen.
 */
const promptVersionSelection = async (installer, action) => {
    const result = await installer.getAvailableVersions();
    if (result.error) {
        console.error('Error fetching available versions:', result.error);
        return null;
    }
    await displayVersionTags(result.tags);

    const response = await prompts({
        type: 'select',
        name: 'version',
        message: `Which version do you want to ${action}?`,
        choices: [
            { title: 'Back', value: 'back' },
            ...result.tags.map(tag => ({ title: tag.version, value: tag.version })),
        ],
    });

    if (response.version === 'back') {
        return null; // Return to the previous menu
    } else if (response.version) {
        return response.version;
    } else {
        console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} cancelled.`);
        return null;
    }
};