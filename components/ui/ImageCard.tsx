import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';

export interface IImageCardProps {
  imageUri?: string;
  placeholderText: string;
}

export default function ImageCard({
  imageUri,
  placeholderText,
}: IImageCardProps): JSX.Element {
  let InnerJSX: JSX.Element = useMemo(() => {
    if (!imageUri) {
      return <Text style={styles.placeholderText}>{placeholderText}</Text>;
    } else {
      return <Image style={styles.cardImage} source={{uri: imageUri}} />;
    }
  }, [imageUri, placeholderText]);

  return <View style={styles.card}>{InnerJSX}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary100,
    height: 220,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    height: 220,
    width: '100%',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
