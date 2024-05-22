import {ConnectEndpointKey} from './data';

export type ConnectInfo = {
  type: typeof ConnectEndpointKey,
  endpointUrl: string,
  logoUrl: string,
  chanelName: string,
};

