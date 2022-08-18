import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
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
  const id = route.params.id;
  const place = useSelector((state: RootState) =>
    selectedPlaceSelector(state, id),
  );
  const tempPlace = useSelector(selectedTempPlaceSelector);
  const dispatch = useAppDispatch();

  const newLocation = route.params.newLocation;

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
    if (!newLocation) {
      dispatch(setTempPlace(temp));
    } else {
      dispatch(setTempPlace({...temp, location: newLocation}));
    }
  }, [dispatch, newLocation, place]);

  useEffect(() => {
    getCurrent();
  }, [getCurrent, id]);

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
