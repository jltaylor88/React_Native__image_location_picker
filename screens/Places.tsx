import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';
import {RootStackParams} from '../App';
import IconButton from '../components/ui/IconButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageKeys} from '../types';
import {Colors} from '../constants/colors';
import Place from '../models/Place';
import PictureWidget from '../components/Screen Components/PictureWidget';
import {useAppDispatch} from '../redux/store';
import {placesSelector, setPlaces} from '../redux/placesSlice';
import {useSelector} from 'react-redux';

export default function Places({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Places'>): JSX.Element {
  const dispatch = useAppDispatch();

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

  const fetchItems = useCallback(async () => {
    try {
      const items = await AsyncStorage.getItem(LocalStorageKeys.Places);
      let parsed: Place[];
      if (!items) {
        parsed = [];
      } else {
        parsed = JSON.parse(items);
      }

      dispatch(setPlaces(parsed));
    } catch (error) {
      console.error(String(error));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
