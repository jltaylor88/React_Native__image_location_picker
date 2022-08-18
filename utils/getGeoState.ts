import {IGeo} from '../types';

const getGeoState = (params?: IGeo) => {
  if (!params) {
    return undefined;
  } else {
    return {lat: params.lat, lng: params.lng};
  }
};

export default getGeoState;
