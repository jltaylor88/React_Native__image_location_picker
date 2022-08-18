import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParams} from '../App';
import PlaceForm from '../components/Screen Components/PlaceForm';
import Place from '../models/Place';
import {addPlace} from '../redux/placesSlice';
import {useAppDispatch} from '../redux/store';
import {IGeo} from '../types';
import getGeoState from '../utils/getGeoState';

export default function AddPlace({
  route,
}: NativeStackScreenProps<RootStackParams, 'AddPlace'>): JSX.Element {
  const dispatch = useAppDispatch();

  // Manage the Geolocation state initial values from route object
  // Will be undefined when first navigate to the screen and then
  // defined when navigate to this screen from the map screen if saved.
  const lat = route.params?.lat;
  const lng = route.params?.lng;
  const [location, setLocation] = useState<IGeo | undefined>(
    getGeoState({lat, lng}),
  );
  useEffect(() => {
    setLocation(getGeoState({lat, lng}));
  }, [lat, lng]);

  // Add to Redux store on submit
  const handleFormSubmit = useCallback(
    async (place: Place) => {
      const {id, title, imageUri, location: placeLoc} = place;
      dispatch(addPlace({id, title, imageUri, location: placeLoc}));
    },
    [dispatch],
  );

  return <PlaceForm initLocation={location} onSubmit={handleFormSubmit} />;
}
