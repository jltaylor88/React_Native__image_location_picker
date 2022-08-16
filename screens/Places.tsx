import {StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {RootStackParams} from '../App';
import IconButton from '../components/ui/IconButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageKeys} from '../types';
import {Colors} from '../constants/colors';
import Place from '../models/Place';

export default function Places({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Places'>): JSX.Element {
  const [places, setPlaces] = useState<Place[]>([]);

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

  const fetchItems = async () => {
    try {
      const items = await AsyncStorage.getItem(LocalStorageKeys.Places);
      let parsed: Place[];
      if (!items) {
        parsed = [];
      } else {
        parsed = JSON.parse(items);
      }

      setPlaces(parsed);
    } catch (error) {
      console.error(String(error));
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  console.log(places);

  return (
    <View style={styles.container}>
      {places.length === 0 ? (
        <Text style={styles.noPlacesText}>
          No places added yet. Please check back in later.
        </Text>
      ) : null}
    </View>
  );
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
});
