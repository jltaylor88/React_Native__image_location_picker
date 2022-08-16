import VerticalPadding from './VerticalPadding';
import React, {useCallback, useMemo} from 'react';
import {
  Alert,
  PermissionsAndroid,
  PermissionStatus,
  StyleSheet,
  View,
} from 'react-native';
import ImageCard from '../../ui/ImageCard';
import OutlineButton from '../../ui/OutlineButton';
import Geolocation from 'react-native-geolocation-service';
import {getStaticMapURL} from '../../../utils/maps';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../App';
import {IGeo} from '../../../screens/AddPlace';

interface ILocationPickerProps {
  onChange: (value: IGeo) => void;
  value?: IGeo;
}

export default function LocationPicker({
  onChange,
  value,
}: ILocationPickerProps): JSX.Element {
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();

  const handleLocateUser = useCallback(
    async ({
      onSuccess,
    }: {
      onSuccess: (location: Geolocation.GeoPosition) => void;
    }): Promise<void> => {
      // Check if the user has granted permission
      try {
        const granted: PermissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'The location picker needs to access your location ' +
              'in order to tag your photo.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Access the user's geolocation
          Geolocation.getCurrentPosition(
            position => {
              onSuccess(position);
            },
            error => {
              Alert.alert(String(error));
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const handlePressLocate = useCallback(async () => {
    await handleLocateUser({
      onSuccess: loc =>
        onChange({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        }),
    });
  }, [handleLocateUser, onChange]);

  const handlePickOnMap = useCallback(async () => {
    await handleLocateUser({
      onSuccess: loc => {
        navigate('SetLocation', {
          lat: value?.lat ?? loc.coords.latitude,
          lng: value?.lng ?? loc.coords.longitude,
        });
      },
    });
  }, [handleLocateUser, navigate, value?.lat, value?.lng]);

  const imageURI: string | undefined = useMemo(() => {
    const {lat, lng} = value || {};
    if (!lat || !lng) {
      return;
    }
    return getStaticMapURL(lat, lng);
  }, [value]);

  return (
    <>
      <VerticalPadding>
        <ImageCard
          imageUri={imageURI}
          placeholderText="No location picked yet"
        />
      </VerticalPadding>
      <VerticalPadding>
        <View style={styles.buttonRow}>
          <OutlineButton
            text="Locate User"
            icon="location"
            onPress={handlePressLocate}
          />
          <OutlineButton
            text="Pick on Map"
            icon="map"
            onPress={handlePickOnMap}
          />
        </View>
      </VerticalPadding>
    </>
  );
}

const styles = StyleSheet.create({
  buttonRow: {flexDirection: 'row', justifyContent: 'space-evenly'},
});
