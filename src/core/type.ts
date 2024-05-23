import {ConnectEndpointKey} from './data';

export type ConnectInfo = {
  connected: boolean,
  type: typeof ConnectEndpointKey,
  url: string,
  logo: string,
  chanel: string,
};

