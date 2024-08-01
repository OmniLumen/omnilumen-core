import Configstore from 'configstore';

// Create and export a singleton instance of Configstore
const config = new Configstore('omnilumen-cli', { sourcedEnv: false });
export default config;