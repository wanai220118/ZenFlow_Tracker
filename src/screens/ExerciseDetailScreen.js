import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Timer from '../components/Timer';
import RestTimer from '../components/RestTimer';
import { storageService } from '../storage/localStorage';

const ExerciseDetailScreen = ({ route, navigation }) => {
  const { exercise } = route.params;
  const [currentSet, setCurrentSet] = useState(1);
  const [sets, setSets] = useState([
    { completed: false, time: null },
    { completed: false, time: null },
    { completed: false, time: null },
  ]);
  const [videoRef, setVideoRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restDuration, setRestDuration] = useState(60); // Default 60 seconds
  const [exerciseFrequency, setExerciseFrequency] = useState(null);

  useEffect(() => {
    loadExerciseLog();
    loadExerciseFrequency();
    // Load video lazily when screen mounts
    if (exercise.getVideo) {
      setVideoSource(exercise.getVideo());
    } else if (exercise.video) {
      setVideoSource(exercise.video);
    }
  }, []);

  const loadExerciseFrequency = async () => {
    const frequency = await storageService.getExerciseFrequency(exercise.id);
    setExerciseFrequency(frequency);
  };

  const loadExerciseLog = async () => {
    const date = new Date().toISOString().split('T')[0];
    const log = await storageService.getExerciseLog(exercise.id, date);
    if (log) {
      setSets(log.sets || sets);
      setCurrentSet(log.currentSet || 1);
    }
  };

  const handleSetComplete = async (setNumber, timeUsed) => {
    const newSets = [...sets];
    newSets[setNumber - 1] = {
      completed: true,
      time: timeUsed,
    };
    setSets(newSets);

    const date = new Date().toISOString().split('T')[0];
    
    if (setNumber < 3) {
      setCurrentSet(setNumber + 1);
      // Save progress after each set
      await storageService.saveExerciseLog(exercise.id, date, {
        sets: newSets,
        currentSet: setNumber + 1,
        completed: false,
      });
      
      // Show rest timer before next set
      setShowRestTimer(true);
      
      // Save workout to history
      await storageService.saveWorkoutHistory(date, {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        category: exercise.category,
        setNumber: setNumber,
        completed: true,
      });
    } else {
      // All sets completed
      await storageService.saveExerciseLog(exercise.id, date, {
        sets: newSets,
        currentSet: setNumber + 1,
        completed: true,
      });
      
      // Save final workout to history
      await storageService.saveWorkoutHistory(date, {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        category: exercise.category,
        setNumber: setNumber,
        completed: true,
        allSetsCompleted: true,
      });
      
      // Navigate to completion summary
      navigation.navigate('ExerciseSummary', {
        exercise,
        sets: newSets,
        date,
      });
    }
  };

  const handleRestComplete = () => {
    setShowRestTimer(false);
    // Reset rest timer duration for next time
    setRestDuration(60);
  };

  const handleRestSkip = () => {
    setShowRestTimer(false);
    // Reset rest timer duration for next time
    setRestDuration(60);
  };

  const handleTimerComplete = () => {
    handleSetComplete(currentSet, 'Completed');
  };

  const togglePlayPause = async () => {
    if (videoRef) {
      if (isPlaying) {
        await videoRef.pauseAsync();
      } else {
        await videoRef.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAutoPlayToggle = () => {
    setAutoPlay(!autoPlay);
    if (!autoPlay && videoRef) {
      videoRef.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={exercise.image || require('../../assets/images/placeholder.jpg')} 
            style={styles.image} 
          />
        </View>

        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>Exercise Video</Text>
          {videoSource ? (
            <Video
              ref={(ref) => setVideoRef(ref)}
              source={videoSource}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              shouldPlay={autoPlay}
              isLooping
            />
          ) : (
            <View style={[styles.video, styles.videoPlaceholder]}>
              <Text style={styles.videoPlaceholderText}>
                Video placeholder{'\n'}(Videos temporarily disabled for testing)
              </Text>
            </View>
          )}
          {videoSource && (
            <View style={styles.videoControls}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                <MaterialIcons
                  name={isPlaying ? 'pause' : 'play-arrow'}
                  size={20}
                  color="#FFFDF5"
                  style={styles.playButtonIcon}
                />
                <Text style={styles.playButtonText}>
                  {isPlaying ? 'Pause' : 'Play'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.playButton, autoPlay && styles.activeButton]}
                onPress={handleAutoPlayToggle}
              >
                <MaterialIcons
                  name="repeat"
                  size={20}
                  color="#FFFDF5"
                  style={styles.playButtonIcon}
                />
                <Text style={styles.playButtonText}>
                  {autoPlay ? 'Auto Play ON' : 'Auto Play OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.setsSection}>
          <Text style={styles.sectionTitle}>Sets Progress</Text>
          <View style={styles.setsContainer}>
            {sets.map((set, index) => (
              <View
                key={index}
                style={[
                  styles.setCard,
                  set.completed && styles.setCardCompleted,
                  currentSet === index + 1 && styles.setCardActive,
                ]}
              >
                <Text style={styles.setNumber}>Set {index + 1}</Text>
                {set.completed ? (
                  <Text style={styles.setStatus}>✓ Completed</Text>
                ) : currentSet === index + 1 ? (
                  <Text style={styles.setStatus}>In Progress</Text>
                ) : (
                  <Text style={styles.setStatus}>Pending</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {showRestTimer && (
          <View style={styles.restTimerSection}>
            <Text style={styles.sectionTitle}>Rest Before Next Set</Text>
            <RestTimer
              duration={restDuration}
              onComplete={handleRestComplete}
              onSkip={handleRestSkip}
              autoStart={true}
            />
            <View style={styles.restDurationSelector}>
              <Text style={styles.restDurationLabel}>Rest Duration:</Text>
              <View style={styles.restDurationButtons}>
                {[30, 60, 90, 120].map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.restDurationButton,
                      restDuration === duration && styles.restDurationButtonActive,
                    ]}
                    onPress={() => setRestDuration(duration)}
                  >
                    <Text
                      style={[
                        styles.restDurationButtonText,
                        restDuration === duration && styles.restDurationButtonTextActive,
                      ]}
                    >
                      {duration}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {!showRestTimer && (
          <View style={styles.timerSection}>
            <Text style={styles.sectionTitle}>
              Timer - Set {currentSet} of 3
            </Text>
            <Timer
              duration={60}
              onComplete={handleTimerComplete}
              autoStart={false}
            />
          </View>
        )}

        {exerciseFrequency && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Exercise History</Text>
            <View style={styles.historyCard}>
              <View style={styles.historyRow}>
                <MaterialIcons name="history" size={20} color="#628B35" />
                <Text style={styles.historyLabel}>Total Completions:</Text>
                <Text style={styles.historyValue}>{exerciseFrequency.totalCount}</Text>
              </View>
              {exerciseFrequency.lastDone && (
                <>
                  <View style={styles.historyRow}>
                    <MaterialIcons name="event" size={20} color="#628B35" />
                    <Text style={styles.historyLabel}>Last Done:</Text>
                    <Text style={styles.historyValue}>
                      {new Date(exerciseFrequency.lastDone).toLocaleDateString()}
                    </Text>
                  </View>
                  {exerciseFrequency.daysSinceLastDone !== null && (
                    <View style={styles.historyRow}>
                      <MaterialIcons name="schedule" size={20} color="#628B35" />
                      <Text style={styles.historyLabel}>Days Since:</Text>
                      <Text style={styles.historyValue}>
                        {exerciseFrequency.daysSinceLastDone} day{exerciseFrequency.daysSinceLastDone !== 1 ? 's' : ''}
                      </Text>
                    </View>
                  )}
                </>
              )}
              {!exerciseFrequency.lastDone && (
                <Text style={styles.historyEmpty}>No previous completions</Text>
              )}
            </View>
          </View>
        )}
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
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: '#E2DBD0',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDF5',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#E2DBD0',
    lineHeight: 20,
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#E2DBD0',
  },
  videoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 12,
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
    borderRadius: 12,
    marginBottom: 12,
  },
  videoPlaceholder: {
    backgroundColor: '#E2DBD0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    color: '#628B35',
    fontSize: 16,
    fontWeight: '600',
  },
  videoControls: {
    flexDirection: 'row',
    gap: 10,
  },
  playButton: {
    flex: 1,
    backgroundColor: '#628B35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  activeButton: {
    backgroundColor: '#103713',
  },
  playButtonIcon: {
    marginRight: 4,
  },
  playButtonText: {
    color: '#FFFDF5',
    fontSize: 16,
    fontWeight: '600',
  },
  setsSection: {
    marginBottom: 30,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  setCard: {
    flex: 1,
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  setCardActive: {
    borderColor: '#628B35',
    backgroundColor: '#FFFDF5',
  },
  setCardCompleted: {
    backgroundColor: '#628B35',
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 4,
  },
  setStatus: {
    fontSize: 12,
    color: '#103713',
    fontWeight: '600',
  },
  timerSection: {
    marginBottom: 20,
  },
  restTimerSection: {
    marginBottom: 20,
  },
  restDurationSelector: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFFDF5',
    borderRadius: 8,
  },
  restDurationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#103713',
    marginBottom: 8,
  },
  restDurationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  restDurationButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E2DBD0',
    borderWidth: 2,
    borderColor: '#628B35',
    alignItems: 'center',
  },
  restDurationButtonActive: {
    backgroundColor: '#628B35',
    borderColor: '#103713',
  },
  restDurationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#103713',
  },
  restDurationButtonTextActive: {
    color: '#FFFDF5',
  },
  historySection: {
    marginBottom: 30,
  },
  historyCard: {
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  historyLabel: {
    fontSize: 14,
    color: '#103713',
    fontWeight: '600',
    flex: 1,
  },
  historyValue: {
    fontSize: 14,
    color: '#628B35',
    fontWeight: '700',
  },
  historyEmpty: {
    fontSize: 14,
    color: '#628B35',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ExerciseDetailScreen;

