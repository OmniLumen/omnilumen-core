import Configstore from 'configstore';

const omnilumenConfig = new Configstore('omnilumen-cli', { sourcedEnv: false });

export default omnilumenConfig;