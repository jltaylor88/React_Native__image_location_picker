import React, {useMemo} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';

export interface IImageCardProps {
  loading?: boolean;
  imageUri?: string;
  placeholderText: string;
}

export default function ImageCard({
  imageUri,
  loading,
  placeholderText,
}: IImageCardProps): JSX.Element {
  let InnerJSX: JSX.Element = useMemo(() => {
    if (loading) {
      return <ActivityIndicator size="large" color={Colors.primary500} />;
    } else if (!imageUri) {
      return <Text style={styles.placeholderText}>{placeholderText}</Text>;
    } else {
      return <Image style={styles.cardImage} source={{uri: imageUri}} />;
    }
  }, [imageUri, loading, placeholderText]);

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
