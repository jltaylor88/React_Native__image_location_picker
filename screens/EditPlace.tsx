import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootStackParams} from '../App';

import PlaceForm from '../components/Screen Components/PlaceForm';
import Place from '../models/Place';
import {
  editPlace,
  selectedPlaceSelector,
  selectedTempPlaceSelector,
  setTempPlace,
} from '../redux/placesSlice';
import {RootState, useAppDispatch} from '../redux/store';
import {IGeo} from '../types';

export interface ILocationWithoutAddress {
  id: string;
  title: string;
  location: IGeo;
  imageUri: string;
}

export default function EditPLace({
  route,
}: NativeStackScreenProps<RootStackParams, 'EditPlace'>): JSX.Element {
  // Get the value of this place in Redux, from the last time it was saved
  const id = route.params.id;
  const place = useSelector((state: RootState) =>
    selectedPlaceSelector(state, id),
  );

  // Get the temporary value of the place from Redux state, that is independent of address
  const tempPlace = useSelector(selectedTempPlaceSelector);
  const dispatch = useAppDispatch();

  // The Geolocation values passed to the page if navigated here from the map screen
  const newLocation = useMemo(
    () => route.params.newLocation,
    [route.params.newLocation],
  );

  const getCurrent = useCallback(() => {
    if (!place) {
      return;
    }

    const temp = {
      id: place.id,
      title: place.title,
      location: place.location,
      imageUri: place.imageUri,
    };

    // If we haven't navigated here from the map screen, set the temp location
    // to that stored in the places array, without the address
    // Otherwise overide the location with the new selected Geolocation
    if (!newLocation) {
      dispatch(setTempPlace(temp));
    } else {
      dispatch(setTempPlace({...temp, location: newLocation}));
    }
  }, [dispatch, newLocation, place]);

  // Check if navigated from the map screen and passed new Geolocation
  useEffect(() => {
    getCurrent();
  }, [getCurrent]);

  const handleFormSubmit = useCallback(
    async (passedPlace: Place) => {
      // Need a serializable version of the Place class
      const {id: placeId, title, location, imageUri} = passedPlace;
      dispatch(editPlace({id: placeId, title, location, imageUri}));
    },
    [dispatch],
  );

  return (
    <PlaceForm
      initId={tempPlace?.id}
      initTitle={tempPlace?.title}
      initImageUri={tempPlace?.imageUri}
      initLocation={tempPlace?.location}
      onSubmit={handleFormSubmit}
    />
  );
}
