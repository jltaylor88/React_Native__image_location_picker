import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {RootStackParams} from '../App';
import IconButton from '../components/ui/IconButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../constants/colors';
import PictureWidget from '../components/Screen Components/PictureWidget';

import {placesSelector} from '../redux/placesSlice';
import {useSelector} from 'react-redux';

export default function Places({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Places'>): JSX.Element {
  const places = useSelector(placesSelector);

  const {navigate, setOptions} = useMemo(() => navigation, [navigation]);

  const handleAddPress = useCallback(() => {
    navigate('AddPlace');
  }, [navigate]);

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <IconButton
          name="add"
          color="black"
          size={24}
          onPress={handleAddPress}
          style={styles.button}
        />
      ),
    });
  }, [handleAddPress, setOptions]);

  const Body = useMemo(() => {
    if (places.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.noPlacesText}>
            No places added yet. Please check back in later.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.list}
          data={places}
          renderItem={({item}) => <PictureWidget place={item} />}
        />
      );
    }
  }, [places]);

  return <>{Body}</>;
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlacesText: {
    color: Colors.primary200,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  list: {
    padding: 20,
  },
});
