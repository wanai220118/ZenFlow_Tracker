import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { storageService } from '../storage/localStorage';

const WorkoutHistoryScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthWorkouts, setMonthWorkouts] = useState({});

  useEffect(() => {
    loadWorkoutHistory();
    generateCalendar();
  }, [selectedDate]);

  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        date: dateStr,
        dateObj: new Date(year, month, day),
      });
    }

    setCalendarDays(days);
    loadMonthWorkouts(year, month);
  };

  const loadMonthWorkouts = async (year, month) => {
    const startDate = new Date(year, month, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    const monthWorkoutsData = await storageService.getWorkoutsByDateRange(startDate, endDate);
    
    const workoutsByDate = {};
    monthWorkoutsData.forEach((workout) => {
      if (!workoutsByDate[workout.date]) {
        workoutsByDate[workout.date] = [];
      }
      workoutsByDate[workout.date].push(workout);
    });
    
    setMonthWorkouts(workoutsByDate);
  };

  const loadWorkoutHistory = async () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayWorkouts = await storageService.getWorkoutsByDate(dateStr);
    setWorkouts(dayWorkouts);
  };

  const handleDateSelect = (dateObj) => {
    if (dateObj) {
      setSelectedDate(dateObj);
    }
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const isSelected = (dateStr) => {
    const selected = selectedDate.toISOString().split('T')[0];
    return dateStr === selected;
  };

  const hasWorkouts = (dateStr) => {
    return monthWorkouts[dateStr] && monthWorkouts[dateStr].length > 0;
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <MaterialIcons name="fitness-center" size={24} color="#628B35" />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{item.exerciseName}</Text>
        {item.category && (
          <Text style={styles.workoutCategory}>{item.category}</Text>
        )}
        <Text style={styles.workoutTime}>
          {new Date(item.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      {item.allSetsCompleted && (
        <MaterialIcons name="check-circle" size={24} color="#628B35" />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#E2DBD0" />
        </TouchableOpacity>
        <Text style={styles.title}>Workout History</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <MaterialIcons name="chevron-left" size={28} color="#103713" />
            </TouchableOpacity>
            <Text style={styles.monthYear}>
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <MaterialIcons name="chevron-right" size={28} color="#103713" />
            </TouchableOpacity>
          </View>

          <View style={styles.calendarGrid}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <View key={day} style={styles.calendarDayHeader}>
                <Text style={styles.calendarDayHeaderText}>{day}</Text>
              </View>
            ))}
            {calendarDays.map((day, index) => {
              if (!day) {
                return <View key={`empty-${index}`} style={styles.calendarDay} />;
              }

              const dayHasWorkouts = hasWorkouts(day.date);
              const dayIsToday = isToday(day.date);
              const dayIsSelected = isSelected(day.date);

              return (
                <TouchableOpacity
                  key={day.date}
                  style={[
                    styles.calendarDay,
                    dayIsToday && styles.calendarDayToday,
                    dayIsSelected && styles.calendarDaySelected,
                    dayHasWorkouts && styles.calendarDayHasWorkouts,
                  ]}
                  onPress={() => handleDateSelect(day.dateObj)}
                >
                  <Text
                    style={[
                      styles.calendarDayText,
                      dayIsSelected && styles.calendarDayTextSelected,
                    ]}
                  >
                    {day.day}
                  </Text>
                  {dayHasWorkouts && (
                    <View style={styles.workoutDot} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.selectedDateSection}>
          <Text style={styles.selectedDateTitle}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>

          {workouts.length > 0 ? (
            <FlatList
              data={workouts}
              renderItem={renderWorkoutItem}
              keyExtractor={(item, index) => `${item.exerciseId}-${item.timestamp}-${index}`}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="fitness-center" size={48} color="#E2DBD0" />
              <Text style={styles.emptyText}>No workouts on this day</Text>
            </View>
          )}
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
    backgroundColor: '#103713',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDF5',
    flex: 1,
  },
  content: {
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: '700',
    color: '#103713',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayHeader: {
    width: '14.28%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  calendarDayHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#103713',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 2,
  },
  calendarDayToday: {
    backgroundColor: '#628B35',
  },
  calendarDaySelected: {
    backgroundColor: '#103713',
  },
  calendarDayHasWorkouts: {
    borderWidth: 2,
    borderColor: '#628B35',
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#103713',
  },
  calendarDayTextSelected: {
    color: '#FFFDF5',
  },
  workoutDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#628B35',
  },
  selectedDateSection: {
    marginTop: 8,
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 16,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#628B35',
    gap: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 4,
  },
  workoutCategory: {
    fontSize: 12,
    color: '#628B35',
    marginBottom: 4,
  },
  workoutTime: {
    fontSize: 12,
    color: '#628B35',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#628B35',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default WorkoutHistoryScreen;
