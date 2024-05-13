import { endpoint, key, secret } from '@/config/xAPIConfig';
import XAPI from "@xapi/xapi";

let xapiInstance = null;

class XAPIMapper {

  constructor() {
    const auth = XAPI.toBasicAuth(key, secret);

    if (!xapiInstance) { xapiInstance = this; }
    if (endpoint) {
      this.xapiInstance = new XAPI({
        endpoint: endpoint,
        auth: auth
      });
    }

    return xapiInstance;
  }

  sendStatement = ({ statement }) => {
    return this.xapiInstance?.sendStatement({ statement }).catch((err) => console.error(err));
  }
}

export default (new XAPIMapper);
