import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export interface IOutlineButtonProps {
  icon: string;

  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
}

export default function OutlineButton({
  icon,

  onPress,
  style,
  text,
}: IOutlineButtonProps): JSX.Element {
  return (
    <Pressable
      style={({pressed}) => [styles.button, style, pressed && styles.pressed]}
      onPress={onPress}
      android_ripple={{color: Colors.primary100}}>
      <Icon
        style={styles.buttonIcon}
        name={icon}
        size={24}
        color={Colors.primary500}
      />
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: Colors.primary500,
    fontSize: 16,
    fontWeight: '500',
  },
  pressed: {opacity: 0.7},
});
