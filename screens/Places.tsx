import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {RootStackParams} from '../App';
import IconButton from '../components/ui/IconButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '../constants/colors';
import PictureWidget from '../components/Screen Components/PictureWidget';
import {useSelector} from 'react-redux';
import {allPlacesSelector} from '../redux/placesSlice';

export default function Places({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Places'>): JSX.Element {
  // Load the existing places from Redux
  const places = useSelector(allPlacesSelector);

  // Setup the navigation to the add place screen in the header button
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

  // Conditionally render body based on whether any places have been saved
  const Body = useMemo(() => {
    const l = places.length;
    if (l === 0) {
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
          renderItem={({item, index}) => {
            // Add extra padding at start and end of list
            const style =
              index === 0
                ? styles.first
                : index === l - 1
                ? styles.last
                : undefined;
            return <PictureWidget style={style} place={item} />;
          }}
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
    paddingHorizontal: 20,
  },
  first: {marginTop: 20},
  last: {marginBottom: 20},
});
