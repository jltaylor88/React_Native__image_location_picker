import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParams} from '../App';
import PlaceForm from '../components/Screen Components/PlaceForm';
import Place from '../models/Place';
import {LocalStorageKeys} from '../types';

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
  const lat = route.params?.lat;
  const lng = route.params?.lng;
  const [location, setLocation] = useState<IGeo | undefined>(
    getInit({lat, lng}),
  );
  useEffect(() => {
    setLocation(getInit({lat, lng}));
  }, [lat, lng]);

  const handleFormSubmit = useCallback(async (place: Place) => {
    const currentItems = await AsyncStorage.getItem(LocalStorageKeys.Places);
    const parsedCurrent = currentItems
      ? (JSON.parse(currentItems) as unknown[])
      : [];
    const updated = [...parsedCurrent, place];
    AsyncStorage.setItem(LocalStorageKeys.Places, JSON.stringify(updated));
  }, []);

  return <PlaceForm initLocation={location} onSubmit={handleFormSubmit} />;
}
