import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { storageService } from '../storage/localStorage';

const CATEGORIES = [
  'Facial Lift',
  'Slim Arms',
  'Flat Belly',
  'Slim Thighs',
  'Calf Shaping',
  'Tight Core',
  'Back Slim',
  'Bra Line',
  'Total Body',
];

const AddEditExerciseScreen = ({ route, navigation }) => {
  const { exercise } = route.params || {};
  const isEditing = !!exercise;

  const [name, setName] = useState(exercise?.name || '');
  const [description, setDescription] = useState(exercise?.description || '');
  const [category, setCategory] = useState(exercise?.category || 'Total Body');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an exercise name');
      return;
    }

    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const exerciseData = {
      name: name.trim(),
      description: description.trim(),
      category,
      // Store image reference - for new exercises, use placeholder
      // For existing exercises, keep their image
      image: exercise?.image || require('../../assets/images/placeholder.jpg'),
      // Videos are disabled for now
      getVideo: () => null,
    };

    try {
      if (isEditing) {
        await storageService.updateExercise(exercise.id, exerciseData);
        Alert.alert('Success', 'Exercise updated successfully!');
      } else {
        await storageService.addExercise(exerciseData);
        Alert.alert('Success', 'Exercise added successfully!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save exercise');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to delete this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await storageService.deleteExercise(exercise.id);
            if (success) {
              Alert.alert('Success', 'Exercise deleted successfully!');
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to delete exercise');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#E2DBD0" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEditing ? 'Edit Exercise' : 'Add Exercise'}
        </Text>
        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <MaterialIcons name="delete" size={24} color="#E2DBD0" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exercise Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter exercise name"
            placeholderTextColor="#628B35"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter exercise description"
            placeholderTextColor="#628B35"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Update Exercise' : 'Add Exercise'}
          </Text>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFDF5',
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#103713',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#103713',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E2DBD0',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  categoryChipActive: {
    backgroundColor: '#628B35',
    borderColor: '#103713',
  },
  categoryText: {
    fontSize: 14,
    color: '#103713',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFDF5',
  },
  saveButton: {
    backgroundColor: '#628B35',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
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

export default AddEditExerciseScreen;
