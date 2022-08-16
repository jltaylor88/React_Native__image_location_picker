import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {RootStackParams} from '../App';
import ImagePicker from '../components/Screen Components/AddPlaceScreen/ImagePicker';
import LocationPicker from '../components/Screen Components/AddPlaceScreen/LocationPicker';
import CTAButton from '../components/ui/CTAButton';
import MyTextInput from '../components/ui/MyTextInput';
import {Colors} from '../constants/colors';
import Place from '../models/Place';
import {LocalStorageKeys} from '../types';
import {getAddressFromGeo} from '../utils/maps';

export interface IGeo {
  lat: number;
  lng: number;
}

const getInitialValues = (params?: IGeo) => {
  if (!params) {
    return undefined;
  } else {
    return {lat: params.lat, lng: params.lng};
  }
};

export default function AddPlace({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, 'AddPlace'>): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<IGeo | undefined>(
    getInitialValues(route.params),
  );
  useEffect(() => setLocation(getInitialValues(route.params)), [route.params]);

  const [imageUri, setImageUri] = useState('');

  const handleChangeText = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleOnChange = useCallback((selectedLocation: IGeo) => {
    setLocation(selectedLocation);
  }, []);

  const handleImageSelect = useCallback((uri: string) => setImageUri(uri), []);

  const handleSubmit = useCallback(async () => {
    if (!title || !location || !imageUri) {
      Alert.alert(
        'Please ensure you have completed all sections before submitting',
      );
      return;
    }
    try {
      const address = await getAddressFromGeo(location.lat, location.lng);
      const place = new Place(
        `${new Date().toISOString()}_${Math.random() * 1000}`,
        title,
        imageUri,
        {...location, address},
      );

      const currentItems = await AsyncStorage.getItem(LocalStorageKeys.Places);
      const parsedCurrent = currentItems
        ? (JSON.parse(currentItems) as unknown[])
        : [];
      const updated = [...parsedCurrent, place];
      AsyncStorage.setItem(LocalStorageKeys.Places, JSON.stringify(updated));
      navigation.navigate('Places');
    } catch (error) {
      Alert.alert('There was an error saving your image.', 'Please try again');
      console.error(error);
    }
  }, [imageUri, location, navigation, title]);

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
        <LocationPicker value={location} onChange={handleOnChange} />
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
