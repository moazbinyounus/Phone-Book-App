import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from 'react-native';

interface Props extends RNTextInputProps {
  label?: string;
  error?: string;
}

// A simple wrapper around RN TextInput with label and error display
export const TextInput: React.FC<Props> = ({
  label,
  error,
  style,
  ...rest
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <RNTextInput
      style={[styles.input, style]}
      placeholderTextColor="#888"
      {...rest}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  error: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
});
