import axios, {AxiosResponse} from 'axios';
import {GOOGLE_API_KEY} from '../keys';

export const getStaticMapURL = (lat: number, lng: number): string => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    lat,
  )}%2c%20${encodeURIComponent(lng)}&markers=color:redS%7C${encodeURIComponent(
    lat,
  )},${encodeURIComponent(lng)}&zoom=11&size=400x400&key=${encodeURIComponent(
    GOOGLE_API_KEY,
  )}`;
};

export const getAddressFromGeo = async (
  lat: number,
  lng: number,
): Promise<string> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(
    lat,
  )},${encodeURIComponent(lng)}&key=${encodeURIComponent(GOOGLE_API_KEY)}`;

  const response: AxiosResponse<{results: {formatted_address: string}[]}> =
    await axios.get(url);

  if (response.status === 200) {
    return response.data.results[0].formatted_address;
  }

  throw new Error('There was an error fetching the address');
};
