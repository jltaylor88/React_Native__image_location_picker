import React, {useCallback} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import ImageCard from '../../ui/ImageCard';
import OutlineButton from '../../ui/OutlineButton';
import VerticalPadding from './VerticalPadding';

import {launchCamera} from 'react-native-image-picker';

export interface IImagePickerProps {
  imageUri: string;
  onImageOk: (imageUri: string) => void;
}

export default function ImagePicker({
  imageUri,
  onImageOk,
}: IImagePickerProps): JSX.Element {
  const handleOpenCamera = useCallback(async () => {
    // Check if the user has granted permission to save photos
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Camera Access',
        message: 'The image picker needs permission to acess your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      const canCamera = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (!canCamera) {
        Alert.alert(
          "Cannot proceed without access to the device's camera.",
          'Please amend in settings.',
        );
        return;
      }

      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message: 'The image picker needs permission to save your photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const canSave = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      //  Launch the camera
      const result = await launchCamera({
        mediaType: 'photo',

        quality: 0.9,
        saveToPhotos: canSave,
      });

      if (result.didCancel) {
        return;
      }

      const uri = result.assets ? result.assets[0].uri : undefined;
      if (!uri) {
        Alert.alert(
          'Something went wrong. We could not find an image',
          'Please try again later. ',
        );
        return;
      }
      onImageOk(uri);
    } catch (error) {
      console.error(error);
    }
  }, [onImageOk]);

  return (
    <>
      <VerticalPadding>
        <ImageCard placeholderText="No image taken yet" imageUri={imageUri} />
      </VerticalPadding>
      <VerticalPadding>
        <OutlineButton
          onPress={handleOpenCamera}
          text="Take Image"
          icon="camera"
        />
      </VerticalPadding>
    </>
  );
}
