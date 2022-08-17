import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';

import IconButton from '../components/ui/IconButton';
import {IGeo} from './AddPlace';

const getInitialValues = (params?: IGeo) => {
  if (!params) {
    return;
  }

  return {lat: params.lat, lng: params.lng};
};

export default function SetLocation({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParams, 'SetLocation'>): JSX.Element {
  const [picked, setPicked] = useState<{lat: number; lng: number} | undefined>(
    getInitialValues(route.params.location),
  );

  const {lat, lng} = route.params.location;
  const id = route.params.id;

  const {navigate} = navigation;
  const handleSaveClick = useCallback(async () => {
    if (!picked) {
      Alert.alert('You need to select a location first');
      return;
    }
    if (!id) {
      navigate('AddPlace', {lat: picked.lat, lng: picked.lng});
    } else {
      navigate('EditPlace', {
        id,
        newLocation: {lat: picked.lat, lng: picked.lng},
      });
    }
  }, [id, navigate, picked]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          name="save"
          size={24}
          color={tintColor}
          onPress={handleSaveClick}
        />
      ),
    });
  }, [handleSaveClick, navigation]);

  const handleOnPress = useCallback((e: MapPressEvent) => {
    const selLat = e.nativeEvent.coordinate.latitude;
    const selLng = e.nativeEvent.coordinate.longitude;

    setPicked({lat: selLat, lng: selLng});
  }, []);

  const body = useMemo(() => {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleOnPress}>
        {picked ? (
          <Marker
            coordinate={{
              latitude: picked?.lat,
              longitude: picked?.lng,
            }}
          />
        ) : null}
      </MapView>
    );
  }, [handleOnPress, lat, lng, picked]);

  return <>{body}</>;
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
