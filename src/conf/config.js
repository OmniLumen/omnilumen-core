import Configstore from 'configstore';

// Create the configurations
const omnilumenConfig = new Configstore('omnilumen-cli', { sourcedEnv: false });
const omnilumenQuickStartConfig = new Configstore('omnilumen-quickstart', { sourcedEnv: false });

// Export both configurations as a single object
const config = {
    omnilumenConfig,
    omnilumenQuickStartConfig,
};

export default config;