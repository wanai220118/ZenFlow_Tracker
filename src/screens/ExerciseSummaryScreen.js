import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ExerciseSummaryScreen = ({ route, navigation }) => {
  const { exercise, sets, date } = route.params;

  const completedSets = sets.filter((set) => set.completed).length;
  const totalTime = sets.reduce((total, set) => {
    if (set.time && typeof set.time === 'string' && set.time !== 'Completed') {
      // If time is stored as duration, add it
      return total;
    }
    return total;
  }, 0);

  const handleContinue = () => {
    navigation.navigate('ExerciseList');
  };

  const handleDoAnother = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎉 Great Job!</Text>
        <Text style={styles.subtitle}>Exercise Completed</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.exerciseInfo}>
          <Image
            source={exercise.image || require('../../assets/images/placeholder.jpg')}
            style={styles.exerciseImage}
          />
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          {exercise.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{exercise.category}</Text>
            </View>
          )}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Workout Summary</Text>
          
          <View style={styles.summaryRow}>
            <MaterialIcons name="check-circle" size={24} color="#628B35" />
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryLabel}>Sets Completed</Text>
              <Text style={styles.summaryValue}>
                {completedSets} of {sets.length}
              </Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <MaterialIcons name="calendar-today" size={24} color="#628B35" />
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>

          <View style={styles.setsBreakdown}>
            <Text style={styles.setsBreakdownTitle}>Sets Breakdown</Text>
            {sets.map((set, index) => (
              <View key={index} style={styles.setRow}>
                <Text style={styles.setNumber}>Set {index + 1}</Text>
                {set.completed ? (
                  <View style={styles.setCompleted}>
                    <MaterialIcons name="check" size={20} color="#628B35" />
                    <Text style={styles.setStatusText}>Completed</Text>
                  </View>
                ) : (
                  <Text style={styles.setStatusTextPending}>Not Completed</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleContinue}
          >
            <MaterialIcons name="home" size={24} color="#FFFDF5" />
            <Text style={styles.buttonText}>Back to Exercises</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleDoAnother}
          >
            <MaterialIcons name="repeat" size={24} color="#628B35" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Do Another Set
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#628B35',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFDF5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2DBD0',
  },
  content: {
    padding: 20,
  },
  exerciseInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  exerciseImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#628B35',
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryBadge: {
    backgroundColor: '#628B35',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#FFFDF5',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryCard: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#628B35',
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#103713',
  },
  setsBreakdown: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#628B35',
  },
  setsBreakdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#103713',
  },
  setCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  setStatusText: {
    fontSize: 14,
    color: '#628B35',
    fontWeight: '600',
  },
  setStatusTextPending: {
    fontSize: 14,
    color: '#E2DBD0',
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#628B35',
  },
  secondaryButton: {
    backgroundColor: '#E2DBD0',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  buttonText: {
    color: '#FFFDF5',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#628B35',
  },
});

export default ExerciseSummaryScreen;
