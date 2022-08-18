import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Place from '../models/Place';
import {ILocationWithoutAddress} from '../screens/EditPlace';
import {RootState} from './store';

export interface IPlacesState {
  places: Place[];
  selectedPlace?: ILocationWithoutAddress;
}

const initialState: IPlacesState = {
  places: [],
  selectedPlace: undefined,
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      state.places = action.payload;
    },
    getReducer: (state, action: PayloadAction<string>) => {
      state.selectedPlace = state.places.find(p => p.id === action.payload);
    },
  },
});

export const {setPlaces} = placesSlice.actions;

export const placesSelector = createSelector(
  [(state: RootState) => state.placesStore.places],
  places => places,
);

export const selectedPLaceSelector = (state: RootState) =>
  state.placesStore.selectedPlace;

const placesReducer = placesSlice.reducer;
export default placesReducer;
