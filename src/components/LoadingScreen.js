import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>ZenFlow Tracker</Text>
      <ActivityIndicator size="large" color="#628B35" style={styles.spinner} />
      <Text style={styles.subtitle}>Loading your wellness journey...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#103713',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFDF5',
    marginBottom: 30,
    letterSpacing: 1,
  },
  spinner: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2DBD0',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default LoadingScreen;

