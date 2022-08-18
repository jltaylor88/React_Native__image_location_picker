import {StatusBar, Text} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Places from './screens/Places';
import {Colors} from './constants/colors';
import AddPlace from './screens/AddPlace';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableLatestRenderer} from 'react-native-maps';
import SetLocation from './screens/SetLocation';
import EditPLace from './screens/EditPlace';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {IGeo} from './types';

export type RootStackParams = {
  Places: undefined;
  AddPlace: IGeo | undefined;
  EditPlace: {id: string; newLocation?: IGeo};
  SetLocation: {id?: string; location: IGeo};
};

const Stack = createNativeStackNavigator<RootStackParams>();

enableLatestRenderer();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              contentStyle: {
                backgroundColor: Colors.gray700,
              },
            }}
            initialRouteName="Places">
            <Stack.Screen
              name="Places"
              component={Places}
              options={{title: 'Your Favourite Places'}}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{title: 'Add A New Place'}}
            />
            <Stack.Screen
              name="EditPlace"
              component={EditPLace}
              options={{
                title: 'Edit Place',
              }}
            />
            <Stack.Screen
              name="SetLocation"
              component={SetLocation}
              options={{
                title: 'Map',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
