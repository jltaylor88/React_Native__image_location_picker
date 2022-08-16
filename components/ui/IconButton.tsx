import React from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface IIconButtonProps {
  color?: string;
  name: string;
  size: number;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export default function IconButton({
  color,
  name,
  size,
  onPress,
  style,
}: IIconButtonProps): JSX.Element {
  return (
    <Pressable
      style={({pressed}) => [style, pressed && styles.pressed]}
      onPress={onPress}>
      <Icon name={name} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
