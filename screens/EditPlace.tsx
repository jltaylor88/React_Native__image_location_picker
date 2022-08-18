import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParams} from '../App';

import PlaceForm from '../components/Screen Components/PlaceForm';
import Place from '../models/Place';
import {LocalStorageKeys} from '../types';
import {IGeo} from './AddPlace';

export interface ILocationWithoutAddress {
  id: string;
  title: string;
  location: IGeo;
  imageUri: string;
}

export default function EditPLace({
  route,
}: NativeStackScreenProps<RootStackParams, 'EditPlace'>): JSX.Element {
  const [placeToUse, setPlaceToUse] = useState<ILocationWithoutAddress>();

  const id = route.params.id;
  const newLocation = route.params.newLocation;

  const getCurrent = useCallback(
    async (placeId: string) => {
      const currentItems = await AsyncStorage.getItem(LocalStorageKeys.Places);
      const parsedCurrent: Place[] = currentItems
        ? (JSON.parse(currentItems) as Place[])
        : [];
      const selected = parsedCurrent.find(el => el.id === placeId);
      if (!selected) {
        return;
      }

      const temp = {
        id: selected.id,
        title: selected.title,
        location: selected.location,
        imageUri: selected.imageUri,
      };
      if (!newLocation) {
        return temp;
      }

      return {...temp, location: newLocation};
    },
    [newLocation],
  );

  const fetchAndSetState = useCallback(
    async (placeId: string) => {
      const s = await getCurrent(placeId);
      if (!s) {
        return;
      }

      setPlaceToUse(s);
    },
    [getCurrent],
  );

  useEffect(() => {
    fetchAndSetState(id);
  }, [fetchAndSetState, id]);

  const handleFormSubmit = useCallback(async (place: Place) => {
    const currentItems = await AsyncStorage.getItem(LocalStorageKeys.Places);
    const parsedCurrent: Place[] = currentItems
      ? (JSON.parse(currentItems) as Place[])
      : [];
    const idx = parsedCurrent.findIndex(val => val.id === place.id);

    let updated: Place[];
    if (idx >= 0) {
      parsedCurrent[idx] = place;
      updated = parsedCurrent;
    } else {
      updated = [...parsedCurrent, place];
    }

    AsyncStorage.setItem(LocalStorageKeys.Places, JSON.stringify(updated));
  }, []);

  return (
    <PlaceForm
      initId={placeToUse?.id}
      initTitle={placeToUse?.title}
      initImageUri={placeToUse?.imageUri}
      initLocation={placeToUse?.location}
      onSubmit={handleFormSubmit}
    />
  );
}
