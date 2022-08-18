import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
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

const placesAdapter = createEntityAdapter<IPlaceObject>();

const initialState = placesAdapter.getInitialState<{
  selectedTempPlace?: ILocationWithoutAddress;
}>({
  selectedTempPlace: undefined,
});

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<IPlaceObject>) => {
      placesAdapter.addOne(state, action.payload);
    },
    editPlace: (state, action: PayloadAction<IPlaceObject>) => {
      placesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    setPlaces: (state, action: PayloadAction<IPlaceObject[]>) => {
      placesAdapter.setAll(state, action.payload);
    },
    setTempPlace: (state, action: PayloadAction<ILocationWithoutAddress>) => {
      state.selectedTempPlace = action.payload;
    },
  },
});

export const {addPlace, editPlace, setPlaces, setTempPlace} =
  placesSlice.actions;

export const {
  selectAll: allPlacesSelector,
  selectById: selectedPlaceByIDSelector,
} = placesAdapter.getSelectors((state: RootState) => state.placesStore);

export const selectedTempPlaceSelector = (state: RootState) =>
  state.placesStore.selectedTempPlace;

const placesReducer = placesSlice.reducer;
export default placesReducer;
