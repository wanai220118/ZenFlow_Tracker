import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RestTimer = ({ duration = 60, onComplete, onSkip, autoStart = false }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, timeLeft, onComplete]);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(autoStart);
    setIsPaused(false);
  }, [duration, autoStart]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleSkip = () => {
    if (onSkip) onSkip();
  };

  if (timeLeft === 0 && !isRunning) {
    return null; // Hide when completed
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="timer" size={24} color="#628B35" />
        <Text style={styles.title}>Rest Time</Text>
      </View>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <MaterialIcons name="play-arrow" size={20} color="#FFFDF5" />
            <Text style={styles.buttonText}>Start Rest</Text>
          </TouchableOpacity>
        ) : isPaused ? (
          <TouchableOpacity style={styles.button} onPress={handleResume}>
            <MaterialIcons name="play-arrow" size={20} color="#FFFDF5" />
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <MaterialIcons name="pause" size={20} color="#FFFDF5" />
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        {onSkip && (
          <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={handleSkip}>
            <MaterialIcons name="skip-next" size={20} color="#FFFDF5" />
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#628B35',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#103713',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#103713',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#628B35',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  skipButton: {
    backgroundColor: '#103713',
  },
  buttonText: {
    color: '#FFFDF5',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RestTimer;
