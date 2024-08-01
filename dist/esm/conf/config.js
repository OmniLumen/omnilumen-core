import Configstore from 'configstore';
var omnilumenConfig = new Configstore('omnilumen-cli', {
  sourcedEnv: false
});
export default omnilumenConfig;