import {StatusBar} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Places from './screens/Places';
import {Colors} from './constants/colors';
import AddPlace, {IGeo} from './screens/AddPlace';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableLatestRenderer} from 'react-native-maps';
import SetLocation from './screens/SetLocation';

export type RootStackParams = {
  Places: undefined;
  AddPlace: IGeo | undefined;
  SetLocation: IGeo;
};

const Stack = createNativeStackNavigator<RootStackParams>();

enableLatestRenderer();

export default function App(): JSX.Element {
  return (
    <>
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
            name="SetLocation"
            component={SetLocation}
            options={{
              title: 'Map',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
