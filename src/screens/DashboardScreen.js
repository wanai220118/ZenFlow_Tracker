import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { storageService } from '../storage/localStorage';

const DashboardScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [todayEntry, setTodayEntry] = useState(null);
  const [recentExercises, setRecentExercises] = useState([]);
  const [workoutStreak, setWorkoutStreak] = useState(0);

  useEffect(() => {
    loadDashboardData();
    // Refresh when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadDashboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadDashboardData = async () => {
    const profileData = await storageService.getProfile();
    setProfile(profileData);

    const date = new Date().toISOString().split('T')[0];
    const entry = await storageService.getDailyEntry(date);
    setTodayEntry(entry);

    // Load recent exercise completions
    const logs = await storageService.getExerciseLogs();
    const recent = Object.entries(logs)
      .filter(([key, log]) => log.completed)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 3);
    setRecentExercises(recent);

    // Load workout streak
    const streak = await storageService.getWorkoutStreak();
    setWorkoutStreak(streak);
  };

  const StatCard = ({ title, value, unit = '', iconName = null }) => (
    <View style={styles.statCard}>
      {iconName ? (
        <MaterialIcons name={iconName} size={32} color="#628B35" style={styles.statIcon} />
      ) : null}
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
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {workoutStreak > 0 && (
          <View style={styles.section}>
            <View style={styles.streakCard}>
              <MaterialIcons name="local-fire-department" size={40} color="#628B35" />
              <View style={styles.streakContent}>
                <Text style={styles.streakNumber}>{workoutStreak}</Text>
                <Text style={styles.streakLabel}>
                  Day{workoutStreak !== 1 ? 's' : ''} Streak!
                </Text>
                <Text style={styles.streakSubtext}>Keep it up!</Text>
              </View>
            </View>
          </View>
        )}

        {profile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Profile</Text>
            <View style={styles.profileInfo}>
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Age:</Text>
                <Text style={styles.profileValue}>{profile.age} years</Text>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Height:</Text>
                <Text style={styles.profileValue}>{profile.height} cm</Text>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Weight:</Text>
                <Text style={styles.profileValue}>{profile.weight} kg</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {!profile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get Started</Text>
            <Text style={styles.emptyText}>
              Complete your profile to start tracking your fitness journey!
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.primaryButtonText}>Set Up Profile</Text>
            </TouchableOpacity>
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
                iconName="monitor-weight"
              />
              <StatCard
                title="Steps"
                value={todayEntry.steps}
                iconName="directions-walk"
              />
              <StatCard
                title="VStepper"
                value={todayEntry.vstepperSteps}
                iconName="repeat"
              />
            </View>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Daily')}
            >
              <Text style={styles.linkButtonText}>Update Daily Entry →</Text>
            </TouchableOpacity>
          </View>
        )}

        {!todayEntry && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <Text style={styles.emptyText}>
              Log your daily entry to track your progress!
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Daily')}
            >
              <Text style={styles.primaryButtonText}>Add Daily Entry</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Exercises')}
            >
              <MaterialIcons name="fitness-center" size={32} color="#103713" />
              <Text style={styles.actionText}>Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Daily')}
            >
              <MaterialIcons name="edit" size={32} color="#103713" />
              <Text style={styles.actionText}>Daily Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Stats')}
            >
              <MaterialIcons name="bar-chart" size={32} color="#103713" />
              <Text style={styles.actionText}>Statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('WorkoutHistory')}
            >
              <MaterialIcons name="history" size={32} color="#103713" />
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
          </View>
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
  greeting: {
    fontSize: 14,
    color: '#E2DBD0',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDF5',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
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
    marginBottom: 12,
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
  statIcon: {
    marginBottom: 8,
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
  profileInfo: {
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileLabel: {
    fontSize: 16,
    color: '#103713',
    fontWeight: '600',
  },
  profileValue: {
    fontSize: 16,
    color: '#628B35',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#628B35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFDF5',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#628B35',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFDF5',
    fontSize: 18,
    fontWeight: '700',
  },
  linkButton: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  linkButtonText: {
    color: '#628B35',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#628B35',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#E2DBD0',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#103713',
    fontWeight: '600',
  },
  streakCard: {
    backgroundColor: '#E2DBD0',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  streakContent: {
    marginLeft: 16,
    flex: 1,
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#103713',
  },
  streakLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#628B35',
    marginTop: 4,
  },
  streakSubtext: {
    fontSize: 14,
    color: '#628B35',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default DashboardScreen;

