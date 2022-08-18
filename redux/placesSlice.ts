import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ILocation} from '../models/Place';
import {ILocationWithoutAddress} from '../screens/EditPlace';
import {RootState} from './store';

export interface IPlaceObject {
  id: string;
  title: string;
  imageUri: string;
  location: ILocation;
}

export interface IPlacesState {
  places: IPlaceObject[];
  selectedTempPlace?: ILocationWithoutAddress;
}

const initialState: IPlacesState = {
  places: [],
  selectedTempPlace: undefined,
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<IPlaceObject>) => {
      state.places.push(action.payload);
    },
    editPlace: (state, action: PayloadAction<IPlaceObject>) => {
      const idx = state.places.findIndex(el => el.id === action.payload.id);
      if (idx >= 0) {
        state.places[idx] = action.payload;
      }
    },
    setPlaces: (state, action: PayloadAction<IPlaceObject[]>) => {
      state.places = action.payload;
    },
    setTempPlace: (state, action: PayloadAction<ILocationWithoutAddress>) => {
      state.selectedTempPlace = action.payload;
    },
  },
});

export const {addPlace, editPlace, setPlaces, setTempPlace} =
  placesSlice.actions;

export const placesSelector = createSelector(
  [(state: RootState) => state.placesStore.places],
  places => places,
);

export const selectedTempPlaceSelector = (state: RootState) =>
  state.placesStore.selectedTempPlace;

export const selectedPlaceSelector = createSelector(
  [
    (state: RootState) => {
      return state.placesStore.places;
    },
    (_: RootState, id: string) => {
      return id;
    },
  ],
  (places, id) => {
    return places.find(p => p.id === id);
  },
);

const placesReducer = placesSlice.reducer;
export default placesReducer;
