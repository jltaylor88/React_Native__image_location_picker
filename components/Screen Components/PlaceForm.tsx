import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackParams} from '../../App';
import Place from '../../models/Place';
import {IGeo} from '../../types';
import getGeoState from '../../utils/getGeoState';

import {getAddressFromGeo} from '../../utils/maps';
import CTAButton from '../ui/CTAButton';
import MyTextInput from '../ui/MyTextInput';
import ImagePicker from './AddPlaceScreen/ImagePicker';
import LocationPicker from './AddPlaceScreen/LocationPicker';

export interface IPlaceFormProps {
  initTitle?: string;
  initLocation?: IGeo;
  initImageUri?: string;
  initId?: string;
  onSubmit: (place: Place) => void;
}

export default function PlaceForm({
  initTitle,
  initLocation,
  initImageUri,
  initId,
  onSubmit,
}: IPlaceFormProps): JSX.Element {
  // Manage title state
  const [title, setTitle] = useState<string>(initTitle || '');
  useEffect(() => setTitle(initTitle || ''), [initTitle]);
  const handleChangeText = useCallback((value: string) => {
    setTitle(value);
  }, []);

  // Manage the geolocation state
  const [location, setLocation] = useState<IGeo | undefined>(
    getGeoState(initLocation),
  );
  useEffect(() => setLocation(getGeoState(initLocation)), [initLocation]);
  const handleLocationChange = useCallback((selectedLocation: IGeo) => {
    setLocation(selectedLocation);
  }, []);

  // Manage the image URI state
  const [imageUri, setImageUri] = useState<string>(initImageUri || '');
  useEffect(() => setImageUri(initImageUri || ''), [initImageUri]);
  const handleImageSelect = useCallback((uri: string) => setImageUri(uri), []);

  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();

  const handleSubmit = useCallback(async () => {
    if (!title || !location || !imageUri) {
      Alert.alert(
        'Please ensure you have completed all sections before submitting',
      );
      return;
    }
    try {
      // Get the address associated with the geolocation
      const address = await getAddressFromGeo(location.lat, location.lng);

      // Create a new place from state values, using a passed ID if there is one (such as on edit screen)
      const place = new Place(
        initId || `${new Date().toISOString()}_${Math.random() * 1000}`,
        title,
        imageUri,
        {...location, address},
      );

      onSubmit(place);

      // Navigate to the place list screen if successful
      navigate('Places');
    } catch (error) {
      Alert.alert('There was an error saving your image.', 'Please try again');
      console.error(error);
    }
  }, [imageUri, initId, location, navigate, onSubmit, title]);

  return (
    <ScrollView>
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <MyTextInput
            label="Title"
            onChangeText={handleChangeText}
            value={title}
          />
        </View>
        <ImagePicker onImageOk={handleImageSelect} imageUri={imageUri} />
        <LocationPicker
          id={initId}
          value={location}
          onChange={handleLocationChange}
        />
        <CTAButton buttonText="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },

  ctaButtonContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  ctaButton: {
    backgroundColor: Colors.primary800,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  ctaButtonText: {
    color: Colors.primary100,
    fontSize: 16,
    fontWeight: '500',
  },
  pressed: {opacity: 0.7},
});
