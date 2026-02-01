import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ExerciseCard from '../components/ExerciseCard';
import { storageService } from '../storage/localStorage';

const CATEGORIES = [
  'All',
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

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryProgress, setCategoryProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    loadExercises();
    const unsubscribe = navigation.addListener('focus', () => {
      loadExercises();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterExercises();
    if (exercises.length > 0) {
      calculateCategoryProgress(exercises).catch(console.error);
    }
  }, [exercises, selectedCategory, searchQuery]);

  const loadExercises = async () => {
    const loadedExercises = await storageService.getExercises();
    setExercises(loadedExercises);
    // Progress will be calculated in the useEffect that depends on exercises
  };

  const calculateCategoryProgress = async (exercisesList) => {
    if (selectedCategory === 'All') {
      setCategoryProgress({ completed: 0, total: 0 });
      return;
    }

    const categoryExercises = exercisesList.filter(
      (ex) => ex.category === selectedCategory
    );

    if (categoryExercises.length === 0) {
      setCategoryProgress({ completed: 0, total: 0 });
      return;
    }

    // Get today's date to check for today's progress
    const today = new Date().toISOString().split('T')[0];
    const logs = await storageService.getExerciseLogs();

    let completedCount = 0;
    let startedCount = 0;

    categoryExercises.forEach((exercise) => {
      // Check if exercise has been started (has any log entry)
      const exerciseLogs = Object.keys(logs).filter((key) =>
        key.startsWith(`${exercise.id}_`)
      );

      if (exerciseLogs.length > 0) {
        startedCount++;
        // Check if completed today or has any completed log
        const todayLog = logs[`${exercise.id}_${today}`];
        if (todayLog?.completed) {
          completedCount++;
        } else {
          // Check if any log shows completion
          const hasCompleted = exerciseLogs.some(
            (key) => logs[key]?.completed
          );
          if (hasCompleted) {
            completedCount++;
          }
        }
      }
    });

    setCategoryProgress({
      completed: completedCount,
      started: startedCount,
      total: categoryExercises.length,
    });
  };

  const filterExercises = () => {
    let filtered = exercises;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((ex) => ex.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ex) =>
          ex.name.toLowerCase().includes(query) ||
          ex.description?.toLowerCase().includes(query)
      );
    }

    setFilteredExercises(filtered);
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetail', { exercise });
  };

  const handleAddExercise = () => {
    navigation.navigate('AddEditExercise');
  };

  const handleEditExercise = (exercise) => {
    navigation.navigate('AddEditExercise', { exercise });
  };

  const handleStartCategoryWorkout = () => {
    if (filteredExercises.length > 0) {
      // Start with the first exercise in the filtered category
      handleExercisePress(filteredExercises[0]);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // If category has exercises and is not "All", scroll to top to show start button
    if (category !== 'All') {
      const categoryExercises = exercises.filter((ex) => ex.category === category);
      if (categoryExercises.length > 0) {
        // Category selected, exercises will be filtered automatically
      }
    }
  };

  const renderExercise = ({ item }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      onLongPress={() => handleEditExercise(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="fitness-center" size={64} color="#E2DBD0" />
      <Text style={styles.emptyTitle}>No Exercises Yet</Text>
      <Text style={styles.emptyText}>
        Add your first exercise to get started!
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddExercise}
      >
        <MaterialIcons name="add" size={24} color="#FFFDF5" />
        <Text style={styles.addButtonText}>Add Exercise</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Exercises</Text>
        <Text style={styles.subtitle}>Manage your exercise routines</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#628B35" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#628B35"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="clear" size={20} color="#628B35" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
              onPress={() => handleCategoryPress(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {selectedCategory !== 'All' && filteredExercises.length > 0 && (
        <View style={styles.startWorkoutContainer}>
          {categoryProgress.started > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Category Progress</Text>
                <Text style={styles.progressText}>
                  {categoryProgress.completed}/{categoryProgress.total} completed
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${(categoryProgress.completed / categoryProgress.total) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressSubtext}>
                {categoryProgress.started} of {categoryProgress.total} exercises started
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.startWorkoutButton}
            onPress={handleStartCategoryWorkout}
            activeOpacity={0.8}
          >
            <MaterialIcons name="play-arrow" size={24} color="#FFFDF5" />
            <View style={styles.startWorkoutTextContainer}>
              <Text style={styles.startWorkoutText}>
                {categoryProgress.started > 0 ? 'Continue' : 'Start'} {selectedCategory} Workout
              </Text>
              <Text style={styles.startWorkoutSubtext}>
                {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} available
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          filteredExercises.length === 0 ? styles.emptyList : styles.list
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddExercise}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={32} color="#FFFDF5" />
      </TouchableOpacity>
    </View>
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
  subtitle: {
    fontSize: 14,
    color: '#E2DBD0',
    fontStyle: 'italic',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2DBD0',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#103713',
  },
  categoryContainer: {
    marginBottom: 8,
  },
  startWorkoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFDF5',
  },
  progressContainer: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#103713',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#628B35',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#FFFDF5',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#628B35',
    borderRadius: 6,
    minWidth: 4,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#628B35',
    fontStyle: 'italic',
  },
  startWorkoutButton: {
    backgroundColor: '#628B35',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startWorkoutTextContainer: {
    flex: 1,
  },
  startWorkoutText: {
    color: '#FFFDF5',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  startWorkoutSubtext: {
    color: '#E2DBD0',
    fontSize: 12,
    fontWeight: '500',
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E2DBD0',
    borderWidth: 2,
    borderColor: '#628B35',
    marginRight: 8,
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
  list: {
    paddingVertical: 16,
    paddingBottom: 80,
  },
  emptyList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#103713',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#628B35',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#628B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFDF5',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#628B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default ExerciseListScreen;
