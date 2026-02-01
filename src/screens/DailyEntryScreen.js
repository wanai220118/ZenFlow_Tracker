import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import StepCounter from '../components/StepCounter';
import { storageService } from '../storage/localStorage';

const DailyEntryScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [steps, setSteps] = useState(0);
  const [vstepperSteps, setVstepperSteps] = useState(0);
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setToday(date);
    loadTodayEntry(date);
  }, []);

  const loadTodayEntry = async (date) => {
    const entry = await storageService.getDailyEntry(date);
    if (entry) {
      setWeight(entry.weight?.toString() || '');
      setSteps(entry.steps || 0);
      setVstepperSteps(entry.vstepperSteps || 0);
    }
  };

  const handleSave = async () => {
    if (!weight) {
      Alert.alert('Error', 'Please enter your weight');
      return;
    }

    const entry = {
      weight: parseFloat(weight),
      steps: steps,
      vstepperSteps: vstepperSteps,
      date: today,
    };

    await storageService.saveDailyEntry(today, entry);
    Alert.alert('Success', 'Daily entry saved successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Entry</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Today's Weight (kg)</Text>
          <View style={styles.weightInputContainer}>
            <TextInput
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              placeholder="Enter weight"
              placeholderTextColor="#628B35"
            />
          </View>
        </View>

        <StepCounter
          label="Steps Walked Today"
          value={steps}
          onChange={setSteps}
          placeholder="0"
        />

        <StepCounter
          label="VStepper Steps"
          value={vstepperSteps}
          onChange={setVstepperSteps}
          placeholder="0"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  header: {
    backgroundColor: '#103713',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDF5',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#E2DBD0',
    fontStyle: 'italic',
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#103713',
    marginBottom: 8,
  },
  weightInputContainer: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  weightInput: {
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#103713',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#628B35',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFDF5',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default DailyEntryScreen;

