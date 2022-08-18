import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParams} from '../App';
import PlaceForm from '../components/Screen Components/PlaceForm';
import Place from '../models/Place';
import {addPlace} from '../redux/placesSlice';
import {useAppDispatch} from '../redux/store';

export interface IGeo {
  lat: number;
  lng: number;
}

const getInit = (location: Partial<IGeo>) => {
  if (!location.lat || !location.lng) {
    return undefined;
  } else {
    return {
      lat: location.lat,
      lng: location.lng,
    };
  }
};

export default function AddPlace({
  route,
}: NativeStackScreenProps<RootStackParams, 'AddPlace'>): JSX.Element {
  const dispatch = useAppDispatch();

  const lat = route.params?.lat;
  const lng = route.params?.lng;
  const [location, setLocation] = useState<IGeo | undefined>(
    getInit({lat, lng}),
  );
  useEffect(() => {
    setLocation(getInit({lat, lng}));
  }, [lat, lng]);

  const handleFormSubmit = useCallback(
    async (place: Place) => {
      const {id, title, imageUri, location: placeLoc} = place;
      dispatch(addPlace({id, title, imageUri, location: placeLoc}));
    },
    [dispatch],
  );

  return <PlaceForm initLocation={location} onSubmit={handleFormSubmit} />;
}
