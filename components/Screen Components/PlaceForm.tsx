import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackParams} from '../../App';
import Place from '../../models/Place';
import {IGeo} from '../../screens/AddPlace';
import {getAddressFromGeo} from '../../utils/maps';
import CTAButton from '../ui/CTAButton';
import MyTextInput from '../ui/MyTextInput';
import ImagePicker from './AddPlaceScreen/ImagePicker';
import LocationPicker from './AddPlaceScreen/LocationPicker';

const getInitialLocation = (params?: IGeo) => {
  if (!params) {
    return undefined;
  } else {
    return {lat: params.lat, lng: params.lng};
  }
};

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
  const [title, setTitle] = useState<string>(initTitle || '');
  useEffect(() => setTitle(initTitle || ''), [initTitle]);
  const [location, setLocation] = useState<IGeo | undefined>(
    getInitialLocation(initLocation),
  );
  useEffect(
    () => setLocation(getInitialLocation(initLocation)),
    [initLocation],
  );

  const [imageUri, setImageUri] = useState<string>(initImageUri || '');
  useEffect(() => setImageUri(initImageUri || ''), [initImageUri]);

  const handleChangeText = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleOnChange = useCallback((selectedLocation: IGeo) => {
    setLocation(selectedLocation);
  }, []);

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
      const address = await getAddressFromGeo(location.lat, location.lng);

      const place = new Place(
        initId || `${new Date().toISOString()}_${Math.random() * 1000}`,
        title,
        imageUri,
        {...location, address},
      );

      onSubmit(place);

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
          onChange={handleOnChange}
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
