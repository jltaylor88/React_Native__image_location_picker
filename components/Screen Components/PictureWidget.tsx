import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors} from '../../constants/colors';
import Place from '../../models/Place';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../App';

export interface IPictureWidgetProps {
  place: Place;
  style?: StyleProp<ViewStyle>;
}

export default function PictureWidget({
  place,
  style,
}: IPictureWidgetProps): JSX.Element {
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();

  const handleOnPress = useCallback(() => {
    // Navigate to an edit screen
    navigate('EditPlace', {id: place.id});
  }, [navigate, place]);

  return (
    <Pressable
      style={({pressed}) => [
        style,
        styles.container,
        pressed && styles.pressed,
      ]}
      android_ripple={{color: '#ccc'}}
      onPress={handleOnPress}>
      <Image style={styles.image} source={{uri: place.imageUri}} />
      <View style={styles.info}>
        <Text style={styles.header}>{place.title}</Text>
        <Text style={styles.address}>{place.location.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: Colors.primary500,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    height: 120,
  },
  info: {
    padding: 10,
    flex: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray700,
    marginBottom: 5,
  },
  address: {
    color: Colors.gray700,
    fontSize: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  pressed: {
    opacity: 0.7,
  },
});
