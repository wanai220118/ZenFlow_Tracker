import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const StepCounter = ({ label, value, onChange, placeholder = "0" }) => {
  const [localValue, setLocalValue] = useState(value?.toString() || "");

  const handleIncrement = () => {
    const newValue = (parseInt(localValue) || 0) + 1;
    setLocalValue(newValue.toString());
    if (onChange) onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, (parseInt(localValue) || 0) - 1);
    setLocalValue(newValue.toString());
    if (onChange) onChange(newValue);
  };

  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setLocalValue(numericValue);
    if (onChange) onChange(parseInt(numericValue) || 0);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value.toString());
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={localValue}
          onChangeText={handleTextChange}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor="#628B35"
        />
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#103713',
    marginBottom: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 4,
  },
  button: {
    backgroundColor: '#628B35',
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFDF5',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#103713',
    paddingVertical: 12,
    marginHorizontal: 8,
  },
});

export default StepCounter;

