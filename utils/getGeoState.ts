import {IGeo} from '../types';

const getGeoState = (params?: Partial<IGeo>) => {
  if (!params || !params.lat || !params.lng) {
    return undefined;
  } else {
    return {lat: params.lat, lng: params.lng};
  }
};

export default getGeoState;
