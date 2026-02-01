import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PROFILE: '@profile',
  DAILY_ENTRIES: '@daily_entries',
  EXERCISE_LOGS: '@exercise_logs',
  EXERCISES: '@exercises',
  BODY_MEASUREMENTS: '@body_measurements',
  WORKOUT_HISTORY: '@workout_history',
};

export const storageService = {
  // Profile data
  async saveProfile(profile) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  },

  async getProfile() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  },

  // Daily entries
  async saveDailyEntry(date, entry) {
    try {
      const entries = await this.getDailyEntries();
      entries[date] = entry;
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_ENTRIES, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving daily entry:', error);
    }
  },

  async getDailyEntry(date) {
    try {
      const entries = await this.getDailyEntries();
      return entries[date] || null;
    } catch (error) {
      console.error('Error getting daily entry:', error);
      return null;
    }
  },

  async getDailyEntries() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_ENTRIES);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting daily entries:', error);
      return {};
    }
  },

  // Exercise logs
  async saveExerciseLog(exerciseId, date, log) {
    try {
      const logs = await this.getExerciseLogs();
      const key = `${exerciseId}_${date}`;
      logs[key] = log;
      await AsyncStorage.setItem(STORAGE_KEYS.EXERCISE_LOGS, JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving exercise log:', error);
    }
  },

  async getExerciseLog(exerciseId, date) {
    try {
      const logs = await this.getExerciseLogs();
      const key = `${exerciseId}_${date}`;
      return logs[key] || null;
    } catch (error) {
      console.error('Error getting exercise log:', error);
      return null;
    }
  },

  async getExerciseLogs() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.EXERCISE_LOGS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting exercise logs:', error);
      return {};
    }
  },

  // Exercises (user-created)
  async saveExercises(exercises) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(exercises));
    } catch (error) {
      console.error('Error saving exercises:', error);
    }
  },

  async getExercises() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.EXERCISES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting exercises:', error);
      return [];
    }
  },

  async addExercise(exercise) {
    try {
      const exercises = await this.getExercises();
      const newId = exercises.length > 0 
        ? Math.max(...exercises.map(e => e.id)) + 1 
        : 1;
      const newExercise = { ...exercise, id: newId };
      exercises.push(newExercise);
      await this.saveExercises(exercises);
      return newExercise;
    } catch (error) {
      console.error('Error adding exercise:', error);
      return null;
    }
  },

  async updateExercise(exerciseId, updatedExercise) {
    try {
      const exercises = await this.getExercises();
      const index = exercises.findIndex(e => e.id === exerciseId);
      if (index !== -1) {
        exercises[index] = { ...exercises[index], ...updatedExercise };
        await this.saveExercises(exercises);
        return exercises[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating exercise:', error);
      return null;
    }
  },

  async deleteExercise(exerciseId) {
    try {
      const exercises = await this.getExercises();
      const filtered = exercises.filter(e => e.id !== exerciseId);
      await this.saveExercises(filtered);
      return true;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      return false;
    }
  },

  // Body measurements
  async saveBodyMeasurements(date, measurements) {
    try {
      const allMeasurements = await this.getBodyMeasurements();
      allMeasurements[date] = { ...measurements, date };
      await AsyncStorage.setItem(STORAGE_KEYS.BODY_MEASUREMENTS, JSON.stringify(allMeasurements));
    } catch (error) {
      console.error('Error saving body measurements:', error);
    }
  },

  async getBodyMeasurements() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BODY_MEASUREMENTS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting body measurements:', error);
      return {};
    }
  },

  async getBodyMeasurement(date) {
    try {
      const measurements = await this.getBodyMeasurements();
      return measurements[date] || null;
    } catch (error) {
      console.error('Error getting body measurement:', error);
      return null;
    }
  },

  // Workout history
  async saveWorkoutHistory(date, workoutData) {
    try {
      const history = await this.getWorkoutHistory();
      if (!history[date]) {
        history[date] = [];
      }
      history[date].push({
        ...workoutData,
        timestamp: new Date().toISOString(),
      });
      await AsyncStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving workout history:', error);
    }
  },

  async getWorkoutHistory() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting workout history:', error);
      return {};
    }
  },

  async getWorkoutsByDate(date) {
    try {
      const history = await this.getWorkoutHistory();
      return history[date] || [];
    } catch (error) {
      console.error('Error getting workouts by date:', error);
      return [];
    }
  },

  async getWorkoutsByDateRange(startDate, endDate) {
    try {
      const history = await this.getWorkoutHistory();
      const workouts = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (history[dateStr]) {
          workouts.push(...history[dateStr].map(w => ({ ...w, date: dateStr })));
        }
      }
      
      return workouts;
    } catch (error) {
      console.error('Error getting workouts by date range:', error);
      return [];
    }
  },

  // Workout streak
  async getWorkoutStreak() {
    try {
      const history = await this.getWorkoutHistory();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let streak = 0;
      let currentDate = new Date(today);
      
      // Check today first
      const todayStr = currentDate.toISOString().split('T')[0];
      if (history[todayStr] && history[todayStr].length > 0) {
        streak = 1;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // If no workout today, check yesterday
        currentDate.setDate(currentDate.getDate() - 1);
      }
      
      // Count consecutive days backwards
      while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (history[dateStr] && history[dateStr].length > 0) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
      
      return streak;
    } catch (error) {
      console.error('Error calculating workout streak:', error);
      return 0;
    }
  },

  // Exercise history per exercise
  async getExerciseHistory(exerciseId) {
    try {
      const history = await this.getWorkoutHistory();
      const exerciseHistory = [];
      
      Object.entries(history).forEach(([date, workouts]) => {
        workouts.forEach((workout) => {
          if (workout.exerciseId === exerciseId) {
            exerciseHistory.push({
              ...workout,
              date,
            });
          }
        });
      });
      
      // Sort by date, newest first
      exerciseHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return exerciseHistory;
    } catch (error) {
      console.error('Error getting exercise history:', error);
      return [];
    }
  },

  async getExerciseFrequency(exerciseId) {
    try {
      const history = await this.getExerciseHistory(exerciseId);
      return {
        totalCount: history.length,
        lastDone: history.length > 0 ? history[0].date : null,
        lastDoneDate: history.length > 0 ? new Date(history[0].date) : null,
        daysSinceLastDone: history.length > 0 
          ? Math.floor((new Date() - new Date(history[0].date)) / (1000 * 60 * 60 * 24))
          : null,
      };
    } catch (error) {
      console.error('Error getting exercise frequency:', error);
      return { totalCount: 0, lastDone: null, lastDoneDate: null, daysSinceLastDone: null };
    }
  },

  // Export/Backup data
  async exportAllData() {
    try {
      const profile = await this.getProfile();
      const dailyEntries = await this.getDailyEntries();
      const exercises = await this.getExercises();
      const exerciseLogs = await this.getExerciseLogs();
      const workoutHistory = await this.getWorkoutHistory();
      const bodyMeasurements = await this.getBodyMeasurements();
      
      const exportData = {
        exportDate: new Date().toISOString(),
        version: '1.0.0',
        data: {
          profile,
          dailyEntries,
          exercises,
          exerciseLogs,
          workoutHistory,
          bodyMeasurements,
        },
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  },

  async exportAsCSV() {
    try {
      const dailyEntries = await this.getDailyEntries();
      const exercises = await this.getExercises();
      const workoutHistory = await this.getWorkoutHistory();
      
      let csv = 'Type,Date,Data\n';
      
      // Daily entries
      Object.entries(dailyEntries).forEach(([date, entry]) => {
        csv += `Daily Entry,${date},"Weight: ${entry.weight}kg, Steps: ${entry.steps}, VStepper: ${entry.vstepperSteps}"\n`;
      });
      
      // Exercises
      exercises.forEach((exercise) => {
        csv += `Exercise,${new Date().toISOString().split('T')[0]},"${exercise.name}, ${exercise.category}, ${exercise.description}"\n`;
      });
      
      // Workout history
      Object.entries(workoutHistory).forEach(([date, workouts]) => {
        workouts.forEach((workout) => {
          csv += `Workout,${date},"${workout.exerciseName}, Set ${workout.setNumber}, Completed: ${workout.completed}"\n`;
        });
      });
      
      return csv;
    } catch (error) {
      console.error('Error exporting CSV:', error);
      return null;
    }
  },
};

