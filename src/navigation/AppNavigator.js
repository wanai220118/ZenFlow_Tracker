import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DailyEntryScreen from '../screens/DailyEntryScreen';
import ExerciseListScreen from '../screens/ExerciseListScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import ExerciseSummaryScreen from '../screens/ExerciseSummaryScreen';
import AddEditExerciseScreen from '../screens/AddEditExerciseScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import ExportDataScreen from '../screens/ExportDataScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ExerciseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="ExerciseSummary" component={ExerciseSummaryScreen} />
      <Stack.Screen name="AddEditExercise" component={AddEditExerciseScreen} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
      <Stack.Screen name="ExportData" component={ExportDataScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#628B35',
          tabBarInactiveTintColor: '#E2DBD0',
          tabBarStyle: {
            backgroundColor: '#103713',
            borderTopWidth: 0,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={MainStack}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="dashboard" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Daily"
          component={DailyEntryScreen}
          options={{
            tabBarLabel: 'Daily Entry',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="edit" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Exercises"
          component={ExerciseStack}
          options={{
            tabBarLabel: 'Exercises',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="fitness-center" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarLabel: 'Stats',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="bar-chart" size={size || 24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

