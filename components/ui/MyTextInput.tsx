import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {Colors} from '../../constants/colors';

export interface IMyTextInputProps {
  label: string;
  onChangeText: (value: string) => void;
  value: string;
}

export default function MyTextInput({
  label,
  onChangeText,
  value,
}: IMyTextInputProps): JSX.Element {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: Colors.primary700,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: Colors.primary100,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 3,
    fontSize: 16,
    color: Colors.primary700,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});
