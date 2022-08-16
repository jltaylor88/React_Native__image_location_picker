import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export default function VerticalPadding({
  children,
}: PropsWithChildren): JSX.Element {
  return <View style={styles.vertMarginContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  vertMarginContainer: {
    marginBottom: 15,
  },
});
