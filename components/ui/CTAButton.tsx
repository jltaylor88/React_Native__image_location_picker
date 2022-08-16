import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/colors';

export interface ICTAButtonProps {
  buttonText: string;
  onPress: () => void;
}

export default function CTAButton({
  buttonText,
  onPress,
}: ICTAButtonProps): JSX.Element {
  return (
    <View style={styles.ctaButtonContainer}>
      <Pressable
        style={styles.ctaButton}
        android_ripple={{color: '#ccc'}}
        onPress={onPress}>
        <Text style={styles.ctaButtonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
