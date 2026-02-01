import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import WeightChart from '../components/WeightChart';
import { storageService } from '../storage/localStorage';

const StatsScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [todayEntry, setTodayEntry] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const profileData = await storageService.getProfile();
    setProfile(profileData);

    const date = new Date().toISOString().split('T')[0];
    const entry = await storageService.getDailyEntry(date);
    setTodayEntry(entry);

    // Load weekly stats
    const entries = await storageService.getDailyEntries();
    const weekDates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      weekDates.push(d.toISOString().split('T')[0]);
    }
    const weekData = weekDates.map((date) => ({
      date,
      entry: entries[date] || null,
    }));
    setWeeklyStats(weekData);

    // Load weight data for chart (last 30 days)
    const weightChartData = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = entries[dateStr];
      if (entry && entry.weight) {
        weightChartData.push({
          date: dateStr,
          weight: entry.weight,
        });
      }
    }
    setWeightData(weightChartData);
  };

  const StatCard = ({ title, value, unit = '' }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>
        {value !== null && value !== undefined ? value : '--'}
        {unit && ` ${unit}`}
      </Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Statistics</Text>
            <Text style={styles.subtitle}>Your progress overview</Text>
          </View>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate('WorkoutHistory')}
          >
            <MaterialIcons name="history" size={24} color="#E2DBD0" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {profile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <View style={styles.statsRow}>
              <StatCard title="Age" value={profile.age} unit="years" />
              <StatCard title="Height" value={profile.height} unit="cm" />
              <StatCard title="Weight" value={profile.weight} unit="kg" />
            </View>
          </View>
        )}

        {weightData.length > 0 && (
          <View style={styles.section}>
            <WeightChart data={weightData} />
          </View>
        )}

        {todayEntry && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <View style={styles.statsRow}>
              <StatCard
                title="Weight"
                value={todayEntry.weight}
                unit="kg"
              />
              <StatCard title="Steps" value={todayEntry.steps} />
              <StatCard
                title="VStepper"
                value={todayEntry.vstepperSteps}
              />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Overview</Text>
          {weeklyStats.map((day, index) => (
            <View key={index} style={styles.weekDayCard}>
              <Text style={styles.weekDayDate}>
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
              {day.entry ? (
                <View style={styles.weekDayStats}>
                  <Text style={styles.weekDayText}>
                    Weight: {day.entry.weight} kg
                  </Text>
                  <Text style={styles.weekDayText}>
                    Steps: {day.entry.steps}
                  </Text>
                  <Text style={styles.weekDayText}>
                    VStepper: {day.entry.vstepperSteps}
                  </Text>
                </View>
              ) : (
                <Text style={styles.weekDayEmpty}>No entry</Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadStats}
        >
          <Text style={styles.refreshButtonText}>Refresh Stats</Text>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyButton: {
    padding: 8,
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
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#103713',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#628B35',
    fontWeight: '600',
  },
  weekDayCard: {
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#628B35',
  },
  weekDayDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 8,
  },
  weekDayStats: {
    gap: 4,
  },
  weekDayText: {
    fontSize: 14,
    color: '#628B35',
  },
  weekDayEmpty: {
    fontSize: 14,
    color: '#628B35',
    fontStyle: 'italic',
  },
  refreshButton: {
    backgroundColor: '#628B35',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  refreshButtonText: {
    color: '#FFFDF5',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default StatsScreen;

